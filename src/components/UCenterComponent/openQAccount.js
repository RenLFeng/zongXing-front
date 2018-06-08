import React from 'react';
import { Icon, Button } from 'antd';
import '../../assets/ucenter/realName.scss';
import OpenAccount from './openAccount';

export default class OpenQAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPage: 'china',
      realName: '',
      idcard: '',
      submitParam: null,
      
    };
  }

  componentDidMount() {
    console.log('this.state', this.state);
    console.log('this.state.showPage', this.state.showPage);
  }

  handSubmit = (param) => {
    console.log("submitParam:",param);
    this.setState({ submitParam: param, showPage: 'mmmpage-warn' });
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
                    <Button className="open" onClick={() => { this.formId.submit(); }}>申请开通</Button>
                    <p>系统提交用户身份资料给乾多多，进行是否已有账户判断</p>
                  </div>
                </div>
                <form ref={ref => { this.formId = ref; formRef = ref; }} action={submitParam.submitUrl} method="post" target="_blank" style={{ display: 'none' }}>
                  <input id="AccountType" name="AccountType" value={submitParam.reqParam.AccountType} />
                  <input id="Email" name="Email" value={submitParam.reqParam.Email} />
                  <input id="IdentificationNo" name="IdentificationNo" value={submitParam.reqParam.IdentificationNo} />
                  <input id="LoanPlatformAccount" name="LoanPlatformAccount" value={submitParam.reqParam.LoanPlatformAccount} />
                  <input id="Mobile" name="Mobile" value={submitParam.reqParam.Mobile} />
                  <input id="NotifyURL" name="NotifyURL" value={submitParam.reqParam.NotifyURL} />
                  <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={submitParam.reqParam.PlatformMoneymoremore} />
                  <input id="RandomTimeStamp" name="RandomTimeStamp" value={submitParam.reqParam.RandomTimeStamp} />
                  <input id="RealName" name="RealName" value={submitParam.reqParam.RealName} />
                  <input id="RegisterType" name="RegisterType" value={submitParam.reqParam.RegisterType} />
                  <input id="Remark1" name="Remark1" value={submitParam.reqParam.Remark1} />
                  <input id="Remark2" name="Remark2" value={submitParam.reqParam.Remark2} />
                  <input id="Remark3" name="Remark3" value={submitParam.reqParam.Remark3} />
                  <input id="ReturnURL" name="ReturnURL" value={submitParam.reqParam.ReturnURL} />
                  <input id="SignInfo" name="SignInfo" value={submitParam.reqParam.SignInfo} />
                </form>
              </div> : null
          }
        </div>
      );
  }
}
