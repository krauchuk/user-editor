import { createSlice } from '@reduxjs/toolkit'

import { getUsers } from './actions'
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
      .addCase(getUsers.pending, state => {
        state.loading = true
      })
      .addCase(getUsers.fulfilled, (state, { payload }) => {
        state.data = payload
        state.loading = false
      })
      .addCase(getUsers.rejected, state => {
        state.loading = false
      })
  },
})

export default reducer
