import React from 'react';
import { Icon, Input, Button,} from 'antd';
import '../../assets/ucenter/realName.scss';



export default class Authentication extends React.Component {
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
                  <span className="safeCenter_">安全中心</span>
                  <span>> 身份认证 > 选择身份认证证件类型</span>
              </div>
              <div className="card">
                <div className="id_card">
                  <Icon type="idcard" className="id_Card"/>
                </div>
                <span className="china">中国大陆居民身份认证</span>
                <Button type="primary" onClick={()=>{this.setState({showPage:'china_card'})}}>我要认证</Button>
              </div>
              <div className="card top">
                <div className="id_card">
                  <Icon type="idcard" className="id_Card"/>
                  <Icon type="close-circle-o" className="close"/>
                </div>
                <span className="china">港澳台居民身份认证</span>
                <Button type="primary">我要认证</Button>
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


