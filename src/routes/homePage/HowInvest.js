import React from 'react';

import { startAnimate } from '../../assets/invest/index';
import TabBottom from '../../components/HowInvestComponent/tabBottom';
import TabTop from '../../components/HowInvestComponent/tabTop';
import InCome from '../../components/HowInvestComponent/income';
import Worth from '../../components/HowInvestComponent/worth';
import Profit from '../../components/HowInvestComponent/profit';
import Qa from '../../components/HowInvestComponent/qa';
import Path from '../../common/pagePath';

export default class HowInvest extends React.Component {
  componentDidMount() {
    startAnimate();
  }

  componentWillUnmount() {
    $(window).off('scroll');
    $('body').off('click')
  }
	render() {
		return(
      <div className="g" >
        <div className="banner autosize">
          <img className="big" src={require('../../assets/img/invest/banner.jpg')} />
          <div className="w">
            <a className="btn "
               onClick={()=>{
                 $("#fix").removeClass('fix');
                 this.props.history.push(Path.PROJECT_LIST)}}><i>我要投资</i></a>
          </div>
        </div>
        <TabBottom />
        <TabTop />
        <InCome />
        <Worth />
        <Profit />
        <Qa />
      </div>
		);
	}
}
