<script setup>
import { ref, onMounted } from 'vue'
import TicketTable from '../components/TicketTable.vue'
import { items, loadItems } from '../ticketsStore.js'
import { describeError } from '../api/tickets.js'

// Одно состояние: 'loading' | 'empty' | 'data' | 'error'
const screen = ref('loading')
const errorText = ref('')

async function load() {
  screen.value = 'loading'
  errorText.value = ''
  try {
    await loadItems()
    screen.value = items.value.length === 0 ? 'empty' : 'data'
  } catch (err) {
    errorText.value = describeError(err)
    screen.value = 'error'
  }
}

onMounted(load)
</script>

<template>
  <main>
    <h1>Заявки на допуск в лабораторию</h1>

    <p v-if="screen === 'loading'">Загрузка…</p>
    <p v-else-if="screen === 'empty'">Записей пока нет</p>
    <div v-else-if="screen === 'error'">
      <p class="error" role="alert">{{ errorText }}</p>
      <button type="button" @click="load">Повторить</button>
    </div>
    <TicketTable v-else :items="items" />
  </main>
</template>

<style scoped>
.error {
  color: #b00020;
}
</style>
