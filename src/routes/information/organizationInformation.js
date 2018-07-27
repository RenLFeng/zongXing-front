import React from 'react';
import {Icon} from 'antd';
import LeftMenu from './leftMenu';
import '../../assets/infor/information/organ.scss'
import {BUSINESS_INFORMATION,IMPORTANT_MATTERS,OFFICIAL_CHANNEL,AFFILIATED_AGENCY,ORGANIZATIONAL_STRUCTURE} from '../../common/pagePath'
export default class OrganizationInformation extends React.Component{
  render(){
    return(
      <div className="fr organ">
        <h2><span calssName="first">组织信息</span><i></i><span className="last"></span></h2>
        <div className="warp">
          <ul className="item box1">
            <li>
              <span onClick={()=>{this.props.history.push(BUSINESS_INFORMATION)}}><Icon type="team" /></span>
              <span>工商信息</span>
            </li>
            <li>
              <span><Icon type="team" /></span>
              <span>股东信息</span>
            </li>
            <li>
              <span onClick={()=>{this.props.history.push(ORGANIZATIONAL_STRUCTURE)}}><Icon type="team" /></span>
              <span>组织架构</span>
            </li>
            <li>
              <span onClick={()=>{this.props.history.push(AFFILIATED_AGENCY)}}><Icon type="team" /></span>
              <span>分支机构</span>
            </li>
            <li>
              <span onClick={()=>{this.props.history.push(OFFICIAL_CHANNEL)}}><Icon type="team" /></span>
              <span>官方渠道</span>
            </li>
            <li>
              <span onClick={()=>{this.props.history.push(IMPORTANT_MATTERS)}}><Icon type="team" /></span>
              <span>重大事项</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
