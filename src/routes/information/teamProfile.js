import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/contactUs/mana_g.scss';
import {MANAGEMENT_TEAM} from '../../common/pagePath'
export default class TeamProfile extends React.Component {
  render() {
    return (
      <div className="fr mana_g">
        <h2><span className="first" onClick={()=>{this.props.history.push(MANAGEMENT_TEAM)}}>管理团队</span><i>></i><span className="last">管理团队简介</span></h2>
        <div className="wrap clearfix">
          <div className="bg_gray"></div>
          <div className="pic fl">
            <p>众借帮联合创始人</p>
            <img src={require('../../assets/img/infor/cont_m1.png')}/>
          </div>
          <div className="text-info fr">
            <p className="tit">周树声丨CEO</p>
            <p className="">  美国威斯康辛大学工商管理学士</p>
            <p className="">美国克里蒙研究院大学（德鲁克商学院）信息科学 硕士</p>
            <p className="">30年计算机、互联网行业经验</p>
            <p className="">美国、中国、新加坡创业10次以上</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="bg_gray"></div>
          <div className="pic fl">
            <img src={require('../../assets/img/infor/cont_m2.png')}/>
          </div>
          <div className="text-info fr">
            <p className="tit">金先文丨CTO</p>
            <p className="">  西安交大 计算机应用工程 硕士</p>
            <p className="">20年军队信息化建设工作经历，具备系统的安全思维，掌握管控信息安全 硕士</p>
            <p className="">的体系设计、流程再造的技术方法</p>
            <p className="">军队专业培训研究方向:人工智能、算法、设计与分析、网络与信息安全</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="bg_gray"></div>
          <div className="pic fl">
            <img src={require('../../assets/img/infor/cont_m3.png')}/>
          </div>
          <div className="text-info fr">
            <p className="tit">谢有元丨CRO</p>
            <p className="">加拿大英属哥伦比亚大学 工商管理硕士 MBA</p>
            <p className="">30年国际金融行业经验</p>
            <p className="">新加坡大华银行（UOB）董事，涉及证券、证券衍生品以及私募基金</p>
            <p className="">新加坡华联银行，企业信贷分析</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="bg_gray"></div>
          <div className="pic fl">
            <img src={require('../../assets/img/infor/cont_m4.png')}/>
          </div>
          <div className="text-info fr">
            <p className="tit">何诚明丨博士 人工智能科学家</p>
            <p className="">  美国威斯康辛大学 认知科学博士</p>
            <p className="">新加坡A*STAR科学与科技研发机构 人工智能高级科学家</p>
            <p className="">研究方向与成果：Ai快速机器学习、深度学习；人类行为、意图的理解和</p>
            <p className="">预测系统；机器人和自主系统的因果学习、推理和规划；</p>
            <p className="">关于有社会属性的机器人的动机和情感的深层计算模型</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="bg_gray"></div>
          <div className="pic fl">
            <img src={require('../../assets/img/infor/cont_m5.png')}/>
          </div>
          <div className="text-info fr">
            <p className="tit">孙耀先丨小微企业发展战略顾问</p>
            <p className="">香港中文大学商学院客座教授；</p>
            <p className="">伍宜宣书院创意实验室主任及创业研究中心项目总监，为国内外中小企业</p>
            <p className="">提供培训、调研和顾问服务。</p>
          </div>
        </div>
      </div>
    );
  }
}
