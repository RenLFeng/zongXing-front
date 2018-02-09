import React from 'react';
import '../assets/common/index';
import Coupon from '../components/subSiteComponent/coupon';
import Layout from '../components/subSiteComponent/layout';
import '../assets/subsite/index.js';
import { startPage } from  '../assets/subsite/index';

export default class subSite extends React.Component {

  componentDidMount() {
    startPage();
  }

  render(){
    return(
      <div >
        <div className="topnavs_">
          <div className="w relative">
            <p className="tright">欢迎您：<i className="cf90">dg***rt</i></p>
            <div className="rtopbtns">
              <a className="c1">领优惠券</a>
              <a className="c2">借款项目</a>
              <a className="c3">编辑模板</a>
            </div>
          </div>
          <div className="w clearfix company_nav">
            <a className="logo fl" href="/">
              <img src={require('../assets/img/subSite/logo.png')} />
            </a>
            <span className="fr">
                <a className="a1">公司简介</a>
                <a className="a1">产品展示</a>
                <a className="a1">企业荣誉</a>
                <a className="a1">最新活动</a>
            </span>
          </div>
        </div>
        <Layout />
        <div className="bodys">
          <Coupon />
        </div>
        <div className="footer">
          <div className="w sec2 center f14 c6">
            <p>版权所有&copy;深圳众鑫互联网金融服务有限公司 crowdlendingchina.com 保留所有权利。</p>
            <p>深圳众鑫互联网金融服务有限公司提供网络技术支持</p>
          </div>
        </div>
      </div>
    )
  }
}
