import { createAsyncThunk } from '@reduxjs/toolkit'

import { User } from '@/types'

export const fetchUser = createAsyncThunk('selectedUser/fetch', async (id: number) => {
  return {
    id: 1,
    name: 'test',
    username: 'testTest',
    email: 'test@test.com',
    city: 'test',
  }
})

export const createUser = createAsyncThunk('selectedUser/create', async (data: Omit<User, 'id'>) => {
  return null
})

export const updateUser = createAsyncThunk('selectedUser/update', async (id: number, data: Omit<User, 'id'>) => {
  return {
    id,
    ...data,
  }
})
