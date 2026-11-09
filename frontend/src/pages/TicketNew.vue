<template>
  <main>
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
</template>

<style scoped>
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
</style>
