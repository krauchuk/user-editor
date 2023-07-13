import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchAllUsers } from './actions'
import { User, SortOrder } from '@/types'
import { sortData } from '@/utils'

type State = {
  data: User[]
  sort: {
    field: keyof User
    order: SortOrder
  }
  loading: boolean
}

const initialState: State = {
  data: [],
  sort: {
    field: 'id',
    order: 'asc',
  },
  loading: false,
}

const { reducer, actions } = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    sortUsers: (state, { payload }: PayloadAction<{ field: keyof User; order: SortOrder }>) => {
      state.sort.field = payload.field
      state.sort.order = payload.order
      state.data = sortData({ array: state.data, field: payload.field, order: payload.order })
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.loading = true
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.data = sortData({ array: payload, field: state.sort.field, order: state.sort.order })
        state.loading = false
      })
      .addCase(fetchAllUsers.rejected, state => {
        state.loading = false
      })
  },
})

export default reducer
export const { sortUsers } = actions
