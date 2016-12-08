import React, { Component } from 'react';
import '../views/History.css';
import First from '../components/First'
import Day from '../components/Day'

import { connect } from 'react-redux'
import { fetchMovementsIfNeeded } from '../actions'

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
    // console.log(this.state);
    const { gridWidth } = {gridWidth: window.innerWidth/3}

    return (
      <div className="History">
        <First width={gridWidth}></First>
        <Day width={gridWidth}></Day>
        <First width={gridWidth}></First>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { routing } = state

  return {
    routing
  }
}

export default connect(mapStateToProps)(History)
