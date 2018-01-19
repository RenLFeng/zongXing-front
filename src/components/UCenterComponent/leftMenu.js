
import React from 'react';
import { Link } from 'dva/router';


export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="fl uc-lbody">
        <div className="navbox">
          <p className="hd ic1">
            <a>帐户总览</a>
          </p>
          <div className="nav">
            <ul>
              <li><a>账户开户</a></li>
              <li><a>个人账户</a></li>
              <li><a>企业账户</a></li>
            </ul>
          </div>
        </div>
        <div className="navbox">
          <p className="hd ic2 hover">
            <a>个人中心</a>
          </p>
          <div className="nav">
            <ul>
              <li><Link to={`/index/uCenter/userBasic`}>基础资料</Link></li>
              <li><a>安全中心</a></li>
              <li><a>银行卡</a></li>
              <li><a>站内消息</a></li>
              <li><a>站内公告</a></li>
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
                <Link className="hover" to={'/index/uCenter/personAccount'}>个人账户</Link>
                <ul>
                  <li><a>充值</a></li>
                  <li><a>提现</a></li>
                  <li><a>收支明细</a></li>
                </ul>
              </li>
              <li className="folder">
                <a>企业账户</a>
                <ul>
                  <li><a>充值</a></li>
                  <li><a>提现</a></li>
                  <li><a>收支明细</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbox">
          <p className="hd ic4">
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
          <p className="hd ic5">
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
