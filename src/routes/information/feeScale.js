import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/common/textInfo.scss'
import '../../assets/infor/common/feeScale.scss'
export default class feeScale extends React.Component {
  render() {
    return(
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
                    <li className="tix clearfix">
                    <span className="fl t1 l">提现</span>
                    <a className="fr">
                      <p className="clearfix"><span className="t2 f">投资人</span>  <span className="t2 l">每月免费提现3次，超过3次，提现收取0.25%服务费，最低2元</span></p>
                      <p className="clearfix"><span className="t2 f">借款人</span>  <span className="t2 l">提现收取0.25%服务费，最低2元</span></p>
                    </a>
                    </li>
                    <li className="tix clearfix">
                      <span className="fl t1 l">服务费</span>
                      <a className="fr">
                        <p className="clearfix"><span className="t2 f">投资人</span>  <span className="t2 l">众杰帮平台收报投资从利息5%</span></p>
                        <p className="clearfix"><span className="t2 f">借款人</span>  <span className="t2 l">众杰帮平台对借款人收费不超过5%</span></p>
                      </a>
                    </li>
                    <li><span className="f">借款人大数据风控费</span><span className="l">88元/笔</span></li>
                  </ul>
                </div>
              </div>
            </div>
      </div>
    )
  }
}
