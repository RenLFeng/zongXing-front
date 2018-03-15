import React from 'react';
import Login from '../LoginComponent/login';
import { Link } from 'dva/router';

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: [1,2,3,4,5,6,7]
    }
  }
  render() {
    return (
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
                <p>借款项目经过<b>五级专业审查</b>：申请资料初审、反欺诈风控模型、信用评分综合模型、系统性线下复核、行业专家组终审。</p>
                <p>你的投资，直接用于提高小微企业的运营能力和品牌影响力。</p>
                <p>所有借款项目来自中国认证的成长型公司和小微企业。</p>
              </div>
            </div>
            <div className="fr sec3">
              <p className="tit4">投资实体经济，获取丰厚收益</p>
              <div className="list-suc">
                <p>门槛低，100元起投</p>
                <p>8%+的固定利率回报</p>
                <p>小额分散，低风险</p>
                <p>直接参与小微企业成长</p>
                <p>企业让利，额外惊喜</p>
              </div>
              <p><a className="btn btn-green" href="">详细了解如何投资</a></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
