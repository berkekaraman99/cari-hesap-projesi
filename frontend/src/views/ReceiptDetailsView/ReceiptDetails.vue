<template>
  <div>
    <h1>Dekont Detayları</h1>
    <div class="card">
      <div class="container px-4 py-3">
        <div class="row rounded-3 py-2 mb-2 shadow-sm">
          <div class="col">
            <h2>Müşteri Adı: {{ receipt.customer_name }}</h2>
            <h2>Dekont Türü: {{ docType(receipt.type) }}</h2>
            <h2>Tarih: {{ receipt.created_date }}</h2>
            <h2>Tutar: {{ receipt.price + ' TL' }}</h2>
            <h2>Açıklama: {{ receipt.description }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReceiptStore } from '@/stores/receipt'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const receiptStore = useReceiptStore()
onBeforeMount(async () => {
  await receiptStore.getReceiptById(props.id)
})

const docType = (receiptType: number) => {
  return receiptType === 1 ? 'Alacak' : 'Borç'
}

const { _receipt: receipt } = storeToRefs(receiptStore)
</script>

<style scoped></style>
