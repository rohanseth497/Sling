import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';
import Home from '../Home';
import NotFound from '../NotFound';

const App = () => (
  <BrowserRouter>
    <Match exactly pattern="/" component={Home} />
    <Miss component={NotFound} />
  </BrowserRouter>
);

export default App;
