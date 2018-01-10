import React from 'react';
import { connect } from 'dva';
import { IMG_BASE_URL } from '../../common/systemParam';

@connect((state) => ({
  login: state.login
}))
export default class Banner extends React.Component {

  componentDidMount() {
  }
  render() {
    return (
      <div className="section banner swiper-container">
        <div className="swiper-wrapper">
          <div className="swiper-slide autosize">
            <img className="big" src={`${IMG_BASE_URL}/zjb-home-001.jpg`} />
            <a className="btn big" href=""><i>我要投资</i></a>
          </div>
          <div className="swiper-slide autosize">
            <img className="big" src={`${IMG_BASE_URL}/zjb-home-002.jpg`} />
            <a className="btn big" href=""><i>我要投资</i></a>
          </div>
          <div className="swiper-slide autosize">
            <img className="big" src={`${IMG_BASE_URL}/zjb-home-003.jpg`} />
            <a className="btn big" href=""><i>我要投资</i></a>
          </div>
        </div>
        <div className="swiper-pagination"/>
      </div>
    );
  }
}
