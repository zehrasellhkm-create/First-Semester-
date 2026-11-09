<script setup>
defineProps({
  items: { type: Array, required: true }
})

const statusLabels = {
  New: 'Новая',
  InProgress: 'В работе',
  Closed: 'Допуск выдан',
  Cancelled: 'Отменена'
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Номер</th>
        <th>Цель допуска</th>
        <th>Лаборатория (laboratoryId)</th>
        <th>Статус</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.number }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.laboratoryId }}</td>
        <td>{{ statusLabels[item.status] }} ({{ item.status }})</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #999;
  padding: 6px 10px;
  text-align: left;
}
</style>
