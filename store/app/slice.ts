import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AlertType } from '@/types'

export type State = {
  pageAlert: {
    type: AlertType | null
    text: string | null
  }
}

const initialState: State = {
  pageAlert: {
    type: null,
    text: null,
  },
}

const { reducer, actions } = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPageAlert: (state, { payload }: PayloadAction<{ type: AlertType; text: string }>) => {
      state.pageAlert.type = payload.type
      state.pageAlert.text = payload.text
    },
    resetPageAlert: state => {
      state.pageAlert.text = null
      state.pageAlert.type = null
    },
  },
})

export default reducer
export const { setPageAlert, resetPageAlert } = actions
