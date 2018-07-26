import React from 'react';
import {Icon} from 'antd'
import LeftMenu from './leftMenu';
export default class RiskManagement extends React.Component {
  render() {
    return (
          <div className="fr risk">
            <h2><span>法律法务</span><i>></i><span className="last">风险控制</span></h2>
            <div className="top1 bg"></div>
            <div className="top2 item">
              <p className="dashed"><span className="dashed"></span>风险评估体系<span className="dashed"></span></p>
              <p className="t2">多重防线,有效抵御风险</p>
              <p className="bg"></p>
              <ul className="iconL risk clearfix ">
                <li className="fl">
                  <span className="icon icon1"><i></i></span>
                  <span className="bor">"渠道控制</span>
                  <span>"力求从源头把控项目质量，筛选质量更高的融资项目，无处不风控。</span>
                </li>
                <li className="fr">
                  <span className="icon icon2"><i></i></span>
                  <span className="bor">"大数据风控</span>
                  <span>"引入多维度第三方数据，有感爬取消费行为数据，建立庞大的借款人数据库，并对数据进行深度挖掘、整理和应用。</span>
                </li>
                <li className="fl">
                  <span className="icon icon3"><i></i></span>
                  <span className="bor">实地调查</span>
                  <span>严控借款用途，做到专款专用，确保项目的真实性。</span>
                </li>
                <li className="fr">
                  <span className="icon icon4"><i></i></span>
                  <span className="bor"> 尽调体系</span>
                  <span> 众借帮建立了一套完整严谨的尽调体系,六道防线，严格控制借款逾期违约的风险。</span>
                </li>
                <li className="fl">
                  <span className="icon icon5"><i></i></span>
                  <span className="bor">业务管理系统</span>
                  <span> 通过参数设置、权限管理，引入流程引擎，对业务操作流程进行管理，权责明确，审贷分离。</span>
                </li>
                <li className="fr">
                  <span className="icon icon6"><i></i></span>
                  <span className="bor"> 评分模型</span>
                  <span>通过对借款人申请信息、第三方信息、还款信息的收集及分析，开发借款人量化评分模型，对借款人各类行为进行综合评估。</span>
                </li>
                <li className="fl">
                  <span className="icon icon7"><i></i></span>
                  <span className="bor"> 反欺诈拦截</span>
                  <span> 引入借款人和企业黑名单、公安部，多头借贷等数据，自动精准识别借款人欺诈行为。</span>
                </li>
                <li className="fr">
                  <span className="icon icon8"><i></i></span>
                  <span className="bor"> 决策引擎</span>
                  <span>  结合反欺诈系统、评分模型以及授信审批规则，对借款申请做出标准化、智能化审批决策。</span>
                </li>
              </ul>
            </div>
            <div className="top3 item">
              <p className="dashed"><span className="dashed"></span>风险管理战略<span className="dashed"></span></p>
              <p className="t2">环环相扣,促进按时还款</p>
              <p className="bg"></p>
              <ul className="iconL risk clearfix ">
                <li className="fl">
                  <span className="icon icon1"><i></i></span>
                  <span className="bor"> 独特的还款促进</span>
                  <span>  众杰帮拥有独特的还款能力促进体系，对借款所经营的经营项目加以扶持，促进项目的运作成功和借款的按期归还。</span>
                </li>
                <li className="fr">
                  <span className="icon icon2"><i></i></span>
                  <span className="bor"> 全面的风险预警</span>
                  <span> 根据获取的数据和回访情况，运用定量和定性分析相结合的方法，对借款人还款能力变化预警，根据预警指标对客户进行分层管理，采取不同的风险缓释措施。</span>
                </li>
                <li className="fl">
                  <span className="icon icon3"><i></i></span>
                  <span className="bor">   灵活的社交风控</span>
                  <span> 构建投前和投后社群，采用群众风控，人人风控的方式，更有效的降低逾期风险。</span>
                </li>
                <li className="fr">
                  <span className="icon icon4"><i></i></span>
                  <span className="bor">  透明的项目披露</span>
                  <span>  专门团队定期监测还款行为，经营数据，公开数据，监督借款人按时还款。</span>
                </li>
              </ul>
            </div>
            <div className="top4 item">
              <p className="dashed"><span className="dashed"></span>快速专业催收<span className="dashed"></span></p>
              <p className="t2">循序渐进,极力催回借款</p>
              <p className="bg"></p>
              <ul className="iconL risk clearfix ">
                <li className="fl">
                  {/*<span className="icon"><Icon type="team" /></span>*/}
                  <span className="bor"> 电话催收</span>
                  <span> 通过电话联系借款人的方式、对逾期客户进行持续跟进，用有效的沟通催回逾期款项。</span>
                </li>
                <li className="fr">
                  {/*<span className="icon"><Icon type="user-add" /></span>*/}
                  <span className="bor"> 委托机构</span>
                  <span> 针对高风险借款人，委托专业合法的第三方催收机构进行催收。</span>
                </li>
              </ul>
              <ul className="iconL row-icon">
                <li className="">
                  <p>
                    <span className="icon icon1 after"><i></i></span>
                  </p>
                  <p>
                    <span className="icon icon2 after"><i></i></span>
                  </p>
                  <p>
                    <span className="icon icon3 after"><i></i></span>
                  </p>
                  <p>
                    <span className="icon icon4 after"><i></i></span>
                  </p>
                  <p>
                    <span className="icon icon5"><i></i></span>
                  </p>
                </li>
              </ul>
              <ul className="footer-info clearfix">
                <li className="fl">
                  <span className="bor">信息提醒</span><span>根据不同的标的，到期前和逾期后进行不同频次的短信和站内信提醒。</span>
                </li>
                <li className="fl"><span className="bor" style={{textAlign:'center'}}>外访催收</span><span>以合情合法的现场外访予以辅助对借款人进行上门催收，以提高催收的强度，形成一种立体上的压迫感。</span></li>
                <li className="fl"><span className="bor" style={{textAlign:'right',paddingRight:'15px'}}>法务诉讼</span><span>即向法院提起诉讼进行催收，利用国家的威严及强制力对欠款人进行威慑和制裁，从而实现欠款的成功回收。</span></li>
              </ul>
            </div>
      </div>
    );
  }
}
