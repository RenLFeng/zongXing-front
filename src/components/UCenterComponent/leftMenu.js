import React from 'react';
import { Link } from 'dva/router';
import Path from '../../common/pagePath';
import '../../assets/ucenter/leftmenu.scss'
import { Divider } from 'antd';

export default class LeftMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {param} = this.props;
    const path = param.location.pathname;
    return (
        <div className="uc-left-menu" >
          <ul>
             <li>
                <span>
                  <i className="zjb zjb-zhanghu" ></i> 我的账户
                </span>
                <ul> 
                  <li><Link className={path.indexOf(Path.INVEST_MENT) ===-1?'':'active'} to={Path.INVEST_MENT}>投资记录</Link></li>    
                  <li><Link className={path.indexOf(Path.ACCOUNT_STATEMENT) ===-1?'':'active'} to={Path.ACCOUNT_STATEMENT}>资金流水</Link></li>
                  <li><Link className={path.indexOf(Path.MY_COUPON) ===-1?'':'active'} to={Path.MY_COUPON}>我的优惠券</Link>   </li>
                  <li>券额明细</li>
                  <li><Link className={path.indexOf(Path.Project_Collection) ===-1?'':'active'} to={Path.Project_Collection}>项目收藏</Link> </li>
                  <li>我的邀请码</li>
                </ul> 
             </li>
             <li>
                <span>
                  <i className="zjb zjb-49"></i>安全中心
                </span>
                <ul>
                    <li><Link className={path.indexOf(Path.REALNAME_AUTHENTICATION)===-1?'':'active'} to={Path.REALNAME_AUTHENTICATION}>实名认证</Link></li>
                    <li><Link className={path.indexOf(Path.IPRECORD)===-1?'':'active'} to={Path.IPRECORD}>IP记录</Link></li>
                </ul>
             </li>
             <li>
                <span>
                  <i className="zjb zjb-tongzhi"></i> 
                  通知中心
                </span>
                 <ul>
                     <li>平台登录</li>
                 </ul>
             </li>
          </ul> 
        </div>
      // <div className="fl uc-lbody">
      
      //   <div className="navbox">
      //     <p className="hd ic1 hover">
      //       <a>安全中心</a>
      //     </p>
      //     <div className="nav">
      //       <ul>
      //         <li><Link className={path.indexOf(Path.REALNAME_AUTHENTICATION)===-1?'':'hover'} to={Path.REALNAME_AUTHENTICATION}>实名认证</Link></li>
      //       </ul>
      //     </div>
      //   </div>
      //   <div className="navbox">
      //     <p className="hd ic2 hover">
      //       <a>个人中心</a>
      //     </p>
      //     <div className="nav">
      //       <ul>
      //         <li><Link className={path.indexOf(Path.USER_BASIC)===-1?'':'hover'} to={Path.USER_BASIC}>基础资料</Link></li> 
      //         <li><Link className={path.indexOf(Path.BANK_CARD)===-1?'':'hover'} to={Path.BANK_CARD}>银行卡</Link></li>
      //         <li><Link className={path.indexOf(Path.STATION_MESSAGE) ===-1?'':'hover'} to={Path.STATION_MESSAGE}>站内消息</Link></li>
      //         <li><Link className={path.indexOf(Path.NOTICE_LIST) ===-1?'':'hover'} to={Path.NOTICE_LIST}>站内公告</Link></li>
      //       </ul>
      //     </div>
      //   </div>
      //   <div className="navbox">
      //     <p className="hd ic4 hover">
      //       <a>我的投资</a>
      //     </p>
      //     <div className="nav">
      //       <ul>
      //         <li></li>
      //         <li><Link className={path.indexOf(Path.ALL_INVEST) ===-1?'':'hover'} to={Path.ALL_INVEST}>投资总览</Link></li>
      //         <li></li>
      //       </ul>
      //     </div>
      //   </div>
      //   <div className="navbox">
      //     <p className="hd ic5 hover">
      //       <a>我的企业</a>
      //     </p>
      //     <div className="nav">
      //       <ul>
      //         <li><Link className={path.indexOf(Path.COMPANY_LIST)===-1?'':'hover'} to={Path.COMPANY_LIST}>企业列表</Link></li>
      //       </ul>
      //     </div>
      //   </div>
      //   <div className="navbox">
      //     <p className="hd ic7">
      //       <a>我的优惠券</a>
      //     </p>
      //   </div>
      // </div>
    );
  }
}
