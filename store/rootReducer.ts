import { combineReducers } from 'redux'

import allUsers from './users/allUsers/slice'
import selectedUser from './users/selectedUser/slice'

export default combineReducers({
  allUsers,
  selectedUser,
})
