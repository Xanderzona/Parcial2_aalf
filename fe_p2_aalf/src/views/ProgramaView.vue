<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import ProgramaList from '../components/programas/ProgramaList.vue'
import ProgramaSave from '../components/programas/ProgramaSave.vue';

const mostrarDialog = ref<boolean>(false);
const ProgramaListRef = ref<typeof ProgramaList | null >(null);
const programaEdit = ref<any>(null);

function handleCreate() {
  programaEdit.value=null;
  mostrarDialog.value=true;
}

function handleEdit(programa: any) {
  programaEdit.value=programa;
  mostrarDialog.value=true;
}

function handleCloseDialog() {
  mostrarDialog.value=false;
}

function handleGuardar() {
  ProgramaListRef.value?.obtenerLista();
}

</script>

<template>
  <div class="programa-view">
    <h1>Programas</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <ProgramaList ref="ProgramaListRef" @edit="handleEdit"  />
    <ProgramaSave 
    :mostrar="mostrarDialog"
    :programa="programaEdit"
    :modoEdicion="!!programaEdit"
    @guardar="handleGuardar"
    @close="handleCloseDialog"
    />
  </div>
</template>

<style scoped>
.programa-view {
  max-width: 1600px;
  width: 100%;
}
</style>
