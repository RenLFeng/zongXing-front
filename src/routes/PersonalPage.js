import React from 'react';
import {Link, Route,Switch } from 'dva/router';
import PersonalOpening from './personalPage/personalOpening';
import UserBaseInput from './personalPage/userBaseInput';
import CompanyOpening from './personalPage/companyOpening';

export default class PersonalPage extends React.Component{
	render() {
	  const {match} = this.props;
		return (
			<div>
        <Switch>
          <Route path={`${match.path}/`} exact component={PersonalOpening} />
          <Route path={`${match.path}/userInput`} component={UserBaseInput} />
          <Route path={`${match.path}/companyOpening`} component={CompanyOpening} />
        </Switch>
			</div>
		);
	}
}
