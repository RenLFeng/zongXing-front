import React from 'react';
import ImgUpload from '../../components/UpLoad/imgUpload';
import {message, Spin} from 'antd';
import moment from 'moment';
import { initApply } from '../../assets/apply/index';
import ApplyInfo from '../../components/ApplyLoanPage/applyInfo';
import ApplyCompany from '../../components/ApplyLoanPage/applyCompany';
import ApplyPerson from '../../components/ApplyLoanPage/applyPerson';
import ApplyProject from '../../components/ApplyLoanPage/applyProject';
import { applySave, getLoanInfo, applyCommit } from '../../services/api';
export default class ApplyLoan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNum: 1,
      loanInfo: {},
      loanPerson: {},
      loanCompany: {},
      loanProject: {},
      loanInfoCommit: 0,
      loanPersonCommit: 0,
      loanCompanyCommit: 0,
      loanProjectCommit: 0,
      savePage: 0,
      loadingState: false,
      dateCode: 'error',
      fProjectNo: 'error',
      fid: '',
      beforeData: {}
    };
  }
  componentDidMount() {
    // 进入页面获取信息
    this.getBeforeData();
  }

  async getBeforeData() {
    try {
      this.setState({loadingState: true});
      const response = await getLoanInfo();
      this.setState({loadingState: false});
      console.log(response);
      if (response.code === 0) {
        this.setState({
          fid: response.data ? response.data.projectId : '',
          beforeData: response.data ? response.data : {}
        })
      } else {
        message.error(response.msg);
      }
    } catch(e) {
      console.log(e);
      message.error('网络异常');
      this.setState({loadingState: false});
    }



  }

  componentWillReceiveProps() {

  }

  // 处理提交
  handlePage(page) {
    if (this.state.pageNum === page) {
      return;
    }
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

  submit() {
    if (this.state.pageNum === 1) {
      this.setState({
        savePage: 2,
        loanInfoCommit: this.state.loanInfoCommit + 1
      });
    } else if (this.state.pageNum === 2) {
      this.setState({
        savePage: 3,
        loanPersonCommit: this.state.loanPersonCommit + 1
      });
    } else if (this.state.pageNum === 3) {
      this.setState({
        savePage: 4,
        loanCompanyCommit: this.state.loanCompanyCommit + 1
      });
    } else {
      // 完成的处理
      this.setState({
        loanProjectCommit: this.state.loanProjectCommit + 1
      });
    }
  }

  // 切换页面
  async switchPage(err, data, page) {
    console.log(err, data, page);
    console.log(JSON.stringify(data));
    if (!err) {
      // this.setState({
      //   pageNum: this.state.savePage,
      // });
      if (page!==4) {
        // 提交 1 2 3 页的数据接口
        try {
          this.setState({loadingState: true});
          const response = await applySave(data);
          this.setState({loadingState: false});
          if (response.code === 0) {
            if (page === 1) {
              const dateCode = moment(response.data.project.fCreateTime).format('YYYY') + moment(data.fCreateTime).format('MM')
              this.setState({
                fProjectNo: response.data.project.fProjectNo,
                fid: response.data.project.fId,
                dateCode: dateCode
              });
            }
            this.setState({
              pageNum: this.state.savePage,
            });
          } else {
            message.error(response.msg);
          }
        } catch (e) {
          this.setState({loadingState: false});
          message.error('网络异常');
        }
      } else {
        if (!this.judgeValue()) {
          return;
        }
        try {
          this.setState({loadingState: true});
          const response = await applyCommit(data);
          this.setState({loadingState: false});
          if (response.code === 0) {
            message.info('完成');
            this.props.history.push('/index/projectLoan');
          } else {
            message.error(response.msg);
          }
        } catch(e) {
          this.setState({loadingState: false});
          message.error('网络异常');
        }
      }
    } else {
      message.error('请检查填写格式');
    }
  }

  judgeValue() {
    if (!$("#fCreditMoney").val()) {
      message.error('借款信息中借款金额不能为空');
      return false;
    }
    if (!$("#fCreditMonth").val()) {
      message.error('借款信息中借款期数不能为空');
      return false;
    }
    if (!$("#fCreditUse").val()) {
      message.error('借款信息中借款期数不能为空');
      return false;
    }
    if (!$("#personalName").val()) {
      message.error('借款人信息中姓名不能为空');
      return false;
    }
    if (!$("#fIDCardNo").val()) {
      message.error('借款人信息中身份证号不能为空');
      return false;
    }
    if (!$("#fMobile").val()) {
      message.error('借款人信息中手机不能为空');
      return false;
    }if (!$("#fName1").val()) {
      message.error('借款人信息中第一联系人姓名不能为空');
      return false;
    }if (!$("#fIdcardNo1").val()) {
      message.error('借款人信息中第一联系人身份证号不能为空');
      return false;
    }if (!$("#fPhone1").val()) {
      message.error('借款人信息中第一联系人手机不能为空');
      return false;
    }if (!$("#fRelation1").val()) {
      message.error('借款人信息中第一联系人社会关系不能为空');
      return false;
    }
    if (!$("#companyName").val()) {
      message.error('借款企业信息中公司名称不能为空');
      return false;
    }
    if (!$("#fsocialCreditCode").val()) {
      message.error('借款企业信息中统一社会信用代码不能为空');
      return false;
    }
    if (!$("#fbankName").val()) {
      message.error('借款企业信息中企业开户行不能为空');
      return false;
    }
    if (!$("#fbankNo").val()) {
      message.error('借款企业信息中企业银行账户不能为空');
      return false;
    }
    if (!$("#fbusAddress").val()) {
      message.error('借款企业信息中实际经营地址不能为空');
      return false;
    }
    if (!$("#projectName").val()) {
      message.error('借款项目中项目名称不能为空');
      return false;
    }
    return true;
  }

  render() {
    console.log(this.props);
    const {pageNum,dateCode,fProjectNo, fid, beforeData } = this.state;
    return (
      <div className="body1">

          <div className="w relative" style={{marginTop: -100}}>
            <Spin spinning={this.state.loadingState} tip={'请稍后'} size="large" wrapperClassName="div-spin">
            <div className="apply-menu">
              <a className={`a1 ${pageNum === 1 ? 'hover' : ''}`} onClick={()=>this.handlePage(1)}>借款信息</a>
              <a className={`a2 ${pageNum === 2 ? 'hover' : ''}`} onClick={()=>this.handlePage(2)}>借款人信息</a>
              <a className={`a3 ${pageNum === 3 ? 'hover' : ''}`} onClick={()=>this.handlePage(3)}>借款企业信息</a>
              <a className={`a4 ${pageNum === 4 ? 'hover' : ''}`} onClick={()=>this.handlePage(4)}>借款项目</a>
            </div>
            <div className="apply-form shadow" >
              <h2><i>借款信息</i></h2>
              <ApplyInfo data={beforeData} dateCode={dateCode} fProjectNo={fProjectNo} fid={fid} commit={this.state.loanInfoCommit} switchPage={(err,data,page)=>this.switchPage(err,data,page)} pageNum={this.state.pageNum}/>
              <ApplyPerson data={beforeData} dateCode={dateCode} fProjectNo={fProjectNo} fid={fid} commit={this.state.loanPersonCommit} switchPage={(err,data,page)=>this.switchPage(err,data,page)} pageNum={this.state.pageNum}/>
              <ApplyCompany data={beforeData} dateCode={dateCode} fProjectNo={fProjectNo} fid={fid} commit={this.state.loanCompanyCommit} switchPage={(err,data,page)=>this.switchPage(err,data,page)} pageNum={this.state.pageNum}/>
              <ApplyProject data={beforeData} dateCode={dateCode} fProjectNo={fProjectNo} fid={fid} commit={this.state.loanProjectCommit} switchPage={(err,data,page)=>this.switchPage(err,data,page)} pageNum={this.state.pageNum}/>
              <div className="bot center">
                <i><a className="btn f16" onClick={() => this.submit()}>{this.state.pageNum===4?'完成': '下一步'}</a></i>
              </div>
            </div>
            </Spin>
          </div>

      </div>
    );
  }
}
