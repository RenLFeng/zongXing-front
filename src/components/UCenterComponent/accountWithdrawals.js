import React from 'react';
import {Form, Input, Button, Select, Modal, message} from 'antd';
import '../../assets/ucenter/withdrawals.scss';
import {getBankCard} from  '../../services/api';


export default class AccountWithdrawals extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      accountId:''
    }
  }
  componentDidMount() {
    // 获取跳转类型 0：个人 1：企业
    // console.log(this.props.match.params.type)
  }

  async getCardInformation(data){
    console.log(response);
    const response = await getBankCard(data);
    if(response.code === 0){
      this.setState = {
        accountId:data.accountId,
      }
    } else {
      response.error(response.msg);
    }
  }


  render() {
    const { match } = this.props;
    return (
      <div className="fr uc-rbody">
        <Withdrawals onClick={()=> this.props.getCardInformation(this.state.accountId)}/>
      </div>
    );
  }
}

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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

class EnterprisePresentation extends React.Component{
  render(){
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="inline">
        <FormItem label="指定银行卡" extra="请指定有效的银行卡" {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请指定银行卡！' }], 
          })(<Select >
            <Select.Option value="0">网银充值</Select.Option>
            <Select.Option value="2">快捷支付</Select.Option>
            <Select.Option value="3">汇款充值</Select.Option>
            <Select.Option value="4">企业网银</Select.Option>
          </Select>)}
        </FormItem>
        <FormItem label="提现金额" extra="提现金额必须大于1元！" {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入提现金额！' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="账户ID" extra="请指定有效的账户ID" {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="银行卡号"  {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="银行类型"  {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '' }],
          })(<Select >
            <Select.Option value="0">借记卡</Select.Option>

          </Select>)}
        </FormItem>
        <FormItem label="银行代码"  {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="开户银行所在省份"  {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '' }],
          })(<Input />)}
        </FormItem>
        <FormItem label="开户银行所在城市"  {...formItemLayout}>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '' }],
          })(<Input />)}
        </FormItem>
        <FormItem  label="备注" {...formItemLayout}>
          {getFieldDecorator('remark', {
            rules:[],
            initialValue: ''
          })(<Input.TextArea maxLength={'200'} />)}
        </FormItem>
        <FormItem {...btnLayout}>
          <Button style={{width: '200px'}} type="primary" htmlType="submit" loading={this.props.loading}>
            确定提现
          </Button>
        </FormItem>
      </Form>

    );
  }
}
const Withdrawals = Form.create()(EnterprisePresentation);
