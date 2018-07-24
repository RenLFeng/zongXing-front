import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/contactUs/contactUs.scss'
export default class ContactUs extends React.Component {
  render() {
    return (
      <div className="infor">
        <div  className="w clearfix">
          {/* <LeftMenu param={this.props}/> */}
          <div className="fr conUs">
            <h2><span>联系我们</span></h2>
            <div className="map">
              <img src={require("../../assets/img/infor/map.jpg")} alt=""/>
            </div>
            <div className="addres">
              <ul>
                <li><span>咨询电话</span><span>0755-86963117</span></li>
                <li><span> 投诉、举报电话</span><span>0755-86963117</span></li>
                <li><span>   邮箱</span><span>jzb@jzb.com</span></li>
                <li><span> 通迅地址</span><span>深圳市南山区粤海街道高新技术产业园高新南七道1号粤美特大厦10F/8</span></li>
                <li><span>客服电话</span><span>  0755-86963117</span></li>
                <li><span> 服务时间</span><span>  工作日：09:00-18:00</span></li>
              </ul>
            </div>
            <div className="qrCode">
              <ul className="clearfix">
                <li><span className="code"><img src={require("../../assets/img/infor/con_q1.png")} alt=""/></span><span>官方手机应用二维码</span></li>
                <li><span className="code"><img src={require("../../assets/img/infor/con_q1.png")} alt=""/></span><span>微信服务号</span></li>
                <li><span className="code"><img src={require("../../assets/img/infor/con_q1.png")} alt=""/></span><span>订阅号</span></li>
                <li><span className="code"><img src={require("../../assets/img/infor/con_q1.png")} alt=""/></span><span>众杰帮交流群</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
