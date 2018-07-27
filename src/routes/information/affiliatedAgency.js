import React from 'react';
import {Icon} from 'antd';
import LeftMenu from './leftMenu';
import {ORGANIZATIONAL_INFORMATION} from '../../common/pagePath'
import '../../assets/infor/information/organ.scss'
import '../../assets/infor/information/affili.scss'
export default class AffiliatedAgency extends React.Component {
  render() {
    return (
      <div className="fr organ affili">
        <h2><span className="first"  onClick={()=>{this.props.history.push(ORGANIZATIONAL_INFORMATION)}}>组织信息</span><i>></i><span className="last">分支机构</span></h2>
        <div className="warp">
          <ul className="item box1">
            <li className="shadow">
              <span><Icon type="home" /></span>
              <span>温馨提示<br/>暂无分支机构</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
