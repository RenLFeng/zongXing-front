import React from 'react';

export default class Data extends React.Component {
  render() {
    return (
      <div className="pd-data shadow none">
        <a className="close"/>
        <p className="tit">投资人统计<i>（<em className="cf60">85</em>人）</i></p>
        <div className="clearfix">
          <div className="fl">
            <div className="list">
              <div className="row hd">
                <i className="col1">投资人</i>
                <i className="col2">投资资金</i>
                <i className="col3">投资时间</i>
              </div>
              <div className="row">
                <i className="col1">Jeff Braw</i>
                <i className="col2">300</i>
                <i className="col3">2017-07-05 12:22:30</i>
              </div>
            </div>
            <div className="bot">
              <i>累计已投金额</i>
              <i className="cf90">16500</i>
            </div>
          </div>
          <div className="fr">
            <p className="pictit">所在城市结构</p>
            <div>
              <img src={require('../../assets/img/project-detail/pic13.jpg')} />
            </div>
            <p className="pictit">男女比例</p>
            <div className="center">
              <img src={require('../../assets/img/project-detail/pic14.jpg')} />
            </div>
            <p className="pictit">年龄结构</p>
            <div>
              <img src={require('../../assets/img/project-detail/pic15.jpg')} />
            </div>
            <p className="pictit">投资额度结构</p>
            <div>
              <img src={require('../../assets/img/project-detail/pic16.jpg')} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
