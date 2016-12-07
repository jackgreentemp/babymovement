import React, { Component, PropTypes } from 'react';
import '../App.css';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #74befe',
    paddingLeft: '5px',
    paddingRight: '5px'
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#74befe",
  },
  date: {
    fontSize: "18px",
  },
  labelContainer: {
    fontSize: "18px",
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '10px',
    paddingBottom: '10px'
  },
  label: {
    fontSize: "18px"
  }
};

class Day extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
  }

  render() {
    const { width } = this.props;
    styles.main.width = width+"px";
    return (
      <div style={styles.main}>
        <span style={styles.title}>Day 0</span>
        <span style={styles.date}>2016-09-11</span>
        <div style={styles.labelContainer}>
          <span style={styles.label}>23/8</span>
          <span style={styles.label}>23/8</span>
          <span style={styles.label}>23/8</span>
        </div>
      </div>
    );
  }
}

export default Day;
