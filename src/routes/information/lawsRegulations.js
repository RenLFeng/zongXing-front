import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/law/law_R.scss'
export default class DegalDeclaration extends React.Component {
  render() {
    return (
          <div className="fr law_r">
            <h2><span>法律法规</span></h2>
            <div className="pic"><img src={require('../../assets/img/infor/f_1.jpg')} alt=""/></div>
            <p className="tit">关于众杰帮的法律地位和服务内容合法性 <span>合法机构，合法服务</span></p>
            <p className="t2">根据《网络借贷信息中介机构业务活动管理暂行办法》第2条规定，网络借贷信息中介机构是指依法设立，专门从事网络借贷信息中介业务活动的金融信息中介公司。该类机构以互联网为主要渠道，为借款人与出借人（即贷款人）实现直接借贷提供信息搜集、信息公布、资信评估、信息交互、借贷撮合等服务。</p>
            <p className="t2">根据最高人民法院《关于审理民间借贷案件适用法律若干问题的规定》第22条规定：借贷双方通过网络贷款平台形成借贷关系，网络贷款平台的提供者仅提供媒介服务，当事人请求其承担担保责任的，人民法院不予支持。</p>
            <p className="tit">关于众杰帮网站生成的电子合同合法性  <span>电子合同合法有效可执行</span></p>
            <p className="t2">  根据《电子签名法》相关规定，民事活动中的合同或者其他文件、单证等文书，当事人可以约定使用电子签名、数据电文，不能因为合同采用电子签名、数据电文就否定其法律效力。同时，《电子签名法》中还规定，可靠的电子签名与手写签名或者盖章具有同等的法律效力，明确认定符合条件的电子签名与手写签名或盖章具有同等的效力。爱钱进网站生成的电子合同属于《合同法》第11条规定的书面合同形式，且符合条件的电子签名具有法律效力，故而该电子合同具备合法性和可执行性。</p>
            <div className="t3">
              <p><span>《中华人民共和国电子签名法》</span>http://www.npc.gov.cn/wxzl/gongbao/2015-07/03/content_1942836.htm</p>
              <p><span>《中华人民共和国电子签名法》</span>http://www.npc.gov.cn/wxzl/gongbao/2015-07/03/content_1942836.htm</p>
              <p><span>《中华人民共和国网络安全法》</span>http://www.npc.gov.cn/npc/xinwen/2016-11/07/content_2001605.htm</p>
              <p><span>《关于促进互联网金融健康发展的指导意见》</span>http://www.gov.cn/xinwen/2015-07/18/content_2899360.htm</p>
              <p><span>《网络借贷信息中介机构业务活动管理暂行办法》</span>http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/D934AAE7E05849D185CD497936D767CF.html</p>
              <p><span>《网络借贷信息中介机构备案登记管理指引》</span>http://www.cbrc.gov.cn/govView_E7B94B41E8C340E4833472632308AEC5.html</p>
              <p><span>《网络借贷资金存管业务指引》</span>http://www.cbrc.gov.cn/govView_4201EF03472544038242EED1878597CB.html</p>
              <p><span>《网络借贷信息中介机构业务活动信息披露指引》</span>http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html</p>
              <p><span>《关于审理民间借贷案件适用法律若干问题的规定》</span>http://www.court.gov.cn/fabu-xiangqing-15146.html</p>
              <p>&nbsp;举报洗钱活动，维护社会公益的相关资料</p>
            </div>
          </div>
    );
  }
}
