import React, { Component, PropTypes } from 'react';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #74befe'
  },
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

class First extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
  }

  render() {
    const { width } = this.props;
    styles.main.width = width+"px";
    return (
      <div style={styles.main}>
        <div style={styles.title}>
          <span style={styles.week}>孕周</span>
          <span style={styles.weekLabelEn}>week</span>
        </div>
          <div style={styles.numContainer}>
            <span style={styles.num}>23</span>
          </div>
      </div>
    );
  }
}

export default First;
