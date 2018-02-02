import React from 'react';
import Items from '../../components/LoanCollegeComponent/item';
import News from '../../components/LoanCollegeComponent/_news';
import '../../assets/school/index.js';

export default class LoanCollege extends React.Component {
	render() {
		return(
		  <div className="page_school">
          <div className="w school">
            <News />
            <div className="sec border shadow">
              <div className="ht">
                <i className="tit">了解众借帮</i>
                <i className="tab">
                  <a>众借帮理念系列</a>
                  <a>众借帮服务系列</a>
                  <a>众借帮风控系列</a>
                  <a>法律常识系列</a>
                </i>
              </div>
              <div className="list clearfix">
                <Items />
              </div>
            </div>
            <div className="sec border shadow">
              <div className="ht">
                <i className="tit">了解众借</i>
                <i className="tab">
                  <a>借款人应用场景系列</a>
                  <a>借款资料准备系列</a>
                  <a>企业活动场景</a>
                  <a>企业促销场景</a>
                </i>
              </div>
              <div className="list clearfix">
                <Items />
              </div>
            </div>
            <div className="sec border shadow">
              <div className="ht">
                <i className="tit">了解众投</i>
                <i className="tab">
                  <a>小额分散投资理论</a>
                  <a>复利投资理论</a>
                  <a>投资回报覆盖理论</a>
                  <a>模拟投资</a>
                  <a>投资人应用场景</a>
                  <a>投资人在平台活动指南</a>
                </i>
              </div>
              <div className="list clearfix">
                <Items />
              </div>
            </div>
            <div className="sec border shadow">
              <div className="ht">
                <i className="tit">加盟众借帮</i>
                <i className="tab">
                  <a>众借帮需要您</a>
                  <a>您了解众借帮</a>
                </i>
              </div>
              <div className="list clearfix">
                <Items />
              </div>
            </div>
            <div className="sec border shadow">
              <div className="ht">
                <i className="tit">客户代言</i>
                <i className="tab"></i>
              </div>
              <div className="list clearfix">
                <Items />
              </div>
            </div>
          </div>
      </div>

		);
	}
}
