import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import {
  REQUEST_MOVEMENTS, RECEIVE_MOVEMENTS, INVALIDATE_MOVEMENTS, FAILURE_MOVEMENTS
} from '../actions'

const movements = (state = {
  isFetching: false,
  didInvalidate: false,
  fetchfailure: false,
  items: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_MOVEMENTS:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_MOVEMENTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_MOVEMENTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.movements,
        lastUpdated: action.receivedAt
      }
    case FAILURE_MOVEMENTS:
      return {
        ...state,
        fetchfailure: true,
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  routing,
  movements
})

export default rootReducer
