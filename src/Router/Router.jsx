import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Layout from '../Containers/Layout/Layout';

export default function () {
  return (
    <Router>
      <Route path="/" exact component={Layout} />
    </Router>
  );
}
