import React from 'react';
import {Link, Route,Switch } from 'dva/router';
import i18n from '../i18n/i18n'
import { connect } from 'dva';

import { getLoginData, testSocket,getuserID } from '../services/api';
import '../assets/common/index';
import { getLocation } from '../services/api';
import COS from 'cos-js-sdk-v5';
import { BASE_URL, getAuth, getHobbyList,socketUrl } from '../services/api';
//优惠券兑换中心
import { SOCKET_URL } from '../common/systemParam';
import Header from '../components/HomePageComponent/header';
import Footer from '../components/HomePageComponent/footer';
import Loadable from 'react-loadable';


import {  notification,Icon,message } from 'antd';

import io from 'socket.io-client';

function loading() {
  return <p></p>
}
const Login = Loadable({loader: () => import('./homePage/login'),loading: loading});
const UCenter = Loadable({loader: () => import('./homePage/UCenter'),loading: loading});
const HomeIndex = Loadable({loader: () => import('./homePage/HomeIndex'),loading: loading});
const ProjectLoan = Loadable({loader: () => import('./homePage/ProjectLoan'),loading: loading});
const HowLoan = Loadable({loader: () => import('./homePage/HowLoan'),loading: loading});
const HowInvest = Loadable({loader: () => import('./homePage/HowInvest'),loading: loading});
const CompanyDiscount = Loadable({loader: () => import('../components/CompanyDiscount/CompanyDiscount'),loading: loading})
const CouponCenter = Loadable({loader: () => import('../components/CouponCenter/CouponCenter'),loading: loading})
const CommonProblem = Loadable({loader: () => import('./homePage/commonProblem'),loading: loading});
const Infor = Loadable({loader: () => import('./homePage/infor'),loading: loading});
const ApplyLoan = Loadable({loader: () => import('./homePage/ApplyLoan'),loading: loading});
const Register = Loadable({loader: () => import('./homePage/register'),loading: loading});
const ForgetPassWord = Loadable({loader: () => import('./homePage/forgetPassWord'),loading: loading});
const Risk = Loadable({loader: () => import('./homePage/Risk'),loading: loading});
const ProjectDetail = Loadable({loader: () => import('./homePage/ProjectDetail'),loading: loading});
const Project = Loadable({loader: () => import('./homePage/Project'),loading: loading});

@connect((state) => ({
  login: state.login,
  socketData: state.login.socketData
}))
export default class HomePage extends React.Component{
  componentDidMount() {

      // this.getuserUuid();//获取用户id
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

  async getuserUuid() {
    const response = await getuserID();
    if (response.code === 0) {
     localStorage.setItem('userid',response.data)
     this.socketConn();    //socket  mast userid
    } else {
      message.error(response.msg);
    }
  }

  socketConn(){
    let that=this;
    const socket = io(socketUrl+localStorage.getItem('userid'));  //指定后台的url地址  在service  api 中统一修改  打包记得替换
    socket.on('connect', function () {
     });
     socket.on('disconnect', function () {
       that.socketConn();
     });
     socket.on('chat', function (data) {
       
      notification.open({
        icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        message: data.data.busType,
        description: data.data.message,
      });
     });
  }
  async getHobby() {
    const response = await getHobbyList();
    if (response.code === 0) {
        this.props.dispatch({
          type: 'login/hobby',
          payload: {
            hobbyList: response.data
          }
        })
    }
  }

  async getUserBaseData() {
    const response = await getLoginData();
    if (response.code === 0) {
      this.props.dispatch({type: 'login/saveLoadingDataAfter', response: response.data})
    }
  }

  async reashLoginData(){
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
            <Route path={`${match.path}/infor`} component={Infor}/>
            <Route path={`${match.path}/applyLoan`} component={ApplyLoan} />
            <Route path={`${match.path}/uCenter`} component={UCenter} />
            <Route path={`${match.path}/login`} component={Login} />
            <Route path={`${match.path}/register`} component={Register} />
            <Route path={`${match.path}/forgetPassWord`} component={ForgetPassWord} />
            <Route path={`${match.path}/risk`} component={Risk} />
            {/* 项目详情页面 */}
            <Route path={`${match.path}/projectDetail/:projectId`} component={ProjectDetail} />
            {/* 预览使用的项目详情页面 */}
            <Route path={`${match.path}/project/:projectId`} component={Project} />
          </Switch>
        <Footer/>
			</div>
		);
	}
}
