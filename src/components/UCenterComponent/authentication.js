import React from 'react';
import { Icon, Button} from 'antd';
import '../../assets/ucenter/realName.scss';

export default class Authentication extends React.Component {
  constructor(props){
    super();
    this.state = {
      showPage: 'china',
    }
  }
  render(){
      return(
          <div className="page">
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
              <div className="card">
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

              </div>
            </div> :
            null
          }
            

          </div>
      )
  }
}