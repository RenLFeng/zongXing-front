import React from 'react';
import {Link} from 'dva/router';
import { ACCOUNT_RECHARGE } from '../../common/pagePath';
import { IMG_BASE_URL,MUN_INTEGER  } from '../../common/systemParam';
import moment from 'moment';
import {Button, message} from 'antd';
import { Investment } from '../../services/api';

export default class FormProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: '',
      agreement: false,
      risk: false,
      loading: false,
      errMsg: ''
    };
  }

  checkFormat(e) {
    if (!MUN_INTEGER.test(e.target.value)) {
      this.setState({errMsg: '金额格式不正确'});
    } else if (e.target.value * 1 % 100 !== 0) {
      this.setState({errMsg: '金额需为100的整数倍'});
    } else if (e.target.value.trim().length === 0){
      this.setState({errMsg: '金额不能为空'});
    } else {
      this.setState({errMsg: ''});
    }
    this.setState({
      money: e.target.value
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
      loading: false
    });
  }

  async submit() {
    if (this.state.money.trim().length===0) {
      message.warning('输入金额不能为空');
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
        message.info('成功');
        $('._masker').remove();
        $('.pd-form').addClass('none');
        this.setState({
          money: '',
          agreement: false,
          risk: false,
          loading: false
        });
      } else {
        message.error(response.msg);
      }
    } catch(e) {
      message.error('网络异常');
      this.setState({loading: false})
    }

  }

  render() {
    const {project} = this.props;
    const dateCode = moment(project.fcreate_time).format('YYYY') + moment(project.fcreate_time).format('MM');
    return (
      <div className="pd-form shadow none">
        <a className="close" onClick={()=>this.closeDiv()}/>
        <div className="card">
          <i className="level">{project.fleve_name}</i>
          <img className="pic" src={`${IMG_BASE_URL}project/${dateCode}/${project.fproject_no}/${project.fcard_pic_path}`} />
          <p className="tit">{project.fname}</p>
          <p className="city">{project.fprovincial_name} - {project.fcity_name}</p>
          <p className="t1">
            <i><em className="cf60">{project.frate_last}</em>年利率</i>
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
              <Link className="btn btn1 f18" to={{pathname:ACCOUNT_RECHARGE, state:{account: this.props.accountId}}} onClick={()=>$(window).scrollTop(0)}>充值</Link>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col1">
              <i className="f16 c9">我要投</i>
            </div>
            <div className="col2">
              <input className="put" type="text" value={this.state.money} placeholder="投资金额为100的整数倍" onChange={(e)=>this.checkFormat(e)}/>
              <i className="f16 c9">元</i>
            </div>
          </div>
          { this.state.errMsg ?
            <div className="row clearfix" style={{marginTop: -20}}>
              <div className="col1"/>
              <div className="col2">
                <p style={{fontSize: 16, color: 'red'}}>{this.state.errMsg}</p>
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
              <textarea className="put" rows="8"/>
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
        <div className="center">
          <Button type="primary" onClick={()=>this.submit()} loading={this.state.loading} style={{width: 200, height: 40}}>提交</Button>
        </div>
      </div>
    );
  }
}
