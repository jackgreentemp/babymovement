import moment from 'moment'

export const REQUEST_MOVEMENTS = 'REQUEST_MOVEMENTS'
export const RECEIVE_MOVEMENTS = 'RECEIVE_MOVEMENTS'
export const FAILURE_MOVEMENTS = 'RECEIVE_MOVEMENTS'
export const INVALIDATE_MOVEMENTS = 'INVALIDATE_MOVEMENTS'

export const requestMovements = () => ({
  type: REQUEST_MOVEMENTS,
})

export const receiveMovements = (json) => ({
  type: RECEIVE_MOVEMENTS,
  movements: json.data,
  receivedAt: Date.now()
})

export const failureMovements = () => ({
  type: FAILURE_MOVEMENTS,
})

const API_ROOT = "http://www.vrapps.cn:18080/pregnancy_yjy/patientTask/queryPatientHisRecordData_byDbOptime.do?"

const fetchMovements = routeQuery => dispatch => {
  const fullurl = API_ROOT + "patientId="+routeQuery.patientId+"&taskname="+routeQuery.taskname+"&db_optime_after="+routeQuery.db_optime_after+"&password="+routeQuery.password+"&userphone="+routeQuery.userphone+"&apptype="+routeQuery.apptype
  const pregnancyDateString = routeQuery.pregnancyDate;
  // console.log(pregnancyDateString);
  // console.log(moment(pregnancyDateString));
  dispatch(requestMovements())
  return fetch(fullurl)
    .then(response => {
      if (!response.ok) {
        dispatch(failureMovements())
      }
      return response.json()
    })
    .then(json => dispatch(receiveMovements(json)))
}

const shouldFetchMovements = (state) => {
  const movements = state.movements
  console.log("movements=", movements)
  if (!movements.items.length) {
    return true
  }
  if (movements.isFetching) {
    return false
  }
  return movements.didInvalidate
}

export const fetchMovementsIfNeeded = routeQuery => (dispatch, getState) => {
  if (shouldFetchMovements(getState())) {
    return dispatch(fetchMovements(routeQuery))
  }
}
