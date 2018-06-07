import React from 'react';
import { Icon, Input, Button,} from 'antd';
import '../../assets/ucenter/realName.scss';



export default class OpenQAccount extends React.Component {
  constructor(props){
    super();
    this.state = {
      showPage: 'china',
      userName: '',
    }
  }
  render(){
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
      return(
          <div className="pages">
          {
            this.state.showPage === 'china' ? 
            <div>
              <div className="real_title_">
                  <span className="safeCenter_">实名认证</span>
                  <span>> 开通乾多多资金托管账户 > 发起开通申请</span>
              </div>
              {/* <div className="card">
                <div className="id_card">
                  <Icon type="idcard" className="id_Card"/>
                </div>
                <span className="china">中国大陆居民身份认证</span>
                <Button type="primary" onClick={()=>{this.setState({showPage:'china_card'})}}>我要认证</Button>
              </div> */}
              <div className="page_content">
                <div className="openingHints">
                    <img src={require('../../assets/img/ucenter/u4288.png')} />
                    <p style={{marginTop:60}}>开通资金托管账户，将投资人、借款人、平台三者的资金完全隔离</p>
                    <p style={{marginTop:25}}>保障您的资金安全</p>
                </div>
                <div className="buttonGroup">
                    <Button className="open" >申请开通</Button>
                    <p>系统提交用户身份资料给乾多多，进行是否已有账户判断</p>
                    <Button className="bind">已有乾多多账号进行绑定操作</Button>
                    <Button className="bind1">未有乾多多账号进行注册操作</Button>
                </div>
                
              </div>
              
            </div> : 
            (this.state.showPage === 'china_card' ) ? 
            <div>
              <div className="real_title_">
                  <span className="safeCenter_">安全中心</span>
                  <span>> 身份认证 > 中国大陆居民身份认证</span>
              </div>
              <div className="Prompt">
                <img src={require("../../assets/img/u3530.png")}/>
                <p className="p1"> 成身份认证，有助于建立完善可靠的互联网信用体系</p>
                <p className="p2">姓名必须与充值、提现的银行卡开户名保持一致</p>
              </div>
              <div className="info">
                <div className="inp">
                  <Input placeholder="请输入真实姓名"/>
                  <img src={require('../../assets/img/u186.png')} />
                </div>
                <div className="inp">
                  <Input placeholder="请输入第二代身份证号码"/>
                  <img src={require('../../assets/img/u192.png')} />
                </div>
                <Button onClick={()=>{this.setState({showPage:'ok'})}}>立即身份认证</Button>
              </div>
            </div> :
            (this.state.showPage === 'ok' ) ? 
            <div>
              <div className="real_title_">
                  <span className="safeCenter_">安全中心</span>
                  <span>> 身份认证 > 身份认证成功</span>
              </div>
              <div className="info">
                <p>众借帮使用“全国公民身份证号码查询服务中心”（NCIIC）权威认证</p>
                <h1>
                  <img src={require('../../assets/img/u3551.png')}/>
                  人名字，恭喜您已经通过身份认证</h1>
                <a className="goback">3秒后自动返回</a>
              </div>
            </div> :null
          }
            

          </div>
      )
  }
}


