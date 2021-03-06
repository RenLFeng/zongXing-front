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
import Editor from '../../components/editor';

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
  }

  componentWillUnmount() {
    $(window).off('scroll');
  }

  async fetchProjectDetail() {
    const {projectId} = this.props.match.params;
    const response = await getProjectDetail(projectId);
    setTimeout(()=>{
      initPage();
    }, 500);
    if (response.code === 0) {
      this.setState({
        projectDetail: response.data
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

  render() {
    const { projectDetail } = this.state;
    return (
      <div>
        <Head projectDetail={projectDetail} history={this.props.history}/>
        <div className="w clearfix pd-body pd-body2">
          <div className="fl lbody shadow g">
            <div className="tnav">
              <a className="hover">借款项目</a>
            </div>
            <div className="pd-con">
              <SecLoan projectDetail={projectDetail}/>
            </div>
          </div>
          <div className="fr rbody">
            <Right onlyRead={true} projectDetail={projectDetail} history={this.props.history} time={{countDay: this.state.countDay, countDown: this.state.countDown}}/>
          </div>
        </div>
      </div>
    );
  }
}
