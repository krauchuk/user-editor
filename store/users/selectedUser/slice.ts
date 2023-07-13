import { createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit'

import { fetchUser, updateUser, createUser, deleteUser } from './actions'
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
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.data = payload
      state.loading = false
    })

    builder
      .addMatcher(isPending(fetchUser, createUser, updateUser, deleteUser), state => {
        state.loading = true
      })
      .addMatcher(
        isRejected(fetchUser, createUser, updateUser, deleteUser) ||
          isFulfilled(fetchUser, createUser, updateUser, deleteUser),
        state => {
          state.loading = false
        },
      )
  },
})

export default reducer
