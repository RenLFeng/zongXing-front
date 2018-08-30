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
const Mycoupon = Loadable({loader: () => import('../../components/UCenterComponent/mycoupon'),loading: loading});
const Receive = Loadable({loader: () => import('../../components/Account/receivePlan'),loading: loading});
const Investment = Loadable({loader: () => import('../../components/Account/investment'),loading: loading});
const Accountstatement = Loadable({loader: () => import("../../components/Account/accountstatement"),loading: loading});
const Projectcollection = Loadable({loader: () => import('../../components/UCenterComponent/projectcollection'),loading: loading});
const MyInvitationCode = Loadable({loader: () => import('../../components/UCenterComponent/myInvitationCode'),loading: loading});
const UserBasic = Loadable({loader: () => import('../../components/UCenterComponent/userBasic'),loading: loading});
const ChangeLoginPwd = Loadable({loader: () => import('../../components/UCenterComponent/changeLoginPwd'),loading: loading});
const BindEmail = Loadable({loader: () => import('../../components/UCenterComponent/bindEmail'),loading: loading});
const ChangeBindEmail = Loadable({loader: () => import('../../components/UCenterComponent/changeBindEmail'),loading: loading})
const OpenAccount = Loadable({loader: () => import('../../components/UCenterComponent/openAccount'),loading: loading});
const SafeCenter = Loadable({loader: () => import('../../components/UCenterComponent/safeCenter'),loading: loading})
const BindSuccess = Loadable({loader: () => import('../../components/UCenterComponent/bindSuccess'),loading: loading})
const RealName = Loadable({loader: () => import('../../components/UCenterComponent/realName'),loading: loading})
const Authentication = Loadable({loader: () => import('../../components/UCenterComponent/authentication'),loading: loading})
const OpenQAccount = Loadable({loader: () => import('../../components/UCenterComponent/openQAccount'),loading: loading})
const BindCard = Loadable({loader: () => import('../../components/UCenterComponent/bindCard'),loading: loading})
const BankCard = Loadable({loader: () => import('../../components/UCenterComponent/bankCard'),loading: loading})
const IPRecord = Loadable({loader: () => import('../../components/UCenterComponent/IPRecord'),loading: loading})
const Voucher = Loadable({loader: () => import('../../components/UCenterComponent/voucher'),loading: loading})
const PlatformNotice = Loadable({loader: () => import('../../components/UCenterComponent/platformNotice'),loading: loading});
const SiteNotice = Loadable({loader: () => import('../../components/UCenterComponent/siteNotice'),loading: loading});
const AccountRecharge = Loadable({loader: () => import('../../components/UCenterComponent/accountRecharge'),loading: loading});
const AccountWithdrawals = Loadable({loader: () => import('../../components/UCenterComponent/accountWithdrawals'),loading: loading});
const Message= Loadable({loader: () => import('../../components/UCenterComponent/message'),loading: loading});
const NoticeList = Loadable({loader: () => import('../../components/UCenterComponent/NoticeList'),loading: loading});
const IncomePlan = Loadable({loader: () => import('../../components/UCenterComponent/IncomePlan'),loading: loading});
const AllInvest = Loadable({loader: () => import('../../components/UCenterComponent/AllInvest'),loading: loading});

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
            <Route path={Path.INVEST_MENT} exact component={Investment} />
            {/* 账户总览 */}
            <Route path={Path.PERSONAL_ACCOUNT} exact component={Personal} />
             {/* 回款计划 */}
             <Route path={Path.RECEIVE_PLAN}  component={Receive} />
            {/* 资金动态 */}
            <Route path={Path.ACCOUNT_STATEMENT}  component={Accountstatement} />
            {/* 我的优惠券 */}
            <Route path={Path.MY_COUPON}  component={Mycoupon} />
            {/* 项目收藏 */}
            <Route path={Path.Project_Collection} component={Projectcollection}/>
            {/* 我的邀请码 */}
            <Route path={Path.My_INVITATION_CODE} component={MyInvitationCode}/>
            {/* 用户基本信息 */}
            <Route path={Path.USER_BASIC} component={UserBasic} />
            {/* 修改登陆密码 */}
            <Route path={Path.CHANGE_LPWD} component={ChangeLoginPwd} />  
             {/* 邮箱绑定 */}
             <Route path={Path.BIND_EMAIL} component={BindEmail} />    
            {/* 变更邮箱绑定 */}
            <Route path={Path.CHANGE_BINDEMAIL} component={ChangeBindEmail} />      
            {/* 开户 */}
            <Route path={Path.OPEN_ACCOUNT+'/:type'} component={OpenAccount} />
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
            <Route path={Path.IPRECORD} exact component={IPRecord} />
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
            {/* 站内消息 */}
            <Route path={Path.STATION_MESSAGE} component={Message} />
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
