import React from 'react';
import {Link, Route,Switch } from 'dva/router';
import i18n from '../i18n/i18n'
import { connect } from 'dva';

import { getLoginData, testSocket } from '../services/api';
import '../assets/common/index';
import { getLocation } from '../services/api';
import COS from 'cos-js-sdk-v5';
import { BASE_URL, getAuth, getHobbyList } from '../services/api';
//优惠券兑换中心
import io from 'socket.io-client';
import { SOCKET_URL } from '../common/systemParam';
import Header from '../components/HomePageComponent/header';
import Footer from '../components/HomePageComponent/footer';
import Loadable from 'react-loadable';
// import UCenter from './homePage/UCenter';

function loading() {
  return <p></p>
}
@connect((state) => ({
  login: state.login,
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

  async getUserBaseData() {
    const response = await getLoginData();
    if (response.code === 0) {
      this.props.dispatch({type: 'login/saveLoadingDataAfter', response: response.data})
    }
  }

  async reashLoginData(){
    console.log(12312312312);
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
            <Route path={`${match.path}/`} exact component={Loadable({loader: () => import('./homePage/HomeIndex'),loading: loading})}/>
            {/* 借款项目 */}
            <Route path={`${match.path}/projectLoan`} component={Loadable({loader: () => import('./homePage/ProjectLoan'),loading: loading})}/>
            <Route path={`${match.path}/howLoan`} component={Loadable({loader: () => import('./homePage/HowLoan'),loading: loading})}/>
            <Route path={`${match.path}/howInvest`} component={Loadable({loader: () => import('./homePage/HowInvest'),loading: loading})}/>
            {/* 商家优惠 */}
            <Route path={`${match.path}/companyDiscount`} component={Loadable({loader: () => import('../components/CompanyDiscount/CompanyDiscount'),loading: loading})}/>
            {/* 优惠券兑换中心 */}
            <Route path={`${match.path}/couponCenter`} component={Loadable({loader: () => import('../components/CouponCenter/CouponCenter'),loading: loading})}/>
            
            <Route path={`${match.path}/commonProblem`} component={Loadable({loader: () => import('./homePage/commonProblem'),loading: loading})}/>
            <Route path={`${match.path}/infor`} component={Loadable({loader: () => import('./homePage/infor'),loading: loading})}/>
            <Route path={`${match.path}/applyLoan`} component={Loadable({loader: () => import('./homePage/ApplyLoan'),loading: loading})} />
            <Route path={`${match.path}/uCenter`} component={Loadable({loader: () => import('./homePage/UCenter'),loading: loading})} />
            <Route path={`${match.path}/login`} component={Loadable({loader: () => import('./homePage/login'),loading: loading})} />
            <Route path={`${match.path}/register`} component={Loadable({loader: () => import('./homePage/register'),loading: loading})} />
            <Route path={`${match.path}/forgetPassWord`} component={Loadable({loader: () => import('./homePage/forgetPassWord'),loading: loading})} />
            <Route path={`${match.path}/risk`} component={Loadable({loader: () => import('./homePage/Risk'),loading: loading})} />
            {/* 项目详情页面 */}
            <Route path={`${match.path}/projectDetail/:projectId`} component={Loadable({loader: () => import('./homePage/ProjectDetail'),loading: loading})} />
            {/* 预览使用的项目详情页面 */}
            <Route path={`${match.path}/project/:projectId`} component={Loadable({loader: () => import('./homePage/Project'),loading: loading})} />
          </Switch>
          <div onClick={()=>this.reashLoginData()} style={{zIndex: 9999}}>123123123</div>
        <Footer/>
			</div>
		);
	}
}
