import React from 'react';

import { Switch, Route, withRouter} from 'dva/router';
import {connect} from 'dva';
import {Button} from 'antd';

import '../../assets/ucenter/index';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import LoginInfo from '../../components/UCenterComponent/loginInfo';


//我的优惠券

//项目收藏

import Path from '../../common/pagePath';

import asyncComponent from '../../utils/AsyncComponent';




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
            <Route path={Path.PERSONAL_ACCOUNT} exact component={asyncComponent(()=>import('../../components/UCenterComponent/personAccount'))} />
            {/* 投资记录 */}
            <Route path={Path.INVEST_MENT} exact component={asyncComponent(()=>import('../../components/Account/investment'))} />
             {/* 回款计划 */}
             <Route path={Path.RECEIVE_PLAN}  component={asyncComponent(()=>import('../../components/Account/receivePlan'))} />
            {/* 资金动态 */}
            <Route path={Path.ACCOUNT_STATEMENT}  component={asyncComponent(()=>import("../../components/Account/accountstatement"))} />
            {/* 我的优惠券 */}
            <Route path={Path.MY_COUPON}  component={asyncComponent(()=>import('../../components/UCenterComponent/mycoupon'))} />
            {/* 项目收藏 */}
            <Route path={Path.Project_Collection} component={asyncComponent(()=>import('../../components/UCenterComponent/projectcollection'))}/>
            {/* 我的邀请码 */}
            <Route path={Path.My_INVITATION_CODE} component={asyncComponent(()=>import('../../components/UCenterComponent/myInvitationCode'))}/>

            {/* 用户基本信息 */}
            <Route path={Path.USER_BASIC} component={asyncComponent(()=>import('../../components/UCenterComponent/userBasic'))} />
            {/* 修改登陆密码 */}
            <Route path={Path.CHANGE_LPWD} component={asyncComponent(()=>import('../../components/UCenterComponent/changeLoginPwd'))} />  
             {/* 邮箱绑定 */}
             <Route path={Path.BIND_EMAIL} component={asyncComponent(()=>import('../../components/UCenterComponent/bindEmail'))} />    
            {/* 变更邮箱绑定 */}
            <Route path={Path.CHANGE_BINDEMAIL} component={asyncComponent(()=>import('../../components/UCenterComponent/changeBindEmail'))} />      
            {/* 开户 */}
            <Route path={Path.OPEN_ACCOUNT+'/:type'} component={asyncComponent(()=>import('../../components/UCenterComponent/openAccount'))} />
            {/* 企业账户 */}
            <Route path={Path.COMPANY_ACCOUNT} component={asyncComponent(()=>import('../../components/UCenterComponent/companyAccount'))} />
            {/* 安全中心 */}
            <Route path={Path.SAFE_CENTER} component={asyncComponent(()=>import('../../components/UCenterComponent/safeCenter'))} />
             {/* 绑定成功界面 */}
             <Route path={Path.BIND_SUCCESS} component={asyncComponent(()=>import('../../components/UCenterComponent/bindSuccess'))} />
            {/* 实名认证 类型调整页面地址 */}
            <Route path={Path.REALNAME_AUTHENTICATION} component={asyncComponent(()=>import('../../components/UCenterComponent/realName'))} />
            {/* 实名认证 */}
            <Route path={Path.AUTHENTICATION} component={asyncComponent(()=>import('../../components/UCenterComponent/authentication'))} />
            <Route path={Path.OPENQACCOUNT} component={asyncComponent(()=>import('../../components/UCenterComponent/openQAccount'))} />
            <Route path={Path.BINDCARD} component={asyncComponent(()=>import('../../components/UCenterComponent/bindCard'))} />
            <Route path={Path.BANK_CARD} exact component={asyncComponent(()=>import('../../components/UCenterComponent/bankCard'))} />
             {/* IP记录 */}
            <Route path={Path.IPRECORD} exact component={asyncComponent(()=>import('../../components/UCenterComponent/IPRecord'))} />
            {/* 券额明细 */}
            <Route path={Path.VOUCHER} exact component={asyncComponent(()=>import('../../components/UCenterComponent/voucher'))} />
            {/* 平台通知 */}
            <Route path={Path.PLATFORM_NOTICE} exact component={asyncComponent(()=>import('../../components/UCenterComponent/platformNotice'))} />
             {/* 站内通知 */}
             <Route path={Path.SITE_NOTICE} exact component={asyncComponent(()=>import('../../components/UCenterComponent/siteNotice'))} />
            {/* 充值 */}
            <Route path={Path.ACCOUNT_RECHARGE} component={asyncComponent(()=>import('../../components/UCenterComponent/accountRecharge'))} />
            {/* 提现 */}
            <Route path={Path.ACCOUNT_WITHDRAWALS} component={asyncComponent(()=>import('../../components/UCenterComponent/accountWithdrawals'))} />
            {/* 站内消息 */}
            <Route path={Path.STATION_MESSAGE} component={asyncComponent(()=>import('../../components/UCenterComponent/message'))} />
            {/* 企业列表 */}
            <Route path={Path.COMPANY_LIST} component={asyncComponent(()=>import('../../components/UCenterComponent/companyList'))} />
            {/* 站内公告列表 */}
            <Route path={Path.NOTICE_LIST} component={asyncComponent(()=>import('../../components/UCenterComponent/NoticeList'))} />
           
            {/* 平台公告列表 */}
            <Route path={Path.INCOME_PLAN} component={asyncComponent(()=>import('../../components/UCenterComponent/IncomePlan'))} /> 
            {/* 投资总览 */}
            <Route path={Path.ALL_INVEST}  component={asyncComponent(()=>import('../../components/UCenterComponent/AllInvest'))} />
           
          </Switch>
        </div>
      </div>
    );
  }
}
