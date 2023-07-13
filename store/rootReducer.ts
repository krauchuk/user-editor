import { combineReducers } from 'redux'

import allUsers from './users/allUsers/slice'
import selectedUser from './users/selectedUser/slice'
import modals from './modals/slice'
import app from './app/slice'

export default combineReducers({
  allUsers,
  selectedUser,
  modals,
  app,
})
