
import React from 'react';
import { Link } from 'dva/router';
import Path from '../../common/pagePath';
export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {param} = this.props;
    const path = param.location.pathname;
    return (
      <div className="fl uc-lbody">
        <div className="navbox">
          <p className="hd ic1 hover">
            <a>帐户总览</a>
          </p>
          <div className="nav">
            <ul>
              <li><Link className={path.indexOf(Path.OPEN_ACCOUNT)===-1?'':'hover'} to={Path.OPEN_ACCOUNT+'/0'}>账户开户</Link></li>
              <li><Link className={path.indexOf(Path.PERSONAL_ACCOUNT)===-1?'':'hover'} to={Path.PERSONAL_ACCOUNT}>个人账户</Link></li>
              <li><Link className={path.indexOf(Path.COMPANY_ACCOUNT)===-1?'':'hover'} to={Path.COMPANY_ACCOUNT}>企业账户</Link></li>
            </ul>
          </div>
        </div>
        <div className="navbox">
          <p className="hd ic2 hover">
            <a>个人中心</a>
          </p>
          <div className="nav">
            <ul>
              <li><Link className={path.indexOf(Path.USER_BASIC)===-1?'':'hover'} to={Path.USER_BASIC}>基础资料</Link></li>
              <li><Link className={path.indexOf(Path.SAFE_CENTER)===-1?'':'hover'} to={Path.SAFE_CENTER}>安全中心</Link></li>
              <li><Link className={path.indexOf(Path.BANK_CARD)===-1?'':'hover'} to={Path.BANK_CARD}>银行卡</Link></li>
              <li><a>站内消息</a></li>
            </ul>
          </div>
        </div>
        <div className="navbox">
          <p className="hd ic3 hover">
            <a>资金管理</a>
          </p>
          <div className="nav">
            <ul>
              <li className="folder hover">
                <a>个人账户</a>
                <ul>
                  <li><Link className={path.indexOf(Path.ACCOUNT_RECHARGE+'/0')===-1?'':'hover'} to={Path.ACCOUNT_RECHARGE + '/0'}>充值</Link></li>
                  <li><Link className={path.indexOf(Path.ACCOUNT_WITHDRAWALS+'/0')===-1?'':'hover'} to={Path.ACCOUNT_WITHDRAWALS + '/0'}>提现</Link></li>
                  <li><a>收支明细</a></li>
                </ul>
              </li>
              <li className="folder">
                <a>企业账户</a>
                <ul>
                  <li><Link className={path.indexOf(Path.ACCOUNT_RECHARGE+'/1')===-1?'':'hover'} to={Path.ACCOUNT_RECHARGE + '/1'}>充值</Link></li>
                  <li><Link className={path.indexOf(Path.ACCOUNT_WITHDRAWALS+'/1')===-1?'':'hover'} to={Path.ACCOUNT_WITHDRAWALS + '/1'}>提现</Link></li>
                  <li><a>收支明细</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbox">
          <p className="hd ic4 hover">
            <a>我的投资</a>
          </p>
          <div className="nav">
            <ul>
              <li><a>我的投资</a></li>
              <li><a>投资统计</a></li>
              <li><a>投资总览</a></li>
            </ul>
          </div>
        </div>
        <div className="navbox">
          <p className="hd ic5 hover">
            <a>我的借款</a>
          </p>
          <div className="nav">
            <ul>
              <li><a>我的借款</a></li>
              <li><a>还款管理</a></li>
              <li><a>自动还款</a></li>
            </ul>
          </div>
        </div>
        <div className="navbox">
          <p className="hd ic6">
            <a>我的收藏</a>
          </p>
        </div>
        <div className="navbox">
          <p className="hd ic7">
            <a>我的优惠券</a>
          </p>
        </div>
      </div>
    );
  }
}
