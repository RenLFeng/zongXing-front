import React from 'react';
import ImgUpload from '../../components/UpLoad/imgUpload';

import { initApply } from '../../assets/apply/index';
import ApplyInfo from '../../components/ApplyLoanPage/applyInfo';
import ApplyCompany from '../../components/ApplyLoanPage/applyCompany';
import ApplyPerson from '../../components/ApplyLoanPage/applyPerson';
import ApplyProject from '../../components/ApplyLoanPage/applyProject';
export default class ApplyLoan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      loanInfo: { //借款信息字段

      },
      loanPerson: { //借款人信息
        name: '',  //姓名
        cardId: '',   //身份证
        phone: '',  //手机号
        tel: '', //座机
        marriage: '1', //婚姻状况  1. 未婚 2.已婚 3.离异
        education: '2', //学历 1. 大专及以下 2. 大学 3.硕士 4. 博士及以上
        QQNum: '', //QQ号
        weiChat: '', //微信号
        bankCard: '', //银行卡号
        bankName: '', //开户银行
        companyMail: '', //企业邮箱
        address: '', //家庭住址
        personalAssets: '', //个人资产说明
        firstName: '', //第一联系人姓名
        firstCardId: '',  //第一联系人身份证号
        firstPhone: '', // 第一联系人手机
        firstRelation: '', //第一联系人社会关系
        busPartnerName: '', //商业伙伴姓名
        busPartnerCardId: '',  //商业伙伴身份证号
        busPartnerPhone: '', // 商业伙伴手机
        busPartnerRelation: '', //商业伙伴社会关系
        friendName: '', //朋友姓名
        friendCardId: '',  //朋友身份证号
        friendPhone: '', // 朋友手机
        friendRelation: '', //朋友社会关系
        idCardPositive: '', //身份证正面
        idCardOpposite: '', //身份证反面
        idCardHold: '', // 身份证手持
        carProve: '', //车本
        houseProve: '', //房本
        sharesProve: '', //股票
      },
      loanCompany: { //借款公司信息
        companyName: '', //公司名称
        creditId: '', //统一社会信用代码
        openBank: '', //企业开户行
        openBankAccount: '', //企业银行账户
        businessAddress: '', //实际经营地址
        industry: '1', //行业
        tel: '', //座机
        shareholdingRatio: '', //持股比例
        businessLicense: '', //营业执照
        taxLicense: '', //税务登记许可证
        openingPermission: '', //银行开户许可证
        healthPermit: '', //卫生许可证
        other1: '', //其他资质
        other2: '',
        other3: '',
        finance: '', //财政审计报告
        bankFlow: '', //银行流水
        shareholder: '', //股东构成文件
        siteContract: '', //场地租赁合同
        joining1: '', //企业加盟
        joining2: ''
      },
      loanProject: { //借款项目信息
        projectName: '', //项目名称
        loanVideo: '', //借款视频
        loanShowImg: '', //借款项目展示图片
        addProjectImg: '', //添加项目展示背景大图
        desc: '', //我的自述
        myImg1: '', //我的照片
        myImg2: '', //我的照片
        myImg3: '', //我的照片
        myImg4: '', //我的照片
        myImg5: '', //我的照片
        myImg6: '', //我的照片
        projectDesc: '', //我的项目描述
        project1: '', //项目相关照片
        project2: '', //项目相关照片
        project3: '', //项目相关照片
        project4: '', //项目相关照片
        project5: '', //项目相关照片
        project6: '', //项目相关照片
        whyDesc: '', //为何众借
        payment: '', //还款来源
      },
      loanInfoCommit: 0,
      loanPersonCommit: 0,
      loanCompanyCommit: 0,
      loanProjectCommit: 0,
      savePage: 0
    };
  }
  componentDidMount() {
    // setTimeout(()=>{
    //   initApply();
    // }, 500);
  }

  componentWillReceiveProps() {

  }


  /*这个方法通过组件传值传递下去并且让子组件的值返回给父组件*/
  getDataByChild = (childData) => {
    console.log(childData);
  };



  // 处理提交
  handlePage(page) {
    if (this.state.pageNum === 1) {
      this.setState({
        savePage: page,
        loanInfoCommit: this.state.loanInfoCommit + 1
      });
    } else if (this.state.pageNum === 2) {
      this.setState({
        savePage: page,
        loanPersonCommit: this.state.loanPersonCommit + 1
      });
    } else if (this.state.pageNum === 3) {
      this.setState({
        savePage: page,
        loanCompanyCommit: this.state.loanCompanyCommit + 1
      });
    } else {
      this.setState({
        savePage: page,
        loanProjectCommit: this.state.loanProjectCommit + 1
      });
    }
  }

  // 切换页面
  switchPage(data, page) {
    console.log(data);
    if (!data) {
      this.setState({
        pageNum: this.state.savePage
      })
    }
  }

  render() {
    const {pageNum} = this.state;
    return (
      <div className="body1">
        <div className="w relative">
          <div className="apply-menu">
            <a className={`a1 ${pageNum === 1 ? 'hover' : ''}`} onClick={()=>this.handlePage(1)}>借款信息</a>
            <a className={`a2 ${pageNum === 2 ? 'hover' : ''}`} onClick={()=>this.handlePage(2)}>借款人信息</a>
            <a className={`a3 ${pageNum === 3 ? 'hover' : ''}`} onClick={()=>this.handlePage(3)}>借款企业信息</a>
            <a className={`a4 ${pageNum === 4 ? 'hover' : ''}`} onClick={()=>this.handlePage(4)}>借款项目</a>
          </div>
          <div className="apply-form shadow" style={{marginTop: '-80px'}}>
            <h2><i>借款信息</i></h2>
            <ApplyInfo commit={this.state.loanInfoCommit} switchPage={(data)=>this.switchPage(data)} getData={this.getDataByChild} pageNum={this.state.pageNum}/>
            <ApplyPerson commit={this.state.loanPersonCommit} getData={this.getDataByChild} switchPage={(data)=>this.switchPage(data)} pageNum={this.state.pageNum} data={this.state.loanPerson} />
            <ApplyCompany commit={this.state.loanCompanyCommit} getData={this.getDataByChild} switchPage={(data)=>this.switchPage(data)} pageNum={this.state.pageNum} data={this.state.loanCompany} />
            <ApplyProject commit={this.state.loanProjectCommit} getData={this.getDataByChild} switchPage={(data)=>this.switchPage(data)} pageNum={this.state.pageNum} data={this.state.loanProject} />
            <div className="bot center">
              <i><a className="btn f16" onClick={this.submit}>{this.state.pageNum===4?'完成': '下一步'}</a></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
