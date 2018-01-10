import React from 'react';
import {Link, Route,Switch } from 'dva/router';
import i18n from '../i18n/i18n'
import { connect } from 'dva';
import ProjectLoan from './homePage/ProjectLoan';
import HowLoan from './homePage/HowLoan';
import HowInvest from './homePage/HowInvest';
import HomeIndex from './homePage/HomeIndex';
import BusinessDiscount from './homePage/BusinessDiscount';
import LoanCollege from './homePage/LoanCollege';
import Header from '../components/HomePageComponent/header';
import Footer from '../components/HomePageComponent/footer';
import '../assets/common/index';
import { getLocation } from '../services/api';

@connect((state) => ({
	login: state.login
}))
export default class HomePage extends React.Component{
  componentDidMount() {
    //判断本地是否已经有了城市地区编码，若没有则重新请求
    if (!localStorage.getItem('addressCode')) {
      //获取城市编码存入本地缓存
      getLocation().then((data)=>{
        localStorage.setItem('addressCode', data.adcode);
      })
    }
  }



	render() {
		const { match, dispatch } = this.props;
		return (
			<div>
				<Header param={this.props}/>
          <Switch>
            <Route path={`${match.path}/`} exact component={HomeIndex}/>
            <Route path={`${match.path}/ProjectLoan`} component={ProjectLoan}/>
            <Route path={`${match.path}/howLoan`} component={HowLoan}/>
            <Route path={`${match.path}/howInvest`} component={HowInvest}/>
            <Route path={`${match.path}/businessDiscount`} component={BusinessDiscount}/>
            <Route path={`${match.path}/loanCollege`} component={LoanCollege}/>
          </Switch>
        <Footer/>
			</div>
		);
	}
}
