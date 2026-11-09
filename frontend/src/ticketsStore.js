import { ref } from 'vue'

export const items = ref([
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
