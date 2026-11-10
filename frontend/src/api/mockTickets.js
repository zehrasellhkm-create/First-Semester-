// Учебный «сервер»: имитирует ответы API без сети
const FORCE_500 = false // true: все запросы получают 500
const START_EMPTY = false // true: список изначально пустой

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const serverItems = START_EMPTY
  ? []
  : [
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
    ]

let nextId = START_EMPTY ? 1 : 3

export async function mockGetAll() {
  await delay(500)
  if (FORCE_500) {
    return { ok: false, status: 500, data: { error: 'Internal error' } }
  }
  return { ok: true, status: 200, data: serverItems.map((item) => ({ ...item })) }
}

export async function mockCreate(body) {
  await delay(500)
  if (FORCE_500) {
    return { ok: false, status: 500, data: { error: 'Internal error' } }
  }

  const title = String(body.title ?? '').trim()
  const description = String(body.description ?? '').trim()
  const labId = body.laboratoryId

  if (
    title.length < 5 ||
    title.length > 80 ||
    !Number.isInteger(labId) ||
    labId <= 0 ||
    description.length < 10 ||
    description.length > 500
  ) {
    return { ok: false, status: 400, data: { error: 'Поля не прошли проверку' } }
  }

  // id и number выдаёт «сервер», а не клиент
  const id = nextId++
  const created = {
    id,
    number: `ДОП-${100 + id}`,
    title,
    description,
    laboratoryId: labId,
    status: 'New'
  }
  serverItems.push(created)
  return { ok: true, status: 201, data: { ...created } }
}
