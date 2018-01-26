import React from 'react';
import {Switch, Route, } from 'dva/router';
import Path from '../../common/pagePath';

import MessageList from './message/MessageList';
import MessageDetail from './message/MessageDetail';

export default class Message extends React.Component {
  render() {
    return (
      <Switch>
        <Route path={Path.STATION_MESSAGE} exact component={MessageList}/>
        <Route path={Path.STATION_MESSAGE + '/:msgId'} exact component={MessageDetail}/>
      </Switch>
    );
  }
}
