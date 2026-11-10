import { mockGetAll, mockCreate } from './mockTickets.js'

// true: ответы даёт mockTickets.js; false: настоящий fetch на порт 5000
const USE_MOCK = true

const baseUrl = import.meta.env.VITE_API_BASE_URL
const path = '/api/access-requests'

// Ошибка, когда сервер ответил, но с кодом не 2xx (400, 500 и т. д.)
export class ApiError extends Error {
  constructor(status, data) {
    super(`HTTP ${status}`)
    this.status = status
    this.data = data
  }
}

async function request(method, body) {
  if (USE_MOCK) {
    const result = method === 'GET' ? await mockGetAll() : await mockCreate(body)
    if (!result.ok) throw new ApiError(result.status, result.data)
    return result.data
  }

  const options = { method }
  if (body) {
    options.headers = { 'Content-Type': 'application/json' }
    options.body = JSON.stringify(body)
  }

  // Если ответа нет (сервер не запущен, сеть недоступна), fetch выбросит ошибку сам
  const response = await fetch(baseUrl + path, options)
  const data = await response.json().catch(() => null)

  // 400 и 500 не попадают в catch: проверяем response.ok
  if (!response.ok) throw new ApiError(response.status, data)
  return data
}

export function getTickets() {
  return request('GET')
}

export function createTicket(body) {
  return request('POST', body)
}

// Разные тексты для разных отказов
export function describeError(err) {
  if (err instanceof ApiError) {
    if (err.status === 400) return 'Проверьте поля'
    if (err.status >= 500) return 'Сервер не смог обработать запрос'
    return `Запрос отклонён (код ${err.status})`
  }
  return 'Нет связи с сервером'
}
