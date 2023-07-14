import { createAsyncThunk } from '@reduxjs/toolkit'

import { fetcher } from '@/utils'

export const fetchAllUsers = createAsyncThunk('users/fetch', async () => {
  return fetcher('/users')
})
