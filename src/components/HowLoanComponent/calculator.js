import React from 'react';
import { Link } from 'dva/router';
import Slider from '../../assets/finance/slider';
import {connect} from 'dva';
import {message} from 'antd';
import { MONEY_REG } from '../../common/systemParam';

@connect((state)=>({
  loginStatus: state.login.status
}))
export default class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repayment: 0.00, // 每月还款
      interest: 0.00,  // 总支付利息
      theSum: 0.00, // 本息和
      calValue: 0 // 初始计算的金额
    };
    this.sum = this.sum.bind(this);
    this.initSlider = this.initSlider.bind(this);
    this.resetData = this.resetData.bind(this);
    this.calculationValue = this.calculationValue.bind(this);
  }

  componentDidMount() {
    // 初始化滑块功能
    setTimeout(()=>{
      this.initSlider();
    },200);
  }

  // 初始化计算器滑块配置
  initSlider() {
    new Slider({
      bar: $('.barbox .bar').eq(0),
      btn: $('.barbox .bar .g').eq(0),
      data: ['3个月','4个月','5个月','6个月','7个月','8个月','9个月','10个月','11个月','12个月']
    }).init();

    new Slider({
      bar: $('.barbox .bar').eq(1),
      btn: $('.barbox .bar .g').eq(1),
      data: ['8%','9%','10%','11%','12%','13%','15%']
    }).init();
  }

  //计算器 计算功能
  sum() {
    const { calValue } = this.state;
    if (!MONEY_REG.test(calValue)) {
      message.warning('计算金额不合法');
      return;
    }
    let time = $('#time').text();
    let percent = $('#percent').text();
    let money = calValue * 10000;
    /*
    * 每月还款 = 总金额/借款月数+年化利率/12*借款总金额
    *
    * */
    time = time.substring(0, time.length-2) * 1;
    percent = percent.substring(0, percent.length-1) * 1;

    let interestRate = percent.mul(money).div(12).div(100);
    let monthMoney = money.div(time).add(interestRate);

    this.setState({
      repayment: monthMoney ,  // 每月还款
      interest: (monthMoney.mul(time)).sub(calValue*10000),  // 总支付利息
      theSum: monthMoney.mul(time), // 本息和
    });
  }

  //计算器重置功能
  resetData() {
    this.setState({
      calValue: 0,
      repayment: 0.00,
      interest: 0.00,
      theSum: 0.00,
    });
  }

  // 修改计算金额
  calculationValue(e) {
    this.setState({
      calValue: e.target.value
    });
  }

  jumpApplyLoan() {
    if (this.props.loginStatus) {
      this.props.history.push(`/index/applyLoan`);
      $("#fix").removeClass('fix');
      $(window).scrollTop(0)
    } else {
      message.error('请先登录');
    }
  }

  render() {
    return (
      <div className="cal">
        <div className="row clearfix row1">
          <div className="col1">
            <i>贷款金额</i>
          </div>
          <div className="col2">
            <div className="input clearfix">
              <input className="fl" type="text" onChange={this.calculationValue} value={this.state.calValue}/>
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
                <i className="len" data-value="7个月"><a className="g" id="time">7个月</a></i>
              </div>
            </div>
          </div>
          <div className="clearfix">
            <div className="col1">
              <i>年利率</i>
            </div>
            <div className="col2">
              <div className="bar">
                <i className="len" data-value="12%"><a className="g" id="percent">12%</a></i>
              </div>
            </div>
          </div>
        </div>
        <div className="row clearfix btns">
          <a className="fl btn" onClick={this.sum}>计 算</a>
          <a className="fr btn" onClick={this.resetData}>重 置</a>
        </div>
        <div className="row result">
          <p className="clearfix">
            <i className="col1">每月还款</i>
            <i className="col2"><em>{this.state.repayment}</em>元</i>
          </p>
          <p className="clearfix">
            <i className="col1">总支付利息</i>
            <i className="col2"><em>{this.state.interest}</em>元</i>
          </p>
          <p className="clearfix">
            <i className="col1">本息合计</i>
            <i className="col2"><em>{this.state.theSum}</em>元</i>
          </p>
        </div>
        <div className="bot center">
          <a className="btn big" onClick={()=>this.jumpApplyLoan()}><i>我要借款</i></a>
        </div>
      </div>
    );
  }
}
