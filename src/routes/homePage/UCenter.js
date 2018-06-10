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
import OpenQAccount from '../../components/UCenterComponent/openQAccount';
import BindCard from '../../components/UCenterComponent/bindCard';
import CompanyAccount from '../../components/UCenterComponent/companyAccount';
import BankCard from '../../components/UCenterComponent/bankCard';
import AccountRecharge from '../../components/UCenterComponent/accountRecharge';
import AccountWithdrawals from '../../components/UCenterComponent/accountWithdrawals';
import Message from '../../components/UCenterComponent/message';
import NoticeList from '../../components/UCenterComponent/NoticeList';
import MyInvestList from '../../components/UCenterComponent/myInvestment';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import IncomePlan from '../../components/UCenterComponent/IncomePlan';
import AllInvest from '../../components/UCenterComponent/AllInvest';

import Test from '../../components/UCenterComponent/test';
import CompanyList from '../../components/UCenterComponent/companyList';
import receivePlan from '../../components/UCenterComponent/receivePlan';
//我的优惠券
import myCoupon from '../../components/UCenterComponent/mycoupon';
//项目收藏

import projectCollection from '../../components/UCenterComponent/projectcollection'; 
import Path from '../../common/pagePath';
import MoreInfo from "../../components/UCenterComponent/moreInfo";


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
        <LoginInfo/>
        <div className="w clearfix">
          {/* <LeftMenu param={this.props}/> */}
          <Switch>
            {/* 账户总览 */}
            <Route path={Path.PERSONAL_ACCOUNT} exact component={PersonAccount} />
            {/* 投资记录 */}
            <Route path={Path.MY_INVEST} exact component={MyInvestList} />


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
            <Route path={Path.OPENQACCOUNT} component={OpenQAccount} />
            <Route path={Path.BINDCARD} component={BindCard} />
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
            {/* 项目收藏 */}
            <Route path={Path.Project_Collection} component={projectCollection}/>>
 
          </Switch>
        </div>
      </div>
    );
  }
}
