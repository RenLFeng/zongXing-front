import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/law/safe_G.scss'
export default class SafeGuarantee extends React.Component {
  render() {
    return (
      <div className="fr safe_G">
        <h2><span>安全保障</span></h2>
        <div className="wrap clearfix">
          <div className="pic fl"><img src={require('../../assets/img/infor/safe_1.png')} alt=""/></div>
          <div className="text-info fr">
            <p className="tit">资金保障</p>
            <p className="t2">众杰帮与乾多多合作上线资金存管业务，用户账户与平台运营账户相互独立，从而实现了平台资金与用户资金的全面隔离，资金流向透明。乾多多对平台账户信息和资金流向进行监督管理，切实保障用户资金安全。</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="pic fr"><img src={require('../../assets/img/infor/safe_2.png')} alt=""/></div>
          <div className="text-info fl">
            <p className="tit">隐私安全</p>
            <p className="t2">众杰帮注重保护用户隐私及数据安全，网站访问全程使用强制加密证书进行数据加密传输，有效保障机密信息在网络传输过程中不被查看、修改或窃取。此外，还采用远程身份验证技术及电子签名验签技术，确保交易完整可追溯，全面保护用户信息安全。</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="pic fl"><img src={require('../../assets/img/infor/safe_3.png')} alt=""/></div>
          <div className="text-info fr">
            <p className="tit">技术保障</p>
            <p className="t2">众杰帮的数据库3层安全防护体系采用DDOS防护、IP白名单配置、数据库攻击防护保障数据库安全。腾讯云监控对服务器、数据库以及各种服务、站点进行7*24小时监控，保障运行平稳。采用国际标准的SSL数据传输安全加密技术，对系统数据进行安全备份。</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="pic fr"><img src={require('../../assets/img/infor/safe_5.png')} alt=""/></div>
          <div className="text-info fl">
            <p className="tit">合规运营</p>
            <p className="t2">众杰帮严格遵守各项法律、法规、政策及公司内控制度，遵循《网络借贷信息中介机构业务活动信息披露指引》逐一完成信息披露，不断努力提高居间服务效率，积极践行国家关于普惠金融的号召，努力推动行业的健康发展。</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="pic fl"><img src={require('../../assets/img/infor/safe_4.png')} alt=""/></div>
          <div className="text-info fr">
            <p className="tit">智能风控</p>
            <p className="t2">众杰帮基于大数据和人工智能技术打造的全生命周期智能化风控系统，在用户充分授权的前提下，能够收集用户多维度的数据，通过机器学习和深度学习对数据进行关联分析，实现精准授信，提升风控效率。</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="pic fr"><img src={require('../../assets/img/infor/safe_7.png')} alt=""/></div>
          <div className="text-info fl">
            <p className="tit">小额分散</p>
            <p className="t2">众杰帮只选择优质小额借款项目，最大程度降低和分散逾期风险，借款项目的借款人所在的地域、所处的行业均非常分散，能强有力抵抗行业系统性风险。单个出借人的出借金额最多不得超过该笔借款总金额的1%，帮助出借人进一步有效分散风险。</p>
          </div>
        </div>
        <div className="wrap clearfix">
          <div className="pic fl"><img src={require('../../assets/img/infor/safe_6.png')} alt=""/></div>
          <div className="text-info fr">
            <p className="tit">法律保障</p>
            <p className="t2">深圳大成律所协助众杰帮和出借人进行出借后管理，当出借项目发生争议须通过法律程序解决时，为平台和出借人提供一流法律援助服务确保出借人利益得到充分保障。</p>
          </div>
        </div>
      </div>

    );
  }
}
