import { createSlice } from '@reduxjs/toolkit'

import { getUser } from './actions'
import { User } from '@/types'

type State = {
  data: User | null
  loading: boolean
}

const initialState: State = {
  data: null,
  loading: false,
}

const { reducer } = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getUser.pending, state => {
        state.loading = true
      })
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.data = payload
        state.loading = false
      })
      .addCase(getUser.rejected, state => {
        state.loading = false
      })
  },
})

export default reducer
