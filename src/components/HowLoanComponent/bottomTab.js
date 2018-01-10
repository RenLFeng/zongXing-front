import React from 'react';


export default class BottomTab extends React.Component {

  render() {
    return (
      <div className="section sec-tab3">
        <div className="w center">
          <div className="tab3 center">
            <i/>
            <a href="" className="hover">申请借款流程</a>
            <i/>
            <a href="">借款适用的各种场景</a>
            <i/>
            <a href="">成功案例采访</a>
            <i/>
          </div>
        </div>
        <div className="w tab3con">
          <div className="tab3con1">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide clearfix">
                  <div className="item">
                    <img className="pic" src={require('../../assets/img/finance/step1.jpg')} />
                    <p className="t1">第一步：录入借款基本项目信息</p>
                  </div>
                  <div className="item">
                    <img className="pic" src={require('../../assets/img/finance/step2.jpg')} />
                    <p className="t1">第二步：填写个人借款信息</p>
                  </div>
                  <div className="item">
                    <img className="pic" src={require('../../assets/img/finance/step3.jpg')} />
                    <p className="t1">第三步：填写企业相关资料</p>
                  </div>
                  <div className="item">
                    <img className="pic" src={require('../../assets/img/finance/step4.jpg')} />
                    <p className="t1">第四步：确认优惠券</p>
                  </div>
                </div>
                <div className="swiper-slide clearfix">
                  <div className="item">
                    <img className="pic" src={require('../../assets/img/finance/step1.jpg')} />
                    <p className="t1">第一步：录入借款基本项目信息</p>
                  </div>
                  <div className="item">
                    <img className="pic" src={require('../../assets/img/finance/step2.jpg')} />
                    <p className="t1">第二步：填写个人借款信息</p>
                  </div>
                  <div className="item">
                    <img className="pic" src={require('../../assets/img/finance/step3.jpg')} />
                    <p className="t1">第三步：填写企业相关资料</p>
                  </div>
                  <div className="item">
                    <img className="pic" src={require('../../assets/img/finance/step4.jpg')} />
                    <p className="t1">第四步：确认优惠券</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-pagination"/>
          </div>
        </div>
      </div>
    );
  }
}
