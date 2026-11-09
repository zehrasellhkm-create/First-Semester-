<script setup>
import TicketTable from '../components/TicketTable.vue'
import { items } from '../ticketsStore.js'
</script>

<template>
  <main>
    <h1>Заявки на допуск в лабораторию</h1>
    <TicketTable :items="items" />
  </main>
</template>
