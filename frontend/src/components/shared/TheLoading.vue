<template>
  <div>
    <div class="loading-backdrop"></div>
    <div class="loading-spinner">
      <div class="lds-dual-ring"></div>
      <!-- <div class="fw-bold">Yükleniyor...</div> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loading-backdrop {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 9;
  background-color: rgba(0, 0, 0, 0.6);
}
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: var(--primary-color) transparent var(--primary-color) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
