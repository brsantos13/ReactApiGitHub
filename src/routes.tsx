import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

import React from 'react';

// import { Container } from './styles';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Main} exact />
        <Route
          path="/repository/:repository"
          component={Repository}
          exact
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
