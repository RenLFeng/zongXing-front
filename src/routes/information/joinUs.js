import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/contactUs/join.scss'
export default class ManagementTeam extends React.Component {
  render() {
    return (
      <div className="infor">
        <div  className="w clearfix">
          {/* <LeftMenu param={this.props}/> */}
          <div className="fr join">
            <h2><span>关于我们</span><i>></i><span className="last">管理团队</span></h2>
            <div className="wrap">
              <div className="top1">
                <p>请将个人简历发送至招聘邮箱HR@zjb.com.cn，邮件主题请注明应聘岗位！ 姓名+岗位  如：“张无忌-产品经理”。</p>
                <img src={require('../../assets/img/infor/cont_join1.jpg')}/>
              </div>
              <div className="top2 clearfix">
                <div className="fl">
                  <ul className="clearfix">
                    <li className="tit">岗位名称</li>
                    <li className="tit tofr">岗位名称</li>
                    <li className="tit">岗位名称</li>
                    <li className="tit tofr">岗位名称</li>
                  </ul>
                  <div className="info">
                    <div className="box">
                      <p className="tit">java高级开发工程师</p>
                      <div className="top1">
                        <p className="title">岗位职责：</p>
                        <p>1. 参与公司BI产品研发、新技术研究；</p>
                        <p>2. 负责公司BI产品功能维护；</p>
                        <p>3. 负责提供BI产品问题的解决方案；</p>
                        <p>4. 参与技术攻关，解决技术难题。</p>
                      </div>
                      <div className="top2">
                        <p className="title">岗位要求：</p>
                        <p>1. 本科或以上学历，5年以上Java应用开发经验，有框架设计经验优先；</p>
                        <p>2. 具备扎实的java知识体系；</p>
                        <p>3.熟练应用各种开源框架如：Spring、Hibernate等；</p>
                        <p>4. 精通Ajax、JavaScript、CSS、HTML等前端技术；</p>
                        <p>5. 熟悉Tomcat、Websphere等主流J2EE应用服务器； </p>
                        <p>6. 工作积极主动、敬业，能承受较大工作压力；</p>
                        <p>7. 有良好的合作性和沟通能力，具备较强的分析问题和解决问题的能力，有较好的学习能力。</p>
                      </div>
                    </div>
                    <div className="box">
                      <p className="tit">java高级开发工程师</p>
                      <div className="top1">
                        <p className="title">岗位职责：</p>
                        <p>1. 参与公司BI产品研发、新技术研究；</p>
                        <p>2. 负责公司BI产品功能维护；</p>
                        <p>3. 负责提供BI产品问题的解决方案；</p>
                        <p>4. 参与技术攻关，解决技术难题。</p>
                      </div>
                      <div className="top2">
                        <p className="title">岗位要求：</p>
                        <p>1. 本科或以上学历，5年以上Java应用开发经验，有框架设计经验优先；</p>
                        <p>2. 具备扎实的java知识体系；</p>
                        <p>3.熟练应用各种开源框架如：Spring、Hibernate等；</p>
                        <p>4. 精通Ajax、JavaScript、CSS、HTML等前端技术；</p>
                        <p>5. 熟悉Tomcat、Websphere等主流J2EE应用服务器； </p>
                        <p>6. 工作积极主动、敬业，能承受较大工作压力；</p>
                        <p>7. 有良好的合作性和沟通能力，具备较强的分析问题和解决问题的能力，有较好的学习能力。</p>
                      </div>
                    </div>
                  </div>
                </div>



                <div className="fr ">
                  <ul className="clearfix">
                    <li className="tit">岗位名称</li>
                    <li className="tit tofr">岗位名称</li>
                    <li className="tit">岗位名称</li>
                    <li className="tit tofr">岗位名称</li>
                  </ul>
                  <div className="info">
                    <div className="box">
                      <p className="tit">java高级开发工程师</p>
                      <div className="top1">
                        <p className="title">岗位职责：</p>
                        <p>1. 参与公司BI产品研发、新技术研究；</p>
                        <p>2. 负责公司BI产品功能维护；</p>
                        <p>3. 负责提供BI产品问题的解决方案；</p>
                        <p>4. 参与技术攻关，解决技术难题。</p>
                      </div>
                      <div className="top2">
                        <p className="title">岗位要求：</p>
                        <p>1. 本科或以上学历，5年以上Java应用开发经验，有框架设计经验优先；</p>
                        <p>2. 具备扎实的java知识体系；</p>
                        <p>3.熟练应用各种开源框架如：Spring、Hibernate等；</p>
                        <p>4. 精通Ajax、JavaScript、CSS、HTML等前端技术；</p>
                        <p>5. 熟悉Tomcat、Websphere等主流J2EE应用服务器； </p>
                        <p>6. 工作积极主动、敬业，能承受较大工作压力；</p>
                        <p>7. 有良好的合作性和沟通能力，具备较强的分析问题和解决问题的能力，有较好的学习能力。</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
