<template>
  <div class="col-12 col-sm-12 col-md-12 col-lg-8">
    <div class="card shadow-sm">
      <div class="card-header">
        <div class="row">
          <div class="d-flex align-items-center justify-content-between">
            <div>
              <h4 class="card-title my-2">Aylık Fatura Fiyatları</h4>
            </div>
            <div>
              <select
                class="form-select"
                name="years"
                id="years"
                v-model="selectedYear"
                @change="updateChart()"
              >
                <option v-for="year in years">{{ year }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="col-md-12 row">
          <div class="chartjs-size-monitor">
            <div class="chartjs-size-monitor-expand">
              <div></div>
            </div>
            <div class="chartjs-size-monitor-shrink">
              <div></div>
            </div>
          </div>
          <canvas id="myChart" class="chartjs-render-monitor"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReceiptStore } from '@/stores/receipt'
import Chart from 'chart.js/auto'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { Months } from '@/constants/months'

const receiptStore = useReceiptStore()
const { _totalPrice: totalPrice } = storeToRefs(receiptStore)

const debtData = ref<number[]>(new Array(12).fill(0))
const receivableData = ref<number[]>(new Array(12).fill(0))

let ctx: any
let chart: Chart

const labels = ref<string[]>([])
Object.values(Months).forEach((value) => labels.value.push(value))

const selectedYear = ref(new Date().getFullYear())
const years = ref<number[]>([])
for (let i = 0; i < 10; i++) {
  years.value.push(selectedYear.value - i)
}

const getDataAndInitChart = async () => {
  await receiptStore
    .getReceiptTotalPrices(selectedYear.value)
    .then(() => console.log(totalPrice.value))
    .then(() => {
      totalPrice.value.debtTotalPrice.forEach((data: any) => {
        debtData.value[data.month - 1] = data.total_borc
      })
      totalPrice.value.receivableTotalPrice.forEach((data: any) => {
        receivableData.value[data.month - 1] = data.total_alacak
      })
    })
    .then(() => {
      chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels.value,
          datasets: [
            {
              label: 'Alacak',
              data: [...receivableData.value],
              borderWidth: 1
            },
            {
              label: 'Borç',
              data: [...debtData.value],
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Alacak - Borç Tablosu'
            }
          },
          interaction: {
            intersect: true
          },
          scales: {
            x: {
              display: true,
              title: {
                display: false
              }
            },
            y: {
              beginAtZero: true,
              title: {
                display: false
              }
            }
          }
        }
      })
    })
}

const updateChart = async () => {
  debtData.value.fill(0, 0)
  receivableData.value.fill(0, 0)
  chart.destroy()
  getDataAndInitChart()
}
onMounted(async () => {
  ctx = document.getElementById('myChart')
  getDataAndInitChart()
})

window.addEventListener('resize', function () {
  ctx.style.width = window.innerWidth
  ctx.style.height = window.innerHeight
})
</script>

<style scoped></style>
