import React from 'react';
import {Icon} from 'antd'
import { Link } from 'dva/router';
import Path from '../../common/pagePath';
import '../../assets/infor/index';

export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {param} = this.props;
    const path = param.location.pathname;
    return (
      <div className="fl shadow center infor">
        <p className="t1 q"><Icon type="edit" />信息披露</p>
          <div className="a">
              <p className="t2 "><Link className={path.indexOf(Path.Letter_Statement) ===-1?'':'hover'} to={Path.Letter_Statement}>信披声明</Link></p>
              <p className="t2 "><Link className={path.indexOf(Path.RECORD_INFORMATION) ===-1?'':'hover'} to={Path.RECORD_INFORMATION}>备案信息</Link></p>
              <p className="t2 "><Link  className={path.indexOf(Path.ORGANIZATIONAL_INFORMATION) ===-1?'':'hover'} to={Path.ORGANIZATIONAL_INFORMATION}>组织信息</Link></p>
              <p className="t2 "><Link className={path.indexOf(Path.AUDIT_INFORMATION) ===-1?'':'hover'} to={Path.AUDIT_INFORMATION}>审核信息</Link></p>
              <p className="t2 "><Link  className={path.indexOf(Path.BUSINESS_INFORMATION) ===-1?'':'hover'} to={Path.BUSINESS_INFORMATION}>运营信息</Link></p>
              <p className="t2 "><Link  className={path.indexOf(Path.OPEATE_DATA) ===-1?'':'hover'} to={Path.OPEATE_DATA}>运营数据</Link></p>
              <p className="t2 "><Link  className={path.indexOf(Path.PROJECT_INFORMATION) ===-1?'':'hover'} to={Path.PROJECT_INFORMATION}>项目信息</Link></p>
              <p className="t2 "><Link  className={path.indexOf(Path.Fee_Scale) ===-1?'':'hover'} to={Path.Fee_Scale}>收费标准</Link></p>
          </div>
        <p className="t1"><Icon type="idcard" />关于我们</p>
           <div className="a">
             <p className="t2"><Link  className={path.indexOf(Path.COMPANY_INTRODUCTION) ===-1?'':'hover'} to={Path.COMPANY_INTRODUCTION}>公司介绍</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.MANAGEMENT_TEAM) ===-1?'':'hover'} to={Path.MANAGEMENT_TEAM}>管理团队</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.ENTERPRISE_WILL) ===-1?'':'hover'} to={Path.ENTERPRISE_WILL}>企业愿景</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.SERVICE_IDEA) ===-1?'':'hover'} to={Path.SERVICE_IDEA}>服务理念</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.CONTACT_US) ===-1?'':'hover'} to={Path.CONTACT_US}>联系我们</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.NOTICE_DETAIL) ===-1?'':'hover'} to={Path.NOTICE_DETAIL}>平台公告</Link></p>
           </div>

        <p className="t1 q close"><Icon type="link" />平台数据</p>
           <div className="a">
             <p className="t2"><Link  className={path.indexOf(Path.OPEATE_DATA) ===-1?'':'hover'} to={Path.OPEATE_DATA}>运营数据</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.PLATFORM_REPORT) ===-1?'':'hover'} to={Path.PLATFORM_REPORT}>平台报告</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.FINANCIAL_STATEMENTS) ===-1?'':'hover'} to={Path.FINANCIAL_STATEMENTS}>财务报表</Link></p>
           </div>

        <p className="t1 q close"><Icon type="link" />法律法务</p>
           <div className="a">
             <p className="t2"><Link  className={path.indexOf(Path.LAWS_REGULATION) ===-1?'':'hover'} to={Path.LAWS_REGULATION}>法律法规</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.LEGAL_SUPPORT) ===-1?'':'hover'} to={Path.LEGAL_SUPPORT}>法务支持</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.RISK_MANAGEMENT) ===-1?'':'hover'} to={Path.RISK_MANAGEMENT}>风险控制</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.SAFE_GUARANTEE) ===-1?'':'hover'} to={Path.SAFE_GUARANTEE}>安全保障</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.TERM_SERVICE) ===-1?'':'hover'} to={Path.TERM_SERVICE}>服务条款</Link></p>
           </div>

        <p className="t1"><Icon type="team" />合作伙伴</p>
           <div className="a">
           <p className="t2"><Link  className={path.indexOf(Path.MEDIA_COOPERATION) ===-1?'':'hover'} to={Path.MEDIA_COOPERATION}>媒体合作</Link></p>
             {/* <p className="t2"><Link  className={path.indexOf(Path.TECHNICAL_COOPERATION) ===-1?'':'hover'} to={Path.TECHNICAL_COOPERATION}>技术合作</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.WIND_COOPERATION) ===-1?'':'hover'} to={Path.WIND_COOPERATION}>风控合作</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.LEGAL_COOPERATION) ===-1?'':'hover'} to={Path.LEGAL_COOPERATION}>法务合作</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.SECURITY_COOPERATION) ===-1?'':'hover'} to={Path.SECURITY_COOPERATION}>安全合作</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.MEDIA_COOPERATION) ===-1?'':'hover'} to={Path.MEDIA_COOPERATION}>媒体合作</Link></p>
             <p className="t2"><Link  className={path.indexOf(Path.ICON_TEST) ===-1?'':'hover'} to={Path.ICON_TEST}>图表测试</Link></p> */}
           </div>
      </div>
    );
  }
}

