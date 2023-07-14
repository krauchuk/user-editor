import { combineReducers } from 'redux'

import users from './users/slice'
import user from './user/slice'
import modals from './modals/slice'
import app from './app/slice'

export default combineReducers({
  users,
  user,
  modals,
  app,
})
