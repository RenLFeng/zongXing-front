import React from 'react';
import {Icon} from 'antd';
import LeftMenu from './leftMenu';
import '../../assets/infor/information/organ.scss'
import {OPEATE_DATA,OPERATIONAL_REPORT} from '../../common/pagePath'
export default class OperationInformation extends React.Component{
  render(){
    return(
      <div className="fr organ">
        <h2><span>运营信息</span><i></i><span className="last"></span></h2>
        <div className="warp">
          <ul className="item box1 opera">
            <li>
              <span onClick={()=>{this.props.history.push(OPEATE_DATA)}}><Icon type="team" /></span>
              <span>运营数据</span>
            </li>
            <li>
              <span onClick={()=>{this.props.history.push(OPERATIONAL_REPORT)}}><Icon type="team" /></span>
              <span>运营报告</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
