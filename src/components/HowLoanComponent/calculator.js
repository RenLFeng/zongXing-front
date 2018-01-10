import React from 'react';


export default class Calculator extends React.Component {

  render() {
    return (
      <div className="cal">
        <div className="row clearfix row1">
          <div className="col1">
            <i>贷款金额</i>
          </div>
          <div className="col2">
            <div className="input clearfix">
              <input className="fl" type="text" />
              <i className="fr">万元</i>
            </div>
          </div>
        </div>
        <div className="row barbox">
          <div className="clearfix">
            <div className="col1">
              <i>贷款期限</i>
            </div>
            <div className="col2">
              <div className="bar">
                <i className="len" data-value="7"><a className="g">7个月</a></i>
              </div>
            </div>
          </div>
          <div className="clearfix">
            <div className="col1">
              <i>年利率</i>
            </div>
            <div className="col2">
              <div className="bar">
                <i className="len" data-value="12"><a className="g">12%</a></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix btns">
          <a className="fl btn">计 算</a>
          <a className="fr btn">重 置</a>
        </div>
        <div className="row result">
          <p className="clearfix">
            <i className="col1">每月还款</i>
            <i className="col2"><em>12,333,232</em>元</i>
          </p>
          <p className="clearfix">
            <i className="col1">总支付利息</i>
            <i className="col2"><em>****</em>元</i>
          </p>
          <p className="clearfix">
            <i className="col1">本息合计</i>
            <i className="col2"><em>***</em>元</i>
          </p>
        </div>
        <div className="bot center">
          <a className="btn big"><i>我要借款</i></a>
        </div>
      </div>
    );
  }
}
