import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home';
import NotFound from '../NotFound';
import Login from '';
import Signup from '';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);

export default App;
