import React from 'react';


export default class Banner extends React.Component {

  componentDidMount() {
  }
  render() {
    return (
      <div className="section banner swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide autosize">
            <img className="big" src={require('../../assets/img/home/1.jpg')} />
            <a className="btn big" href=""><i>我要投资</i></a>
          </div>
          <div className="swiper-slide autosize">
            <img className="big" src={require('../../assets/img/home/2.jpg')} />
            <a className="btn big" href=""><i>我要投资</i></a>
          </div>
          <div className="swiper-slide autosize">
            <img className="big" src={require('../../assets/img/home/3.jpg')} />
            <a className="btn big" href=""><i>我要投资</i></a>
          </div>
        </div>
        <div className="swiper-pagination"/>
      </div>
    );
  }
}
