/**
 * Created by Administrator on 2018/1/8 0008.
 */
import React from 'react';
import Login from '../LoginComponent/login';
import { Link } from 'dva/router';

export default class Tab3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [1,2,3,4,5,6,7]
    }
  }
  render() {
    return (
      <div className="section sec-tab3">
        <div className="w">
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
        <div className="line line1"/>
        <div className="line line2"/>
        <div className="w tab-con">
          <div className="con1">
            <p className="tit2">成功借款企业的采访</p>
            <video className="hide"
                   preload="metadata" controls="controls"
                   poster={require('../../assets/img/home/1.jpg')}
                   src="//n1video.hjfile.cn/zhuanti/2017/12/20/f5339abc403997a43fa9b9362b2a29cb.mp4">
              您的浏览器不支持视频播放，请升级浏览器
            </video>
          </div>
          <div className="con2">
          </div>
          <div className="con3">
          </div>
        </div>
      </div>
    );
  }
}
