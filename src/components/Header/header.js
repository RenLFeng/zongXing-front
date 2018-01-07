import React from 'react';
import Login from '../Login/login';
import { Link } from 'dva/router';


export default class Header extends React.Component {
  render() {
    const {match} = this.props.param;
  	return (
			<div className="topnav">
		    <div className="w clearfix">
	        <Link className="logo fl" to={`${match.path}/`}>
            <img src="../../assets/img/logo.png" />
	        </Link>
	        <span className="fr">
            <Link className="a1" to={`${match.path}/ProjectLoan`}>项目借款</Link>
            <a className="a1" href="/finance.html">如何借款</a>
            <a className="a1" href="/invest.html">如何投资</a>
            <a className="a1" href="/sales.html">商家优惠</a>
            <a className="a1" href="">众借学院</a>
            <a className="btn btn1" href="">收藏项目<em>0</em></a>
            <a className="btn btn2" href="">登录 / 注册</a>
	        </span>
		    </div>
			</div>
  	);
  }
}
