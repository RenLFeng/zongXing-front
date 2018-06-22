import React from 'react';


export default class TopTab extends React.Component {

  render() {
    return (
      <div className="section sec-tabs g">
        <div className="tabs">
          <div className="w">
            <a>视频展示</a>
            <a>客户需求</a>
            <a>创造价值</a>
            <a>众借好处</a>
            <a>借款人手册</a>
          </div>
        </div>
        <div className="tabcon1">
          <div className="sec1">
            <div className="w clearfix">
              <div className="fl tright">
                <img className="pic" src={require('../../assets/img/finance/pic4.png')} />
              </div>
              <div className="fr">
                <p className="t1">小微企业融资的挑战</p>
                <p className="t2">
                  轻资产型小微企业，因为缺乏抵押物，融资难；<br />
                  科技创新型小微企业，因为创业成果尚未转化，融资成本高；<br />
                  服务型小微企业，因为财务信息不完整，融资渠道少；<br />
                  小微企业经营性资金额度不大，但实效性要求高；<br />
                  小微企业融资覆盖率低，融资方式选择性少；<br />
                  小微企业不仅需要钱，更需要综合金融服务。
                </p>
              </div>
            </div>
          </div>
          <div className="sec2 bgw">
            <div className="w clearfix">
              <div className="fl tright">
                <p className="t1">客户拓展的挑战</p>
                <p className="t2">
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
