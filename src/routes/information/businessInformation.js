import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/information/busin.scss'
import {ORGANIZATIONAL_INFORMATION} from '../../common/pagePath'
export default class BusinessInformation extends React.Component {
  render() {
    return (
      <div className="fr busin">
        <h2><span className="first"  onClick={()=>{this.props.history.push(ORGANIZATIONAL_INFORMATION)}}>组织信息</span><i>></i><span className="last">工商信息</span></h2>
          <div className="warp">
              <ul className="clearfix">
                <li className="two clearfix"><span className="bg5">公司全称</span><span>深圳众鑫互联网金融服务有限公司</span></li>
                <li className="four clearfix"><span className="bg5">平台简称</span><span>众杰帮</span><span className="bg5">协议模板</span><span>（注册协议模板）</span></li>
                <li className="four clearfix"><span className="bg5">统一社会组织信用代码</span><span>91440300398545405T</span><span className="bg5">公司法定代表人</span><span>金宪明</span></li>
                <li className="four clearfix"><span className="bg5">注册资本</span><span>3000万人民币</span><span className="bg5">实缴注册资本</span><span><i style={{opacity:'0'}}>zx</i></span></li>
                <li className="four clearfix addr"><span className="bg5">注册地址</span><span>深圳市南山区粤海街道高新技术产业园南区科技南七道粤美特大厦810室</span><span className="bg5">经营地址</span><span>深圳市南山区粤海街道高新技术产业园南区科技南七道粤美特大厦810室</span></li>
                <li className="four clearfix"><span className="bg5">成立时间</span><span>2014/7/17</span><span className="bg5">经营期限</span><span>2014年7月17日—长期</span></li>
                <li className="two clearfix"><span className="bg5">公司股东名称及占股比例</span><span>金宪明85%，张勇15%</span></li>
                <li className="two clearfix"><span className="bg5">经营状态</span><span>正常经营</span></li>
                <li className="two clearfix scope"><span className="bg5">经营范围</span><span>依托互联网等技术手段,提供金融中介服务（根据国家规定需要审批的，获得审批后方可经营）；金融信息咨询（不含限制项目）；创业投资；投资管理（不含限制项目）；投资咨询（不含限制项目）；经济信息咨询（不含限制项目）；经济信息咨询（不含限制项目）；房地产信息咨询；数据库管理；在网上从事商贸活动（不含限制项目）；从事担保业务（不含融资性担保业务及其他限制项目）；国内贸易（不含专营、专控、专卖商品）；经营进出口业务（法律、行政法规、国务院决定禁止的项目除外，限制的项目须取得许可后方可经营）。</span></li>
                <li className="four clearfix"><span className="bg5">平台官网上线运营时间</span><span>正式上线运营时间：</span><span className="bg5">平台APP上线运营时间</span><span>无</span></li>
                <li className="two clearfix"><span className="bg5">分支机构信息</span><span>未设置分支机构</span></li>
                <li className="two clearfix addr"><span className="bg5" style={{lineHeight:'25px'}}>实际控制人、持股5%以上的股东与保险机构、担保机构等各类第三方合作机构的关联关系： </span><span>平台目前不存在实际控制人、持股5%以上的股东与保险机构、担保机构等各类第三方合作机构有关联关系的情况。 </span></li>
                <li className="two clearfix"><span className="bg5">联系方式：</span><span>0755-12345678</span></li>
              </ul>
          </div>
      </div>

    );
  }
}
