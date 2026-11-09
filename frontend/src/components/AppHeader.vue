<template>
  <header>
    <nav>
      <router-link to="/">Список</router-link>
      <router-link to="/new">Создать</router-link>
      <router-link to="/login">Вход</router-link>
    </nav>
  </header>
</template>

<style scoped>
nav {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.router-link-active {
  font-weight: bold;
}
</style>