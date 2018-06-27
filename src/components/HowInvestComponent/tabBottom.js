import React from 'react';


export default class TabBottom extends React.Component {

  render() {
    return (
      <div className="section sec-tab3">
        <div className="w center">
          <div className="tab3 center">
            <i/>
            <a href="" className="hover">了解众借帮</a>
            <i/>
            <a href="">加盟众借帮</a>
            <i/>
            <a href="">成功的案例</a>
            <i/>
          </div>
        </div>
        <div className="w tab3con">
          <div className="tab3con1">
            <div className="swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide clearfix">
                  <div className="item" style={{padding:0}}>
                    <img className="pic" src={require('../../assets/img/invest/pic5.png')} />
                    <p className="t1">关于投资风险</p>
                  </div>
                  <div className="item" style={{padding:0}}>
                    <img className="pic" src={require('../../assets/img/invest/pic5.png')} />
                    <p className="t1">罗氏等级评分法</p>
                  </div>
                  <div className="item" style={{padding:0}}>
                    <img className="pic" src={require('../../assets/img/invest/pic5.png')} />
                    <p className="t1">产业内双向投资理论</p>
                  </div>
                  <div className="item" style={{padding:0}}>
                    <img className="pic" src={require('../../assets/img/invest/pic5.png')} />
                    <p className="t1">科尔内的投资需求理论</p>
                  </div>
                </div>
                <div className="swiper-slide clearfix">
                  <div className="item" style={{padding:0}}>
                    <img className="pic" src={require('../../assets/img/invest/pic5.png')} />
                    <p className="t1">关于投资风险</p>
                  </div>
                  <div className="item" style={{padding:0}}>
                    <img className="pic" src={require('../../assets/img/invest/pic5.png')} />
                    <p className="t1">罗氏等级评分法</p>
                  </div>
                  <div className="item" style={{padding:0}}>
                    <img className="pic" src={require('../../assets/img/invest/pic5.png')} />
                    <p className="t1">产业内双向投资理论</p>
                  </div>
                  <div className="item" style={{padding:0}}>
                    <img className="pic" src={require('../../assets/img/invest/pic5.png')} />
                    <p className="t1">科尔内的投资需求理论</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-pagination"/>
          </div>
        </div>
      </div>

    );
  }

}

const style = {
  swiperSlide: {width : '1266px'}
}