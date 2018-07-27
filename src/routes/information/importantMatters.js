import React from 'react';
import {ORGANIZATIONAL_INFORMATION} from '../../common/pagePath'
import LeftMenu from './leftMenu';
import '../../assets/infor/information/import.scss'
export default class ImportantMatters extends React.Component {
  render() {
    return (
      <div className="fr import">
        <h2><span className="first"  onClick={()=>{this.props.history.push(ORGANIZATIONAL_INFORMATION)}}>组织信息</span><i>></i><span className="last">重大事项</span></h2>
        <div className="wrap">
          <ul>
            <li><span>公司减资、合并、分立、解散或申请破产;</span><span>无</span></li>
            <li><span>公司依法进入破产程序;</span><span>无</span></li>
            <li><span>公司被责令停业、整顿、关闭;</span><span>无</span></li>
            <li><span>公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚;</span><span>无</span></li>
            <li><span> 公司法定代表人、持股5%以上股东、实际控制人、主要负责 人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉  嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施;</span><span>无</span></li>
            <li><span>公司主要或者全部业务陷入停顿;</span><span>无</span></li>
            <li><span>存在欺诈、损害出借人利益等其它影响网络借贷信息中介机构经营活动的重大事项;</span><span>无</span></li>
            <li><span>公司法定代表人、持股5%以上股东、实际控制人、主要负责 人、董事、监事、高级管理人员的变更信息;</span><span>无</span></li>
            <li><span> 其它重大事项;</span><span>无</span></li>
          </ul>
        </div>
      </div>
    );
  }
}
