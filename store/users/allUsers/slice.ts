import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchAllUsers } from './actions'
import { User, SortOrder } from '@/types'
import { sortData } from '@/utils'

export type Sort = {
  field: keyof User
  order: SortOrder
}

type State = {
  data: User[]
  sort: Sort
  error: string | null
  loading: boolean
}

const initialState: State = {
  data: [],
  sort: {
    field: 'id',
    order: 'asc',
  },
  error: null,
  loading: false,
}

const { reducer, actions } = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    sortUsers: (state, { payload }: PayloadAction<{ field: keyof User; order?: SortOrder }>) => {
      let newOrderValue: SortOrder = state.sort.order === 'asc' ? 'desc' : 'asc'

      if (state.sort.field !== payload.field) {
        newOrderValue = 'asc'
      }

      state.sort.field = payload.field
      state.sort.order = payload.order || newOrderValue
      state.data = sortData({ array: state.data, field: payload.field, order: payload.order || newOrderValue })
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllUsers.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllUsers.fulfilled, (state, { payload }) => {
        state.data = sortData({ array: payload, field: state.sort.field, order: state.sort.order })
        state.loading = false
      })
      .addCase(fetchAllUsers.rejected, (state, { error }) => {
        state.loading = false
        state.error = error.message || 'Something went wrong'
      })
  },
})

export default reducer
export const { sortUsers } = actions
