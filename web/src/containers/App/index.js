import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Home';
import NotFound from '../NotFound';

const App = () => (
  <Router>
    <div>
      <Route exactly path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </div>
  </Router>
);

export default App;
