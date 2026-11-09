<template>
  <main>
    <h1>Вход в систему</h1>
    <form @submit.prevent>
      <label for="login">Логин</label>
      <input id="login" name="login" autocomplete="username" />

      <label for="password">Пароль</label>
      <input id="password" name="password" type="password" autocomplete="current-password" />

      <button type="submit">Войти</button>
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

input {
  padding: 6px;
}
</style>
