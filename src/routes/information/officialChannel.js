import React from 'react';
import LeftMenu from './leftMenu';
import {ORGANIZATIONAL_INFORMATION} from '../../common/pagePath'
export default class OfficialChannel extends React.Component {
  render() {
    return (
      <div className="infor">
        <div  className="w clearfix compay">
          <div className="fr">
            <h2><span className="first"  onClick={()=>{this.props.history.push(ORGANIZATIONAL_INFORMATION)}}>组织信息</span><i>></i><span className="last">官方渠道</span></h2>
            <div className="">
              <div className="top1 clearfix Official">
                <div className="fl left-pic" style={{height:'558px'}}>
                  <img src={require('../../assets/img/infor/logo.png')} alt=""/>
                </div>
                <div className="fr Enter-W Official">
                  <div className="right-tx">
                    <ul>
                      <li className="t2">公司官网网址：https://www.zjb.com</li>
                      <li className="t2"> 平台名称：众杰帮  </li>
                      <li className="t2">运营机构：深圳众鑫互联网鑫融服务有限公司 </li>
                      <li className="t2">平台上线运营时间：2018年  月   日   </li>
                      <li className="t2">平台APP名称：无   </li>
                      <li className="t2">APP上线时间： </li>
                      <li className="t2">电信业务经营许可信息：京ICP证<span></span>号 </li>
                      <li className="qcode">
                        <ul className="clearfix">
                          <li><span><img src={require('../../assets/img/infor/con_q1.png')} alt=""/></span><span>官方微信公众号</span></li>
                          <li><span><img src={require('../../assets/img/infor/con_q1.png')} alt=""/></span><span>官方微博</span></li>
                          <li><span><img src={require('../../assets/img/infor/con_q1.png')} alt=""/></span><span>微信小程序</span></li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
