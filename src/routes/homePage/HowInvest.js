import React from 'react';

import { startAnimate } from '../../assets/invest/index';
import TabBottom from '../../components/HowInvestComponent/tabBottom';
import TabTop from '../../components/HowInvestComponent/tabTop';
import InCome from '../../components/HowInvestComponent/income';
import Worth from '../../components/HowInvestComponent/worth';
import Profit from '../../components/HowInvestComponent/profit';
import Qa from '../../components/HowInvestComponent/qa';

export default class HowInvest extends React.Component {
  componentDidMount() {
    startAnimate();
  }
	render() {
		return(
      <div >
        <div className="banner autosize">
          <img className="big" src={require('../../assets/img/invest/banner.png')} />
          <div className="w">
            <a className="btn big"><i>我要投资</i></a>
          </div>
        </div>
        <TabTop />
        <InCome />
        <Worth />
        <Profit />
        <TabBottom />
        <Qa />
      </div>
		);
	}
}
