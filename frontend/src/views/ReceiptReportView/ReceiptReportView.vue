<template>
  <div class="col-12 col-sm-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
    <h1>Genel Rapor</h1>
    <div class="card card-body">
      <form @submit.prevent="reportType === 'all-reports' ? getReport() : compareCustomers()">
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
                    { label: 'İsme Göre', value: 'customer' },
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
                    { label: 'Artan', value: 'asc' },
                    { label: 'Azalan', value: 'desc' }
                  ]"
                  v-model="sort"
                />
              </td>
            </tr>
          </template>
          <template v-else> </template>
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
  </div>
</template>

<script setup lang="ts">
import { useReceiptStore } from '@/stores/receipt'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const reportType = ref('all-reports')

const receiptStore = useReceiptStore()
const { _receiptReport: report } = storeToRefs(receiptStore)

const latestDate = new Date()
latestDate.setDate(latestDate.getDate() + 1)
const maxDate = latestDate.toISOString().slice(0, 10)
latestDate.setDate(latestDate.getDate() - 1)

const startDate = new Date()
startDate.setDate(latestDate.getDate() - 30)

const dateStart = ref(startDate.toISOString().slice(0, 10))
const dateEnd = ref(latestDate.toISOString().slice(0, 10))

const sortBy = ref('customer')
const sort = ref('asc')
const getReport = async () => {
  console.log(dateStart.value)
  console.log(dateEnd.value)

  await receiptStore.getReceiptReport({
    sortBy: sortBy.value,
    sort: sort.value,
    startDate: dateStart.value,
    endDate: dateEnd.value
  })
}

const compareCustomers = async () => {}
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
</style>
