import moment from 'moment'
import _ from 'underscore'

export const REQUEST_MOVEMENTS = 'REQUEST_MOVEMENTS'
export const RECEIVE_MOVEMENTS = 'RECEIVE_MOVEMENTS'
export const FAILURE_MOVEMENTS = 'RECEIVE_MOVEMENTS'
export const INVALIDATE_MOVEMENTS = 'INVALIDATE_MOVEMENTS'

export const requestMovements = () => ({
  type: REQUEST_MOVEMENTS,
})

export const receiveMovements = (json) => ({
  type: RECEIVE_MOVEMENTS,
  movements: json,
  receivedAt: Date.now()
})

export const failureMovements = () => ({
  type: FAILURE_MOVEMENTS,
})

//http://localhost:3000/?patientId=372&taskname=%E8%83%8E%E5%8A%A8&db_optime_after=2014-03-11_12:12:12&password=123456&userphone=13810617185&apptype=android&pregnancyDate=2016-05-01
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
    .then(json => {
      let itemsArray = [];
      let itemObj = {};
      // console.log(JSON.stringify(_.pluck(json.data, 'measureday')))
      _.each(json.data, function(item){
        // console.log(_.find(itemsArray, function(tempData){
        //   return tempData.measureday==item.measureday
        // }))
        let existed = _.find(itemsArray, function(tempData){
          return tempData.measureday==item.measureday
        })

        if(existed==undefined){
          // console.log(JSON.parse(item.moreinfo))
          itemObj = {
            index: moment(item.measureday).diff(moment(pregnancyDateString), 'days'),
            measureday: item.measureday,
            value: [JSON.parse(item.moreinfo).totalnum + "/" + item.taskvalue]
          }
          // console.log(itemObj)
          itemsArray.push(itemObj)
        } else {
          existed.value = [...existed.value, JSON.parse(item.moreinfo).totalnum + "/" + item.taskvalue]
        }
      })
      // console.log(itemsArray)
      dispatch(receiveMovements(itemsArray))
    })
}

const shouldFetchMovements = (state) => {
  const movements = state.movements
  // console.log("movements=", movements)
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
