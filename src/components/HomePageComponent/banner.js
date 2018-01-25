import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { IMG_BASE_URL } from '../../common/systemParam';
import { initPage } from '../../assets/home/index';
import Path from '../../common/pagePath';

@connect((state) => ({
  systemData: state.systemData
}))
export default class Banner extends React.Component {

  componentDidMount() {
    this.fetchHomeImg();
  }
  fetchHomeImg() {
    const {systemData} = this.props;
    //如果图片是个数是0 则重新加载图片资源
    if (systemData.homeImg.length === 0) {
      this.props.dispatch({
        type: 'systemData/getHomeImg',
        payload: 'home'
      });
    } else {
      initPage();
    }
  }
  render() {
    const {systemData} = this.props;
    return (
      <div className="section banner swiper-container">
        <div className="swiper-wrapper">
          {
            systemData.homeImg.map((data) => {
              return (
                <div className="swiper-slide autosize" key={data.fId}>
                  <img className="big" src={`${IMG_BASE_URL}${data.fPath}`} alt={data.fDesc}/>
                  <Link className="btn big" to={Path.PROJECT_LIST}><i>我要投资</i></Link>
                </div>
              );
            })
          }
        </div>
        <div className="swiper-pagination"/>
      </div>
    );
  }
}
