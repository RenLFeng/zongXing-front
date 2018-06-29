import React from 'react';
import Banner from '../../components/HomePageComponent/banner2';
import Company from '../../components/HomePageComponent/company';
import Project from '../../components/HomePageComponent/project';
import Invest from '../../components/HomePageComponent/invest';
import Finance from '../../components/HomePageComponent/finance';
import Tab3 from '../../components/HomePageComponent/tab3';
import Path from '../../common/pagePath';
import { startAnimate } from '../../assets/home/index';

export default class HomeIndex extends React.Component {

  componentDidMount() {
    //startAnimate();
  }
  render() {
    return (
      <div className="body">
        <Banner history={this.props.history}/>
        <Company />
        <Tab3 />
        <Project param={this.props.match} history={this.props.history}/>
        <div className="section sec-touzi">
          {/*<canvas id="canvas-invest"></canvas>*/}
          <div className="w">
            <div className="center sec1">
              <h1>直接投资中国小微企业</h1>
              <p className="tit2">固定收益+企业优惠，实现你情怀投资和共筑梦想</p>
            </div>
            <div className="textcol2 clearfix">
              <div className="fl sec2">
                <p className="tit4">自己决定你的投资项目</p>
                <div className="list-dot">
                  <p>选择熟悉的地区、了解的行业，根据你的兴趣爱好进行投资。</p>
                  <p><b>借款项目风控流程</b>：筛选项目、项目展现、反欺诈模型、信用评分、行业专家审核、群众风控、贷后管理。</p>
                  <p>你的投资，直接用于扩大生产和经营，提高企业盈利能力。</p>
                  <p>每一个投资项目，贷前、贷中、贷后全程接受投资人监督。</p>
                </div>
              </div>
              <div className="fr sec3">
                <p className="tit4">投资实体经济，获取丰厚收益</p>
                <div className="list-suc">
                  <p>门槛低，100元起投</p>
                  <p>丰厚的固定利率回报</p>
                  <p>小额分散，低风险</p>
                  <p>直接参与小微企业成长</p>
                  <p>企业让利，额外惊喜</p>
                </div>
                <p><a className="btn btn-green g"   
               onClick={()=>{
                this.props.history.push(Path.HOW_INVEST)}}>详细了解如何投资</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="section sec-rongzi">
          <div className="w">
            <div className="center sec1">
              <h1>小微企业融资</h1>
              <p className="tit2">真正助力小微企业成长，搭建借贷平台</p>
            </div>
            <div className="textcol2 clearfix">
              <div className="fl sec2">
                <p className="tit4">众借，解决小微企业融资难题</p>
                <div className="list-dot">
                  <p>想扩大你的生意、想加盟一个品牌，可以众借；</p>
                  <p>有成千上百的人相信并支持你的事业；</p>
                  <p>融资，无需稀释股份，还能精准营销；</p>
                  <p>借款，无需抵押，无需担保，只要真实和信用</p>
                </div>
              </div>
              <div className="fr sec3">
                <p className="tit4">低成本，高效率</p>
                <div className="list-suc">
                  <p>最高可达100万</p>
                  <p>月利息低至0.68%</p>
                  <p>线上申请，快速便捷</p>
                  <p>融资过程，就是营销</p>
                </div>
                <p><a className="btn btn-green g"
                 onClick={()=>{
                  this.props.history.push(Path.HOW_LOAN)}}
                >详细了解如何借款</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
