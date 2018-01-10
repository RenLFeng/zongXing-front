import React from 'react';


export default class Profit extends React.Component {

  render() {
    return (
      <div className="section sec-profit">
        <div className="w">
          <div className="tit">
            <i>众投的好处</i>
          </div>
          <div className="box6 clearfix">
            <div className="shadow">
              <div className="pic">
                <i className="c1"/>
              </div>
              <p className="t1">透明化</p>
              <p className="t2 lh2">真实的投资项目<br />风险和收益一目了然</p>
            </div>
            <div className="shadow">
              <div className="pic">
                <i className="c2"/>
              </div>
              <p className="t1">高回报</p>
              <p className="t2">8-15%的高收益<br />借款人的额外赠送<br />平台的意外惊喜</p>
            </div>
            <div className="shadow">
              <div className="pic">
                <i className="c3"/>
              </div>
              <p className="t1">小额投资</p>
              <p className="t2 lh2">100元起<br />投资门槛低</p>
            </div>
            <div className="shadow">
              <div className="pic">
                <i className="c4"/>
              </div>
              <p className="t1">管理风险</p>
              <p className="t2">同盾大数据风控系统<br />行业专家项目评估系统<br />互动交流实时监测系统</p>
            </div>
            <div className="shadow">
              <div className="pic">
                <i className="c5"/>
              </div>
              <p className="t1">特别优惠</p>
              <p className="t2">您出借的商家将为您<br />提供专属特别优惠</p>
            </div>
            <div className="shadow">
              <div className="pic">
                <i className="c6"/>
              </div>
              <p className="t1">分散投资</p>
              <p className="t2">小额分散，系统性<br />降低风险</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
