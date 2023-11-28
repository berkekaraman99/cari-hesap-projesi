<template>
  <div>
    <h1>Müşteri Bilgileri</h1>
    <div class="card card-body table-responsive">
      <table class="table table-borderless">
        <tr>
          <th>Cari Kodu</th>
          <td>
            <div>
              <input type="text" name="carikod" id="cari-kod" class="form-control" />
            </div>
          </td>
        </tr>
        <tr>
          <th>Firma Adı</th>
          <td>
            <div>
              <input
                type="text"
                name="firma-adi"
                id="firma-adi"
                class="form-control"
                v-model="customerForm.customerName"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>Vergi Dairesi</th>
          <td>
            <div>
              <input
                type="text"
                name="vergi-dairesi"
                id="vergi-dairesi"
                class="form-control"
                v-model="customerForm.taxAdministiration"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>Vergi No</th>
          <td>
            <div>
              <input
                type="text"
                name="vergino"
                id="vergino"
                class="form-control"
                v-model="customerForm.taxNumber"
              />
            </div>
          </td>
        </tr>
      </table>
      <div class="d-flex align-items-center justify-content-end">
        <button class="btn btn-primary mx-1">Kaydet</button>
        <button class="btn btn-secondary mx-1">Temizle</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const customerForm = reactive({
  customerName: '',
  taxAdministiration: '',
  taxNumber: ''
})
</script>

<style scoped></style>
