import React, { Component } from 'react'
import moment from 'moment'
import _ from 'underscore'

import '../views/History.css'

import First from '../components/First'
import Day from '../components/Day'
import Failure from '../components/Failure'

import Loading from 'react-loading'

import { connect } from 'react-redux'
import { fetchMovementsIfNeeded } from '../actions'

const windowHeight = window.innerHeight
const windowWidth = window.innerWidth

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    boxSizing: 'border-box'
  },
  loading: {
    height: windowHeight+'px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  failure: {
    position: 'fixed',
    width: windowWidth+'px',
    textAlign: 'center',
    bottom: 0
  },
  displayNone: {
    display: 'none'
  },
  tips: {
    paddingTop: "10px",
    paddingBottom: "10px",
    textAlign: 'center',
    fontSize: "12px",
    color: "#999999"
  }
};

// const gridWidth = window.innerWidth/3

class History extends Component {

  componentWillMount() {
    // console.log(this.props)
    // console.log(this.state)
    const { dispatch, routing } = this.props
    // console.log(routing.locationBeforeTransitions.query)
    const routeQuery = routing.locationBeforeTransitions.query//获取url中的参数
    dispatch(fetchMovementsIfNeeded(routeQuery))
  }

  initDataArray(pregnancyDateString, items){

    let results = []
    let pregnancyWeeks = moment().diff(moment(pregnancyDateString), 'weeks');

    for(let i=pregnancyWeeks;i>=0;i--){
      results.push({
        type: 1,
        weeknum: i,
      });
      for(let j=0;j<7;j++){
        let itemTemp = _.find(items, function(item){
          return i*7+j === item.index
        })
        // console.log(i*7+j)
        // console.log(itemTemp)
        if(itemTemp){
          results.push({
            type:2,
            daynum:""+j,
            date: moment(pregnancyDateString).add(i*7+j, 'd').format("YYYY-MM-DD"),
            value: itemTemp.value
          })
        } else {
          results.push({
            type:2,
            daynum:"",
            date: "",
            value: []
          })
        }
      }
    }
    // console.log(results)
    return results
  }

  render() {
    // console.log(this.props);
    const { gridWidth } = {gridWidth: window.innerWidth/4}
    const { routing, isFetching, fetchfailure, items } = this.props

    let dataArray = [];

    if(items.length)
      dataArray = this.initDataArray(routing.locationBeforeTransitions.query.pregnancyDate, items)

    return (
      <div>
        <div style={fetchfailure?styles.failure:styles.displayNone}>
          <Failure tips="获取数据失败"/>
        </div>
        <div style={styles.tips}><span>下图显示胎动数据:实际点击/有效胎动</span></div>
        {isFetching ? 
          <div style={styles.loading}>
            <Loading type="bubbles" color="#e3e3e3" /> 
          </div>
          :
          <div style={styles.main}>
            {
              dataArray.map(function(data){
                if(data.type === 1)
                  return <First width={gridWidth} weeknum={data.weeknum}></First>
                if(data.type === 2)
                  return <Day width={gridWidth} daynum={data.daynum} date={data.date} value={data.value}></Day>
              })
            }
          </div>
        }
      </div>  
    );
  }
}

const mapStateToProps = state => {
  const { routing, movements } = state
  const { isFetching, items, fetchfailure } = movements

  return {
    isFetching,
    fetchfailure,
    items,
    routing
  }
}

export default connect(mapStateToProps)(History)
