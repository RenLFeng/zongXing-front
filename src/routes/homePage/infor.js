import React from 'react';

import { Switch, Route, withRouter} from 'dva/router';
import {connect} from 'dva';
import {Button} from 'antd';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import LeftMenu from '../information/leftMenu';
//信息披露
import OperateData from '../information/operateData';
import LetterStatement from '../information/letterstatement';
import BusinessInformation from '../information/businessInformation';
import AuditInformation from '../information/auditInformation';
import RecordinFormation from '../information/recordInformation';
import FeeScale from '../information/feeScale';
import OrganizationInformation from '../information/organizationInformation';
import ProjectInformation from '../information/projectInformation';
import FinancialStatements from '../information/financialStatements';
//关于我们
import CompanyIntroduction from '../information/CompanyIntroduction.js';
import PlantNotice from '../information/plantNotice';
//import ManagementTeam from '../information/managementTeam';
//import EnterpriseWill from '../information/enterpriseWill';
//import ServiceIdea from '../information/serviceIdea';
import ContactUs from '../information/contactUs';
//法律法规
import LawsRegulations from '../information/lawsRegulations';
import LegalSupport from '../information/legalSupport';
import RiskManagement from '../information/riskManagement';
//import SafeGuarantee from '../information/safeGuarantee';
//import TermService from '../information/termService';
// 合作伙伴
//import TechnicalCooperation from '../information/technicalCooperation';
//import WindCooperation from '../information/windCooperation';
//import LegalCooperation from '../information/legalCooperation';
//import SecurityCooperation from '../information/securityCooperation';
//import MediaCooperation from '../information/mediaCooperation';
// 平台公告
import PlatformReport from '../information/platformReport';
//import IconTest from '../information/iconTest';

import '../../assets/infor/index'
import Path from '../../common/pagePath';

export default class Infor extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {

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
            <Route path={Path.Letter_Statement}  component={LetterStatement} />
            {/* 运营数据 */}
            <Route path={Path.OPEATE_DATA}  component={OperateData} />
            {/* 运营信息 */}
            {/* 审核信息 */}
            {/* 备案信息页面 */}
            <Route path={Path.RECORD_INFORMATION}  component={RecordinFormation} />
            {/* 收费标准 */}
            <Route path={Path.Fee_Scale}  component={FeeScale} />
            {/* 组织信息页面 */}
            {/* 项目信息 */}
            {/* 财务报表 */}
            {/* 公司介绍 */}
            <Route path={Path.COMPANY_INTRODUCTION}  component={CompanyIntroduction} />
            {/* 平台公告页面 */}
            {/* 管理团队 */}
            {/* 企业意愿 */}
            {/* 服务理念 */}
            <Route path={Path.CONTACT_US}  component={ContactUs} />
            {/* 法律法规 */}
            {/* 法务支持 */}
            {/* 风险控制 */}
            <Route path={Path.RISK_MANAGEMENT}  component={RiskManagement} />
            {/* 安全保障 */}
            {/* 服务条款 */}
            {/* 技术合作 */}
            {/* 风控合作 */}
            {/* 法务合作 */}
            {/* 安全合作 */}
            {/* 媒体合作 */}
            {/* 平台报告 */}
            {/* 图标测试 */}
          </Switch>
        </div>
      </div>
    );
  }
}
