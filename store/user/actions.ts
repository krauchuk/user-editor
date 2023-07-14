import { createAsyncThunk } from '@reduxjs/toolkit'

import { User } from '@/types'
import { fetcher } from '@/utils'

export const fetchUser = createAsyncThunk('user/fetch', async (id: number) => {
  return fetcher(`/users/${id}`)
})

export const createUser = createAsyncThunk('user/create', async (data: Omit<User, 'id'>) => {
  return fetcher(`/users`, { method: 'post', data })
})

export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, data }: { id: number; data: Omit<User, 'id'> }) => {
    return fetcher(`/users/${id}`, { method: 'put', data })
  },
)

export const deleteUser = createAsyncThunk('user/delete', async (id: number) => {
  return fetcher(`/users/${id}`, { method: 'delete' })
})
