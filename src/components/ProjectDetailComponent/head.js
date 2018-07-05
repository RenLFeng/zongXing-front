import React from 'react';
import moment from 'moment';
import Time from '../../components/ProjectDetailComponent/time';
import {IMG_BASE_URL} from '../../common/systemParam';

export default class Head extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDetail: {},
      countDay: 0,
      countDown: '00 : 00 : 00'
    };
    this.countDown = null;
  }
  componentDidMount(){

  }
  render() {
    let video_src = '';
    const { projectDetail } = this.props;
    if (projectDetail.fvideo_path) {
      const arr = JSON.parse(projectDetail.fvideo_path);
      if (arr.length > 0) {
        video_src = arr[0].url;
      }
    }
    return (
      <div className="banner autosize pd-head g">
        <img className="big" src={`${IMG_BASE_URL}/${projectDetail.fbanner_pic_path}`} />
        <div className='masker'></div>
        <div className="w">
          <video className="video"
                 preload="metadata" controls="controls"
                 poster={`${IMG_BASE_URL}/${projectDetail.fcard_pic_path}`}
                 src={video_src}>
            您的浏览器不支持视频播放，请升级浏览器
          </video>
          <div className="info clearfix pd-body">
            <p className="tit" style={{textAlign: 'left'}}>{projectDetail.fname}</p>
            <p className="tit tit2" style={{textAlign: 'left'}}>
              <span>信用评级:<i>{projectDetail.fleve_name}+</i></span>
              <span>项目编号:<i>{projectDetail.fproject_no}</i></span>
              <span>食品行业</span>
            </p>
            <div className="user">
              <img className="av" src={require("../../assets/img/project-detail/av1.png")} />
              <p className="t1" style={{textAlign: 'left'}}>{projectDetail.fname}</p>
              <p className="t2" style={{textAlign: 'left'}}>{moment(projectDetail.fpublish_time).format('YYYY年MM月DD日')} {projectDetail.fprovincial_name === projectDetail.fcity_name ? projectDetail.fprovincial_name : `${projectDetail.fprovincial_name} - ${projectDetail.fcity_name}`}</p>
            </div>
            <div className="fr rbody">
              <Time
                projectDetail={projectDetail}
                history={this.props.history}
                time={{countDay: this.state.countDay, countDown: this.state.countDown}}
                />
            </div>
            <div className="data clearfix">
              <div>
                <p className="t1">年化利率</p>
                <p className="t2">{projectDetail.frate_last}%</p>
              </div>
              <div>
                <p className="t1">借款周期</p>
                <p className="t2">{projectDetail.fcredit_month}个月</p>
              </div>
              <div>
                <p className="t1">借款金额</p>
                <p className="t2">{isNaN(projectDetail.fcredit_money*1/10000)?null:(projectDetail.fcredit_money*1/10000).toFixed(2)}万</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
