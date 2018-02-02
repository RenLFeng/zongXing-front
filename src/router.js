import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import HomePage from './routes/HomePage';
import InformationPage from './routes/InformationPage';
import SubSite from './routes/SbuSite';
import PersonalPage from './routes/PersonalPage';
import Exception from './components/Exception'
import NoMatch from './routes/404page/404Page';
import moment from 'moment';
import 'moment/locale/zh-cn';
import './common/jquery-plugin';
moment.locale('zh-cn');

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
     		<Route path="/" exact render={() => (<Redirect to="/index"/>)}></Route >
        <Route path="/index" component={HomePage}/>
        <Route path="/subsite" component={SubSite} />
        <Route path="/infor" component={InformationPage} />
        <Route path="/personal" component={PersonalPage} />
        <Route path="/exception" component={Exception} />
        <Route component={NoMatch}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
