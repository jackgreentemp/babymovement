import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import History from './views/History';

class App extends Component {

  render() {
    return (
      <div>
        <Router history={createBrowserHistory()}>
          <Route path='/' component={History} />
          <Route path='/history' component={History}/>
        </Router>
      </div>
    );
  }
}

export default App;
