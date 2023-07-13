import { createSlice, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit'

import { fetchUser, updateUser, createUser, deleteUser } from './actions'
import { User } from '@/types'

type State = {
  data: User | null
  error: string | null
  loading: boolean
}

const initialState: State = {
  data: null,
  error: null,
  loading: false,
}

const { reducer, actions } = createSlice({
  name: 'selectedUser',
  initialState,
  reducers: {
    resetError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.data = payload
    })

    builder
      .addMatcher(isPending(fetchUser, createUser, updateUser, deleteUser), state => {
        state.loading = true
        state.error = null
      })
      .addMatcher(isFulfilled(fetchUser, createUser, updateUser, deleteUser), state => {
        state.loading = false
      })
      .addMatcher(isRejected(fetchUser, createUser, updateUser, deleteUser), (state, { error }) => {
        state.loading = false
        state.error = error.message || 'Something went wrong'
      })
  },
})

export default reducer
export const { resetError } = actions
