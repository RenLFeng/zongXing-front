import React from 'react';
import {Link, Switch, Route} from 'dva/router';
import i18n from '../i18n/i18n'
import companyIntroduction from './information/companyIntroduction';
import cooperativePartner from './information/cooperativePartner';

export default class InformationPage extends React.Component{
	render() {
		const {match} = this.props;
		return (
			<div>
				InformationPage
				<ul>
					<li><Link to={`${match.path}/`}>{i18n('companyIntroduction')}</Link></li>
					<li><Link to={`${match.path}/cooperativePartner`}>{i18n('cooperativePartner')}</Link></li>
				</ul>
				<Switch>
					<Route path={`${match.path}/`} exact component={companyIntroduction}/>
					<Route path={`${match.path}/cooperativePartner`} component={cooperativePartner}/>
				</Switch>
			</div>
		);
	}
}