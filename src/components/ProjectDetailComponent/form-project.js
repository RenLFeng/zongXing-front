import React from 'react';
import {Link} from 'dva/router';
import { ACCOUNT_RECHARGE } from '../../common/pagePath';
import { IMG_BASE_URL } from '../../common/systemParam';
import moment from 'moment';

export default class FormProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      money: '',
      agreement: false,
      risk: false
    };
  }

  checkFormat(e) {
    this.setState({
      money: e.target.value
    });

  }
  render() {
    const {project} = this.props;
    const dateCode = moment(project.fcreate_time).format('YYYY') + moment(project.fcreate_time).format('MM');
    return (
      <div className="pd-form shadow">
        <a className="close"/>
        <div className="card">
          <i className="level">{project.fleve_name}</i>
          <img className="pic" src={`${IMG_BASE_URL}project/${dateCode}/${project.fproject_no}/${project.fcard_pic_path}`} />
          <p className="tit">{project.fname}</p>
          <p className="city">{project.fcity_name}</p>
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
          <a className="btn btn2">提交</a>
        </div>
      </div>
    );
  }
}
