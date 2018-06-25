import React from 'react';

import { Switch, Route, withRouter} from 'dva/router';
import {connect} from 'dva';
import {Button} from 'antd';

import '../../assets/ucenter/index';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import PersonAccount from '../../components/UCenterComponent/personAccount';
import UserBasic from '../../components/UCenterComponent/userBasic';
import ChangeLPwd from '../../components/UCenterComponent/changeLoginPwd';
import ChangeBindEmail from '../../components/UCenterComponent/changeBindEmail';
import BindEmail from '../../components/UCenterComponent/bindEmail';
import OpenAccount from '../../components/UCenterComponent/openAccount';
import SafeCenter from '../../components/UCenterComponent/safeCenter';
import RealName from '../../components/UCenterComponent/realName';
import Authentication from '../../components/UCenterComponent/authentication';
import OpenQAccount from '../../components/UCenterComponent/openQAccount';
import IpRecord from '../../components/UCenterComponent/IPRecord';
import Voucher from '../../components/UCenterComponent/voucher';
import PlatformNotice from '../../components/UCenterComponent/platformNotice';
import SiteNotice from '../../components/UCenterComponent/siteNotice';
import BindCard from '../../components/UCenterComponent/bindCard';
import CompanyAccount from '../../components/UCenterComponent/companyAccount';
import BankCard from '../../components/UCenterComponent/bankCard';
import AccountRecharge from '../../components/UCenterComponent/accountRecharge';
import AccountWithdrawals from '../../components/UCenterComponent/accountWithdrawals';
import Message from '../../components/UCenterComponent/message';
import NoticeList from '../../components/UCenterComponent/NoticeList';
import InvestMent from '../../components/Account/investment';
import receivePlan from '../../components/Account/receivePlan';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import IncomePlan from '../../components/UCenterComponent/IncomePlan';
import AllInvest from '../../components/UCenterComponent/AllInvest';
import Test from '../../components/UCenterComponent/test';
import CompanyList from '../../components/UCenterComponent/companyList';
import BindSuccess from '../../components/UCenterComponent/bindSuccess';

//我的优惠券
import myCoupon from '../../components/UCenterComponent/mycoupon';
//项目收藏

import projectCollection from '../../components/UCenterComponent/projectcollection'; 
import Path from '../../common/pagePath';
import AccountStatement from "../../components/Account/accountstatement";



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
    const { match, nickName, showMask} = this.props;
 
    return (
      <div className="body2">
        <LoginInfo history={this.props.history}/>
        <div className="w clearfix">
          {/* <LeftMenu param={this.props}/> */}
          <Switch>
            {/* 账户总览 */}
            <Route path={Path.PERSONAL_ACCOUNT} exact component={PersonAccount} />
            {/* 投资记录 */}
            <Route path={Path.INVEST_MENT} exact component={InvestMent} />
             {/* 回款计划 */}
             <Route path={Path.RECEIVE_PLAN}  component={receivePlan} />
            {/* 资金动态 */}
            <Route path={Path.ACCOUNT_STATEMENT}  component={AccountStatement} />
            {/* 我的优惠券 */}
            <Route path={Path.MY_COUPON}  component={myCoupon} />
            {/* 项目收藏 */}
            <Route path={Path.Project_Collection} component={projectCollection}/>

            {/* 用户基本信息 */}
            <Route path={Path.USER_BASIC} component={UserBasic} />
            {/* 修改登陆密码 */}
            <Route path={Path.CHANGE_LPWD} component={ChangeLPwd} />  
             {/* 邮箱绑定 */}
             <Route path={Path.BIND_EMAIL} component={BindEmail} />    
            {/* 变更邮箱绑定 */}
            <Route path={Path.CHANGE_BINDEMAIL} component={ChangeBindEmail} />      
            {/* 开户 */}
            <Route path={Path.OPEN_ACCOUNT+'/:type'} component={OpenAccount} />
            {/* 企业账户 */}
            <Route path={Path.COMPANY_ACCOUNT} component={CompanyAccount} />
            {/* 安全中心 */}
            <Route path={Path.SAFE_CENTER} component={SafeCenter} />
             {/* 绑定成功界面 */}
             <Route path={Path.BIND_SUCCESS} component={BindSuccess} />
            {/* 实名认证 类型调整页面地址 */}
            <Route path={Path.REALNAME_AUTHENTICATION} component={RealName} />
            {/* 实名认证 */}
            <Route path={Path.AUTHENTICATION} component={Authentication} />
            <Route path={Path.OPENQACCOUNT} component={OpenQAccount} />
            <Route path={Path.BINDCARD} component={BindCard} />
            <Route path={Path.BANK_CARD} exact component={BankCard} />
             {/* IP记录 */}
            <Route path={Path.IPRECORD} exact component={IpRecord} />
            {/* 券额明细 */}
            <Route path={Path.VOUCHER} exact component={Voucher} />
            {/* 平台通知 */}
            <Route path={Path.PLATFORM_NOTICE} exact component={PlatformNotice} />
             {/* 站内通知 */}
             <Route path={Path.SITE_NOTICE} exact component={SiteNotice} />
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
            {/* 投资总览 */}
            <Route path={Path.ALL_INVEST}  component={AllInvest} />
           
          </Switch>
        </div>
      </div>
    );
  }
}
