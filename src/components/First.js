import React, { Component, PropTypes } from 'react';
import { hsvToRgb } from '../utils/Color';

const styles = {
  main: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '120px',
    border: '1px solid #74befe',
    boxSizing: 'border-box'
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    backgroundColor: "rgb(116, 190, 254)",
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
    weeknum: PropTypes.number.isRequired,
  }

  render() {
    const { width, weeknum } = this.props;
    styles.main.width = width+"px";

    let h = 208;
    let s = Number(weeknum)+60;
    let v = 100;
    let color = hsvToRgb(h/360, s/100, v/100);
    // console.log("color = ", color);

    styles.title.backgroundColor = "rgb(" + Math.round(color[0]) + ", " + Math.round(color[1]) + "," + Math.round(color[2]) +")";
    // console.log("color = ", styles.title.backgroundColor);
    styles.num.color = "rgb(" + Math.round(color[0]) + ", " + Math.round(color[1]) + "," + Math.round(color[2]) +")";

    return (
      <div style={styles.main}>
        <div style={styles.title}>
          <span style={styles.week}>孕周</span>
          <span style={styles.weekLabelEn}>week</span>
        </div>
          <div style={styles.numContainer}>
            <span style={styles.num}>{weeknum}</span>
          </div>
      </div>
    );
  }
}

export default First;
