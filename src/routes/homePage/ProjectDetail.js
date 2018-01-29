import React from 'react';
import initPage from '../../assets/project-detail/index';
import Head from '../../components/ProjectDetailComponent/head';
import SecLoan from '../../components/ProjectDetailComponent/sec-loan';
import SecConsultation from '../../components/ProjectDetailComponent/sec-consultation';
import SecTrack from '../../components/ProjectDetailComponent/sec-track';
import SecCourse from '../../components/ProjectDetailComponent/sec-course';
import Right from '../../components/ProjectDetailComponent/right';
import {getProjectDetail} from '../../services/api';
import { message } from 'antd'

export default class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectDetail: null
    }
  }
  componentDidMount() {
    this.fetchProjectDetail();
    initPage();
  }

  componentWillUnmount() {
    $(window).off('scroll');
  }

  async fetchProjectDetail() {
    const {projectId} = this.props.match.params;
    const response = await getProjectDetail(projectId);
    if (response.code === 0) {
      this.setState({
        projectDetail: response.data
      });
    } else {
      message.error(response.msg);
    }
  }

  render() {
    return (
      <div>
        <Head />
        <div className="w clearfix pd-body">
          <div className="fl lbody shadow">
            <div className="tnav">
              <a className="hover">借款项目</a>
              <a>投前咨询<em>3</em></a>
              <a>投后跟踪<em>6</em></a>
              <a>项目历程</a>
            </div>
            <div className="pd-con">
              <SecLoan />
            </div>
            <div className="pd-con none">
              <SecConsultation />
            </div>
            <div className="pd-con none">
              <SecTrack />
            </div>
            <div className="pd-con none">
              <SecCourse />
            </div>
          </div>
          <div className="fr rbody">
            <Right />
          </div>
        </div>
      </div>
    );
  }
}
