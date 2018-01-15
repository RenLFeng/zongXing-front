import React from 'react';
import { initApply } from '../../assets/apply/index';
import ApplyInfo from '../../components/ApplyLoanPage/applyInfo';
import ApplyCompany from '../../components/ApplyLoanPage/applyCompany';
import ApplyPerson from '../../components/ApplyLoanPage/applyPerson';
import ApplyProject from '../../components/ApplyLoanPage/applyProject';
export default class ApplyLoan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loanInfo: { //借款信息字段
        money: '',  //借款金额
        period: '', //借款期数
        customerChannel: '1', //获客渠道
        purpose: '',  //借款用途
        expectedRate: '', //预期年化利率
        city: '', //所在城市
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
      }
    };
    this.submit = this.submit.bind(this);
    this.changeState = this.changeState.bind(this);
  }
  componentDidMount() {
    setTimeout(()=>{
      initApply();
      this.operationSelect();
    }, 500);
  }

  operationSelect() {
    const _this  = this;
    $('body').on('click', 'dl.select>dt', function(){
      let active = $(this).next().hasClass('show');
      $('dl.select>dd.show').removeClass('show');
      if(!active){
        $(this).next().addClass('show');
      }
    });
    $('body').on('click', 'dl.select>dd>i', function(){
      let $t = $(this),
        sel = $t.parent().parent();
      _this.dlChange.call(sel, $t.index(), _this);
    });
    $('body').on('click touchend', function(event){
      let el = event.target || window.event.srcElement;
      if($(el).closest('dl.select').length==0){
        $('dl.select>dd.show').removeClass('show');
      }
    });
  }

  // 修改城市
  changeCity(cityCode) {
    this.setState({
      loanInfo: {
        ...this.state.loanInfo,
        city: cityCode
      }
    })
  }

  //修改选择框
  dlChange(idx, _this) {
    let sel = this;
    let dt = sel.find('dt');
    let op = sel.find('dd>i').eq(idx);
    dt.next().removeClass('show');
    if(sel.data('index')==idx){
      return;
    }
    _this.changeSelect(dt.attr('value'), dt.attr('type'), op.attr('value'));
    dt.html(op.html());
    sel.data('value', op.data('value')||op.html());
    sel.data('index', idx);
    sel.trigger('change');
  }

  //修改选择框内容
  changeSelect(base, type, value) {
    this.setState({
      [base]: {
        ...this.state[base],
        [type]: value
      }
    })
  }

  submit() {
    let a = $('.apply-menu a.hover');
    const index = a.index();
    console.log(index);
    switch (index) {
      case 0: //提交借款信息
        this.commitLoanInFor();
        break;
      case 1: //提交借款人信息
        this.commitLoanPersonal();
        break;
      case 2: //提交借款企业信息
        this.commitLoanCompany();
        break;
      case 3: //提交借款项目信息
        this.commitLoanProject();
        break;
      default:
        console.log('未找到下一步的请求方法');
    }
  }

  //提交借款信息
  commitLoanInFor() {
    console.log('提交借款信息');
    console.log(this.state.loanInfo);
    //如果成功切换页面
    //this.switchPage();

  }

  //提交借款人信息
  commitLoanPersonal() {
    console.log('提交借款人信息');
    console.log(this.state.loanPerson);
    //如果成功切换页面
    // this.switchPage();
  }

  //提交借款企业信息
  commitLoanCompany() {
    console.log('提交借款企业信息');
    console.log(this.state.loanCompany);
    //如果成功切换页面
    // this.switchPage();
  }

  //提交借款项目信息
  commitLoanProject() {
    console.log('提交借款项目信息');
    console.log(this.state.loanProject);
    //如果成功就跳转页面
  }


  changeState(e) {
    const a = $('.apply-menu a.hover');
    const index = a.index();
    switch (index) {
      case 0: //提交借款信息
        this.setState({
          loanInfo: {
            ...this.state.loanInfo,
            [e.target.name]: e.target.value
          }
        });
        break;
      case 1: //提交借款人信息
        this.setState({
          loanPerson: {
            ...this.state.loanPerson,
            [e.target.name]: e.target.value
          }
        });
        break;
      case 2: //提交借款企业信息
        this.setState({
          loanCompany: {
            ...this.state.loanCompany,
            [e.target.name]: e.target.value
          }
        });
        break;
      case 3: //提交借款项目信息
        this.setState({
          loanProject: {
            ...this.state.loanProject,
            [e.target.name]: e.target.value
          }
        });
        break;
      default:
        console.log('未找到下一步的请求方法');
    }
  }

  // 切换页面的方法
  switchPage() {
    const a = $('.apply-menu a.hover');
    $('.apply-menu a.hover').removeClass('hover');
    a.addClass('hover');
    $('.apply-form .aform').addClass('none').eq(a.index()).removeClass('none');
    $('.apply-form>h2>i').html(a.html());
    let btn = $('.apply-form .bot .btn');
    if(a.index()===3){
      btn.html('完成');
    }else{
      btn.html('下一步');
    }
  }

  render() {
    return (
      <div className="body1">
        <div className="w relative">
          <div className="apply-menu">
            <a className="a1 hover">借款信息</a>
            <a className="a2">借款人信息</a>
            <a className="a3">借款企业信息</a>
            <a className="a4">借款项目</a>
          </div>
          <div className="apply-form shadow" style={{marginTop: '-80px'}}>
            <h2><i>借款信息</i></h2>
            <ApplyInfo data={this.state.loanInfo} changeLoanInfo={(e)=>this.changeState(e)} changeCity={(e)=>this.changeCity(e)}/>
            <ApplyPerson data={this.state.loanPerson} changePersonInfo={(e)=>this.changeState(e)}/>
            <ApplyCompany data={this.state.loanCompany} changeCompanyInfo={(e)=>this.changeState(e)}/>
            <ApplyProject data={this.state.loanProject} changeProjectInfo={(e)=>this.changeState(e)}/>
            <div className="bot center">
              <i><a className="btn f16" onClick={this.submit}>下一步</a></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
