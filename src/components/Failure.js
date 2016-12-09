import React, { Component, PropTypes } from 'react';

const styles = {
  main: {
    backgroundColor: "#000000",
  },
  tips: {
    textAlign: 'center',
    color: "#fff",
    fontSize: "14px"
  }
};

class Failure extends Component {
  static propTypes = {
    tips: PropTypes.string.isRequired,
  }

  render() {
    const { tips } = this.props;
    return (
      <div style={styles.main}>
        <span style={styles.tips}>{tips}</span>
      </div>
    );
  }
}

export default Failure;
