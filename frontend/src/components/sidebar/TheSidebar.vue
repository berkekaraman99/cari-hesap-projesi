<template>
  <div
    class="offcanvas offcanvas-start border bg-body-tertiary"
    tabindex="-1"
    id="offcanvasSidebar"
    aria-labelledby="offcanvasSidebarLabel"
  >
    <div class="offcanvas-header">
        <div class="fs-2 brand ps-3" id="offcanvasSidebarLabel">Cari Takip</div>
        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
   
    </div>
    <div class="offcanvas-body">
      <RouterLink :to="{ name: 'home' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-house"></i> Ana Sayfa</p>
      </RouterLink>
      <RouterLink :to="{ name: 'user-profile' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-address-card"></i> Firma Profili</p>
      </RouterLink>
      <RouterLink :to="{ name: 'customers' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-address-book"></i> Tanımlı Müşteriler</p>
      </RouterLink>
      <RouterLink :to="{ name: 'create-customer' }">
        <p class="sidebar-item" data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasSidebar"><i class="fa-solid fa-user-plus"></i> Müşteri Oluştur</p>
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
        <div class="sidebar-item-dropdown p-2">
          <RouterLink :to="{ name: 'receipts'}">
            <p class="sidebar-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSidebar">
              <i class="fa-solid fa-receipt"></i> Tüm Dekontlar
            </p>
          </RouterLink>
          <RouterLink :to="{ name: 'create-receipt' }">
            <p class="sidebar-item" data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar">
            <i class="fa-solid fa-file-circle-plus"></i> Dekont Oluştur</p>
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

.sidebar-item {
  padding: 0.5rem 0.75rem;
  margin: 0.2rem 0;
  border-radius: 0.5rem;
  transition: 0.3s ease;
  background-color: transparent;
  cursor: pointer;

    &:hover {
      background-color: var(--primary-color-h);
      border-color: var(--secondary-color-h);
      color: var(--textcolor-light);
    }
}

.sidebar-item-dropdown {
  background-color: var(--secondary-color);
  border-radius: 0.5rem;
  border: 1px solid ;
  overflow: hidden;

  @media (prefers-color-scheme: dark) {
      border-color: rgb(35, 35, 35);
    }
    @media (prefers-color-scheme: light) {
      border-color: rgb(230, 230, 230);
    }
}
p i {
  margin-right: 0.5rem;
}
</style>
