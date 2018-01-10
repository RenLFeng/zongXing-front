import React from 'react';


export default class TopTab extends React.Component {

  render() {
    return (
      <div className="section sec-tabs">
        <div className="tabs">
          <div className="w">
            <a className="hover">客户需求</a>
            <a>创造价值</a>
            <a>众借好处</a>
            <a>视频展示</a>
            <a>借款人手册</a>
          </div>
        </div>
        <div className="tabcon1">
          <div className="sec1">
            <div className="w clearfix">
              <div className="fl tright">
                <img className="pic" src={require('../../assets/img/finance/pic2.jpg')} />
              </div>
              <div className="fr">
                <p>
                  我想在武汉加盟“咖啡之翼”，还有50万的资金缺口怎么办？<br />
                  我的餐厅需要购买新的设备，资金不足怎么办？<br />
                  我的花店运营的很好，想开分店，需要投资怎么办？<br />
                  新开的大悦城，我们的店铺想进入，需要资金怎么办？<br />
                  我的培训教室需要扩大，资金投入怎么办？<br />
                  经营周转需要钱，怎么办？
                </p>
              </div>
            </div>
          </div>
          <div className="sec2 bgw">
            <div className="w clearfix">
              <div className="fl tright">
                <p>
                  新店开业，需要促销<br />
                  新产品、新服务推出，需要客户体验<br />
                  品牌举办营销活动，需要客户参与<br />
                  需要线上活动和促销推广<br />
                  要培养粉丝用户<br />
                  要多渠道与客户互动
                </p>
              </div>
              <div className="fr">
                <img className="pic" src={require('../../assets/img/finance/pic3.jpg')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
