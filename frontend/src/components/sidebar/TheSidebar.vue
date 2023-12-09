<template>
  <div
    class="offcanvas offcanvas-start border"
    tabindex="-1"
    id="offcanvasSidebar"
    aria-labelledby="offcanvasSidebarLabel"
  >
    <div class="offcanvas-header">
        <div class="fw-bold fs-4 brand" id="offcanvasSidebarLabel">CARİ TAKİP</div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
   
    </div>
    <div class="offcanvas-body">
      <RouterLink :to="{ name: 'home' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-house fa-lg"></i> Ana Sayfa</p>
      </RouterLink>
      <RouterLink :to="{ name: 'user-profile' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-address-card fa-lg"></i> Firma Profili</p>
      </RouterLink>
      <RouterLink :to="{ name: 'customers' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-address-book fa-lg"></i> Tanımlı Müşteriler</p>
      </RouterLink>
      <RouterLink :to="{ name: 'create-customer' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-user-plus fa-lg"></i> Müşteri Hesabı Oluştur</p>
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
        <i class="fa-solid fa-folder-open fa-lg"></i> Dekontlar
      </div>
      </p>
      <div class="collapse" id="collapseReceipts">
        <div class="sidebar-item-dropdown p-2">
          <RouterLink :to="{ name: 'receipts'}">
            <p class="sidebar-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">
              <i class="fa-solid fa-receipt fa-lg"></i> Tüm Dekontlar
            </p>
          </RouterLink>
          <RouterLink :to="{ name: 'receivable-receipt' }">
            <p class="sidebar-item" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar">
            <i class="fa-solid fa-file-circle-plus fa-lg"></i> Alacak Dekontu Oluştur</p>
          </RouterLink>
          <RouterLink :to="{ name: 'debt-receipt' }">
            <p class="sidebar-item" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-file-circle-minus fa-lg"></i> Borç Dekontu Oluştur</p>
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
  transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  // background-color: rgba($color: #ffffff, $alpha: 0.9)
}

a {
  text-decoration: none;
  color: black;
}

.sidebar-item {
  padding: 0.25rem 0.5rem;
  margin: 0.2rem 0;
  // border: 1px solid white;
  border-radius: 0.5rem;
  transition: 0.3s ease;
  // background-color: white;
  cursor: pointer;
  &:hover {
    background-color: whitesmoke;
    border-color: grey;
  }
}

.sidebar-item-dropdown {
  background-color: var(--secondary-color);
  border-radius: 0.5rem;
  border:  1px solid rgb(200, 200, 200);
  overflow: hidden;
}

.brand {
  padding-left: 0.5rem;
  cursor: pointer;
  background: linear-gradient(to right, #30cfd0 0%, #330867 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

p i {
  margin-right: 0.5rem;
}
</style>
