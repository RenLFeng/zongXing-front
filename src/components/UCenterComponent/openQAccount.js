import React from 'react';
import { Icon, Button } from 'antd';
import '../../assets/ucenter/realName.scss';
import OpenAccount from './openAccount';

export default class OpenQAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPage: 'mmmpage-warn',
      realName: '',
      idcard: '',
      submitParam: {
        reqParam: {

        }
      },
      
    };
  }

  componentDidMount() {
    console.log('this.state', this.state);
    console.log('this.state.showPage', this.state.showPage);
  }

   // 获取用户手机号
   async getUserPhone() {
    const response = await getUserBaseData();
    console.log(response);
    if (response.code === 0) {
      if (response.data) {
        this.setState({
          phone: response.data.fmobile,
          realName: response.data.freal_name,
          idcard: response.data.fidcard_No,
        });
      }
    }
  }

  handSubmit = (param) => {
    console.log("submitParam:",param);
    this.setState({showPage: 'mmmpage-warn'});
  }

  render() {
    console.log('this.state.showPage', this.state.showPage);
    console.log("submitParam:",this.state.submitParam);
    const { realName, submitParam } = this.state;
    const suffix = realName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    let formRef = null;
      return(
        <div className="pages">
          {
            this.state.showPage === 'china' ?
              <div>
                <div className="real_title_">
                  <span className="safeCenter_">实名认证</span>
                  <span>&gt; 开通乾多多资金托管账户 &gt; 开通申请</span>
                </div>
                <OpenAccount parentHandSubmit={this.handSubmit} match={this.props.match} />
              </div> :
            (this.state.showPage === 'mmmpage-warn') ?
              <div>
                <div className="real_title_">
                  <span className="safeCenter_">实名认证</span>
                  <span>&gt; 开通乾多多资金托管账户 &gt; 发起开通申请</span>
                </div>
                <div className="page_content">
                  <div className="openingHints">
                    <img alt="" src={require('../../assets/img/ucenter/u4288.png')} />
                    <p style={{ marginTop: 60 }}>开通资金托管账户，将投资人、借款人、平台三者的资金完全隔离</p>
                    <p style={{ marginTop: 25 }}>保障您的资金安全</p>
                  </div>
                  <div className="buttonGroup">
                    <Button type="primary" className="open" onClick={() => this.setState({ showPage: 'china' })}>申请开通</Button>
                    <p>系统提交用户身份资料给乾多多，进行是否已有账户判断</p>
                  </div>
                </div>
                
              </div> : null
          }
        </div>
      );
  }
}
