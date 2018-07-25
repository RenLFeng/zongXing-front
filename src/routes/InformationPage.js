import React from 'react';
import {Icon} from 'antd'
import {Link, Switch, Route} from 'dva/router';
import i18n from '../i18n/i18n';
import '../assets/publish/index.scss';
import RecordInformation from "./information/recordInformation";
import OrganizationInformation from "./information/organizationInformation";
import ContactUs from "./information/contactUs";
import { startAnimate } from '../assets/invest/index';

import OperateData from './information/operateData';
import PlatformReport from './information/platformReport';
import FinancialStatements from './information/financialStatements';

import AuditInformation from "./information/auditInformation";
import BusinessInformation from "./information/businessInformation";
import ProjectInformation from "./information/projectInformation";

import PlatformNotice from "./information/legalSupport";
import NewsReports from "./information/newsReports";
import LegalDeclaration from "./information/lawsRegulations";

import EchartsTest from "./information/echartsTest";
import HeaderInfor from '../../src/components/publish/headerInfor';
import Footer from '../../src/components/HomePageComponent/footer';
import Plant from "./information/plantNotice";
import NoticeDetail from "./information/noticeDetail";
import Path from "../common/pagePath";


export default class InformationPage extends React.Component{
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // startAnimate();
 // initPage() {
  //   $('.uc-lbody>.navbox').on('click', '.hd>a,.folder>a', function(){
  //     $(this).parent().toggleClass('hover');
  //   });
  }



	render() {
		const {match} = this.props;
    const path = this.props.location.pathname;
		return (
      <div>
        <HeaderInfor param={this.props}/>
        <br/>
        <div className="section sec-qa">
           <div className="w clearfix">
            <div className="fl shadow center">
            <p className="t1 q"><Icon type="edit" />信息披露</p>
            <div className="a">
            <p className="t2 "><Link className={path.indexOf(Path.RECORD_INFORMATION) ===-1?'':'hover'} to={Path.RECORD_INFORMATION}>备案信息</Link></p>
            <p className="t2 "><Link  className={path.indexOf(Path.ORGANIZATIONAL_INFORMATION) ===-1?'':'hover'} to={Path.ORGANIZATIONAL_INFORMATION}>组织信息</Link></p>
            <p className="t2 "><Link className={path.indexOf(Path.AUDIT_INFORMATION) ===-1?'':'hover'} to={Path.AUDIT_INFORMATION}>审核信息</Link></p>
            <p className="t2 "><Link  className={path.indexOf(Path.BUSINESS_INFORMATION) ===-1?'':'hover'} to={Path.BUSINESS_INFORMATION}>运营信息</Link></p>
            <p className="t2 "><Link  className={path.indexOf(Path.PROJECT_INFORMATION) ===-1?'':'hover'} to={Path.PROJECT_INFORMATION}>项目信息</Link></p>
            </div>

            <p className="t1 q close"><Icon type="link" />平台数据</p>
            <p className="t2"><Link  className={path.indexOf(Path.OPEATE_DATA) ===-1?'':'hover'} to={Path.OPEATE_DATA}>运营数据</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.PLATFORM_REPORT) ===-1?'':'hover'} to={Path.PLATFORM_REPORT}>平台报告</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.FINANCIAL_STATEMENTS) ===-1?'':'hover'} to={Path.FINANCIAL_STATEMENTS}>财务报表</Link></p>
            
            <p className="t1 q close"><Icon type="link" />法律法务</p>
            <p className="t2"><Link  className={path.indexOf(Path.LAWS_REGULATION) ===-1?'':'hover'} to={Path.LAWS_REGULATION}>法律法规</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.LEGAL_SUPPORT) ===-1?'':'hover'} to={Path.LEGAL_SUPPORT}>法务支持</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.RISK_MANAGEMENT) ===-1?'':'hover'} to={Path.RISK_MANAGEMENT}>风险控制</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.SAFE_GUARANTEE) ===-1?'':'hover'} to={Path.SAFE_GUARANTEE}>安全保障</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.TERM_SERVICE) ===-1?'':'hover'} to={Path.TERM_SERVICE}>服务条款</Link></p>

            <p className="t1"><Icon type="idcard" />关于我们</p>
            <p className="t2"><Link  className={path.indexOf(Path.COMPANY_INTRODUCTION) ===-1?'':'hover'} to={Path.COMPANY_INTRODUCTION}>公司介绍</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.MANAGEMENT_TEAM) ===-1?'':'hover'} to={Path.MANAGEMENT_TEAM}>管理团队</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.ENTERPRISE_WILL) ===-1?'':'hover'} to={Path.ENTERPRISE_WILL}>企业愿景</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.SERVICE_IDEA) ===-1?'':'hover'} to={Path.SERVICE_IDEA}>服务理念</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.CONTACT_US) ===-1?'':'hover'} to={Path.CONTACT_US}>联系我们</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.NOTICE_DETAIL) ===-1?'':'hover'} to={Path.NOTICE_DETAIL}>平台公告</Link></p>

            <p className="t1"><Icon type="team" />合作伙伴</p>
            <p className="t2"><Link  className={path.indexOf(Path.TECHNICAL_COOPERATION) ===-1?'':'hover'} to={Path.TECHNICAL_COOPERATION}>技术合作</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.WIND_COOPERATION) ===-1?'':'hover'} to={Path.WIND_COOPERATION}>风控合作</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.LEGAL_COOPERATION) ===-1?'':'hover'} to={Path.LEGAL_COOPERATION}>法务合作</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.SECURITY_COOPERATION) ===-1?'':'hover'} to={Path.SECURITY_COOPERATION}>安全合作</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.MEDIA_COOPERATION) ===-1?'':'hover'} to={Path.MEDIA_COOPERATION}>媒体合作</Link></p>
            <p className="t2"><Link  className={path.indexOf(Path.ICON_TEST) ===-1?'':'hover'} to={Path.ICON_TEST}>图表测试</Link></p>
            </div>
          <Switch>
            <Route path={`${match.path}/recordinformation`} exact component={RecordInformation}/>
            <Route path={`${match.path}/organizationInformation`} component={OrganizationInformation}/>
            <Route path={`${match.path}/auditInformation`} component={AuditInformation}/>
            <Route path={`${match.path}/businessInformation`} component={BusinessInformation} />
            <Route path={`${match.path}/projectInformation`} component={ProjectInformation} />
            <Route path={`${match.path}/echartsTest`} component={EchartsTest} />
            <Route path={`${match.path}/plantNotice`} exact component={Plant} />
            <Route path={`${match.path}/plantNotice/:projectId`} component={NoticeDetail} />
            <Route path={`${match.path}/operateData`} exact component={OperateData}/>
            <Route path={`${match.path}/platformReport`} exact component={PlatformReport}/>
            <Route path={`${match.path}/financialStatements`} exact component={FinancialStatements}/>
          </Switch>
      </div>
    </div>
        <Footer param={this.props}/>
  </div>
		);
	}
}
