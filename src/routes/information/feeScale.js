import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/common/textInfo.scss'
import '../../assets/infor/common/feeScale.scss'
export default class feeScale extends React.Component {
  render() {
    return(
      <div className="infor">
        <div  className="w clearfix ">
          {/* <LeftMenu param={this.props}/> */}
          <div className="fr feeScale">
            <h2><span>收费标准</span><i></i><span className="last"></span></h2>
            <div className="container">
              <div className="content-box">
                <div className="content">
                  <p className="tit">收费标准</p>
                  <ul className="top1">
                    <li className="head"><span>业务类型</span><span>资费标准</span></li>
                    <li><span className="f">用户注册</span><span className="l">免费</span></li>
                    <li><span className="f">投标</span><span className="l">免费</span></li>
                    <li><span className="f">开通存管帐户</span><span className="l">免费</span></li>
                    <li><span className="f">回款到账</span><span className="l">免费</span></li>
                    <li><span className="f">充值</span><span className="l">免费</span></li>
                    <li className="tix">
                      <span className="f">提现</span>
                      <a>
                        <span>投资人</span>
                        <span className="l">每月免费提现3次，超过3次，提现收取0.25%服务费，最低2元</span>
                      </a>
                      <a>
                        <span>借款人</span>
                        <span className="l">每月免费提现3次，超过3次，提现收取0.25%服务费，最低2元</span>
                      </a>
                    </li>
                  </ul>
                  <ul className="top2">

                  </ul>
                  <ul className="top3">

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
