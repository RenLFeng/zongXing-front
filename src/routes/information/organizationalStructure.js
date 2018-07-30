import React from 'react';
import {Icon} from 'antd';
import LeftMenu from './leftMenu';
import {ORGANIZATIONAL_INFORMATION} from '../../common/pagePath'
import '../../assets/infor/information/organ.scss'
import '../../assets/infor/information/affili.scss'
export default class OrganizationalStructure extends React.Component {
  render() {
    return (
      <div className="fr organ Organi-str">
        <h2><span className="first"  onClick={()=>{this.props.history.push(ORGANIZATIONAL_INFORMATION)}}>组织信息</span><i>></i><span className="last">组织架构</span></h2>
        <div className="warp">
          <img src={require('../../assets/img/infor/Structure.jpg')} alt=""/>
        </div>
      </div>
    );
  }
}
