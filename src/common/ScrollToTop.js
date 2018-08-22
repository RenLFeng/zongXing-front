import { withRouter } from 'dva/router';
import React from 'react';
import {connect} from 'dva';
import {getLoginData} from '../services/api';

@connect(()=>({}))
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      // never triggered
      if (localStorage.getItem('accessToken') && prevProps.location.pathname.indexOf('/index/uCenter/personAccount')) {
        this.reashLoginData()
      }
      window.scrollTo(0, 0);
    }
  }
  async reashLoginData(){
    const response = await getLoginData(); 
    if (response.code === 0) {
        this.props.dispatch({type: 'login/saveLoadingDataAfter', response: response.data})
    }
  }
  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
