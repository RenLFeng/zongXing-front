import React from 'react';
import { Link } from 'dva/router';
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
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    }
  }
  componentDidMount() {

  }

  hideLogin() {
    this.setState({
      isLogin: false
    });
  }

  render() {
    const {match} = this.props.param;
  	return (
      <div className="topnav">
        <div className="w clearfix">
          <Link className="logo fl" to={`${match.path}/`}>
            <img src={require('../../assets/img/logo.png')} />
          </Link>
          <span className="fr">
            <Link className="a1" to={`${match.path}/projectLoan`}>项目借款</Link>
            <Link className="a1" to={`${match.path}/howLoan`}>如何借款</Link>
            <Link className="a1" to={`${match.path}/howInvest`}>如何投资</Link>
            <Link className="a1" to={`${match.path}/businessDiscount`}>商家优惠</Link>
            <a className="a1" href="">众借学院</a>
            <a className="btn btn1" href="">收藏项目<em>0</em></a>
            <a className="btn btn2" href="javascript:void(0)" onClick={()=> this.setState({ isLogin: true })}>登录 / 注册</a>
        </span>
        </div>
        {this.state.isLogin ?
          <Login close={this.hideLogin.bind(this)}/> : null}
        {this.state.isLogin ?
          <div style={styles.masker}/> : null}
      </div>
  	);
  }
}
