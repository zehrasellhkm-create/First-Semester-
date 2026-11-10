<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createTicket, describeError } from '../api/tickets.js'

const router = useRouter()

// true только для проверки ответа 400 (тема abc проходит к «серверу»)
const SKIP_CLIENT_CHECK = false

const form = ref({
  title: '',
  laboratoryId: null,
  description: ''
})

const errors = ref({ title: '', laboratoryId: '', description: '' })
const serverError = ref('')
const isSubmitting = ref(false)

function validate() {
  const title = form.value.title.trim()
  const description = form.value.description.trim()
  const labId = form.value.laboratoryId

  errors.value = { title: '', laboratoryId: '', description: '' }

  if (title.length < 5 || title.length > 80) {
    errors.value.title = 'Цель допуска: от 5 до 80 символов'
  }
  if (!Number.isInteger(labId) || labId <= 0) {
    errors.value.laboratoryId = 'Лаборатория: целое число больше нуля'
  }
  if (description.length < 10 || description.length > 500) {
    errors.value.description = 'Описание: от 10 до 500 символов'
  }

  return !errors.value.title && !errors.value.laboratoryId && !errors.value.description
}

async function onCreate() {
  // Защита от двойной отправки
  if (isSubmitting.value) return

  serverError.value = ''
  if (!SKIP_CLIENT_CHECK && !validate()) return

  isSubmitting.value = true
  try {
    await createTicket({
      title: form.value.title.trim(),
      laboratoryId: form.value.laboratoryId,
      description: form.value.description.trim()
    })
    form.value = { title: '', laboratoryId: null, description: '' }
    router.push('/') // список сам загрузит свежие данные из API
  } catch (err) {
    // Поля остаются заполненными, чтобы человек мог исправить
    serverError.value = describeError(err)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <main>
    <h1>Новая заявка на допуск</h1>
    <form @submit.prevent="onCreate">
      <label for="title">Цель допуска, 5–80 символов</label>
      <input id="title" v-model="form.title" autofocus />
      <p v-if="errors.title" class="error">{{ errors.title }}</p>

      <label for="laboratoryId">Номер лаборатории</label>
      <input id="laboratoryId" type="number" v-model.number="form.laboratoryId" />
      <p v-if="errors.laboratoryId" class="error">{{ errors.laboratoryId }}</p>

      <label for="description">Описание, 10–500 символов</label>
      <textarea id="description" v-model="form.description"></textarea>
      <p v-if="errors.description" class="error">{{ errors.description }}</p>

      <p v-if="serverError" class="error" role="alert">{{ serverError }}</p>

      <button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Создаём…' : 'Создать' }}
      </button>
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

.error {
  color: #b00020;
  margin: 0;
}
</style>
