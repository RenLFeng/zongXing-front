import React from 'react';

export default class News extends React.Component {
  render() {
    return(
      <div>
        <div className="news clearfix">
          <div className="fl">
            <img className="pic" src={require('../../assets/img/pic1.png')} />
            <div className="text">
              <p className="t1">众借帮发布2018年企业社会责任报告</p>
              <p className="t2">责任引领全球品质生活，在多个领域都有大动作，无论围绕技术...</p>
            </div>
          </div>
          <div className="fr">
            <div className="item">
              <p className="t1">众借帮发布2018年企业社会责任报告</p>
              <p className="t2">责任引领全球品质生活，在多个领域都有大动作，无论围绕技术...</p>
            </div>
            <div className="item hover">
              <p className="t1">感知性能美学</p>
              <p className="t2">用速度与操控演绎力量与灵动之美，称之为捷豹性能美学...</p>
            </div>
            <div className="item">
              <p className="t1">全国主流媒体资源</p>
              <p className="t2">百场新闻发布会，服务上千家大中企业！媒体行，邀约媒体，新闻专访，新闻发布，只有您想不到...</p>
            </div>
            <div className="item">
              <p className="t1">大数据看“一带一路”报道</p>
              <p className="t2">使推广效果数据化，可视化。深耕网络营销十年，一站式已营销平台。</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
