<template>
  <div>
    <div class="my-4">
      <h3 class="bg-body-secondary rounded-3 border p-3 d-inline-block">
        {{ customer.customer_name }}
      </h3>
    </div>
    <div class="card px-4 py-3 bg-body-secondary">
      <div class="row row-cols-1 row-cols-md-2 my-2">
        <div class="col-12 col-sm-12 col-md-4">
          <div class="row">
            <div class="col-12 mb-3">
              <div class="card card-body">
                <div class="row">
                  <div class="col-12 col-lg-6">
                    <h4 class="text-center">
                      Toplam Dekont Sayısı: {{ receiptCount.receipt_count }}
                    </h4>
                  </div>
                  <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                    <img
                      src="../../assets/images/receipts_2.png"
                      alt="inbox receipts"
                      class="doc-image"
                    />
                  </div>
                </div>
                <!-- <button class="btn btn-primary mt-3">Tümünü Görüntüle</button> -->
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="card card-body">
                <div class="row">
                  <div class="col-12 col-lg-6">
                    <h4 class="text-center">
                      Alacak Dekont Sayısı:
                      {{ receiptCount.alacak_count == null ? 0 : receiptCount.alacak_count }}
                    </h4>
                  </div>
                  <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                    <img
                      src="../../assets/images/inbox.png"
                      alt="inbox receivable"
                      class="doc-image"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 mb-3">
              <div class="card card-body">
                <div class="row">
                  <div class="col-12 col-lg-6">
                    <h4 class="text-center">
                      Borç Dekont Sayısı:
                      {{ receiptCount.borc_count == null ? 0 : receiptCount.borc_count }}
                    </h4>
                  </div>
                  <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                    <img src="../../assets/images/outbox.png" alt="inbox debt" class="doc-image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-8">
          <div class="card shadow-sm">
            <div class="card-header">
              <div class="row">
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <h4 class="card-title my-2">Grafik</h4>
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
      </div>
    </div>

    <!-- <div class="card bg-body-secondary">
      <div class="container px-4 py-3">
        <div class="row py-2">
          <div class="col-12 col-lg-4 py-2">
            <div class="card card-body rounded-3">
              <div class="row">
                <div class="col-12 col-lg-6">
                  <h4 class="text-center">Dekont Sayısı: {{ receiptCount.receipt_count }}</h4>
                </div>
                <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
                  <img
                    src="../../assets/images/receipts_2.png"
                    alt="inbox receipts"
                    class="doc-image"
                  />
                </div>
              </div>
              <RouterLink :to="{ name: 'customer-receipts', params: { id: customer.customer_id } }"
                ><button class="btn btn-primary mt-3">Tümünü Görüntüle</button></RouterLink
              >
            </div>
          </div>

          <div class="col-12 col-sm-12 col-md-12 col-lg-8">
            <div class="row">
              <div class="col-12 col-sm-12 col-md-6 col-lg-6 py-2">
                <div class="card card-body">
                  <p>
                    <span class="fw-bold">Müşteri Adı:</span>
                    <input
                      class="form-control"
                      type="text"
                      :disabled="!isEditable"
                      v-model="customerDetails.customerName"
                    />
                  </p>
                  <p>
                    <span class="fw-bold">Vergi Dairesi Şehri:</span>
                    <input
                      class="form-control"
                      type="text"
                      :disabled="!isEditable"
                      v-model="customerDetails.taxCity"
                    />
                  </p>
                </div>
              </div>
              <div class="col-12 col-sm-12 col-md-6 col-lg-6 py-2">
                <div class="card card-body">
                  <p>
                    <span class="fw-bold">Vergi Dairesi:</span>
                    <input
                      class="form-control"
                      type="text"
                      :disabled="!isEditable"
                      v-model="customerDetails.taxAdministration"
                    />
                  </p>
                  <p>
                    <span class="fw-bold"
                      >{{
                        customer.customer_type === 'company' ? 'Vergi Dairesi Numarası' : 'TC No'
                      }}:</span
                    >
                    <input
                      class="form-control"
                      type="text"
                      :disabled="!isEditable"
                      v-model="customerDetails.taxNumber"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer'
import { useReceiptStore } from '@/stores/receipt'
import { Chart } from 'chart.js/auto'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, ref } from 'vue'
import { reactive } from 'vue'
import { onMounted } from 'vue'

import { Months } from '@/constants/months'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const isEditable = ref(false)

const customerDetails = reactive({
  customerName: '',
  taxCity: '',
  taxAdministration: '',
  taxNumber: ''
})

const customerStore = useCustomerStore()
const {
  _customer: customer,
  _receiptCount: receiptCount,
  _totalDebtPrice: totalDebtPrice,
  _totalReceivablePrice: totalReceivablePrice
} = storeToRefs(customerStore)
const getCustomer = async () => {
  await customerStore.getCustomerById(props.id).then(() => {
    customerDetails.customerName = customer.value.customer_name
    customerDetails.taxAdministration = customer.value.tax_administration
    customerDetails.taxNumber = customer.value.tax_number
    customerDetails.taxCity = customer.value.tax_administration_city
  })
}

const getReceiptCount = async () => {
  await customerStore.getCustomerReceiptCount(props.id)
}

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
  await customerStore
    .getDebtTotalPrice(selectedYear.value, props.id)
    .then(() => console.log(totalDebtPrice.value))
    .then(() => {
      totalDebtPrice.value.forEach((data: any) => {
        debtData.value[data.month - 1] = data.total_borc
      })
    })
  await customerStore
    .getReceivableTotalPrice(selectedYear.value, props.id)
    .then(() => console.log(totalReceivablePrice.value))
    .then(() => {
      totalReceivablePrice.value.forEach((data: any) => {
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
  getCustomer()
  getReceiptCount()
  ctx = document.getElementById('myChart')
  getDataAndInitChart()
})

onBeforeUnmount(() => {
  customerStore.$reset()
})

window.addEventListener('resize', function () {
  ctx.style.width = window.innerWidth

  ctx.style.height = window.innerHeight
})
</script>

<style scoped></style>
