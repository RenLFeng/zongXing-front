import React from 'react';

export default class ApplyCompany extends React.Component {
  render() {
    const {changeCompanyInfo} = this.props;
    const {companyName, creditId, openBank, openBankAccount, businessAddress, tel, shareholdingRatio,
      businessLicense, taxLicense, openingPermission, healthPermit, other1, other2, other3, finance, bankFlow, shareholder,
      siteContract, joining1, joining2} = this.props.data;
    return (
      <div className="aform none" onChange={(e)=>changeCompanyInfo(e)}>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i className="high">公司名称</i>
            </div>
            <input type="text" className="put" name="companyName" value={companyName}/>
          </div>
          <div className="row">
            <div className="tit">
              <i className="high">统一社会信用代码</i>
            </div>
            <input type="text" className="put" name="creditId" value={creditId}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i className="high">企业开户行</i>
            </div>
            <input type="text" className="put" name="openBank" value={openBank}/>
          </div>
          <div className="row">
            <div className="tit">
              <i className="high">企业银行账户</i>
            </div>
            <input type="text" className="put" name="openBankAccount" value={openBankAccount}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i className="high">实际经营地址</i>
            </div>
            <input type="text" className="put" name="businessAddress" value={businessAddress}/>
          </div>
          <div className="row">
            <div className="tit">
              <i>经营行业</i>
            </div>
            <dl className="select">
              <dt type="loanCompany" value="industry">餐饮美食</dt>
              <dd>
                <i value="1">餐饮美食</i>
                <i value="2">服装鞋包</i>
                <i value="3">美容保健</i>
                <i value="4">家居用品</i>
                <i value="5">母婴用品</i>
                <i value="6">生活服务</i>
                <i value="7">教育网络</i>
                <i value="8">酒水饮料</i>
                <i value="9">休闲娱乐</i>
                <i value="0">其他</i>
              </dd>
            </dl>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>单位座机</i>
            </div>
            <input type="text" className="put" name="tel" value={tel}/>
          </div>
          <div className="row">
            <div className="tit">
              <i>股东持股比例</i>
            </div>
            <input type="text" className="put" name="shareholdingRatio" value={shareholdingRatio}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>营业执照</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${businessLicense.length > 0 ? 'up' : ''}`}>
                {businessLicense.length > 0 ? <img src={businessLicense} />: null }
                <i>上传营业执照</i></a>
            </div>
          </div>
          <div className="row">
            <div className="tit">
              <i>税务登记许可证</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${taxLicense.length > 0 ? 'up' : ''}`}>
                {taxLicense.length > 0 ? <img src={taxLicense} />: null }
                <i>上传税务登记许可证</i></a>
            </div>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>银行开户许可证</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${openingPermission.length > 0 ? 'up' : ''}`}>
                {openingPermission.length > 0 ? <img src={openingPermission} />: null }
                <i>上传银行开户许可证</i></a>
            </div>
          </div>
          <div className="row">
            <div className="tit">
              <i>卫生许可证</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${healthPermit.length > 0 ? 'up' : ''}`}>
                {healthPermit.length > 0 ? <img src={healthPermit} />: null }
                <i>上传卫生许可证</i></a>
            </div>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>其他资质文件</i>
          </div>
          <div className="imgbox border">
            <a className={`imgd ${other1.length > 0 ? 'up' : ''}`}>
              {other1.length > 0 ? <img src={other1} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${other2.length > 0 ? 'up' : ''}`}>
              {other2.length > 0 ? <img src={other2} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${other3.length > 0 ? 'up' : ''}`}>
              {other3.length > 0 ? <img src={other3} />: null }
              <i>上传图片</i></a>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="row">
            <div className="tit">
              <i>企业财务审计报告</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${finance.length > 0 ? 'up' : ''}`}>
                {finance.length > 0 ? <img src={finance} />: null }
                <i>上传企业财务审计报告</i></a>
            </div>
          </div>
          <div className="row">
            <div className="tit">
              <i>企业三个月银行流水</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${bankFlow.length > 0 ? 'up' : ''}`}>
                {bankFlow.length > 0 ? <img src={bankFlow} />: null }
                <i>上传企业三个月银行流水</i></a>
            </div>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>企业股东构成文件</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${shareholder.length > 0 ? 'up' : ''}`}>
                {shareholder.length > 0 ? <img src={shareholder} />: null }
                <i>上传企业股东构成文件</i></a>
            </div>
          </div>
          <div className="row">
            <div className="tit">
              <i>企业经营场地租赁合同</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${siteContract.length > 0 ? 'up' : ''}`}>
                {siteContract.length > 0 ? <img src={siteContract} />: null }
                <i>上传企业经营场地租赁合同</i></a>
            </div>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>企业加盟合同</i>
          </div>
          <div className="imgbox border">
            <a className={`imgd ${joining1.length > 0 ? 'up' : ''}`}>
              {joining1.length > 0 ? <img src={joining1} />: null }
              <i>上传附件</i></a>
            <a className={`imgd ${joining2.length > 0 ? 'up' : ''}`}>
              {joining2.length > 0 ? <img src={joining2} />: null }
              <i>上传附件</i></a>
          </div>
        </div>
      </div>

    );
  }
}
