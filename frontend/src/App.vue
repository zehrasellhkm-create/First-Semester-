<script setup>
import { ref } from 'vue'

// Какой экран показан: 'list' | 'new' | 'login'
const screen = ref('list')

// Тестовые данные. Поля как в ЛР2: id, number, title, laboratoryId, status
const items = ref([
  {
    id: 1,
    number: 'ДОП-101',
    title: 'Допуск к стенду по микроконтроллерам',
    laboratoryId: 2,
    status: 'New'
  },
  {
    id: 2,
    number: 'ДОП-102',
    title: 'Допуск для выполнения лабораторной работы',
    laboratoryId: 1,
    status: 'InProgress'
  }
])

// Код статуса -> подпись на экране (как в таблице соответствия ЛР1)
const statusLabels = {
  New: 'Новая',
  InProgress: 'В работе',
  Closed: 'Допуск выдан',
  Cancelled: 'Отменена'
}
</script>

<template>
  <div class="app">
    <header>
      <button type="button" @click="screen = 'list'">Список</button>
      <button type="button" @click="screen = 'new'">Создать</button>
      <button type="button" @click="screen = 'login'">Вход</button>
    </header>

    <!-- Экран 1: список заявок -->
    <main v-if="screen === 'list'">
      <h1>Заявки на допуск в лабораторию</h1>
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
    </main>

    <!-- Экран 2: создание заявки -->
    <main v-else-if="screen === 'new'">
      <h1>Новая заявка на допуск</h1>
      <form @submit.prevent>
        <label for="title">Цель допуска, 5–80 символов</label>
        <input id="title" name="title" autofocus />

        <label for="laboratoryId">Номер лаборатории</label>
        <input id="laboratoryId" name="laboratoryId" type="number" />

        <label for="description">Описание, 10–500 символов</label>
        <textarea id="description" name="description"></textarea>

        <button type="submit">Создать</button>
      </form>
    </main>

    <!-- Экран 3: вход (заглушка, без проверки) -->
    <main v-else>
      <h1>Вход в систему</h1>
      <form @submit.prevent>
        <label for="login">Логин</label>
        <input id="login" name="login" autocomplete="username" />

        <label for="password">Пароль</label>
        <input id="password" name="password" type="password" autocomplete="current-password" />

        <button type="submit">Войти</button>
      </form>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 720px;
  margin: 0 auto;
  padding: 16px;
  font-family: system-ui, sans-serif;
}

header {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 420px;
}

form button {
  margin-top: 12px;
  align-self: flex-start;
}

input,
textarea {
  padding: 6px;
}

textarea {
  min-height: 100px;
}

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