<template>
  <Transition name="toast">
    <div class="custom-toast" v-if="showToast">
      <div class="card overflow-hidden">
        <div
          class="text-white py-2 px-3"
          :class="{
            'bg-success': statusCode === 200 || statusCode === 201,
            'bg-danger': statusCode !== 200 && statusCode !== 201
          }"
        >
          <div class="d-flex align-items-center justify-content-between">
            <strong>{{ header }}</strong>
          </div>
        </div>
        <div class="toast-content py-2 px-3">
          <div class="fw-medium text-center">{{ content }}</div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const {
  _showToast: showToast,
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
