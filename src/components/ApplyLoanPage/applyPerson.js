import React from 'react';
import ImgUpload from '../../components/UpLoad/imgUpload';

const styles = {
  imgDiv: {
    display: 'flex',
    width: 814
  }
};

export default class ApplyPerson extends React.Component {
  render() {
    const {changePersonInfo} = this.props;
    const {name, cardId, phone, tel, QQNum, weiChat, bankCard,
      bankName, companyMail, address, personalAssets, firstName, firstCardId, firstPhone, firstRelation,
      busPartnerName, busPartnerCardId, busPartnerPhone, busPartnerRelation, friendName, friendCardId,
      friendPhone, friendRelation, idCardPositive, idCardOpposite, idCardHold, carProve, houseProve, sharesProve} = this.props.data;
    return (
      <div className="aform none" onChange={(e)=>changePersonInfo(e)}>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i className="high">姓名</i>
            </div>
            <input type="text" className="put" name="name" value={name}/>
          </div>
          <div className="row">
            <div className="tit">
              <i className="high">身份证号</i>
            </div>
            <input type="text" className="put" name="cardId" value={cardId}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i className="high">手机</i>
            </div>
            <input type="text" className="put" name="phone" value={phone}/>
          </div>
          <div className="row">
            <div className="tit">
              <i>座机</i>
            </div>
            <input type="text" className="put" name="tel" value={tel}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>婚姻情况</i>
            </div>
            <dl className="select">
              <dt value="loanPerson" type="marriage">未婚</dt>
              <dd>
                <i value="1">未婚</i>
                <i value="2">已婚</i>
                <i value="3">离异</i>
              </dd>
            </dl>
          </div>
          <div className="row">
            <div className="tit">
              <i>学历</i>
            </div>
            <dl className="select">
              <dt value="loanPerson" type="education">大学</dt>
              <dd>
                <i value="1">大专及以下</i>
                <i value="2">大学</i>
                <i value="3">硕士</i>
                <i value="4">博士及以上</i>
              </dd>
            </dl>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>QQ号</i>
            </div>
            <input type="text" className="put" name="QQNum" value={QQNum}/>
          </div>
          <div className="row">
            <div className="tit">
              <i>微信号</i>
            </div>
            <input type="text" className="put" name="weiChat" value={weiChat}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>银行卡号</i>
            </div>
            <input type="text" className="put" name="bankCard" value={bankCard}/>
          </div>
          <div className="row">
            <div className="tit">
              <i>开户银行</i>
            </div>
            <input type="text" className="put" name="bankName" value={bankName}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>企业邮箱</i>
            </div>
            <input type="text" className="put" name="companyMail" value={companyMail}/>
          </div>
          <div className="row">
            <div className="tit">
              <i>家庭地址</i>
            </div>
            <input type="text" className="put" name="address" value={address}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>个人资产说明</i>
            </div>
            <textarea className="put put2" rows="6" name="personalAssets" value={personalAssets}/>
          </div>
        </div>
        <div className="cform">
          <div className="row3">
            <i className="tit tit2"><em className="high">（第一联系人）姓名</em></i>
            <input type="text" className="put" name="firstName" value={firstName}/>
            <i className="tit tit3 high">身份证号</i>
            <input type="text" className="put put2" name="firstCardId" value={firstCardId}/>
            <i className="tit tit4 high">手机</i>
            <input type="text" className="put put3" name="firstPhone" value={firstPhone}/>
            <i className="tit tit3 high">社会关系</i>
            <input type="text" className="put" name="firstRelation" value={firstRelation}/>
          </div>
          <div className="row3">
            <i className="tit tit2">（商业伙伴）姓名</i>
            <input type="text" className="put" name="busPartnerName" value={busPartnerName}/>
            <i className="tit tit3">身份证号</i>
            <input type="text" className="put put2" name="busPartnerCardId" value={busPartnerCardId}/>
            <i className="tit tit4">手机</i>
            <input type="text" className="put put3" name="busPartnerPhone" value={busPartnerPhone}/>
            <i className="tit tit3">社会关系</i>
            <input type="text" className="put" name="busPartnerRelation" value={busPartnerRelation}/>
          </div>
          <div className="row3">
            <i className="tit tit2">（朋友）姓名</i>
            <input type="text" className="put" name="friendName" value={friendName}/>
            <i className="tit tit3">身份证号</i>
            <input type="text" className="put put2" name="friendCardId" value={friendCardId}/>
            <i className="tit tit4">手机</i>
            <input type="text" className="put put3" name="friendPhone" value={friendPhone}/>
            <i className="tit tit3">社会关系</i>
            <input type="text" className="put" name="friendRelation" value={friendRelation}/>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>身份证上传</i>
          </div>
          <div className="imgbox border" style={styles.imgDiv}>
            <ImgUpload className="avatar-uploader" divClassName="upload-div" tipText="上传身份证正面"/>
            <ImgUpload divClassName="upload-div" tipText="上传身份证反面"/>
            <ImgUpload divClassName="upload-div" tipText="手持身份证"/>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>个人资产证明</i>
          </div>
          <div className="imgbox border" style={styles.imgDiv}>
            <ImgUpload className="avatar-uploader" divClassName="upload-div" tipText="本人手持车本"/>
            <ImgUpload divClassName="upload-div" tipText="本人手持房本"/>
            <ImgUpload divClassName="upload-div" tipText="上传债券、股票等"/>
          </div>
        </div>
      </div>
    );
  }
}
