import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { Router, Route } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'
import { browserHistory } from 'react-router'

import History from '../views/History';
import configureStore from '../store/configureStore'
import DevTools from './DevTools';

import { selectReddit, fetchPostsIfNeeded, invalidateReddit } from '../actions'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

class App extends Component {

  render() {
    return (
      <div>
        <Provider store={store}>
          <Router history={history}>
            <Route path='/' component={History} />
            <Route path='/history' component={History}/>
          </Router>
        </Provider>
        <DevTools store={store} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { selectedReddit, postsByReddit } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  }

  return {
    selectedReddit,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
