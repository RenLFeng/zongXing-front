import React from 'react';
import {Link, Route,Switch } from 'dva/router';
import i18n from '../i18n/i18n'
import { connect } from 'dva';
import ProjectLoan from './homePage/ProjectLoan';
import HowLoan from './homePage/HowLoan';
import HowInvest from './homePage/HowInvest';
import BusinessDiscount from './homePage/BusinessDiscount';
import LoanCollege from './homePage/LoanCollege';
import {getLocation} from '../services/api'

@connect((state)=>({
	login: state.login
}))
export default class HomePage extends React.Component{
	componentDidMount() {
				getLocation()
	}
	
	render() {
		const { match, dispatch } = this.props;
		return (
			<div>
				HomePage
				<button onClick={()=>{dispatch({type:'login/login', payload:{'123':123} })}}></button>
				<ul>
					<li><Link to={`${match.path}/`}>{i18n('projectLoan')}</Link></li>
					<li><Link to={`${match.path}/howLoan`}>{i18n('howLoan')}</Link></li>
					<li><Link to={`${match.path}/howInvest`}>{i18n('howInvest')}</Link></li>
					<li><Link to={`${match.path}/businessDiscount`}>{i18n('businessDiscount')}</Link></li>
					<li><Link to={`${match.path}/loanCollege`}>{i18n('loanCollege')}</Link></li>
				</ul>
				<Switch>
					<Route path={`${match.path}/`} exact component={ProjectLoan}/>
					<Route path={`${match.path}/howLoan`} component={HowLoan}/>
					<Route path={`${match.path}/howInvest`} component={HowInvest}/>
					<Route path={`${match.path}/businessDiscount`} component={BusinessDiscount}/>
					<Route path={`${match.path}/loanCollege`} component={LoanCollege}/>
				</Switch>
			</div>
		);
	}
}