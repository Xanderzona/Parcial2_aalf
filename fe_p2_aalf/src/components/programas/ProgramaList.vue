<script setup lang="ts">
import type { Programa } from '../../models/programa'
import http from '../../plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'programas'
let programas = ref<Programa[]>([])

const emit = defineEmits(['edit'])
const programaDelete = ref<Programa | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  programas.value = await http.get(ENDPOINT).then((response) => response.data)
}

function emitirEdicion(programa: Programa) {
  emit('edit', programa)
}

function mostrarEliminarConfirm(programa: Programa) {
  programaDelete.value = programa
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${programaDelete.value?.id}`)
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
          <th>Nivel Académico</th>
          <th>Descripción</th>
          <th>Versión</th>
          <th>Duración (meses)</th>
          <th>Costo</th>
          <th>Fecha Inicio</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(programa, index) in programas" :key="programa.id">
          <td>{{ index + 1 }}</td>
          <td>{{ programa.nombre }}</td>
          <td>{{ programa.nivelAcademico?.nombre || 'N/A' }}</td>
          <td>{{ programa.descripcion }}</td>
          <td>{{ programa.version }}</td>
          <td>{{ programa.duracionMeses }}</td>
          <td>{{ programa.costo ? Number(programa.costo).toFixed(2) : '0.00' }} Bs</td>
          <td>{{ typeof programa.fechaInicio === 'string' ? programa.fechaInicio.split('T')[0] : programa.fechaInicio }}</td>
          <td>{{ programa.estado }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(programa)" />
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(programa)" />
          </td>
        </tr>
      </tbody>
    </table>

    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
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
