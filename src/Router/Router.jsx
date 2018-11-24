import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Tasks from '../Containers/Tasks/Tasks';

export default function () {
  return (
    <Router>
      <Route path="/" exact component={Tasks} />
    </Router>
  );
}


