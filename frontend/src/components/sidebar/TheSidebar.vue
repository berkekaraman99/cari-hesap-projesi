<template>
  <div
    class="offcanvas offcanvas-start"
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
      <p class="d-inline-flex gap-1">
        <button
          class="btn btn-primary"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          Button with data-bs-target
        </button>
      </p>
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          Some placeholder content for the collapse component. This panel is hidden by default but
          revealed when the user activates the relevant trigger.
        </div>
      </div>
      <RouterLink :to="{ name: 'home' }">
        <p class="sidebar-item">Ana Sayfa</p>
      </RouterLink>
      <RouterLink :to="{ name: 'receivable-receipt' }">
        <p class="sidebar-item">Alacak Dekontu Oluştur</p>
      </RouterLink>

      <RouterLink :to="{ name: 'debt-receipt' }">
        <p class="sidebar-item">Borç Dekontu Oluştur</p>
      </RouterLink>
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
