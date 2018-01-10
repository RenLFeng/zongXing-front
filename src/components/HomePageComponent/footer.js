import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="footer">
        <div className="w">
          <div className="sec1 clearfix">
            <div className="fl col1">
              <div>
                <a href="/" className="logo">
                  <img src={require('../../assets/img/logo2.png')} />
                </a>
              </div>
              <div>
                <a className="ic ic_wx"/>
                <a className="ic ic_weibo"/>
                <a className="ic ic_print"/>
              </div>
            </div>
            <div className="fl col2">
              <p className="hd"/>
              <ul>
                <li className="tit"><a href="">公司</a></li>
                <li><a href="">公司介绍</a></li>
                <li><a href="">合作伙伴</a></li>
                <li><a href="">专业导师</a></li>
                <li><a href="">其他</a></li>
              </ul>
              <ul>
                <li className="tit"><a href="">资源</a></li>
                <li><a href="">常见问题</a></li>
                <li><a href="">成功故事</a></li>
                <li><a href="">统计</a></li>
                <li><a href="">行业报道</a></li>
              </ul>
              <ul>
                <li className="tit"><a href="">法律</a></li>
                <li><a href="">法律法规</a></li>
                <li><a href="">服务条款</a></li>
                <li><a href="">安全保障</a></li>
              </ul>
            </div>
            <div className="fr col3">
              <div className="wxcode">
                <img src={require('../../assets/img/wx_code.png')} />
                <p className="center f14">微信公众号</p>
              </div>
            </div>
          </div>
        </div>
        <div className="line"/>
        <div className="w sec2">
          <p className="center f14 c6">版权所有&copy;深圳众鑫互联网金融服务有限公司 crowdlendingchina.com 保留所有权利。</p>
        </div>
      </div>
    );
  }
}
