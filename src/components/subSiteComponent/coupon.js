import React from 'react';

export default class Coupon extends React.Component {
  render(){
    return(
      <div>
        <div className="subsite-coupon shadow">
          <a className="close"></a>
          <p className="center tit">还剩<i>4353</i>张</p>
          <p>
            <a href="">
              <img className="pic" src={require('../../assets/img/subSite/cp1.png')} />
            </a>
          </p>
          <p>
            <a href="">
              <img className="pic" src={require('../../assets/img/subSite/cp2.png')} />
            </a>
          </p>
          <p>
            <a href="">
              <img className="pic" src={require('../../assets/img/subSite/cp3.png')} />
            </a>
          </p>
          <p className="line"><i>使用说明</i></p>
          <p className="desc">1. 本券结账前请出示。2. 本券不兑换现金、不找零。3. 使用本券消费时单提交时，在满足优惠券设定的使用条件下使用优惠券，可以减免一定的金额。</p>
        </div>
      </div>
    )
  }
}
