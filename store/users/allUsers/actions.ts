import { createAsyncThunk } from '@reduxjs/toolkit'

export const getUsers = createAsyncThunk('allUsers/fetch', async () => {
  return []
})
