import React, { Component } from 'react';
import './History.css';
import First from '../components/First'
import Day from '../components/Day'

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

class History extends Component {

  constructor(props){
    super(props);
    this.state = {
      gridWidth: window.innerWidth/3
    }
  }

  render() {
    // console.log(this.state);
    const { gridWidth } = this.state;
    return (
      <div className="History">
        <First width={gridWidth}></First>
        <Day width={gridWidth}></Day>
        <First width={gridWidth}></First>
      </div>
    );
  }
}

export default History;
