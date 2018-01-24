import React from 'react';
import Path from '../../common/pagePath';
import {Link} from 'dva/router';
import {Form, Input, Button, Select, Modal} from 'antd';
import { MONEY_REG, MONEY_REG_} from '../../common/systemParam';


export default class AccountRecharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personAccount: null,
      companyAccount: [],
      recharge: {},
    };
  }

  componentDidMount() {

  }

  setRechargeData(data) {
    console.log(data);
    this.setState({ recharge: data });
    Modal.confirm({
      title: '提示',
      content: '确认充值吗?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => this.submitMoney()
    });
  }

  submitMoney() {
    this.formId.submit();
    Modal.confirm({
      title: '提示',
      content: '请在新页面完成充值',
      okText: '充值成功',
      cancelText: '取消',
      onOk: () => this.props.history.push(Path.PERSONAL_ACCOUNT)
    });
  }


  render() {
    const { match } = this.props;
    const { recharge } = this.state;
    return (
      <div className="fr uc-rbody">
        <Recharge setData={this.setRechargeData.bind(this)}/>
        <form ref={ref => this.formId = ref} id="form1" name="form1" action={recharge.submitURL} method="post" target="_blank">
          <input id="RechargeMoneymoremore" name="RechargeMoneymoremore" value={recharge.rechargeMoneymoremore} type="hidden" />
          <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={recharge.platformMoneymoremore} type="hidden" />
          <input id="OrderNo" name="OrderNo" value={recharge.orderNo} type="hidden" />
          <input id="Amount" name="Amount" value={recharge.amount} type="hidden" />
          <input id="RechargeType" name="RechargeType" value={recharge.rechargeType} type="hidden" />
          <input id="FeeType" name="FeeType" value={recharge.feeType} type="hidden" />
          <input id="CardNo" name="CardNo" value={recharge.cardNo} type="hidden" />
          <input id="RandomTimeStamp" name="RandomTimeStamp" value={recharge.randomTimeStamp} type="hidden" />
          <input id="Remark1" name="Remark1" value={recharge.remark1} type="hidden" />
          <input id="Remark2" name="Remark2" value={recharge.remark2} type="hidden" />
          <input id="Remark3" name="Remark3" value={recharge.remark3} type="hidden" />
          <input id="ReturnURL" name="ReturnURL" value={recharge.returnURL} type="hidden" />
          <input id="NotifyURL" name="NotifyURL" value={recharge.notifyURL} type="hidden" />
          <input id="SignInfo" name="SignInfo" value={recharge.signInfo} type="hidden" />
        </form>
      </div>
    );
  }
}


const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
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
class Forms extends React.Component {
  constructor(props) {
    super(props);

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单提交的数据');
        this.fetchParam();
      }
    });
  };

  async fetchParam() {
    // 调取接口返回数据

    this.props.setData({1:1});
  }

  validateNumber = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (MONEY_REG.test(value) && value * 1 <= 2 ) {
      callback('金额不能小于2');
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="账户"
        >
          {getFieldDecorator('account', {
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="充值类型"
        >
          {getFieldDecorator('ftype', {
            rules:[],
            initialValue: ''
          })(<Select>
            <Select.Option value="">网银充值</Select.Option>
            <Select.Option value="1">代扣充值</Select.Option>
            <Select.Option value="2">快捷支付</Select.Option>
            <Select.Option value="3">汇款充值</Select.Option>
            <Select.Option value="4">企业网银</Select.Option>
          </Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="充值金额"
          extra="充值金额需大于2元"
        >
          {getFieldDecorator('money', {
            rules:[{ required: true, message: '充值金额不能为空' },
              {pattern: MONEY_REG, message: '金额格式不正确'},
              {validator: this.validateNumber}]
          })(<Input  maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="备注"
        >
          {getFieldDecorator('remark', {
            rules:[]
          })(<Input.TextArea maxLength={'200'}/>)}
        </FormItem>

        <FormItem {...btnLayout}>
          <Button
            style={{width: '200px'}}
            type="primary" htmlType="submit">提交</Button>
        </FormItem>
      </Form>
    );
  }
}
const Recharge = Form.create()(Forms);


