<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div
      id="liveToast"
      class="toast"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-delay="2000"
    >
      <div
        class="toast-header text-white"
        :class="{
          'bg-success': statusCode === 200 || statusCode === 201,
          'bg-danger': statusCode !== 200 && statusCode !== 201
        }"
      >
        <strong class="me-auto">{{ header }}</strong>
        <small>şimdi</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body">{{ content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const {
  _statusCode: statusCode,
  _toastContent: content,
  _toastHeader: header
} = storeToRefs(toastStore)
</script>

<style scoped>
.custom-toast {
  position: fixed;
  bottom: 0;
  right: 0;
  min-height: 100px;
  width: 300px;
  margin: 1rem;
}

.toast-content {
  min-height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
