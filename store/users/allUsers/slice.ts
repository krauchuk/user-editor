import { createSlice } from '@reduxjs/toolkit'

import { fetchAllUsers } from './actions'
import { User } from '@/types'

type State = {
  data: User[]
  loading: boolean
}

const initialState: State = {
  data: [],
  loading: false,
}

const { reducer } = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.data = payload
        state.loading = false
      })
      .addCase(fetchAllUsers.rejected, state => {
        state.loading = false
      })
  },
})

export default reducer
