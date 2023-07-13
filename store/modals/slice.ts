import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Metadata = { [key: string]: any }

type Modal = {
  isVisible: boolean
  metadata: Metadata
}

export type State = {
  deleteModal: Modal
}

const initialState: State = {
  deleteModal: {
    isVisible: false,
    metadata: {},
  },
}

const { reducer, actions } = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeModalVisibility: (
      state,
      { payload }: PayloadAction<{ modal: keyof typeof initialState; isVisible: boolean; metadata: Metadata }>,
    ) => {
      state[payload.modal].metadata = payload.metadata
      state[payload.modal].isVisible = payload.isVisible
    },
  },
})

export default reducer
export const { changeModalVisibility } = actions
