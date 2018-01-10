import React from 'react';

export default class Finance extends React.Component {
  render() {
    return (
      <div className="section sec-rongzi">
        <div className="w">
          <div className="center sec1">
            <h1>小微企业融资</h1>
            <p className="tit2">真正助力小微企业成长，搭建借贷平台</p>
          </div>
          <div className="textcol2 clearfix">
            <div className="fl sec2">
              <p className="tit4">众借，解决小微企业融资难题</p>
              <div className="list-dot">
                <p>想扩大你的生意、想加盟一个品牌，可以众借；</p>
                <p>有成千上百的人相信并支持你的事业；</p>
                <p>融资，无需稀释股份，还能精准营销；</p>
                <p>借款，无需抵押，无需担保，只要真实和信用</p>
              </div>
            </div>
            <div className="fr sec3">
              <p className="tit4">低成本，高效率</p>
              <div className="list-suc">
                <p>最高可达100万</p>
                <p>月利息低至0.68%</p>
                <p>线上申请，快速便捷</p>
                <p>融资过程，就是营销</p>
              </div>
              <p><a className="btn btn-green" href="">详细了解如何借款</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
