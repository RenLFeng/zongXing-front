import React from 'react';
import moment from 'moment';
import CountTime from '../../components/ProjectDetailComponent/count_time';
import Ctext from '../../components/ProjectDetailComponent/ctext';
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
  ctext(page) {
    this.ctext.getData(page)
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
        <div className="container">
          <div className="top">
            <div className="clearfix">
              <p className="tit fl" style={{textAlign: 'left'}}>{projectDetail.fname}
              <span>信用评级:<i className="r">{projectDetail.fleve_name}</i></span>
              </p>
              <p className="fr"> 
              <span className="line">{projectDetail.fcity_name}</span><e></e><span>{projectDetail.ftype_name}</span>
              </p>
            </div>
          </div>
          <div className="content-box clearfix">



            <div className="vd fl">
              <video className="video" 
                  preload="metadata" controls="controls"
                  poster={`${IMG_BASE_URL}/${projectDetail.fcard_pic_path}`}
                  src={video_src}>
              您的浏览器不支持视频播放，请升级浏览器
              </video>
              <div className="pro clearfix">
                <p className="fl" style={{textAlign: 'left'}}>{projectDetail.fname}</p>
                <p className="fr">项目编号:<span>{projectDetail.fproject_no}</span></p>
              </div>
            </div>

            <div className="info-box fr clearfix">

              
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
              <div className="info clearfix pd-body">
                <div className="fr rbody">
                  <Ctext
                    ref={ref => this.ctext = ref}
                    projectDetail={projectDetail}
                    history={this.props.history}
                    time={{countDay: this.state.countDay, countDown: this.state.countDown}}
                    />
                </div>
                <a className="s">收藏</a>
              </div>
            </div>
          </div>
        </div>
        <CountTime  
          projectDetail={projectDetail}
          history={this.props.history}
          time={{countDay: this.state.countDay, countDown: this.state.countDown}}
        />
        </div>
      </div>
    );
  }
}
