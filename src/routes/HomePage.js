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
import ProjectList from './homePage/ProjectList';
import ProjectDetail from './homePage/ProjectDetail';
import Project from './homePage/Project';
import Risk from './homePage/Risk';
import Login from './homePage/login';
import Header from '../components/HomePageComponent/header';
import Footer from '../components/HomePageComponent/footer';
import '../assets/common/index';
import { getLocation } from '../services/api';
import ApplyLoan from './homePage/ApplyLoan';
import UCenter from './homePage/UCenter';
import Collection from './homePage/Collection';
import COS from 'cos-js-sdk-v5';
import RecordInformation from "./information/recordInformation";
import OrganizationInformation from "./information/organizationInformation";
import ContactUs from "./information/contactUs";
import CollectionOrder from './homePage/CollectionOrder';

import AuditInformation from "./information/auditInformation";
import BusinessInformation from "./information/businessInformation";
import ProjectInformation from "./information/projectInformation";
import { BASE_URL, getAuth } from '../services/api';
import PlatformNotice from "./information/legalSupport";
import NewsReports from "./information/newsReports";
import LegalDeclaration from "./information/lawsRegulations";

@connect((state) => ({
	login: state.login
}))
export default class HomePage extends React.Component{
  componentDidMount() {
    //判断本地是否已经有了城市地区编码，若没有则重新请求
    if (!localStorage.getItem('addressCode')) {
      //获取城市编码存入本地缓存
      getLocation().then((data)=>{
        console.log(data);
        localStorage.setItem('addressCode', data.adcode);
      })
    }
    if (!global.cos) {
      global.cos = new COS({
        getAuthorization: function (options, callback) {
          // 异步获取签名
          getAuth({method: (options.Method || 'get').toLowerCase(),
            pathname: '/' + (options.Key || '')})
            .then((data) => {
              console.log(data);
              if (data.code === 0) {
                callback(data.data);
              }
            })
            .catch((e) => {
              callback('error');
            })
        }
      });
    }
  }

	render() {
		const { match, dispatch } = this.props;
		return (
			<div>
				<Header param={this.props}/>
          <Switch>
            <Route path={`${match.path}/`} exact component={HomeIndex}/>
            <Route path={`${match.path}/projectLoan`} component={ProjectLoan}/>
            <Route path={`${match.path}/howLoan`} component={HowLoan}/>
            <Route path={`${match.path}/howInvest`} component={HowInvest}/>
            <Route path={`${match.path}/businessDiscount`} component={BusinessDiscount}/>
            <Route path={`${match.path}/loanCollege`} component={LoanCollege}/>
            <Route path={`${match.path}/applyLoan`} component={ApplyLoan} />
            <Route path={`${match.path}/uCenter`} component={UCenter} />
            <Route path={`${match.path}/login`} component={Login} />
            <Route path={`${match.path}/risk`} component={Risk} />
            <Route path={`${match.path}/projectDetail/:projectId`} component={ProjectDetail} />
            <Route path={`${match.path}/project/:projectId`} component={Project} />
            <Route path={`${match.path}/collection`} component={Collection} />
            <Route path={`${match.path}/collectionOrder`} component={CollectionOrder} />
          </Switch>
        <Footer/>
			</div>
		);
	}
}
