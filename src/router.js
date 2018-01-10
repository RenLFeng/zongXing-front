import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import HomePage from './routes/HomePage';
import InformationPage from './routes/InformationPage';
import PersonalPage from './routes/PersonalPage';
import NoMatch from './routes/404page/404Page';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
     		<Route path="/" exact render={() => (<Redirect to="/index"/>)}></Route >
        <Route path="/index" component={HomePage}/>
        <Route path="/infor" component={InformationPage} />
        <Route path="/personal" component={PersonalPage} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
