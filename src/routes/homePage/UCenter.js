import React from 'react';

import { Switch, Route, withRouter} from 'dva/router';
import {connect} from 'dva';
import {Button} from 'antd';

import '../../assets/ucenter/index';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import Loadable from 'react-loadable';
import { getLoginData } from '../../services/api.js';

//项目收藏
import Path from '../../common/pagePath';

function loading() {
  return <p></p>
}
const Personal = Loadable({loader: () => import('../../components/UCenterComponent/personAccount'),loading: loading});

@connect(()=>({}))
export default class UCenter extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(()=>{
      this.initPage();
    }, 200);
  }


  async reashLoginData(){
    const response = await getLoginData(); 
    if (response.code === 0) {
        this.props.dispatch({type: 'login/saveLoadingDataAfter', response: response.data})
    }
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
            
            {/* 投资记录 */}
            <Route path={Path.INVEST_MENT} exact component={Loadable({loader: () => import('../../components/Account/investment'),loading: loading})} />
            {/* 账户总览 */}
            <Route path={Path.PERSONAL_ACCOUNT} exact component={Personal} />
             {/* 回款计划 */}
             <Route path={Path.RECEIVE_PLAN}  component={Loadable({loader: () => import('../../components/Account/receivePlan'),loading: loading})} />
            {/* 资金动态 */}
            <Route path={Path.ACCOUNT_STATEMENT}  component={Loadable({loader: () => import("../../components/Account/accountstatement"),loading: loading})} />
            {/* 我的优惠券 */}
            <Route path={Path.MY_COUPON}  component={Loadable({loader: () => import('../../components/UCenterComponent/mycoupon'),loading: loading})} />
            {/* 项目收藏 */}
            <Route path={Path.Project_Collection} component={Loadable({loader: () => import('../../components/UCenterComponent/projectcollection'),loading: loading})}/>
            {/* 我的邀请码 */}
            <Route path={Path.My_INVITATION_CODE} component={Loadable({loader: () => import('../../components/UCenterComponent/myInvitationCode'),loading: loading})}/>
            {/* 用户基本信息 */}
            <Route path={Path.USER_BASIC} component={Loadable({loader: () => import('../../components/UCenterComponent/userBasic'),loading: loading})} />
            {/* 修改登陆密码 */}
            <Route path={Path.CHANGE_LPWD} component={Loadable({loader: () => import('../../components/UCenterComponent/changeLoginPwd'),loading: loading})} />  
             {/* 邮箱绑定 */}
             <Route path={Path.BIND_EMAIL} component={Loadable({loader: () => import('../../components/UCenterComponent/bindEmail'),loading: loading})} />    
            {/* 变更邮箱绑定 */}
            <Route path={Path.CHANGE_BINDEMAIL} component={Loadable({loader: () => import('../../components/UCenterComponent/changeBindEmail'),loading: loading})} />      
            {/* 开户 */}
            <Route path={Path.OPEN_ACCOUNT+'/:type'} component={Loadable({loader: () => import('../../components/UCenterComponent/openAccount'),loading: loading})} />
            {/* 企业账户 */}
            <Route path={Path.COMPANY_ACCOUNT} component={Loadable({loader: () => import('../../components/UCenterComponent/companyAccount'),loading: loading})} />
            {/* 安全中心 */}
            <Route path={Path.SAFE_CENTER} component={Loadable({loader: () => import('../../components/UCenterComponent/safeCenter'),loading: loading})} />
             {/* 绑定成功界面 */}
             <Route path={Path.BIND_SUCCESS} component={Loadable({loader: () => import('../../components/UCenterComponent/bindSuccess'),loading: loading})} />
            {/* 实名认证 类型调整页面地址 */}
            <Route path={Path.REALNAME_AUTHENTICATION} component={Loadable({loader: () => import('../../components/UCenterComponent/realName'),loading: loading})} />
            {/* 实名认证 */}
            <Route path={Path.AUTHENTICATION} component={Loadable({loader: () => import('../../components/UCenterComponent/authentication'),loading: loading})} />
            <Route path={Path.OPENQACCOUNT} component={Loadable({loader: () => import('../../components/UCenterComponent/openQAccount'),loading: loading})} />
            <Route path={Path.BINDCARD} component={Loadable({loader: () => import('../../components/UCenterComponent/bindCard'),loading: loading})} />
            <Route path={Path.BANK_CARD} exact component={Loadable({loader: () => import('../../components/UCenterComponent/bankCard'),loading: loading})} />
             {/* IP记录 */}
            <Route path={Path.IPRECORD} exact component={Loadable({loader: () => import('../../components/UCenterComponent/IPRecord'),loading: loading})} />
            {/* 券额明细 */}
            <Route path={Path.VOUCHER} exact component={Loadable({loader: () => import('../../components/UCenterComponent/voucher'),loading: loading})} />
            {/* 平台通知 */}
            <Route path={Path.PLATFORM_NOTICE} exact component={Loadable({loader: () => import('../../components/UCenterComponent/platformNotice'),loading: loading})} />
             {/* 站内通知 */}
             <Route path={Path.SITE_NOTICE} exact component={Loadable({loader: () => import('../../components/UCenterComponent/siteNotice'),loading: loading})} />
            {/* 充值 */}
            <Route path={Path.ACCOUNT_RECHARGE} component={Loadable({loader: () => import('../../components/UCenterComponent/accountRecharge'),loading: loading})} />
            {/* 提现 */}
            <Route path={Path.ACCOUNT_WITHDRAWALS} component={Loadable({loader: () => import('../../components/UCenterComponent/accountWithdrawals'),loading: loading})} />
            {/* 站内消息 */}
            <Route path={Path.STATION_MESSAGE} component={Loadable({loader: () => import('../../components/UCenterComponent/message'),loading: loading})} />
            {/* 企业列表 */}
            <Route path={Path.COMPANY_LIST} component={Loadable({loader: () => import('../../components/UCenterComponent/companyList'),loading: loading})} />
            {/* 站内公告列表 */}
            <Route path={Path.NOTICE_LIST} component={Loadable({loader: () => import('../../components/UCenterComponent/NoticeList'),loading: loading})} />
           
            {/* 平台公告列表 */}
            <Route path={Path.INCOME_PLAN} component={Loadable({loader: () => import('../../components/UCenterComponent/IncomePlan'),loading: loading})} /> 
            {/* 投资总览 */}
            <Route path={Path.ALL_INVEST}  component={Loadable({loader: () => import('../../components/UCenterComponent/AllInvest'),loading: loading})} />
           
          </Switch>
        </div>
      </div>
    );
  }
}
