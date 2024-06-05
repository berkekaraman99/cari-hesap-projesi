<template>
  <div class="backdrop" tabindex="-1">
    <div class="card">
      <div>
        <div class="card-header d-flex justify-content-between align-items-center py-3">
          <h1 class="card-title fs-4">QR Kodu</h1>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeDialog()"
          ></button>
        </div>
        <div class="card-body">
          <div id="qr"></div>
        </div>
        <div class="card-footer text-end">
          <button type="button" class="btn btn-secondary" @click="closeDialog()">Kapat</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close-dialog'])
const closeDialog = () => {
  emit('close-dialog')
}
</script>
<style scoped lang="scss">
.card-body {
  min-width: 480px;
  max-width: 640px;
  min-height: 400px;
  max-height: 75vh;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
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

#qr {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  width: 400px;
}

.qr-image {
  height: 400px;
  width: 400px;
}

p span {
  font-weight: 500;
}
</style>
