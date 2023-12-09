<template>
  <div>
    <h1>Firma Profili</h1>
    <div class="row">
      <div class="col">
        <div class="card card-body">
          <table>
            <tbody>
              <tr>
                <td><b>Kullanıcı Adı:</b></td>
                <td>{{ user.user_name }}</td>
              </tr>
              <tr>
                <td><b>Firma Adı:</b></td>
                <td>{{ user.company_name }}</td>
              </tr>
              <tr>
                <td><b>Vergi Dairesi Şehri:</b></td>
                <td>{{ user.tax_administration_city }}</td>
              </tr>
              <tr>
                <td><b>Vergi Dairesi:</b></td>
                <td>{{ user.tax_administration }}</td>
              </tr>
              <tr>
                <td><b>Vergi No/TC No:</b></td>
                <td>{{ user.tax_number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { _user: user } = storeToRefs(authStore)
</script>

<style scoped>
tr td {
  padding: 0.6rem 0rem;
}
</style>
