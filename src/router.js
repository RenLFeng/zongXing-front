import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import Exception from './components/Exception'
import NoMatch from './routes/404page/404Page';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './common/math-plugin';
import ScrollToTop from './common/ScrollToTop';
import asyncComponent from './utils/AsyncComponent';

moment.locale('zh-cn');

const HomePage = asyncComponent(()=>import('./routes/HomePage'));
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <Route path="/" exact render={() => (<Redirect to="/index"/>)}></Route >
          <Route path="/index" component={HomePage}/>
          <Route path="/exception" component={Exception} />
          <Route component={NoMatch}/>
        </Switch>
      </ScrollToTop>
    </Router>
  );
}

export default RouterConfig;
