import React, { Component } from 'react'
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
  title: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: "#74befe",
  },
  week: {
    paddingTop: "10px",
    color: "#fff",
    fontSize: "20px"
  },
  weekLabelEn: {
    color: "#fff",
    fontSize: "14px",
    paddingBottom: "10px",
  },
  numContainer: {
    textAlign: 'center',
  },
  num: {
    color: "#74befe",
    fontWeight: "bold",
    fontSize: "48px"
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

  render() {
    // console.log(this.props);
    const { gridWidth } = {gridWidth: window.innerWidth/3}
    const { isFetching, fetchfailure } = this.props

    return (
      <div>
        <div style={fetchfailure?styles.failure:styles.displayNone}>
          <Failure tips="获取数据失败"/>
        </div>
        {isFetching ? 
          <div style={styles.loading}>
            <Loading type="bubbles" color="#e3e3e3" /> 
          </div>
          :
          <div className="History">
            <First width={gridWidth}></First>
            <Day width={gridWidth}></Day>
            <First width={gridWidth}></First>
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
