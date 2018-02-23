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
  state = {
    show: false
  };

  componentDidMount() {
    // this.fetchHomeImg();
    setTimeout(()=>{
      this.setState({
        show: true
      });
    }, 100)
  }
  fetchHomeImg() {
    // const {systemData} = this.props;
    // //如果图片是个数是0 则重新加载图片资源
    // if (systemData.homeImg.length === 0) {
    //   this.props.dispatch({
    //     type: 'systemData/getHomeImg',
    //     payload: 'home'
    //   });
    // } else {
    //   initPage();
    // }
  }
  render() {
    const {systemData} = this.props;
    return (
      <div className="section home-banner">
        <video autoPlay="autoplay" loop="loop" preload="metadata" controls="controls">
          <source src="https://n1video.hjfile.cn/zhuanti/2018/02/05/5b543a2fc89d1f464e152dc4015eea50.webm" type="video/webm"/>
          <source src="https://n1video.hjfile.cn/zhuanti/2018/02/05/5f381bab717a30c3c91f9dfae6d8334e.mp4" type="video/mp4"/>
        </video>
        {/*<video*/}
          {/*preload="metadata" controls="controls"*/}
          {/*src='https://n1video.hjfile.cn/zhuanti/2018/02/05/5b543a2fc89d1f464e152dc4015eea50.mp4'*/}
        {/*/>*/}
        {/*<video className="hide"*/}
               {/*preload="metadata" controls="controls"*/}
               {/*poster={require('../../assets/img/home/1.jpg')}*/}
               {/*src="//n1video.hjfile.cn/zhuanti/2017/12/20/f5339abc403997a43fa9b9362b2a29cb.mp4">*/}
          {/*您的浏览器不支持视频播放，请升级浏览器*/}
        {/*</video>*/}
        <div className="masker"></div>
        <div className="w">
          <p className="t1" style={{display: `${this.state.show?'block':'none'}`}}>
            <i className="h">小微企业</i><i>能<span className="h">精准营销</span></i><i>的<span className="h">借贷平台</span></i>
          </p>
          <p className="t1 hid" style={{display: `${this.state.show?'block':'none'}`}}>
            <i>个人可以直接投资中国实体经济</i>
          </p>
          <p className="t1 hid" style={{display: `${this.state.show?'block':'none'}`}}>
            <i>通过帮助小微企业成功，获得丰厚回报</i>
          </p>
          <p className="t2"><a className="btn">我要投资</a></p>
        </div>
      </div>
    );
  }
}
