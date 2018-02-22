import React from 'react';
import Images from './images';
import {IMG_BASE_URL} from '../../common/systemParam';
import moment from 'moment';

export default class SecLoan extends React.Component {

  componentDidMount() {

  }

  render() {
    const project = this.props.projectDetail;
    const dateCode = moment(project.fcreate_time).format('YYYY') + moment(project.fcreate_time).format('MM');
    // this.markMap();
    return (
      <div>
        <div className="lnav">
          <a className="a1 hover">我的自述</a>
          <a className="a2">我的项目</a>
          <a className="a3">为何众借</a>
          <a className="a4">还款计划</a>
          <a className="a5">我的位置</a>
        </div>
        <div className="rbody">
          {project.fread_me_pic ? project.fread_me_pic.split(',').map((data, index)=>{
            if (data.length > 0) {
              return (
                <p key={data + index} style={{marginBottom: 10}}>
                  <img src={`${IMG_BASE_URL}project/${dateCode}/${project.fproject_no}/${data}`}/>
                </p>
              );
            }
          }): null}


          <div className="textbox border">
            <i className="tit">我的自述</i>
            <p>{project.readme?project.readme: '暂无我的自述'}</p>
          </div>
          {project.fmy_project_pic ? project.fmy_project_pic.split(',').map((data, index)=>{
            if (data.length > 0) {
              return (
                <p key={data+index} style={{marginBottom: 10}}>
                  <img src={`${IMG_BASE_URL}project/${dateCode}/${project.fproject_no}/${data}`}/>
                </p>
              );
            }

          }): null}
          <div className="tagbox">
            <i className="chk">实名认证</i>
            <i>婚姻认证</i>
            <i className="chk">学历认证</i>
            <i>住址认证</i>
            <i className="chk">征信认证</i>
            <i>职称认证</i>
            <i>社保认证</i>
            <i className="chk">车产认证</i>
            <i>房产认证</i>
            <i>现场认证</i>
            <i>银行流水认证</i>
            <i>营业执照认证</i>
            <i>审计报告认证</i>
            <i>税务认证</i>
            <i>关联企业认证</i>
          </div>
          <div className="textbox border">
            <i className="tit">我的项目</i>
            <p>{project.myproject?project.myproject: '暂无我的项目'}</p>
          </div>
          {/*<Images project={project}/>*/}
          <div className="textbox border">
            <i className="tit">为何众借</i>
            <p>{project.fwhy_loan?project.fwhy_loan: '暂无为何众借'}</p>
          </div>
          <div className="textbox border">
            <i className="tit">还款计划</i>
            <p>{project.fpay_from?project.fpay_from: '暂无还款计划'}</p>
          </div>
          <div className="textbox border" style={{display: 'none'}}>
            <i className="tit">我的位置</i>
            <div>
              <div id="container">

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
