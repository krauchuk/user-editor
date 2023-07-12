import { createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit'

import { fetchUser, updateUser, createUser } from './actions'
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

    builder.addMatcher(
      isPending(fetchUser, createUser, updateUser) ||
        isRejected(fetchUser, createUser, updateUser) ||
        isFulfilled(fetchUser, createUser, updateUser),
      state => {
        state.loading = true
      },
    )
  },
})

export default reducer
