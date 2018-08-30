import React from 'react';

import { Switch, Route, withRouter} from 'dva/router';
import {connect} from 'dva';
import {Button} from 'antd';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import LeftMenu from '../information/leftMenu';
//信息披露
import Loadable from 'react-loadable';


import {startAnimate} from '../../assets/infor/index'
import Path from '../../common/pagePath';
function loading() {
  return <p></p>
}
export default class Infor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    startAnimate();
    setTimeout(()=>{
      this.initPage();
    }, 200);
  }

  initPage() {
    $('.uc-lbody>.navbox').on('click', '.hd>a,.folder>a', function(){
      $(this).parent().toggleClass('hover');
    });
  };

  render() {
    const { match, nickName, showMask} = this.props;

    return (
      <div className="infor" style={{marginTop:'150px'}}>
        <LoginInfo history={this.props.history}/>
        <div className="w clearfix">
          <LeftMenu param={this.props}/>
          <Switch>
            {/*信披声明*/}
            <Route path={Path.Letter_Statement}  component={Loadable({loader: () => import('../information/letterstatement'),loading: loading})} />
            {/*合规经营承诺书*/}
            <Route path={Path.Compliance_Letter}  component={Loadable({loader: () => import('../information/complianceLetter'),loading: loading})} />
            {/*合规经营报告*/}
            <Route path={Path.Compliance_Report}  component={Loadable({loader: () => import('../information/complianceReport'),loading: loading})} />
            {/* 运营信息 */}
            <Route path={Path.OPERATION_INFORMATION}  component={Loadable({loader: () => import('../information/operationInformation'),loading: loading})} />
            {/* 运营数据 */}
            <Route path={Path.OPEATE_DATA}  component={Loadable({loader: () => import('../information/operateData'),loading: loading})} />
            {/* 运营报告 */}
            <Route path={Path.OPERATIONAL_REPORT}  component={Loadable({loader: () => import('../information/operationalReport'),loading: loading})} />
            {/* 审核信息 */}
            <Route path={Path.Audit_Information}  component={Loadable({loader: () => import('../information/auditInformation'),loading: loading})} />
            {/* 风险提醒告知书 */}
            <Route path={Path.Risk_Warning}  component={Loadable({loader: () => import('../information/riskWarning'),loading: loading})} />
            {/* 备案信息页面 */}
            <Route path={Path.RECORD_INFORMATION}  component={Loadable({loader: () => import('../information/recordInformation'),loading: loading})} />
            {/* 收费标准 */}
            <Route path={Path.Fee_Scale}  component={Loadable({loader: () => import('../information/feeScale'),loading: loading})} />
            {/* 投资者教育 */}
            <Route path={Path.EDUCATION}  component={Loadable({loader: () => import('../information/education'),loading: loading})} />
            {/* 组织信息*/}
            <Route path={Path.ORGANIZATIONAL_INFORMATION}  component={Loadable({loader: () => import('../information/organizationInformation'),loading: loading})} />
            {/* 组织架构*/}
            <Route path={Path.ORGANIZATIONAL_STRUCTURE}  component={Loadable({loader: () => import('../information/organizationalStructure'),loading: loading})} />
            {/* 工商信息*/}
            <Route path={Path.BUSINESS_INFORMATION}  component={Loadable({loader: () => import('../information/businessInformation'),loading: loading})} />
            {/* 重大事项 */}
            <Route path={Path.IMPORTANT_MATTERS}  component={Loadable({loader: () => import('../information/importantMatters'),loading: loading})} />
            {/* 分支机构 */}
            <Route path={Path.AFFILIATED_AGENCY}  component={Loadable({loader: () => import('../information/affiliatedAgency'),loading: loading})} />
            {/* 官方渠道 */}
            <Route path={Path.OFFICIAL_CHANNEL}  component={Loadable({loader: () => import('../information/officialChannel'),loading: loading})} />
            {/* 公司介绍 */}
            <Route path={Path.COMPANY_INTRODUCTION}  component={Loadable({loader: () => import('../information/CompanyIntroduction'),loading: loading})} />
            {/* 平台公告*/}
            <Route path={Path.PLATFORM_ANNOUNCEMENT}  component={Loadable({loader: () => import('../information/platformAnnouncement'),loading: loading})} />
            {/* 管理团队 */}
            <Route path={Path.MANAGEMENT_TEAM}  component={Loadable({loader: () => import('../information/managementTeam'),loading: loading})} />
            {/* 团队简介 */}
            <Route path={Path.TEAM_PROFILE}  component={Loadable({loader: () => import('../information/teamProfile'),loading: loading})} />
            {/* 人员概况 */}
            <Route path={Path.PROFILE}  component={Loadable({loader: () => import('../information/profile'),loading: loading})} />
            {/* 大事记 */}
            <Route path={Path.BIG_EVENTS}  component={Loadable({loader: () => import('../information/bigEvents'),loading: loading})} />
            {/* 加入我们 */}
            <Route path={Path.JOIN_US}  component={Loadable({loader: () => import('../information/joinUs'),loading: loading})} />
            {/* 企业文化 */}
            <Route path={Path.ENTERPRISE_WILL}  component={Loadable({loader: () => import('../information/enterpriseWill'),loading: loading})} />
            {/* 服务理念 */}
            <Route path={Path.CONTACT_US}  component={Loadable({loader: () => import('../information/contactUs'),loading: loading})} />
            {/* 法律法规 */}
            <Route path={Path.LAWS_REGULATION}  component={Loadable({loader: () => import('../information/lawsRegulations'),loading: loading})} />
            {/* 法务支持 */}
            {/* 风险控制 */}
            <Route path={Path.RISK_MANAGEMENT}  component={Loadable({loader: () => import('../information/riskManagement'),loading: loading})} />
            {/* 安全保障*/}
            <Route path={Path.SAFE_GUARANTEE}  component={Loadable({loader: () => import('../information/safeGuarantee'),loading: loading})} />
            {/* 法律声明 */}
            <Route path={Path.LEGAL_DECLARATION}  component={Loadable({loader: () => import('../information/legalDeclaration'),loading: loading})} />
            {/* 合作伙伴 */}
            <Route path={Path.COOPERATION_PARTNE}  component={Loadable({loader: () => import('../information/CooperativePartner'),loading: loading})} />
          </Switch>
        </div>
      </div>
    );
  }
}
