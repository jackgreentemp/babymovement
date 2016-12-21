import React, { Component, PropTypes } from 'react';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #74befe',
    paddingLeft: '5px',
    paddingRight: '5px',
    minHeight: '120px',
    boxSizing: 'border-box'
  },
  title: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#74befe",
    paddingBottom: '10px'
  },
  date: {
    paddingTop: '10px'
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
    fontSize: "14px",
    color: "#333333"
  },
  commonText: {
    fontSize: "14px",
    color: "#666666",
  }
};

class Day extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    daynum: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    value: PropTypes.array.isRequired
  }

  render() {
    const { width, daynum, date, value } = this.props;
    styles.main.width = width+"px";
    if(width < 90)
      styles.commonText.fontSize = "10px";
    return (
      <div style={styles.main}>
        {daynum?<span style={styles.title}>Day {daynum}</span>:<span></span>}
        <span style={styles.commonText}>{date}</span>
        <div style={styles.labelContainer}>
          {value?value.map(function(data){return <span style={styles.commonText}>{data}</span>}):<span></span>}
        </div>
      </div>
    );
  }
}

export default Day;
