import React from 'react';

import { startAnimate } from '../../assets/finance/index';
import Calculator from '../../components/HowLoanComponent/calculator';
import TopTab from '../../components/HowLoanComponent/topTab';
import BottomTab from '../../components/HowLoanComponent/bottomTab';
import Qa from '../../components/HowInvestComponent/qa';

export default class HowLoan extends React.Component {
  componentDidMount() {
    startAnimate();
  }
  componentWillUnmount() {
    $(window).off('scroll');
    $('body').off('click');
  }
	render() {
		return(
      <div >
        <div className="banner1 autosize">
          <img className="big" src={require('../../assets/img/finance/bg0.png')} />
          <div className="w">
            <Calculator history={this.props.history}/>
          </div>
        </div>
        <TopTab />
        <div className="section sec-road autosize">
          <img className="big" src={require('../../assets/img/finance/pic4.jpg')} />
          <div className="w"/>
        </div>
        <div className="section sec-profit1">
          <div className="w">
            <div className="tit">
              <i>众借的好处</i>
            </div>
            <div className="box61 clearfix">
              <div className="shadow">
                <div className="pic">
                  <i className="c1"/>
                </div>
                <p className="t1">利息低</p>
                <p className="t2">借款企业信用等级越高，<br />利息越低，最低年化利率8%</p>
              </div>
              <div className="shadow">
                <div className="pic">
                  <i className="c2"/>
                </div>
                <p className="t1">速度快</p>
                <p className="t2">48小时内审核完成<br />您的在线借款申请</p>
              </div>
              <div className="shadow">
                <div className="pic">
                  <i className="c3"/>
                </div>
                <p className="t1">申请便捷</p>
                <p className="t2">无担保无抵押<br />在线申请</p>
              </div>
              <div className="shadow">
                <div className="pic">
                  <i className="c4"/>
                </div>
                <p className="t1">拓展客户</p>
                <p className="t2">把投资人变成客户<br />把投资人变成粉丝</p>
              </div>
              <div className="shadow">
                <div className="pic">
                  <i className="c5"/>
                </div>
                <p className="t1">精准营销</p>
                <p className="t2">发放优惠券、发起活动、<br />互动交流</p>
              </div>
              <div className="shadow">
                <div className="pic">
                  <i className="c6"/>
                </div>
                <p className="t1">借款用途广</p>
                <p className="t2">流动资金，新设备，<br />新分店或任何有助于拓展业务</p>
              </div>
            </div>
          </div>
        </div>
        <BottomTab />
        <Qa />
			</div>
		);
	}
}
