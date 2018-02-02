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
export default class Header extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {match, location} = this.props.param;
    const styleS = location.pathname.indexOf('/index/howLoan') !== -1 || location.pathname.indexOf('/index/howInvest') !== -1 ? {position:'fixed'}: {position:'absolute'};
    if (location.pathname.indexOf('/index/uCenter') === -1 && location.pathname.indexOf('/index/login') === -1) {
      return (
      <div className="topnav" style={styleS}>
        <div className="w clearfix">
          <Link className="logo fl" to={`${match.path}/`}>
            <img src={require('../../assets/img/logo.png')} />
          </Link>
          <span className="fr">
            <Link className="a1" to={`${match.path}/projectLoan`}>项目借款</Link>
            <Link className="a1" to={`${match.path}/howLoan`}>如何借款</Link>
            <Link className="a1" to={`${match.path}/howInvest`}>如何投资</Link>
            <Link className="a1" to={`${match.path}/businessDiscount`}>商家优惠</Link>
            <Link className="a1" to={`${match.path}/loanCollege`}>众借学院</Link>
            <a className="btn btn1" href="">收藏项目<em>0</em></a>
            { !this.props.loginStatus ?
              <Link className="btn btn2" to={'/index/login'}>登录 / 注册</Link> :
              <Link className="btn btn2" to={'/index/uCenter'}>个人中心</Link>
            }
          </span>
        </div>
      </div>

      );
    }
  	return (
      <div className="topnav" style={{backgroundColor:'#333'}}>
        <div className="w clearfix">
          <Link className="logo fl" to={`${match.path}/`}>
            <img src={require('../../assets/img/logo.png')} />
          </Link>
          <span className="fr">
            <Link className="a1" to={`${match.path}/projectLoan`}>项目借款</Link>
            <Link className="a1" to={`${match.path}/howLoan`}>如何借款</Link>
            <Link className="a1" to={`${match.path}/howInvest`}>如何投资</Link>
            <Link className="a1" to={`${match.path}/businessDiscount`}>商家优惠</Link>
            <Link className="a1" to={`${match.path}/loanCollege`}>众借学院</Link>
            <a className="btn btn1" href="">收藏项目<em>0</em></a>
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
