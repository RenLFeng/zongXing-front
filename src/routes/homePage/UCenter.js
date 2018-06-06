import React from 'react';

import { Switch, Route, withRouter} from 'dva/router';
import {connect} from 'dva';
import {Button} from 'antd';

import '../../assets/ucenter/index';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import PersonAccount from '../../components/UCenterComponent/personAccount';
import UserBasic from '../../components/UCenterComponent/userBasic';
import OpenAccount from '../../components/UCenterComponent/openAccount';
import SafeCenter from '../../components/UCenterComponent/safeCenter';
import RealName from '../../components/UCenterComponent/realName';
import Authentication from '../../components/UCenterComponent/authentication';
import CompanyAccount from '../../components/UCenterComponent/companyAccount';
import BankCard from '../../components/UCenterComponent/bankCard';
import AccountRecharge from '../../components/UCenterComponent/accountRecharge';
import AccountWithdrawals from '../../components/UCenterComponent/accountWithdrawals';
import Message from '../../components/UCenterComponent/message';
import NoticeList from '../../components/UCenterComponent/NoticeList';
import MyInvestList from '../../components/UCenterComponent/myInvestment';
import IncomePlan from '../../components/UCenterComponent/IncomePlan';
import AllInvest from '../../components/UCenterComponent/AllInvest';

import Test from '../../components/UCenterComponent/test';
import CompanyList from '../../components/UCenterComponent/companyList';
import receivePlan from '../../components/UCenterComponent/receivePlan';
 
import myCoupon from '../../components/UCenterComponent/mycoupon';

import Path from '../../common/pagePath';
import MoreInfo from "../../components/UCenterComponent/moreInfo";

@connect((state) => ({
  nickName: state.login.nickName
}))
export default class UCenter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

    setTimeout(()=>{
      this.initPage();
    }, 200);
  }

  initPage() {
    $('.uc-lbody>.navbox').on('click', '.hd>a,.folder>a', function(){
      $(this).parent().toggleClass('hover');
    });
  };

  render() {
    const { match, nickName, showMask } = this.props;
    return (
      <div className="body2">
        <div className="w">
            <div className="uc-tbody clearfix"> 
                {/* 用户头像 */}
                <a className="fl"><img className="av" src={require('../../assets/img/ucenter/av1.png')} /></a>
                {/* 用户信息 */}
                <div className="fl">
                    {/* 用户名 */}
                    <p className="t1"><span>用户昵称</span><span className="split">|</span>{nickName}</p> 
                    <p className="uinfo">
                        <span>赵妮沙</span>
                        <span className="split">|</span> 
                        <i title="绑定手机号" className="zjb zjb-shouji" style={{color:'#f90'}}></i>
                        <i title="身份证认证" className="zjb zjb-shouji"></i> 
                        <i title="银行卡绑定" className="zjb zjb-shouji"></i>
                    </p>
                    
                </div>
                <div className="fr">
                    {/* 去除退出系统按钮 */}
                    <p style={{display:'none'}}>  
                        <a style={{color: 'blue'}} onClick={()=>this.props.dispatch({type: 'login/logout'})}>退出登录</a>
                    </p>
                    <div className="account-content">
                        <p>待领取代金券</p>
                        <p className="account-money">8张</p>
                    </div >
                    <i></i>
                    <div className="account-content">
                        <p>券额</p>
                        <p className="account-money">￥100.00</p>
                    </div>
                    <i></i>
                    <div className="account-content" style={{borderRight:'0px'}}>
                        <p>可用资金余额</p>
                        <p className="account-money">￥150.00</p>
                    </div>
                </div>  
            </div>
            <div className="uc-message">
                <span className="text1">系统消息：</span>
                <span className="text2">[6-5]微软以75亿美元的价格收购GitHub,引发了开发者群体的关注。</span> 
                
                <Button className="buttonl">提现</Button>
                <Button type="primary" className="buttonl">充值</Button>  
            </div> 
        </div>
        <div className="w clearfix">
          {/* <LeftMenu param={this.props}/> */}
          <Switch>
            {/* 账户总览 */}
            <Route path={Path.PERSONAL_ACCOUNT} exact component={PersonAccount} />
            {/* 用户基本信息 */}
            <Route path={Path.USER_BASIC} component={UserBasic} />
            {/* 开户 */}
            <Route path={Path.OPEN_ACCOUNT+'/:type'} component={OpenAccount} />
            {/* 企业账户 */}
            <Route path={Path.COMPANY_ACCOUNT} component={CompanyAccount} />
            {/* 安全中心 */}
            <Route path={Path.SAFE_CENTER} component={SafeCenter} />
            {/* 实名认证 类型调整页面地址 */}
            <Route path={Path.REALNAME_AUTHENTICATION} component={RealName} />
            {/* 实名认证 */}
            <Route path={Path.AUTHENTICATION} component={Authentication} />
            {/* 银行卡 */}
            <Route path={Path.BANK_CARD} exact component={BankCard} />
            {/* 充值 */}
            <Route path={Path.ACCOUNT_RECHARGE} component={AccountRecharge} />
            {/* 提现 */}
            <Route path={Path.ACCOUNT_WITHDRAWALS} component={AccountWithdrawals} />
            <Route path={'/index/uCenter/test'} exact component={Test} />
            {/* 站内消息 */}
            <Route path={Path.STATION_MESSAGE} component={Message} />
            {/* 企业列表 */}
            <Route path={Path.COMPANY_LIST} component={CompanyList} />
            {/* 站内公告列表 */}
            <Route path={Path.NOTICE_LIST} component={NoticeList} />
            {/* 我的投资列表 */}
            <Route path={Path.MY_INVEST} exact component={MyInvestList} />
            {/* 平台公告列表 */}
            <Route path={Path.INCOME_PLAN} component={IncomePlan} />
            {/* 资金动态 */}
            <Route path={Path.MORE_INFO}  component={MoreInfo} />
            {/* 投资总览 */}
            <Route path={Path.ALL_INVEST}  component={AllInvest} />
            {/* 回款计划 */}
            <Route path={Path.RECEIVE_PLAN}  component={receivePlan} />
            {/* 我的优惠券 */}
            <Route path={Path.MY_COUPON}  component={myCoupon} />
 
          </Switch>
        </div>
      </div>
    );
  }
}
