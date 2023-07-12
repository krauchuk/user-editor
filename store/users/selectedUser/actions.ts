import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUser = createAsyncThunk('selectedUser/fetch', async (id: number) => {
  console.log(id)
  return null
})

export const createUser = createAsyncThunk('selectedUser/create', async () => {
  return null
})

export const editUser = createAsyncThunk('selectedUser/edit', async () => {
  return null
})
