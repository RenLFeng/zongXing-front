import React from 'react';
import { Link } from 'dva/router';

import {Form, Input, Button, Select, Modal, message } from 'antd';

import { VER_PHONE, ID_CORD, BANK_CARD } from '../../common/systemParam';


const FormItem = Form.Item;

export default class BankCardCreate extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { match } = this.props;
    const cardId = match.params.cardId;
    return (
      <div className="fr uc-rbody" >
        <FormBankUpdate cardId={cardId}/>
      </div>
    );
  }
}


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
class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardId: '',
      countDown: 50,
      telPhone: '',
    };
    this.countDownTime = null;
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    clearInterval(this.countDownTime);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll( async (err, values) => {
      console.log(err);
      this.commitSuccess();
      if (!err) {
        console.log('表单获取的数据', values);

      }
    });
  }

  // 获取验证码发送之后 开启倒计时
  startCountDown() {
    // 校验
    if (this.state.telPhone.length === 0) {
      this.props.form.setFields({
        ftelephone: {
          errors: [{
            field: "ftelephone",
            message: "手机号不能为空"
          }]
        }
      });
      return;
    }
    if (!VER_PHONE.test(this.state.telPhone)) {
      this.props.form.setFields({
        ftelephone: {
          value: this.state.telPhone,
          errors: [{
            field: "ftelephone",
            message: "手机号码格式不正确"
          }]
        }
      });
      return;
    }
    this.setState({countDown: this.state.countDown - 1});
    this.countDownTime = setInterval(() => {
      if (this.state.countDown !== 0) {
        this.setState({countDown: this.state.countDown - 1});
      } else {
        this.setState({countDown: 50});
        clearInterval(this.countDownTime);
      }
    }, 1000)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="真实姓名"
        >
          {getFieldDecorator('fname', {
            rules:[{ required: true, message: '请填写真实姓名' }],
          })(
            <Input maxLength={'20'}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="身份证"
        >
          {getFieldDecorator('fcard', {
            rules:[{ required: true, message: '请填写身份证号' },
              {pattern: ID_CORD, message: '身份证格式不正确'}],
          })(
            <Input maxLength={'20'}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="银行卡号"
        >
          {getFieldDecorator('ftype', {
            rules:[{ required: true, message: '请填写银行卡号' },
              {pattern: BANK_CARD, message: '银行卡号格式不正确'}]
          })(
            <Input maxLength={'50'}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="银行预留手机号码"
        >
          {getFieldDecorator('ftelephone', {
            rules: [{ pattern: VER_PHONE, message: '手机号码格式不正确' },
              { required: true, message: '请填写手机' }],
          })(<Input maxLength={'20'} onChange={(e)=>this.setState({telPhone: e.target.value})}/>)}
        </FormItem>
        <div>
          <FormItem
            {...formItemLayout}
            label="短信验证码"
            wrapperCol={{ sm: { span: 8 },}}
            style={{position: 'relative'}}
          >
            {getFieldDecorator('authCode', {
              rules: [{ required: true, message: '请填写邮箱' }],
            })(<Input maxLength={'6'} style={{display: 'inline'}}/>)}
            <Button
              type="primary"
              loading={this.state.loading}
              style={{position: 'absolute',width: '150px',display: 'inline',top:4,right: -155}}
              disabled={this.state.countDown !== 50}
              onClick={()=>this.startCountDown()}
            >
              {this.state.countDown === 50? '提交': `${this.state.countDown}s后重新获取`}
            </Button>
          </FormItem>
        </div>
        <FormItem {...btnLayout}>
          <Button type="primary"  htmlType="submit" loading={this.state.loading} style={{width: '200px'}}>提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const FormBankUpdate = Form.create()(FormComponent);
