import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import History from './containers/History';

export default <Route path="/" component={History}>
<Route path='/history' component={History}/>
</Route>
