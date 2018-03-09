import React from 'react';
import initPage from '../../assets/project-detail/index';
import Head from '../../components/ProjectDetailComponent/head';
import SecLoan from '../../components/ProjectDetailComponent/sec-loan';
import SecConsultation from '../../components/ProjectDetailComponent/sec-consultation';
import SecTrack from '../../components/ProjectDetailComponent/sec-track';
import SecCourse from '../../components/ProjectDetailComponent/sec-course';
import Right from '../../components/ProjectDetailComponent/right';
import {getProjectDetail, getInvestmentNum} from '../../services/api';
import { message } from 'antd';
import {IMG_BASE_URL} from '../../common/systemParam';

export default class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDetail: {},
      countDay: 0,
      countDown: '00 : 00 : 00'
    };
    this.countDown = null;
  }
  componentDidMount() {
    this.fetchProjectDetail();
    this.changeNum();
  }

  componentWillUnmount() {
    $(window).off('scroll');
    clearInterval(this.countDown);
  }

  async fetchProjectDetail() {
    const {projectId} = this.props.match.params;
    const response = await getProjectDetail(projectId);
    console.log('---------', response);
    setTimeout(()=>{
      initPage();
    }, 500);
    if (response.code === 0) {
      this.setState({
        projectDetail: response.data
      }, () => {
        this.countDown = setInterval(()=>{
          this.countDownTime();
        }, 1000);
      });
      if (response.data.flocation) {
        let map = new AMap.Map('container',{
          resizeEnable: true,
          zoom: 13,
          center: response.data.flocation.split(',')
        });
        let marker = new AMap.Marker({
          position: response.data.flocation.split(',')
        });
        marker.setMap(map);
      }
    } else {
      message.error(response.msg);
    }
  }

  countDownTime() {
    let overTime = this.state.projectDetail.fcollet_over_time - new Date().getTime();
    if (overTime <= 0) {
      this.setState({countDown: '00 : 00 : 00', countDay: 0});
      clearInterval(this.countDown);
    } else {
      if (Math.floor(overTime/86400000) !== 0) {
        this.setState({
          countDay: Math.floor(overTime/86400000)
        });
      } else {
        this.setState({
          countDay: 0
        });
      }
      overTime = overTime - Math.floor(overTime/86400000) * 86400000;
      let time = '';
      if (Math.floor(overTime/3600000) !== 0) {
        if (Math.floor(overTime/3600000) >= 10) {
          time = `${Math.floor(overTime/3600000)} :`;
        } else {
          time = `0${Math.floor(overTime/3600000)} :`;
        }
      } else {
        time = `00 :`;
      }
      overTime = overTime - Math.floor(overTime/3600000) * 3600000;
      if (Math.floor(overTime/60000) !== 0) {
        if (Math.floor(overTime/60000) >= 10) {
          time = `${time} ${Math.floor(overTime/60000)} :`;
        } else {
          time = `${time} 0${Math.floor(overTime/60000)} :`;
        }
      } else {
        time = `${time} 00 :`;
      }
      overTime = overTime - Math.floor(overTime/60000) * 60000;
      if (overTime !== 0) {
        if (overTime/1000 >= 10) {
          time = `${time} ${Math.floor(overTime/1000)}`;
        } else {
          time = `${time} 0${Math.floor(overTime/1000)}`;
        }
      } else {
        time = `${time} 00`;
      }
      this.setState({countDown: time});
    }
  }


  async changeNum() {
    const {projectId} = this.props.match.params;
    const response = await getInvestmentNum(projectId);
    console.log(response);
    if (response.code === 0) {
      this.setState({
        projectDetail: {
          ...this.state.projectDetail,
          topicCount: response.data.topicCount,
          questionCount: response.data.questionCount
        }
      })
    }
  }

  render() {
    const { projectDetail } = this.state;
    return (
      <div>
        <Head projectDetail={projectDetail}/>
        <div className="w clearfix pd-body">
          <div className="fl lbody shadow">
            <div className="tnav">
              <a className="hover">借款项目</a>
              <a>投前咨询{this.state.projectDetail.topicCount? <em>{this.state.projectDetail.topicCount}</em> : null}</a>
              <a>投后跟踪{this.state.projectDetail.questionCount? <em>{this.state.projectDetail.questionCount}</em> : null}</a>
              <a>项目历程</a>
            </div>
            <div className="pd-con">
              <SecLoan projectDetail={projectDetail}/>
            </div>
            <div className="pd-con none">
              <SecConsultation changeNum={()=>this.changeNum()} {...this.props.match.params}/>
            </div>
            <div className="pd-con none">
              <SecTrack projectDetail={projectDetail} changeNum={()=>this.changeNum()} {...this.props.match.params}/>
            </div>
            <div className="pd-con none">
              <SecCourse projectDetail={projectDetail}  {...this.props.match.params}/>
            </div>
          </div>
          <div className="fr rbody" style={{marginTop: -250}}>
            <Right projectDetail={projectDetail} history={this.props.history} time={{countDay: this.state.countDay, countDown: this.state.countDown}}/>
          </div>
        </div>
      </div>
    );
  }
}
