<template>
  <div class="backdrop" tabindex="-1">
    <div class="card">
      <div>
        <div class="card-header d-flex justify-content-between align-items-center py-3">
          <h1 class="card-title fs-4">Dekont</h1>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeDialog()"
          ></button>
        </div>
        <div class="card-body">
          <!-- <iframe :src="receipt" type="application/pdf" width="100%" height="600px"></iframe> -->
          <div id="receipt">
            <p class="text-center fw-bold fs-2">E-Dekont</p>
            <div>
              <div class="border-top border-3 border-bottom p-2 mb-2">
                <!-- <p>{{ receipt }}</p> -->
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <p>{{ receipt.company_name }}</p>
                    <p>
                      <span>Vergi Dairesi:</span>
                      {{ receipt.user_tax_a + ' - ' + receipt.user_tax_ac }}
                    </p>
                    <p><span>VKN: </span> {{ receipt.user_tax }}</p>
                    <p><span>Adres:</span> {{ receipt.user_address }}</p>
                  </div>
                  <div id="qr" class="float-end"></div>
                </div>
              </div>

              <div class="border-top border-3 border-bottom p-2 mb-2">
                <p>{{ receipt.customer_name }}</p>
                <p>
                  <span>Vergi Dairesi:</span>
                  {{ receipt.customer_tax_a + ' - ' + receipt.customer_tax_ac }}
                </p>
                <p><span>VKN/TCNO: </span> {{ receipt.customer_tax }}</p>
                <p><span>Dekont No:</span> {{ receipt.document_no }}</p>
                <p><span>Adres:</span> {{ receipt.customer_address }}</p>
              </div>

              <div class="p-2">
                <p><span>Dekont Tarihi: </span> {{ receipt.created_date }}</p>
                <p><span>Dekont Türü: </span> {{ docType(receipt.receipt_type) }}</p>
                <p><span>Ödeme Yöntemi:</span> {{ paymentType(receipt.payment_method) }}</p>
              </div>

              <p class="border border-3 p-2">{{ receipt.description }}</p>

              <p class="text-end"><span>Yekün: </span> {{ receipt.price }} TL</p>
            </div>
          </div>
        </div>
        <div class="card-footer text-end">
          <button type="button" class="btn btn-secondary" @click="closeDialog()">Kapat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReceiptStore } from '@/stores/receipt'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['close-dialog'])
const closeDialog = () => {
  emit('close-dialog')
}

const receiptStore = useReceiptStore()
const { _receipt: receipt } = storeToRefs(receiptStore)

const docType = (receiptType: number) => {
  return receiptType === 1 ? 'Alacak' : 'Borç'
}

const paymentType = (payment: string) => {
  if (payment === 'Cash') {
    return 'Nakit'
  } else if (payment === 'Credit Card') {
    return 'Kredi Kartı'
  } else {
    return 'Havale'
  }
}

onMounted(() => {
  receiptStore.getReceiptById(props.id)
})
</script>

<style scoped>
.card-body {
  min-width: 480px;
  max-width: 640px;
  min-height: 400px;
  max-height: 75vh;
  overflow-y: auto;
}

#receipt {
  border: 1px solid white;
  border-radius: 0.5rem;
  background-color: white;
  width: 100%;
  aspect-ratio: 210 / 297;
  padding: 1rem;
  color: black;
}

.backdrop {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
}

p span {
  font-weight: 500;
}
</style>
