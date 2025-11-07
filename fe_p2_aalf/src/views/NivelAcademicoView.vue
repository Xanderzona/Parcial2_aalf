<script setup lang="ts">
import Button from 'primevue/button'
import { ref } from 'vue'
import NivelAcademicoList from '../components/nivelesAcademicos/NivelAcademicoList.vue'
import NivelAcademicoSave from '../components/nivelesAcademicos/NivelAcademicoSave.vue'

const mostrarDialog = ref<boolean>(false)
const NivelAcademicoListRef = ref<typeof NivelAcademicoList | null>(null)
const nivelAcademicoEdit = ref<any>(null)

function handleCreate() {
  nivelAcademicoEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(nivelAcademico: any) {
  nivelAcademicoEdit.value = nivelAcademico
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  NivelAcademicoListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="nivel-view">
    <h1>Niveles Académicos</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <NivelAcademicoList ref="NivelAcademicoListRef" @edit="handleEdit" />
    <NivelAcademicoSave
      :mostrar="mostrarDialog"
      :nivelAcademico="nivelAcademicoEdit"
      :modoEdicion="!!nivelAcademicoEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped>
.nivel-view {
  max-width: 1100px;
  width: 100%;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
