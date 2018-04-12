import React from 'react';

import { Switch, Route, withRouter} from 'dva/router';
import {connect} from 'dva';

import '../../assets/ucenter/index';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import PersonAccount from '../../components/UCenterComponent/personAccount';
import UserBasic from '../../components/UCenterComponent/userBasic';
import OpenAccount from '../../components/UCenterComponent/openAccount';
import SafeCenter from '../../components/UCenterComponent/safeCenter';
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
import receivePlan from '../../components/UCenterComponent/receivePlan'

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
            <a className="fl"><img className="av" src={require('../../assets/img/ucenter/av1.png')} /></a>
            <div className="fl">
              <p className="t1">{nickName}</p>
              <p className="t2">
                <i><b>0</b>封未读信息</i>
              </p>
            </div>
            <div className="fr">
              <p>
                {/*<i>上次登录时间：<b>2018-01-12</b></i>*/}
                {/*<i>IP：<b>140.22.33.101</b></i>*/}
                {/*<i>地点：<b>北京</b></i>*/}
                <a style={{color: 'blue'}} onClick={()=>this.props.dispatch({type: 'login/logout'})}>退出登录</a>
              </p>
            </div>
          </div>
        </div>
        <div className="w clearfix">
          <LeftMenu param={this.props}/>
          <Switch>
            <Route path={Path.PERSONAL_ACCOUNT} exact component={PersonAccount} />
            <Route path={Path.USER_BASIC} component={UserBasic} />
            <Route path={Path.OPEN_ACCOUNT+'/:type'} component={OpenAccount} />
            <Route path={Path.COMPANY_ACCOUNT} component={CompanyAccount} />
            <Route path={Path.SAFE_CENTER} component={SafeCenter} />
            <Route path={Path.BANK_CARD} exact component={BankCard} />
            <Route path={Path.ACCOUNT_RECHARGE} component={AccountRecharge} />
            <Route path={Path.ACCOUNT_WITHDRAWALS} component={AccountWithdrawals} />
            <Route path={'/index/uCenter/test'} exact component={Test} />
            <Route path={Path.STATION_MESSAGE} component={Message} />
            <Route path={Path.COMPANY_LIST} component={CompanyList} />
            <Route path={Path.NOTICE_LIST} component={NoticeList} />
            <Route path={Path.MY_INVEST} exact component={MyInvestList} />
            <Route path={Path.INCOME_PLAN} component={IncomePlan} />
            <Route path={Path.MORE_INFO}  component={MoreInfo} />
            <Route path={Path.ALL_INVEST}  component={AllInvest} />
            <Route path={Path.RECEIVE_PLAN}  component={receivePlan} />
          </Switch>
        </div>
      </div>
    );
  }
}
