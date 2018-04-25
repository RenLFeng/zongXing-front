import React from 'react';
import { Link } from 'dva/router';
import {connect} from 'dva';
import Login from '../LoginComponent/login';
import QueueAnim from 'rc-queue-anim';

const styles = {
  masker : {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100vh',
    background: 'rgba(0,0,0,.5)',
    zIndex: 5
  },
};

@connect((state)=>({
  loginStatus: state.login.status
}))
export default class HeaderInfor extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {match, location} = this.props.param;
  	return (
      <div className="topnav" style={location.pathname.indexOf('/infor/') === -1 && location.pathname.indexOf('/index/login') === -1 ? {backgroundColor:'transparent'}: {backgroundColor:'#333'}}>
        <div className="w clearfix">
          <Link className="logo fl" to={`/`}>
            <img src={require('../../assets/img/logo.png')} />
          </Link>
          <span className="fr">
            <Link className="a1" to={`/index/projectLoan`}>项目借款</Link>
            <Link className="a1" to={`/index/howLoan`}>如何借款</Link>
            <Link className="a1" to={`/index/howInvest`}>如何投资</Link>
            <Link className="a1" to={`/index/businessDiscount`}>商家优惠</Link>
            <Link className="a1" to={`/index/loanCollege`}>众借学院</Link>
            <a className="btn btn1" href="">收藏项目</a>
            { !this.props.loginStatus ?
              <Link className="btn btn2" to={'/index/login'}>登录 / 注册</Link> :
              <Link className="btn btn2" to={'/index/uCenter'}>个人中心</Link>
            }
          </span>
        </div>
      </div>
  	);
  }
}
