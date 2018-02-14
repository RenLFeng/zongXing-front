import React from 'react';
import {Link, Switch, Route} from 'dva/router';
import i18n from '../i18n/i18n';
import '../assets/publish/index.scss';
import RecordInformation from "./information/recordInformation";
import OrganizationInformation from "./information/organizationInformation";
import ContactUs from "./information/contactUs";
import { startAnimate } from '../assets/invest/index';

import AuditInformation from "./information/auditInformation";
import BusinessInformation from "./information/businessInformation";
import ProjectInformation from "./information/projectInformation";

import PlatformNotice from "./information/legalSupport";
import NewsReports from "./information/newsReports";
import LegalDeclaration from "./information/lawsRegulations";

import EchartsTest from "./information/echartsTest";
import HeaderInfor from '../../src/components/publish/headerInfor';
import Footer from '../../src/components/HomePageComponent/footer';


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
		return (
      <div>
        <HeaderInfor param={this.props}/>
        <br/>
        <div className="section sec-qa">
           <div className="w clearfix">
            <div className="fl shadow center">
             <p className="t1 q">信息披露</p>
             <div className="a">
             <p className="t2 "><Link  to={`${match.path}/recordinformation`}>备案信息</Link></p>
             <p className="t2 "><Link  to={`${match.path}/organizationInformation`}>组织信息</Link></p>
             <p className="t2 "><Link  to={`${match.path}/auditInformation`}>审核信息</Link></p>
             <p className="t2 "><Link  to={`${match.path}/businessInformation`}>运营信息</Link></p>
             <p className="t2 "><Link  to={`${match.path}/projectInformation`}>项目信息</Link></p>
             </div>
             <p className="t1 q close">法律法务</p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>法律法规</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>法务支持</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>风险控制</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>安全保障</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>服务条款</Link></p>

             <p className="t1"><Link  to={`${match.path}/projectInformation`}>关于我们</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>公司介绍</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>管理团队</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>企业愿景</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>服务理念</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>联系我们</Link></p>

             <p className="t1"><Link  to={`${match.path}/projectInformation`}>合作伙伴</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>技术合作</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>风控合作</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>法务合作</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>安全合作</Link></p>
             <p className="t2"><Link  to={`${match.path}/projectInformation`}>媒体合作</Link></p>


             <p className="t2"><Link  to={`${match.path}/echartsTest`}>图表测试</Link></p>
            </div>
          <Switch>
            <Route path={`${match.path}/recordinformation`} exact component={RecordInformation}/>
            <Route path={`${match.path}/organizationInformation`} component={OrganizationInformation}/>
            <Route path={`${match.path}/auditInformation`} component={AuditInformation}/>
            <Route path={`${match.path}/businessInformation`} component={BusinessInformation} />
            <Route path={`${match.path}/projectInformation`} component={ProjectInformation} />


            <Route path={`${match.path}/echartsTest`} component={EchartsTest} />
          </Switch>
      </div>
    </div>
        <Footer param={this.props}/>
  </div>
		);
	}
}
