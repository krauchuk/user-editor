import { SortOrder } from '@/types'

export const isEmailValid = (email: string): boolean => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)

export const fetcher = (url: string, options?: { method?: 'get' | 'post' | 'delete' | 'put'; data?: any }) =>
  fetch(process.env.API_URL + url, {
    method: options?.method || 'get',
    headers: {
      'Content-Type': 'application/json',
    },
    body: options?.data ? JSON.stringify(options.data) : null,
  }).then(res => res.json())

export const sortData = <T>({ array, field, order }: { array: T[]; field: keyof T; order: SortOrder }): T[] =>
  array.sort((a, b) => {
    const first = a[field]
    const second = b[field]
    const firstVal = typeof first === 'string' ? first.toLowerCase() : first
    const secondVal = typeof second === 'string' ? second.toLowerCase() : second

    if (firstVal < secondVal) return order === 'asc' ? -1 : 1
    if (firstVal > secondVal) return order === 'asc' ? 1 : -1

    return 0
  })
