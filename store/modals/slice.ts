import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type Metadata = { [key: string]: any }

type Modal = {
  isOpen: boolean
  metadata: Metadata
}

export type State = {
  deleteModal: Modal
}

const initialState: State = {
  deleteModal: {
    isOpen: false,
    metadata: {},
  },
}

const { reducer, actions } = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeModalVisibility: (
      state,
      { payload }: PayloadAction<{ modal: keyof typeof initialState; isOpen: boolean; metadata: Metadata }>,
    ) => {
      state[payload.modal].metadata = payload.metadata
      state[payload.modal].isOpen = payload.isOpen
    },
  },
})

export default reducer
export const { changeModalVisibility } = actions
