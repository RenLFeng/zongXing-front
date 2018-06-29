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
      projectList: [1, 2, 3, 4, 5, 6, 7]
    }
  }



  render() {
    return (
      <div className="section sec-tab3 g">
        <div className="w">
          <div className="tab3_ center_">

            <a className="hover" data-tit="lj">了解众借帮</a>

            <a className="" data-tit="jm">加盟众借帮</a>

            <a className="" data-tit="cg">成功的案例</a>

          </div>
        </div>
        <div className="line line1"/>
        <div className="line line2"/>
        <div className="tab-con">
          <ul className="con con1">
            <li>
              <p className="tit2">成功借款企业的采访</p>
              <video className="hide"
                     preload="metadata" controls="controls"
                     poster={require('../../assets/img/home/1.jpg')}
                     src="//n1video.hjfile.cn/zhuanti/2017/12/20/f5339abc403997a43fa9b9362b2a29cb.mp4">
                您的浏览器不支持视频播放，请升级浏览器
              </video>
            </li>
          </ul>
          <ul className="con">
            <li>
              <p className="tit2">成功借款企业的采访 加盟众借帮</p>
              <video className="hide"
                     preload="metadata" controls="controls"
                     poster={require('../../assets/img/home/2.jpg')}
                     src="//n1video.hjfile.cn/zhuanti/2017/12/20/f5339abc403997a43fa9b9362b2a29cb.mp4">
                您的浏览器不支持视频播放，请升级浏览器
              </video>
            </li>
          </ul>
          <ul className="con">
            <li>
              <p className="tit2">成功借款企业的采访 成功的案例</p>
              <video className="hide"
                     preload="metadata" controls="controls"
                     poster={require('../../assets/img/home/3.jpg')}
                     src="//n1video.hjfile.cn/zhuanti/2017/12/20/f5339abc403997a43fa9b9362b2a29cb.mp4">
                您的浏览器不支持视频播放，请升级浏览器
              </video>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
