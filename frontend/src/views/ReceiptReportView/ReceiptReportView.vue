<template>
  <div class="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-8 offset-lg-2">
    <h1>Genel Rapor</h1>
    <div class="card card-body">
      <form @submit.prevent="getReport()">
        <table class="table table-borderless">
          <tr>
            <th>Rapor Türü</th>
            <td>
              <FormKit
                type="radio"
                :options="[
                  { label: 'Genel Rapor', value: 'all-reports' },
                  { label: 'Müşteri Karşılaştır', value: 'customer-compare' }
                ]"
                v-model="reportType"
              />
            </td>
          </tr>

          <template v-if="reportType === 'all-reports'">
            <tr>
              <th>Sıralama Türü</th>
              <td>
                <FormKit
                  type="select"
                  name="sorting"
                  :options="[
                    { label: 'İsme Göre', value: 'c.customer_name' },
                    { label: 'Alacak', value: 'alacak' },
                    { label: 'Borç', value: 'borc' }
                  ]"
                  v-model="sortBy"
                />
              </td>
            </tr>
            <tr>
              <th>Sırala</th>
              <td>
                <FormKit
                  type="select"
                  name="sorting"
                  :options="[
                    { label: 'Artan', value: 'ASC' },
                    { label: 'Azalan', value: 'DESC' }
                  ]"
                  v-model="sort"
                />
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <th>1. Müşteri</th>
              <td>
                <FormKit
                  type="text"
                  name="customerone"
                  validation="required"
                  v-model="customerOne"
                  list="customer-one"
                  @input="searchCustomer(customerOne)"
                />
                <datalist id="customer-one">
                  <option
                    v-for="customer in searchedCustomers"
                    :value="customer.customer_name"
                  ></option>
                </datalist>
              </td>
            </tr>
            <tr>
              <th>2. Müşteri</th>
              <td>
                <FormKit
                  type="text"
                  name="customertwo"
                  validation="required"
                  v-model="customerTwo"
                  list="customer-two"
                  @input="searchCustomer2(customerTwo)"
                />
                <datalist id="customer-two">
                  <option
                    v-for="customer in searchedCustomers2"
                    :value="customer.customer_name"
                  ></option>
                </datalist>
              </td>
            </tr>
          </template>
          <tr>
            <th>Başlangıç Tarihi</th>
            <td>
              <FormKit
                type="date"
                name="Başlangıç Tarihi"
                validation="required"
                v-model="dateStart"
              />
            </td>
          </tr>
          <tr>
            <th>Bitiş Tarihi</th>
            <td>
              <FormKit
                type="date"
                name="Bitiş Tarihi"
                :validation="'required|date_before:' + maxDate"
                v-model="dateEnd"
              />
            </td>
          </tr>
        </table>
        <FormKit
          type="submit"
          label="Raporu Getir"
          :classes="{
            outer: 'text-center',
            wrapper: 'mx-auto'
          }"
        />
      </form>
    </div>
    <Transition name="fade">
      <div class="card card-body my-4" v-if="report.length > 0">
        <table class="table table-bordered table-hover shadow-sm">
          <thead>
            <tr>
              <th class="col">Müşteri Adı</th>
              <th class="col">Alacak</th>
              <th class="col">Borç</th>
              <th class="col">Net</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in report" v-bind:key="r">
              <td>{{ r.customer }}</td>
              <td>{{ r.alacak + ' ₺' }}</td>
              <td>{{ r.borc + ' ₺' }}</td>
              <td>{{ r.net + ' ₺' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Transition>
    <div v-show="cReport != null">
      <div class="card p-4 my-3">
        <h3 class="border-bottom d-inline">Alacak - Borç Karşılaştırması</h3>
        <div class="d-flex align-items-center justify-content-around">
          <div><canvas id="myChart1" class="chartjs-render-monitor"></canvas></div>
          <div><canvas id="myChart2" class="chartjs-render-monitor"></canvas></div>
        </div>
      </div>
      <!-- <div class="card p-4 my-3">
        <h3 class="border-bottom d-inline">Borç Karşılaştırması</h3>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCustomerStore } from '@/stores/customer'
import { useReceiptStore } from '@/stores/receipt'
import { storeToRefs } from 'pinia'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'
import { Months } from '@/constants/months'

const reportType = ref('all-reports')
let ctx1: any
let ctx2: any
let doughnutChartAlacak: any
let doughnutChartBorc: any

onMounted(async () => {
  ctx1 = document.getElementById('myChart1')
  ctx2 = document.getElementById('myChart2')
})

window.addEventListener('resize', function () {
  ctx1.style.width = window.innerWidth
  ctx1.style.height = window.innerHeight
  ctx2.style.width = window.innerWidth
  ctx2.style.height = window.innerHeight
})

const labels = ref<string[]>([])
Object.values(Months).forEach((value) => labels.value.push(value))

const receiptStore = useReceiptStore()
const { _receiptReport: report, _customerReport: cReport } = storeToRefs(receiptStore)
const customerStore = useCustomerStore()
const { _searchedCustomers: searchCustomers } = storeToRefs(customerStore)

const customerOne = ref('')
const customerTwo = ref('')

const searchedCustomers: any = ref([])
const searchedCustomers2: any = ref([])

const latestDate = new Date()
latestDate.setDate(latestDate.getDate() + 1)
const maxDate = latestDate.toISOString().slice(0, 10)
latestDate.setDate(latestDate.getDate() - 1)

const startDate = new Date()
startDate.setDate(latestDate.getDate() - 30)

const dateStart = ref(startDate.toISOString().slice(0, 10))
const dateEnd = ref(latestDate.toISOString().slice(0, 10))

const sortBy = ref('c.customer_name')
const sort = ref('ASC')
const getReport = async () => {
  if (reportType.value === 'all-reports') {
    receiptStore.$patch({
      customerReport: undefined
    })
    await receiptStore.getReceiptReport({
      sortBy: sortBy.value,
      sort: sort.value,
      startDate: dateStart.value,
      endDate: dateEnd.value
    })
  } else {
    receiptStore.$patch({
      receiptReport: []
    })
    await receiptStore
      .getCustomerCompare({
        startDate: dateStart.value,
        endDate: dateEnd.value,
        customer_one: customerOne.value,
        customer_two: customerTwo.value
      })
      .then(() => {
        console.log(cReport.value)

        const alacak: Array<number> = []
        const borc: Array<number> = []
        cReport.value.report.forEach((el: any) => {
          alacak.push(el.alacak)
          borc.push(el.borc)
        })
        const doughnutDataAlacak = {
          labels: [customerOne.value, customerTwo.value],
          datasets: [
            {
              label: 'Fiyat',
              data: alacak,
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
              hoverOffset: 4
            }
          ]
        }
        const doughnutDataBorc = {
          labels: [customerOne.value, customerTwo.value],
          datasets: [
            {
              label: 'Fiyat',
              data: borc,
              backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)'],
              hoverOffset: 4
            }
          ]
        }
        return { doughnutDataAlacak, doughnutDataBorc }
      })
      .then(({ doughnutDataAlacak, doughnutDataBorc }) => {
        doughnutChartAlacak = new Chart(ctx1, {
          type: 'doughnut',
          data: doughnutDataAlacak
        })

        doughnutChartBorc = new Chart(ctx2, {
          type: 'doughnut',
          data: doughnutDataBorc
        })
      })
  }
}

