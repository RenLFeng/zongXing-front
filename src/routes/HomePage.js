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
import Header from '../components/Header/header';
import Footer from '../components/Footer/footer';


@connect((state) => ({
	login: state.login
}))
export default class HomePage extends React.Component{
	componentDidMount() {

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
