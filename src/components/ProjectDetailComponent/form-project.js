import React from 'react';

export default class FormProject extends React.Component {
  render() {
    return (
      <div className="pd-form shadow none">
        <a className="close"/>
        <div className="card">
          <i className="level">C+</i>
          <img className="pic" src={require('../../assets/img/project-detail/pic12.png')} />
          <p className="tit">MAIBOCAKE麦波月饼</p>
          <p className="city">四川 - 成都</p>
          <p className="t1">
            <i><em className="cf60">12%</em>年利率</i>
            <i>期限<em className="cf60">30</em>天</i>
          </p>
          <div className="bar"><div style={{width: '50%'}} /></div>
          <p className="t2 f16 c9">
            <i className="fl">借款总额<em className="f24 cf60">500,000</em>元</i>
            <i className="fr">剩余可投<em className="f24 cf60">412,300</em>元</i>
          </p>
        </div>
        <div className="form">
          <div className="row clearfix">
            <div className="col1">
              <i className="f16 c9">我可用的余额</i>
            </div>
            <div className="col2">
              <i className="f24 cf60">234,234,000</i>
              <i className="f18">元</i>
              <a className="btn btn1 f18">充值</a>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col1">
              <i className="f16 c9">我要投</i>
            </div>
            <div className="col2">
              <input className="put" type="text" placeholder="投资金额为100的整数倍" />
              <i className="f16 c9">元</i>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col1"/>
            <div className="col2">
              <input className="put chk" type="checkbox" id="pdfchk1" />
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
              <input className="put chk" type="checkbox" id="pdfchk2" />
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