let timer: any = null

const searchCustomer = async (text: string) => {
  clearTimeout(timer)

  timer = setTimeout(async () => {
    await customerStore.searchCustomers(text).then(() => {
      searchedCustomers.value = searchCustomers.value
    })
  }, 500)
}

const searchCustomer2 = async (text: string) => {
  clearTimeout(timer)

  timer = setTimeout(async () => {
    await customerStore.searchCustomers(text).then(() => {
      searchedCustomers2.value = searchCustomers.value
    })
  }, 500)
}

onBeforeUnmount(() => {
  customerStore.$patch({
    searchedCustomers: []
  })
  receiptStore.$patch({
    customerReport: undefined,
    receiptReport: []
  })
})
</script>

<style scoped lang="scss">
.table {
  border-collapse: separate;
  border-radius: 0.5rem;
  border-spacing: 0;
  margin-bottom: 0;
  user-select: none;
}

th {
  &:first-child {
    border-top-left-radius: 0.5rem;
  }
  &:last-child {
    border-top-right-radius: 0.5rem;
  }
}

tr {
  &:last-child td {
    &:first-child {
      border-bottom-left-radius: 0.5rem;
    }
    &:last-child {
      border-bottom-right-radius: 0.5rem;
    }
  }
}

thead tr,
thead tr th {
  background-color: transparent;
  color: var(--textcolor-light);
}
thead {
  background-image: linear-gradient(
    90deg,
    var(--secondary-color-h) 0%,
    var(--secondary-color-l) 100%
  );
}

th,
td {
  text-align: center;
}

#myChart1,
#myChart2 {
  max-height: 600px;
}
</style>
