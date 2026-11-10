import { ref } from 'vue'
import { getTickets } from './api/tickets.js'

// Единственный общий массив; данные приходят из API-модуля
export const items = ref([])

export async function loadItems() {
  items.value = await getTickets()
}
