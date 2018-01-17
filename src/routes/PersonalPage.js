import React from 'react';
import {Link, Route,Switch } from 'dva/router';
import PersonalOpening from './personalPage/PersonalOpening';
import UserBaseInput from './personalPage/UserBaseInput';
import CompanyOpening from './personalPage/CompanyOpening';
import SafeCenter from './personalPage/SafeCenter';
import BankCard from './personalPage/BankCard';

export default class PersonalPage extends React.Component{
	render() {
	  const {match} = this.props;
		return (
			<div>
        <Switch>
          <Route path={`${match.path}/`} exact component={PersonalOpening} />
          <Route path={`${match.path}/userInput`} component={UserBaseInput} />
          <Route path={`${match.path}/companyOpening`} component={CompanyOpening} />
          <Route path={`${match.path}/safeCenter`} component={SafeCenter} />
          <Route path={`${match.path}/bankCard`} component={BankCard} />
        </Switch>
			</div>
		);
	}
}
