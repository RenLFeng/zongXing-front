import React from 'react';
import Login from '../Login/login';
import { Link } from 'dva/router';
import styles from './header.scss';

export default class Header extends React.Component {
  render() {
    const {match} = this.props.param;
  	return (
			<div className={styles.topnav}>
		    <div className={`${styles.w} ${styles.clearfix}`}>
	        <Link className={`${styles.logo} ${styles.fl}`} to={`${match.path}/`}>
            <img src={require('../../assets/img/logo.png')} />
	        </Link>
	        <span className={styles.fr}>
            <Link className={styles.a1} to={`${match.path}/ProjectLoan`}>项目借款</Link>
            <a className={styles.a1} href="/finance.html">如何借款</a>
            <a className={styles.a1} href="/invest.html">如何投资</a>
            <a className={styles.a1} href="/sales.html">商家优惠</a>
            <a className={styles.a1} href="">众借学院</a>
            <a className={`${styles.btn} ${styles.btn1}`} href="">收藏项目<em>0</em></a>
            <a className={`${styles.btn} ${styles.btn1}`} href="">登录 / 注册</a>
	        </span>
		    </div>
			</div>
  	);
  }
}
