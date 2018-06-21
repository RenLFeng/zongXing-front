import React from 'react';

export default class Company extends React.Component {
  render() {
    return (
      <div className="section sec-comp g">
        <div className="w col4 clearfix">
          <ul>
            <li>
              <p className="logo"><img src={require('../../assets/img/home/u209.png')} /></p>
              <h2 className="t1">银行风控</h2>
              <p className="t2">银行风控团队</p>
              <p className="t2">九大征信系统护航</p>
            </li>
            <li>
              <p className="logo"><img src={require('../../assets/img/home/u208.png')} /></p>
              <h2 className="t1">信息安全</h2>
              <p className="t2">银行级别加密</p>
              <p className="t2">三级等保备案</p>
            </li>
            <li>
              <p className="logo"><img src={require('../../assets/img/home/u207.png')} /></p>
              <h2 className="t1">真实项目</h2>
              <p className="t2">每一个借款项目，</p>
              <p className="t2">都真实可查，可跟踪</p>
            </li>
            <li>
              <p className="logo"><img src={require('../../assets/img/home/u206.png')} /></p>
              <h2 className="t1">合规运营</h2>
              <p className="t2">合规化信息披露</p>
              <p className="t2">平台运作透明、规范、稳健</p>
            </li>
          </ul>
        </div>
      </div>

    );
  }
}
