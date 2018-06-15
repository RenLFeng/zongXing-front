import React from 'react';
import {Form, Input, Button, Select, Modal, message} from 'antd';
import '../../assets/ucenter/withdrawals.scss';
import {getBankCard, getCity, putInformation} from '../../services/api';
import {MONEY_REG, MONEY1_REG_, BANK_CARD, PERSONAL_PAGE } from '../../common/systemParam';
import Path from "../../common/pagePath";
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import '../../assets/ucenter/recharge.scss';
import BankCard from './Card';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};
const btnLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

class EnterprisePresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // accountId:this.props.location.state ? this.props.location.state.account: '',
      accountId: '',
      bankCodes: [],   //银行列表
      bankInfos: [],   //银行信息
      provinces: [],   //省份列表
      withdrawals: {},  //提交表单后返回的数据
      loading: false,
      id: '',
      cardNo: '',
      bankName: '',
      cityName: '',
      provinceName: '',
      citys: [],         //城市接口返回的城市列表
      //  提交表单参数
      amount: '',
      cardType: 0,
      province: '',
      city: '',
      remark: '',
      num: 0
    }
  }

  componentDidMount() {
    // 获取跳转类型 0：个人 1：企业
    // console.log(this.props.match.params.type)
    this.setState({
      accountId: this.props.location.state ? this.props.location.state.account : ''
    });
    if (this.props.location.state) {
      this.getCardInformation(this.props.location.state.account);
    }
  }

  //获取银行卡
  async getCardInformation(data) {
    const response = await getBankCard(data);
    console.log(response);
    if (response.code === 0) {
      this.setState({
        withdrawals: response.data,
        bankCodes: response.data.bankCodes,
        bankInfos: response.data.bankInfos,
        provinces: response.data.provinces
      });
    } else {
      message.error(response.msg);
    }
  }

  submit_() {
    this.formId.submit();
    Modal.confirm({
      title: '提示',
      content: '请在新页面完成操作',
      okText: '确定',
      cancelText: '取消',
      onOk: () => this.props.history.push(Path.PERSONAL_ACCOUNT)
    });
  }

  async getCity_(data) {
    console.log(this.state.num);
    const response = await getCity(data);
    if (response.code === 0) {
      this.setState({
        id: response.fcode,
        citys: response.data,
        cityName: this.state.num < 2 ? this.state.cityName : (response.data)[0].fcode
      });
    } else {
      message.error(response.msg);
    }
  }

  async getInformation(data) {
    try {
      data.notifyPageUrl = PERSONAL_PAGE;
      this.setState({loading: true});
      const response = await putInformation(data);
      this.setState({loading: false});
      if (response.code === 0) {
        Modal.confirm({
          title: '提示',
          content: '确认提现吗？',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => this.submit_()
        });
        this.setState({
          withdrawals: response.data
        })
      } else {
        message.error(response.msg);
      }
    } catch (e) {
      console.log(e);
      this.setState({loading: false});
      if (typeof e === 'object' && e.name === 288) {
        throw e;
      }
      message.error('服务器繁忙，请稍后重试');
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.amount = values.amount * 1.00;
        console.log('表单提交的数据', values);
        this.getInformation(values);
      }
    });
  };


  changeBank(val) {
    console.log(val);
    for (let data of this.state.bankInfos) {
      if (data.userBankId === val) {
        console.log('data.province', data.province);
        this.props.form.resetFields();
        this.setState({
          cardNo: data.cardNo,
          bankName: data.bankCode,
          provinceName: data.province,
          cityName: data.city,
          num: 0
        }, ()=>{
          this.changeCity(data.province);
        });
        
        return;
      }
    }
  }

  changeCity(val) {
    console.log(12312321321)
    this.setState({
      num: this.state.num+1,
    }, ()=> {
      this.getCity_(val);
    })
  }

  validateNumber = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    if (MONEY_REG.test(value) && value * 1 <= 1) {
      callback('金额不能小于1');
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  };

  validateBankCard = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    if (!BANK_CARD.test(value)) {
      callback('请输入有效的银行卡号');
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  };

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  handleBlur() {
    console.log('blur');
  }
  handleFocus() {
    console.log('focus');
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {withdrawals} = this.state;
    const Option = Select.Option;
    console.log('this.state.provinces', this.state.provinces)
    return (
        <div className="fr uc-rbody" style={{width: 1248,padding: '30px 20px'}}>
          <div className="rech_div">
            <span className="rech_title">提现</span><span className="rech_title" style={{marginLeft: 10, marginRight: 10}}>></span><span className="rech_title" style={{fontSize: '16px'}}>发起提现</span>
          </div>
          <span className="withdrawals_title">请选择到账银行卡</span>
          <div style={{padding: '0 32px'}}>
            <BankCard style={{margin: '32px 32px 0 0'}}/>
          </div>
          <div className="withdrawals_form">
            <div className="withdrawals_form_div">
            </div>
          </div>
          <form ref={ref => this.formId = ref} action={withdrawals.submitURL} method="post" target="_blank" style={{display:'none'}}>
            <input id="WithdrawMoneymoremore" name="WithdrawMoneymoremore" value={withdrawals.withdrawMoneymoremore} />
            <input id="OrderNo" name="OrderNo" value={withdrawals.orderNo} />
            <input id="Amount" name="Amount" value={withdrawals.amount} />
            <input id="FeeQuota" name="FeeQuota" value={withdrawals.feeQuota?withdrawals.feeQuota: ''} />
            <input id="CardNo" name="CardNo" value={withdrawals.cardNo} />
            <input id="CardType" name="CardType" value={withdrawals.cardType} />
            <input id="BankCode" name="BankCode" value={withdrawals.bankCode} />
            <input id="BranchBankName" name="BranchBankName" value={withdrawals.branchBankName ? withdrawals.branchBankName : ''} />
            <input id="Province" name="Province" value={withdrawals.province} />
            <input id="City" name="City" value={withdrawals.city} />
            <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={withdrawals.platformMoneymoremore} />
            <input id="SignInfo" name="SignInfo" value={withdrawals.signInfo} />
            <input id="ReturnURL" name="ReturnURL" value={withdrawals.returnURL} />
            <input id="NotifyURL" name="NotifyURL" value={withdrawals.notifyURL} />
            <input id="Remark1" name="Remark1" value={withdrawals.remark1} />
            <input id="Remark2" name="Remark2" value={withdrawals.remark2 ? withdrawals.remark2 : ''}/>
            <input id="Remark3" name="Remark3" value={withdrawals.remark3 ? withdrawals.remark3 : ''} />
          </form>
        </div>
    );
  }
}

export default Form.create()(EnterprisePresentation);
