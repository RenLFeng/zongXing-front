import React from 'react';
import {Icon} from 'antd';
import LeftMenu from './leftMenu';
import '../../assets/infor/information/organ.scss'
import {TEAM_PROFILE,PROFILE} from '../../common/pagePath'
export default class ManagementTeam extends React.Component{
  render(){
    return(
      <div className="fr organ">
        <h2><span>管理团队</span><i></i><span className="last"></span></h2>
        <div className="warp">
          <ul className="item box1 opera">
            <li>
              <span onClick={()=>{this.props.history.push(TEAM_PROFILE)}}><Icon type="contacts" /></span>
              <span>管理团队简介</span>
            </li>
            <li>
              <span onClick={()=>{this.props.history.push(PROFILE)}}><Icon type="team" /></span>
              <span>从业人员概况内容</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
