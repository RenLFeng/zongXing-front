import React from 'react';
import {Form, Input, Button, Select, Modal, message} from 'antd';
import '../../assets/ucenter/withdrawals.scss';
import {getBankCard, getCity, putInformation} from '../../services/api';
import {MONEY_REG, MONEY1_REG_} from '../../common/systemParam';
import Path from "../../common/pagePath";

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
      accountId: '402881d4612743710161276b8a3c0000',
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
    }
  }


  componentDidMount() {
    // 获取跳转类型 0：个人 1：企业
    // console.log(this.props.match.params.type)
    this.getCardInformation(this.state.accountId);
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
      response.error(response.msg);
    }
  }

  submit_() {
    this.formId.submit();
    Modal.confirm({
      title: '提示',
      content: '提现成功',
      okText: '确定',
      cancelText: '取消',
      onOk: () => this.props.history.push(Path.PERSONAL_ACCOUNT)
    });
  }

  async getCity_(data) {
    console.log(response);
    const response = await getCity(data);
    if (response.code === 0) {
      this.setState({
        id: response.fcode,
        citys: response.data,
        cityName: (response.data)[0].fcode
      });
    } else {
      response.error(response.msg);
    }
  }

  async getInformation(data) {
    try {
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
          amount: response.amount,
          accountId: response.accountId,
          cardNo: response.cardNo,
          cardType: 0,
          bankCode: response.bankCode,
          province: response.province,
          city: response.city,
          remark: response.remark,
          userBankId: response.userBankId,
          withdrawals: response.data
        })
      } else {
        response.error(response.msg);
      }
    } catch (e) {
      this.setState({loading: false});
      if (typeof e === 'object' && e.name === 288) {
        throw e;
      }
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
        console.log(data);
        this.setState({
          cardNo: data.cardNo,
          bankName: data.bankCode,
          provinceName: data.province,
          cityName: data.city
        });
        this.changeCity(data.province);
        return;
      }
    }
  }

  changeCity(val) {
    this.getCity_(val);
  }

  validateNumber = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    if (MONEY_REG.test(value) && value * 1 <= 1) {
      callback('金额不能小于1');
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

    return (
      <div className="fr uc-rbody">
        <form ref={ref => this.formId = ref} action={withdrawals.submitURL} method="post" target="_blank">
          <input id="WithdrawMoneymoremore" name="WithdrawMoneymoremore" value={withdrawals.withdrawMoneymoremore} type="hidden"/>
          <input id="OrderNo" name="OrderNo" value={withdrawals.orderNo} type="hidden"/>
          <input id="Amount" name="Amount" value={withdrawals.amount} type="hidden"/>
          <input id="FeeQuota" name="FeeQuota" value={withdrawals.feeQuota} type="hidden"/>
          <input id="CardNo" name="CardNo" value={withdrawals.cardNo} type="hidden"/>
          <input id="CardType" name="CardType" value={withdrawals.cardType} type="hidden"/>
          <input id="BankCode" name="BankCode" value={withdrawals.bankCode} type="hidden"/>
          <input id="BranchBankName" name="BranchBankName" value={withdrawals.branchBankName} type="hidden"/>
          <input id="Province" name="Province" value={withdrawals.province} type="hidden"/>
          <input id="City" name="City" value={withdrawals.city} type="hidden"/>
          <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={withdrawals.platformMoneymoremore}
                 type="hidden"/>
          <input id="Remark1" name="Remark1" value={withdrawals.remark1} type="hidden"/>
          <input id="Remark2" name="Remark2" value={withdrawals.remark2} type="hidden"/>
          <input id="Remark3" name="Remark3" value={withdrawals.remark3} type="hidden"/>
        </form>

        <Form layout="inline" onSubmit={this.handleSubmit}>
          <FormItem label="指定银行卡" extra="请指定有效的银行卡" {...formItemLayout}>
            {getFieldDecorator('userBankId', {
              rules: [],
            })(<Select onChange={(e) => this.changeBank(e)}>
              {
                this.state.bankInfos.map((data) => {
                  return (
                    <Select.Option value={data.userBankId} key={data.userBankId}>{data.bankName}</Select.Option>
                  )
                })
              }
            </Select>)}
          </FormItem>
          <FormItem label="提现金额" extra="提现金额必须大于1元！" {...formItemLayout}>
            {getFieldDecorator('amount', {
              rules: [{required: true, message: '提现金额不能为空'},
                {patter: MONEY_REG, message: '输入格式不正确'},
                {validator: this.validateNumber}],
            })(<Input/>)}
          </FormItem>
          <FormItem label="账户ID" style={{display: 'none'}} extra="请指定有效的账户ID" {...formItemLayout}>
            {getFieldDecorator('accountId', {
              rules: [{required: true, message: '账户ID不能为空'}],
              initialValue: this.state.accountId,
            })(<Input/>)}
          </FormItem>
          <FormItem label="银行卡号"  {...formItemLayout}>
            {getFieldDecorator('cardNo', {
              initialValue: this.state.cardNo,
              rules: [{required: true, message: '银行卡号不能为空'}],
            })(<Input/>)}
          </FormItem>
          <FormItem label="银行卡类型"  {...formItemLayout}>
            {getFieldDecorator('cardType', {
              initialValue: '0',
              rules: [{required: true, message: ''}],
            })(<Select>
              <Select.Option value="0">借记卡</Select.Option>

            </Select>)}
          </FormItem>
          <FormItem label="银行名称"  {...formItemLayout}>
            {getFieldDecorator('bankCode', {
              rules: [{required: true, message: '请选择银行！'}],
              initialValue: this.state.bankName,
            })(<Select showSearch optionFilterProp="children" onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} filterOption={(input, option) => option.props.children.indexOf(input) >= 0}>
              {
                this.state.bankCodes.map((data) => {
                  return (
                    <Select.Option value={data.fcode} key={data.fcode}>{data.fbankName}</Select.Option>
                  )
                })
              }
            </Select>)}
          </FormItem>
          <FormItem label="开户银行所在省份"  {...formItemLayout}>
            {getFieldDecorator('province', {
              rules: [{required: true, message: '请选择开户行省份！'}],
              initialValue: this.state.provinceName,
            })(<Select onChange={(e) => this.changeCity(e)}>
              {
                this.state.provinces.map((data) => {
                  return (
                    <Select.Option value={data.fcode} key={data.fcode}>{data.fname}</Select.Option>
                  )
                })
              }
            </Select>)}
          </FormItem>
          <FormItem label="开户银行所在城市"  {...formItemLayout}>
            {getFieldDecorator('city', {
              rules: [{required: true, message: '请选择开户行城市！'}],
              initialValue: this.state.cityName,
            })(<Select>
              {
                this.state.citys.map((data) => {
                  return (
                    <Select.Option value={data.fcode} key={data.fcode}>{data.fname}</Select.Option>
                  )
                })
              }
            </Select>)}
          </FormItem>
          <FormItem label="备注" {...formItemLayout}>
            {getFieldDecorator('remark', {
              rules: [],
              initialValue: ''
            })(<Input.TextArea maxLength={'200'}/>)}
          </FormItem>
          <FormItem {...btnLayout}>
            <Button style={{width: '200px', margin: 'auto'}} type="primary" htmlType="submit"
                    loading={this.state.loading}>
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(EnterprisePresentation);
