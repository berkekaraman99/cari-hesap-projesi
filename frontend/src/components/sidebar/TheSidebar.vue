<template>
  <div
    class="offcanvas offcanvas-start border"
    tabindex="-1"
    id="offcanvasSidebar"
    aria-labelledby="offcanvasSidebarLabel"
  >
    <div class="offcanvas-header">
      <div class="d-flex align-items-center">
        <button
          class="btn me-1"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"
          aria-controls="offcanvasSidebar"
        >
          <i class="fa-solid fa-bars fa-lg"></i>
        </button>
        <div class="fw-bold fs-4" id="offcanvasSidebarLabel">Cari Takip</div>
      </div>
    </div>
    <div class="offcanvas-body">
      <RouterLink :to="{ name: 'home' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-house"></i> Ana Sayfa</p>
      </RouterLink>
      <RouterLink :to="{ name: 'customers' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-address-book"></i> Tanımlı Müşteriler</p>
      </RouterLink>
      <RouterLink :to="{ name: 'create-customer' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-user-plus"></i> Müşteri Hesabı Oluştur</p>
      </RouterLink>
      <p class="gap-1">
        <div
          class="sidebar-item"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseReceipts"
          aria-expanded="false"
          aria-controls="collapseReceipts"
        >
        <i class="fa-solid fa-folder-open"></i> Dekontlar
      </div>
      </p>
      <div class="collapse" id="collapseReceipts">
        <div class="card p-2">
          <RouterLink :to="{ name: 'receivable-receipt' }">
          <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-file-circle-plus"></i> Alacak Dekontu Oluştur</p>
        </RouterLink>
        <RouterLink :to="{ name: 'debt-receipt' }">
          <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-file-circle-minus"></i> Borç Dekontu Oluştur</p>
        </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.offcanvas {
  width: 320px;
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}

a {
  text-decoration: none;
  color: black;
}

a.router-link-active,
a.router-link-exact-active {
  font-weight: bold;
}

.sidebar-item {
  padding: 0.25rem 0.5rem;
  margin: 0.2rem 0;
  border: 1px solid white;
  transition: 0.3s ease;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
    border-color: grey;
  }
}
</style>
