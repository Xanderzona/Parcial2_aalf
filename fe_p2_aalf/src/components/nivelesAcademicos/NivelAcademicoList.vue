<script setup lang="ts">
import type { NivelAcademico } from '../../models/nivelAcademico'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'niveles-academicos'
let nivelesAcademicos = ref<NivelAcademico[]>([])

const emit = defineEmits(['edit'])
const nivelAcademicoDelete = ref<NivelAcademico | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  nivelesAcademicos.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(nivelAcademico: NivelAcademico) {
  emit('edit', nivelAcademico)
}

function mostrarEliminarConfirm(nivelAcademico: NivelAcademico) {
  nivelAcademicoDelete.value = nivelAcademico
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${nivelAcademicoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})

defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nivelAcademico, index) in nivelesAcademicos" :key="nivelAcademico.id">
          <td>{{ index + 1 }}</td>
          <td>{{ nivelAcademico.nombre }}</td>
          <td>{{ nivelAcademico.descripcion || 'Sin descripción' }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(nivelAcademico)" />
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(nivelAcademico)" />
          </td>
        </tr>
      </tbody>
    </table>

    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
      <p>¿Estás seguro de que deseas eliminar este nivel?</p>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.6rem 0.8rem;
  text-align: left;
  vertical-align: middle;
}

thead th {
  font-weight: 600;
}

/* evitar que la columna de acciones rompa el layout */
tbody tr td:last-child {
  white-space: nowrap;
}
</style>
