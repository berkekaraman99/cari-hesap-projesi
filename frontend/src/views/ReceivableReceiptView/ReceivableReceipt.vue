<template>
  <div>
    <h1>Alacak Dekontu</h1>
    <div class="card card-body table-responsive">
      <table class="table table-borderless table-hover">
        <tr>
          <th>Cari Kod</th>
          <td>
            <div>
              <input
                type="text"
                name="carikod"
                id="carikod"
                class="form-control"
                v-model="cari_kod"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>Firma Adı</th>
          <td>
            <div>
              <input type="text" name="firma" id="firma" class="form-control" v-model="firma_adi" />
            </div>
          </td>
        </tr>
        <tr>
          <th>Tarih</th>
          <td>
            <div>
              <input type="date" name="tarih" id="tarih" class="form-control" v-model="date" />
            </div>
          </td>
        </tr>
        <tr>
          <th>Evrak No</th>
          <td>
            <div>
              <input
                type="text"
                name="evrakno"
                id="evrakno"
                class="form-control"
                v-model="evrak_no"
              />
            </div>
          </td>
        </tr>
        <tr>
          <th>Tutar</th>
          <td>
            <div>
              <input type="number" name="tutar" id="tutar" class="form-control" v-model="tutar" />
            </div>
          </td>
        </tr>
        <tr>
          <th>Açıklama</th>
          <td>
            <div>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="3"
                class="form-control"
                v-model="description"
              ></textarea>
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
import { ref } from 'vue'

const cari_kod = ref('')
const firma_adi = ref('')
const date = new Date().toISOString().slice(0, 10)
const evrak_no = ref('')
const tutar = ref<number | undefined>(undefined)
const description = ref('')
</script>

<style scoped>
textarea {
  resize: vertical;
}
</style>
