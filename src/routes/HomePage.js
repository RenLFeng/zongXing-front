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
import asyncComponent from '../utils/AsyncComponent';
import Header from '../components/HomePageComponent/header';
import Footer from '../components/HomePageComponent/footer';

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
            <Route path={`${match.path}/`} exact component={asyncComponent(()=>import('./homePage/HomeIndex'))}/>
            {/* 借款项目 */}
            <Route path={`${match.path}/projectLoan`} component={asyncComponent(()=>import('./homePage/ProjectLoan'))}/>
            <Route path={`${match.path}/howLoan`} component={asyncComponent(()=>import('./homePage/HowLoan'))}/>
            <Route path={`${match.path}/howInvest`} component={asyncComponent(()=>import('./homePage/HowInvest'))}/>
            {/* 商家优惠 */}
            <Route path={`${match.path}/companyDiscount`} component={asyncComponent(()=>import('../components/CompanyDiscount/CompanyDiscount'))}/>
            {/* 优惠券兑换中心 */}
            <Route path={`${match.path}/couponCenter`} component={asyncComponent(()=>import('../components/CouponCenter/CouponCenter'))}/>
            
            <Route path={`${match.path}/commonProblem`} component={asyncComponent(()=>import('./homePage/commonProblem'))}/>
            <Route path={`${match.path}/infor`} component={asyncComponent(()=>import('./homePage/infor'))}/>
            <Route path={`${match.path}/applyLoan`} component={asyncComponent(()=>import('./homePage/ApplyLoan'))} />
            <Route path={`${match.path}/uCenter`} component={asyncComponent(()=>import('./homePage/UCenter'))} />
            <Route path={`${match.path}/login`} component={asyncComponent(()=>import('./homePage/login'))} />
            <Route path={`${match.path}/register`} component={asyncComponent(()=>import('./homePage/register'))} />
            <Route path={`${match.path}/forgetPassWord`} component={asyncComponent(()=>import('./homePage/forgetPassWord'))} />
            <Route path={`${match.path}/risk`} component={asyncComponent(()=>import('./homePage/Risk'))} />
            {/* 项目详情页面 */}
            <Route path={`${match.path}/projectDetail/:projectId`} component={asyncComponent(()=>import('./homePage/ProjectDetail'))} />
            {/* 预览使用的项目详情页面 */}
            <Route path={`${match.path}/project/:projectId`} component={asyncComponent(()=>import('./homePage/Project'))} />
          </Switch>
        <Footer/>
			</div>
		);
	}
}
