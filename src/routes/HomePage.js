import React from 'react';
import {Link, Route,Switch } from 'dva/router';
import i18n from '../i18n/i18n'
import { connect } from 'dva';

import { getLoginData, testSocket } from '../services/api';

import Test from './homePage/Test';
import ProjectLoan from './homePage/ProjectLoan';
import HowLoan from './homePage/HowLoan';
import HowInvest from './homePage/HowInvest';
import HomeIndex from './homePage/HomeIndex';
import CompanyDiscount from '../components/CompanyDiscount/CompanyDiscount';
import CommonProblem from './homePage/commonProblem';
import ProjectList from './homePage/ProjectList';
import ProjectDetail from './homePage/ProjectDetail';
import Project from './homePage/Project';
import Risk from './homePage/Risk';
import Login from './homePage/login';
import Register from './homePage/register';
import ForgetPassWord from './homePage/forgetPassWord';
import Header from '../components/HomePageComponent/header';
import Footer from '../components/HomePageComponent/footer';
import '../assets/common/index';
import { getLocation } from '../services/api';
import ApplyLoan from './homePage/ApplyLoan';
import UCenter from './homePage/UCenter';
import COS from 'cos-js-sdk-v5';
import InformationPage from './InformationPage';

//信息披露
import LetterStatement from './information/letterstatement';
import OperateData from "./information/operateData";
import RecordInformation from "./information/recordInformation";
import OrganizationInformation from "./information/organizationInformation";
import AuditInformation from "./information/auditInformation";
import BusinessInformation from "./information/businessInformation";
import ProjectInformation from "./information/projectInformation";
// 关于我们
import CompanyIntroduction from "./information/CompanyIntroduction.js";
import ContactUs from './information/contactUs.js'
// 法律法规
import RiskManagement from "./information/riskManagement.js";
import PlatformNotice from "./information/legalSupport";
import LegalDeclaration from "./information/lawsRegulations";
// 合作伙伴
import NewsReports from "./information/newsReports";

import { BASE_URL, getAuth, getHobbyList } from '../services/api';
//优惠券兑换中心
import CouponCenter from '../components/CouponCenter/CouponCenter';
import io from 'socket.io-client';
import { SOCKET_URL } from '../common/systemParam';

@connect((state) => ({
  login: state.login,
  userId: state.login.baseData.userId,
  socketData: state.login.socketData
}))
export default class HomePage extends React.Component{
  componentDidMount() {
    // 判断有没有token请求获取用户基础数据
    if (localStorage.getItem('accessToken')) {
      this.getUserBaseData();
    }
    // 获取兴趣爱好
    this.getHobby();
    if (!global.cos) {
      global.cos = new COS({
        getAuthorization: function (options, callback) {
          // 异步获取签名
          getAuth({method: (options.Method || 'get').toLowerCase(),
            pathname: '/' + (options.Key || '')})
            .then((data) => {
              //console.log(data);
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

  async getHobby() {
    const response = await getHobbyList();
    //console.log('hobby', response);
    if (response.code === 0) {
        this.props.dispatch({
          type: 'login/hobby',
          payload: {
            hobbyList: response.data
          }
        })
    }
  }

  connectSocket(userId) {
    let socket = io.connect(`${SOCKET_URL}?clientId=${userId}`)
    // this.props.dispatch({
    //   type: 'login/saveSocketData',
    //   socketData: socket
    // });

    socket.on('connect', ()=> {
      // setInterval(()=>{
      //   testSocket();
      // }, 2000)
    });



  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userId !== nextProps.userId && nextProps.userId) {
      // this.connectSocket(nextProps.userId);
    }
  }

  async getUserBaseData() {
    const response = await getLoginData();
    if (response.code === 0) {
      this.props.dispatch({type: 'login/saveLoadingDataAfter', response: response.data})
    }
  }

	render() {
		const { match, dispatch } = this.props;
		return (
			<div>
				<Header param={this.props}/>
          <Switch>
            {/* 首界面 */}
            <Route path={`${match.path}/`} exact component={HomeIndex}/>
            {/* 借款项目 */}
            <Route path={`${match.path}/projectLoan`} component={ProjectLoan}/>
            <Route path={`${match.path}/howLoan`} component={HowLoan}/>
            <Route path={`${match.path}/howInvest`} component={HowInvest}/>
            {/* 商家优惠 */}
            <Route path={`${match.path}/companyDiscount`} component={CompanyDiscount}/>
            {/* 优惠券兑换中心 */}
            <Route path={`${match.path}/couponCenter`} component={CouponCenter}/>
            <Route path={`${match.path}/commonProblem`} component={CommonProblem}/>
            <Route path={`${match.path}/applyLoan`} component={ApplyLoan} />
            <Route path={`${match.path}/uCenter`} component={UCenter} />
            <Route path={`${match.path}/login`} component={Login} />
            <Route path={`${match.path}/register`} component={Register} />
            <Route path={`${match.path}/forgetPassWord`} component={ForgetPassWord} />
            <Route path={`${match.path}/risk`} component={Risk} />

            {/* <Route path={`${match.path}/infor`} component={InformationPage} /> */}
            {/* 信息披露 */}
            <Route path={`${match.path}/infor/operateData`} component={OperateData} />
            <Route path={`${match.path}/infor/RecordInformation`}  component={RecordInformation}/>
            <Route path={`${match.path}/infor/letterstatement`}  component={LetterStatement}/>
            {/*法律法规 */}
            <Route path={`${match.path}/infor/riskManagement`} component={RiskManagement} />
            {/*关于我们*/}
           <Route path={`${match.path}/infor/companyIntroduction`} component={CompanyIntroduction} /> 
            <Route path={`${match.path}/infor/contactUs`} component={ContactUs} /> 
            {/*合作伙伴*/}

            {/* 项目详情页面 */}
            <Route path={`${match.path}/projectDetail/:projectId`} component={ProjectDetail} />
            {/* 预览使用的项目详情页面 */}
            <Route path={`${match.path}/project/:projectId`} component={Project} />

            <Route path={`${match.path}/test`} component={Test} />
          </Switch>
        <Footer/>
			</div>
		);
	}
}
