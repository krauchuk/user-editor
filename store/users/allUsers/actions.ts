import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetcher } from '@/utils'

export const fetchAllUsers = createAsyncThunk('allUsers/fetch', async () => {
  return fetcher('/users')
})
