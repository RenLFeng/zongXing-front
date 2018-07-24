import React from 'react';
import LeftMenu from './leftMenu';
export default class CompanyIntroduction extends React.Component {

	render() {
		return (
      <div className="infor">
        <div  className="w clearfix compay">
          {/* <LeftMenu param={this.props}/> */}
          <div className="fr">
            <h2><span>关于我们</span><i>></i><span className="last">公司介绍</span></h2>
            <div className="top1 clearfix">
              <div className="fl left-pic">
                <img src={require('../../assets/img/infor/ab1.png')} alt=""/>
              </div>
              <div className="fr">
                <div className="right-tx">
                  <img src={require('../../assets/img/infor/logo.png')} alt=""/>
                  <p>
                    “众杰帮”总部位于深圳，是深圳众鑫互联网金融服务有限公司旗下，专注于“个人对小微企业”的金融科技网贷平台。
                    在资产端，我们为有品牌、有连锁、有店面、有故事、有情怀的小微企业，提供便捷、高效、低成本的融资中介服务及精准营销渠道；在投资端，我们为有投资理财需求的个人，创造财富增值的机会及获得商家福利的通道。
                    公司聘请多位国内外银行风控专家、金融专家、人工智能科学家及互联网技术专家组建了一支具有顶层战略、远大情怀和企业家精神的管理队伍。众杰帮创建一个公平透明的融资环境，帮助小微企业和成千上万的投资人在一起，让融资不再是一种单纯的金融活动，更是一种互动式的业务拓展活动，把投资人变成客户，把客户变成投资人。
                    另外，通过众杰帮信息服务平台，吸引理性智慧的投资者，把大家闲置的资金投入到小微企业的发展中，一起实现万众创新、全民创业的中国梦。也给参与的投资者，带来参与感、归属感、荣誉感、和成就感。
                    众杰帮，是您身边的投资专家，也是您融资和拓展业务的新渠道。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
