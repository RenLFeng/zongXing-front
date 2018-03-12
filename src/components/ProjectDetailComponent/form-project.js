import React from 'react';
import {Link} from 'dva/router';
import { ACCOUNT_RECHARGE } from '../../common/pagePath';
import { IMG_BASE_URL,MUN_INTEGER  } from '../../common/systemParam';
import moment from 'moment';
import {Button, message, Modal, InputNumber} from 'antd';
import { Investment } from '../../services/api';

export default class FormProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: '',
      agreement: false,
      risk: false,
      loading: false,
      errMsg: '',
      data: {}
    };
  }

  checkFormat(value) {
    if (!MUN_INTEGER.test(value+'')) {
      this.setState({errMsg: '金额格式不正确'});
    } else if (value * 1 % 100 !== 0) {
      this.setState({errMsg: '金额需为100的整数倍'});
    } else if (value === 0){
      this.setState({errMsg: '金额不能为0'});
    } else {
      this.setState({errMsg: ''});
    }
    this.setState({
      money: value
    });

  }

  closeDiv() {
    if (this.state.loading) {
      message.warning('正在提交数据请稍后');
      return;
    }
    $('._masker').remove();
    $('.pd-form').addClass('none');
    this.setState({
      money: '',
      agreement: false,
      risk: false,
      loading: false,
      data: {}
    });
  }

  async submit() {
    if (!this.state.money) {
      message.warning('输入金额不能为空');
      return;
    }
    if (this.state.money === 0) {
      message.warning('输入金额不能为0');
      return;
    }
    if (this.state.errMsg) {
      message.warning('输入金额有误');
      return;
    }
    if (!this.state.risk) {
      message.warning('请查看风险提示');
      return;
    }
    if (!this.state.agreement) {
      message.warning('请查看借入协议');
      return;
    }
    try {
      const data = {
        projectId: this.props.project.fpeoject_id,
        amount: this.state.money * 1,
        remark: ''
      };
      this.setState({loading: true});
      const response = await Investment(data);
      this.setState({loading: false});
      if (response.code === 0) {


        this.setState({
          data: response.data,
          loading: false
        }, () => {
          this.formId.submit();
          this.setState({
            money: '',
            agreement: false,
            risk: false,
            loading: false,
            data: {},
          });
          $('._masker').remove();
          $('.pd-form').addClass('none');
        });

      } else {
        message.error(response.msg);
      }
    } catch(e) {
      this.setState({loading: false});
      if (typeof e === 'object' && e.name === 288) {
        throw e;
      }
      message.error('网络异常');

    }
  }

  submitMoney() {
    this.formId.submit();
    this.setState({
      money: '',
      agreement: false,
      risk: false,
      loading: false,
      data: {},
    });
    $('._masker').remove();
    $('.pd-form').addClass('none');
  }

  render() {
    const {project} = this.props;
    const dateCode = moment(project.fcreate_time).format('YYYY') + moment(project.fcreate_time).format('MM');
    const {data} = this.state;
    return (
      <div className="pd-form shadow none">
        <a className="close" onClick={()=>this.closeDiv()}/>
        <div className="card">
          <i className="level">{project.fleve_name}</i>
          <img className="pic" src={`${IMG_BASE_URL}/${project.fcard_pic_path}`} />
          <p className="tit">{project.fname}</p>
          <p className="city">{project.fprovincial_name} - {project.fcity_name}</p>
          <p className="t1">
            <i>年利率<em className="cf60">{project.frate_last}%</em></i>
            <i>期限<em className="cf60">{project.fcollect_day}</em>天</i>
          </p>
          <div className="bar"><div style={{width: `${project.allMoney*1/project.fcredit_money}%`}} /></div>
          <p className="t2 f16 c9">
            <i className="fl">借款总额<em className="f24 cf60">{(project.fcredit_money+'').fm()}</em>元</i>
            <i className="fr">剩余可投<em className="f24 cf60">{((project.fcredit_money-project.allMoney)+'').fm()}</em>元</i>
          </p>
        </div>
        <div className="form">
          <div className="row clearfix">
            <div className="col1">
              <i className="f16 c9">我可用的余额</i>
            </div>
            <div className="col2">
              <i className="f24 cf60">{this.props.personalMoney.fm()}</i>
              <i className="f18">元</i>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col1">
              <i className="f16 c9">我要投</i>
            </div>
            <div className="col2">
              <InputNumber
                style={{padding: 0, fontSize: 18}}
                className="put"
                type="text"
                value={this.state.money}
                min={100}
                placeholder="投资金额为100的整数倍"
                onChange={(e)=>this.checkFormat(e)}
                step={100}
                size={'large'}

              />
              <i className="f16 c9">元</i>
            </div>
          </div>
          { this.state.errMsg ?
            <div className="row clearfix" style={{marginTop: -20}}>
              <div className="col2">
                <p style={{fontSize: 16, color: 'red',marginLeft: -345}}>{this.state.errMsg}</p>
              </div>
            </div> : null
          }
          <div className="row clearfix">
            <div className="col1"/>
            <div className="col2">
              <input className="put chk" type="checkbox" id="pdfchk1" checked={this.state.risk} onChange={()=>this.setState({risk: !this.state.risk})}/>
              <label htmlFor="pdfchk1">我接受风险提示</label>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col1"/>
            <div className="col2">
              <textarea className="put" rows="8" value={`1.我司发行QQ卡号为9位数字，密码为12位数字，没有英文字母，若您购买的QQ卡含有英文字母或位数不够，请联系第三方卖家处理；

                2.购买QQ卡可在附近的网吧或报刊亭、电脑城等地购买，请在购买时留意QQ卡位数；

                3.QQ卡支持分多次充值，但请在有效期内使用，如：30元面值QQ卡，可先充值10元，再充20元；

                4.请在QQ卡有效期内使用，若超过有效期则无法使用，请勿刮坏QQ卡，若刮坏可联系卖家处理；

                5.通过电信积分兑换的Q币卡请登录电信对应的入口进行操作；

                6.QQ卡充值是立即到帐，若未到帐请点击这里查看充值情况；

                7.更多信息了解，请点击链接。`} readOnly/>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col1"/>
            <div className="col2">
              <input className="put chk" type="checkbox" id="pdfchk2" checked={this.state.agreement} onChange={()=>this.setState({agreement: !this.state.agreement})}/>
              <label htmlFor="pdfchk2">我同意<a>《借入协议》</a></label>
            </div>
          </div>
        </div>
        <form ref={ref => this.formId = ref} id="form1" name="form1" action={data.submitURL} method="post" target="_blank">
          <input id="Action" name="Action" value={data.action?data.action: ''} type="hidden" />
          <input id="ArrivalTime" name="ArrivalTime" value={data.arrivalTime?data.arrivalTime: ''} type="hidden" />
          <input id="LoanJsonList" name="LoanJsonList" value={data.loanJsonList} type="hidden" />
          <input id="NeedAudit" name="NeedAudit" value={data.needAudit} type="hidden" />
          <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={data.platformMoneymoremore} type="hidden" />
          <input id="RandomTimeStamp" name="RandomTimeStamp" value={data.randomTimeStamp} type="hidden" />
          <input id="TransferAction" name="TransferAction" value={data.transferAction} type="hidden" />
          <input id="TransferType" name="TransferType" value={data.transferType} type="hidden" />
          <input id="RandomTimeStamp" name="RandomTimeStamp" value={data.randomTimeStamp} type="hidden" />
          <input id="Remark1" name="Remark1" value={data.remark1} type="hidden" />
          <input id="Remark2" name="Remark2" value={data.remark2} type="hidden" />
          <input id="Remark3" name="Remark3" value={data.remark3} type="hidden" />
          <input id="ReturnURL" name="ReturnURL" value={data.returnURL} type="hidden" />
          <input id="NotifyURL" name="NotifyURL" value={data.notifyURL} type="hidden"  />
          <input id="SignInfo" name="SignInfo" value={data.signInfo} type="hidden" />
        </form>
        <div className="center">
          <Button type="primary" onClick={()=>this.submit()} loading={this.state.loading} style={{width: 200, height: 40}}>提交</Button>
        </div>
      </div>
    );
  }
}
