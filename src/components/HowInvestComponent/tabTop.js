import React from 'react';


export default class TabTop extends React.Component {

  render() {
    return (
      <div className="section sec-tabs">
        <div className="tabs" id="tabs">
          <div className="w">
            <a>视频展示</a>
            <a>小额分散理论</a>
            <a>复利投资理论</a>
            <a>创造价值</a>
            <a>众投好处</a>
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
                  <p className="dot">分散在不同的地域、行业<i className="i"></i></p>
                  <p className="dot">借款的个体之间分散独立<i className="i"></i></p>
                  <p className="dot">分散大大降低违约概率<i className="i"></i></p>
                  <p className="dot">分散后违约概率的算法<i className="i"></i></p>
                  <div className="info">
                    <p className="">借款的用户分散在不同的地域、行业、年龄区间，确保这些项目的独立性，相互之间没有影响。的个体之间违约的概率能够相互保持独立性，则同时违约的概率就会非常小。</p>
                    <p className="">分散、独立的借款个体，违约的概率能够保持独立性，则同时违约的概率就会非常小。</p>
                    <p className="">在保持借款个体独立性的基础上，分散可以系统性大大降低风险。</p>
                    <p className="">如果100个独立个人的违约率都是10%，那么随机挑选出其中2个人同时违约率就降低为1%（10%^2），3个人同时违约的概率降低为0.1%（10%^3），以此类推。</p>
                  </div>
                </div>
              </div>
              <div className="item shadow xiaoe">
                <div className="hd">
                  <i className="pic"><img src={require('../../assets/img/invest/xiaoe_pic.png')} /></i>
                </div>
                <div className="bd">
                  <p className="dot">单个项目借款不超过100万<i className="i"></i></p>
                  <p className="dot">单个人最多能投资一个项目的1%<i className="i"></i></p>
                  <p className="dot">小额投资，实现尽量分散<i className="i"></i></p>
                  <p className="dot">小额分散，避免小样本偏差<i className="i"></i></p>
                  <div className="info">
                    <p className="">单个项目借款不超过100万，是中国《网络借贷信息中介机构业务活动管理暂行办法》中的规定。</p>
                    <p className="">保证每个借款项目有100个以上的投资人，系统性大大降低一个人在单个项目中的投资风险。</p>
                    <p className="">系统性控制你在单个项目上的投资金额，让你有限的投资总额尽可能多的分散投资在更多的项目上。</p>
                    <p className="">“小样本偏差”：例如，平台1年累计做100亿元的借款，如果借款人平均每人借50万，就有20000个客户；如果每个借款人平均借款1000万，那么只有1000个客户。
                      统计学中的“大数定律”显示，样本个数数量需要在足够大的情况下，才能趋近正态分布。</p>
                  </div>
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
                <p className="t2">单个项目借款金额<span style={{color:"#f60"}}>不超过</span></p>
                <p className="t1"><i>￥100万</i></p>
              </div>
              <div>
                <p className="t2">单个项目每人投资金额最多<br /><span style={{color:"#f60"}}>不超过</span>该项目借款总额的</p>
                <p className="t1"><i>1%</i></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
