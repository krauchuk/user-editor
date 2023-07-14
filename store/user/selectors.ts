import { createSelector } from '@reduxjs/toolkit'

import { RootState } from '../index'

export const selectUser = (state: RootState) => state.user

export const selectUserError = createSelector(selectUser, user => user.error)
