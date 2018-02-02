import React from 'react';


export default class TabTop extends React.Component {

  render() {
    return (
      <div className="section sec-tabs">
        <div className="tabs">
          <div className="w">
            <a>小额分散理论</a>
            <a>复利投资理论</a>
            <a>创造价值</a>
            <a>众投好处</a>
            <a>视频展示</a>
            <a>投资人手册</a>
          </div>
        </div>
        <div className="tabcon">

          <div className="card2">
            <div className="w">
              <div className="item shadow fensan">
                <div className="hd">
                  <i className="pic"><img src={require('../../assets/img/invest/fensan_pic.png')} /></i>
                </div>
                <div className="bd">
                  <p>
                    在风险控制方面的好处：借款的客户分散在不同的低于、行业、年龄区间，这些分散独立的个体之间违约的概率就会非常小。
                    比如：100个独立了个人的违约概率都是10%，那么随机挑选出其中2个人同时违约的概率为1%（10%^2），3个人同时违约的概率为0.1%（10%^3），4个人同时违约的概率为0.01%（10%^4）。
                    如果这100个人的违约存在相关性，比如在A违约时B也会违约的概率是50%，那么随机跳出来的这4个人同时违约的概率就会上升到5%（10%x50%=5%，而不是0.01%）。
                    因此保持不同借款主体之间的独立性非常重要。
                  </p>
                </div>
              </div>
              <div className="item shadow xiaoe">
                <div className="hd">
                  <i className="pic"><img src={require('../../assets/img/invest/xiaoe_pic.png')} /></i>
                </div>
                <div className="bd">
                  <p>
                    在风险控制上的重要性：这是为避免统计学上的“小样本偏差”。例如，平台一年一共做10亿元的借款，如果借款人平均每个项目借30万，就是3333个借款项目，如果单笔借款是1000万的话，就是100个借款项目。
                    统计学中有一个“大数定律”，即样本个数数量在足够大的情况下，才能趋近正态分布，统计学上才有意义。
                    因此，假设借款人的坏账率都是2%，则放款给3333个客户，其坏账率为2%的可能性要远高于仅放款给100个客户的可能性，并且这100个人坏账比较集中，坏账占比可能达到10%甚至更高，这就是统计学意义上的“小样本偏差”风险。
                    对应到众借帮，就是坚持两个原则：一是单个项目借款金额不超过100万；二是单个项目每个人投资金额最多不超过该项目借款总额的1%，比如一个项目借款30万，那么单个人在这个项目上可投资的最大金额就是3000元（30万×1%）。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="w">
            <div className="tit">
              <i>对应到众借帮，就是坚持两个原则</i>
            </div>
            <div className="rule2 clearfix">
              <div>
                <p className="t1"><i>￥100万</i></p>
                <p className="t2">是单个项目借款金额不超过</p>
              </div>
              <div>
                <p className="t1"><i>1%</i></p>
                <p className="t2">是单个项目每个人投资金额最多<br />不超过该项目借款总额的</p>
              </div>
            </div>
            <p className="desc">比如一个项目借款30万，那么单个人在这个项目上可投资的最大金额就是3000元（30万x1%）</p>
          </div>
        </div>
      </div>
    );
  }
}
