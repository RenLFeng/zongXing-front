import React from 'react';
import {message} from 'antd';
import {selectProJourney, praise, clickPraise} from '../../services/api';
import moment from 'moment';
import {IMG_BASE_URL, COURSE_PROJECT_PIC} from '../../common/systemParam';
import { connect } from 'dva';

@connect((state)=>({
  loginStatus: state.login.status
}))
export default class SecCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseArr: []
    };
  }

  componentDidMount() {
    this.fetchJourney();
  }

  async fetchJourney() {
    const response = await selectProJourney(this.props.projectId);
    if (response.code === 0) {
      this.setState({
        courseArr: response.data
      });
    } else {
      message.error(response.msg);
    }
  }

  // 判断是否登录
  judgeLogin() {
    if (this.props.loginStatus) {
      return true;
    } else {
      message.warning('请先登录');
      return false;
    }
  }

  async clickHeard(id,state) {
    if (!this.judgeLogin())
      return;
    if (state) {
      return
    }
    for (let data of this.state.courseArr) {
      if (data.fid === id) {
        data.state = 1;
        data.count = data.count + 1;
      }
    }
    this.setState({
      courseArr: this.state.courseArr
    });
   const response = await clickPraise(id);
  }

  render() {
    const {projectDetail} = this.props;
    const dateCode = moment(projectDetail.fcreate_time).format('YYYY') + moment(projectDetail.fcreate_time).format('MM');
    return (
      <div>
        <div className="center pd-lich">
          <i className="tit">这里记录了项目发起人更新的项目进展</i>
        </div>
        <div className="timetree">
          <div className="end"/>
          <div className="list">
            {this.state.courseArr.map((data, index)=>{
              if (data.ftype === 1) {
                let imgArr = [];
                if (data.fpic_json) {
                  if (data.fpic_json.indexOf('[{') != -1) {
                    imgArr = JSON.parse(data.fpic_json);
                  } else {
                    imgArr = [{realUrl: data.fpic_json}];
                  }
                }
                return (
                  <div className="item" key={data.fid}>
                    <p className="date">
                      <i className="y">{moment(data.ftime).format('YYYY')}</i><br /><i className="d">{moment(data.ftime).format('MM-DD')}</i>
                    </p>
                    <i className="cc"/>
                    <p className="text">{data.fcontent}<em className={`${data.state ? 'em1': 'em2'}`} onClick={()=>this.clickHeard(data.fid,data.state)}>{data.count}</em></p>
                    <p className="img">
                      {imgArr.map((data, index) => {
                        return (
                          <img style={{width: 120, height: 96}} key={index} src={`${IMG_BASE_URL}${data.realUrl}`} />
                        );
                      })}
                    </p>
                  </div>
                );
              } else if (data.ftype === 2) {
                return (
                  <div key={data.fid} className="item hover done">
                    <p className="date">
                        <i className="y">{moment(data.ftime).format('YYYY')}</i><br /><i className="d">{moment(data.ftime).format('MM-DD')}</i>
                    </p>
                    <i className="cc"></i>
                    <p className="text">{data.fcontent}}</p>
                  </div>
                );
              } else if (data.ftype === 3) {
                return (
                  <div key={data.fid} className="item">
                    <p className="date">
                    <i className="y">{moment(data.ftime).format('YYYY')}</i><br /><i className="d">{moment(data.ftime).format('MM-DD')}</i>
                    </p>
                    <i className="cc"></i>
                    <p className="text">{data.fcontent}<em className={`${data.state ? 'em1': 'em2'}`} onClick={()=>this.clickHeard(data.fid,data.state)}>{data.count}</em></p>
                    <p className="img img1">
                      <img src={require('../../assets/img/subSite/cp1.png')} style={{width: 160, height: 86}}/>
                      <img src={require('../../assets/img/subSite/cp2.png')} style={{width: 160, height: 86}}/>
                      <img src={require('../../assets/img/subSite/cp3.png')} style={{width: 160, height: 86}}/>
                    </p>
                </div>
                )
              } else if (data.ftype === 4) {
                return (
                  <div className="item">
                    <p className="date">
                      <i className="y">{moment(data.ftime).format('YYYY')}</i><br /><i className="d">{moment(data.ftime).format('MM-DD')}</i>
                    </p>
                    <i className="cc"></i>
                    <p className="text">{data.fcontent}<em className={`${data.state ? 'em1': 'em2'}`} onClick={()=>this.clickHeard(data.fid,data.state)}>{data.count}</em></p>
                 </div>
                )
              }
            })}
          </div>
          <div className="start"/>
        </div>

      </div>
    );
  }
}
