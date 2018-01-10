import React from 'react';

export default class Company extends React.Component {
  render() {
    return (
      <div className="section sec-comp">
        <div className="w">
          <p className="tright">
            <a className="blue" href="">查看更多统计数据 &gt;</a>
          </p>
        </div>
        <div className="w col4 clearfix">
          <div>
            <p className="tit">23分钟<b>欧洲记录</b>100万欧元</p>
            <p className="logo">
              <img src={require('../../assets/img/home/bigicon_03.png')} />
            </p>
            <p className="name">旷野沙发</p>
          </div>
          <div>
            <p className="tit"><b>欧洲记录</b>120万欧元</p>
            <p className="logo">
              <img src={require('../../assets/img/home/bigicon_05.png')} />
            </p>
            <p className="name">亚特兰蒂斯</p>
          </div>
          <div>
            <p className="tit">在<b>6个小时内</b>建立了超过<b>40万欧元</b>的品牌</p>
            <p className="logo">
              <img src={require('../../assets/img/home/bigicon_07.png')} />
            </p>
            <p className="name">贩小醉龙虾</p>
          </div>
          <div>
            <p className="tit"><b>亚洲记录</b>200万人民币</p>
            <p className="logo">
              <img src={require('../../assets/img/home/bigicon_09.png')} />
            </p>
            <p className="name">梦橙影业</p>
          </div>
        </div>
      </div>

    );
  }
}
