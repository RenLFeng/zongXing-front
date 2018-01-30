import React from 'react';
import moment from 'moment';

export default class Head extends React.Component {
  render() {
    const { project } = this.props.projectDetail;
    return (
      <div className="banner autosize pd-head">
        <img className="big" src={require('../../assets/img/project-detail/banner.png')} />
        <div className="w">
          <video className="video"
                 preload="metadata" controls="controls"
                 poster={require('../../assets/img/project-detail/pic4.png')}
                 src="//n1video.hjfile.cn/zhuanti/2017/12/20/f5339abc403997a43fa9b9362b2a29cb.mp4">
            您的浏览器不支持视频播放，请升级浏览器
          </video>
          <div className="info">
            <p className="tit">{project.fName}</p>
            <div className="user">
              <img className="av" src={require("../../assets/img/project-detail/av1.png")} />
              <p className="t1">{project.fUserId}</p>
              <p className="t2">{moment(project.fCreateTime).format('YYYY年MM月DD日')} 南京</p>
            </div>
            <div className="data clearfix">
              <div>
                <p className="t1">年化利率</p>
                <p className="t2">10%</p>
              </div>
              <div>
                <p className="t1">借款周期</p>
                <p className="t2">10个月</p>
              </div>
              <div>
                <p className="t1">借款金额</p>
                <p className="t2">40万</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
