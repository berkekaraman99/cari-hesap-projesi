<script setup lang="ts">
import TheChart from '@/components/shared/TheChart.vue'
import { useReceiptStore } from '@/stores/receipt'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const receiptStore = useReceiptStore()
const { _receiptCount: receiptCount, _totalPrice: totalPrice } = storeToRefs(receiptStore)

const router = useRouter()

onBeforeMount(() => {
  receiptStore.getReceiptCount()
})

const goToCustomers = () => {
  router.push({ name: 'receipts' })
}
</script>

<template>
  <main>
    <div>
      <h1 class="my-4 ps-2">Ana Sayfa</h1>
    </div>
    <div class="card px-4 py-3 bg-body-secondary">
      <div class="row row-cols-1 row-cols-md-2 my-2">
        <div class="col-12 col-sm-12 col-md-12 col-lg-4">
          <div class="row">
            <div class="col-12 col-sm-4 col-md-4 col-lg-12 mb-3">
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
                <button class="btn btn-primary mt-3" @click="goToCustomers()">
                  Tümünü Görüntüle
                </button>
              </div>
            </div>
            <div class="col-12 col-sm-4 col-md-4 col-lg-12 mb-3">
              <div class="card card-body h-100 d-flex align-items-center justify-content-center">
                <div class="row">
                  <div class="col-12 col-lg-6">
                    <h4 class="text-center">
                      Alacak Dekont Sayısı: {{ receiptCount.alacak_count }}
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
            <div class="col-12 col-sm-4 col-md-4 col-lg-12 mb-3">
              <div class="card card-body h-100 d-flex align-items-center justify-content-center">
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
        <TheChart />
        <!-- <div class="col-12 col-md-8"></div> -->
      </div>
    </div>
  </main>
</template>
