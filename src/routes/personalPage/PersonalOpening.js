import React from 'react';
import {Form, Input, Button } from 'antd';
import { connect } from 'dva';
const FormItem = Form.Item;

import { VER_PHONE, ID_CORD } from '../../common/systemParam';

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
const tailFormItemLayout = {
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
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.props.param.dispatch({
    //   type: 'userData/getUserOpen'
    // })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      //console.log(err);
      if (!err) {
        //console.log('Received values of form: ', values);
        this.props.param.dispatch({
          type: 'userData/commitUserOpen',
          payload: values
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { personalOpen } = this.props.param;
    return (
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="手机"
          >
            {getFieldDecorator('phone', {
              rules: [{ pattern: VER_PHONE, message: '手机格式不正确' },
                { required: true, message: '请填写手机' }],
              initialValue: personalOpen.phone?personalOpen.phone: null
            })(<Input maxLength={'20'}/>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="邮箱"
          >
            {getFieldDecorator('email', {
              rules: [{ type: 'email', message: '邮箱格式不正确', },
                { required: true, message: '请填写邮箱' }],
              initialValue: personalOpen.email?personalOpen.email: null
            })(<Input maxLength={'40'}/>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="真实姓名"
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请填写真实姓名' }],
              initialValue: personalOpen.name?personalOpen.name: null
            })(<Input maxLength={'20'}/>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="身份证号"
          >
            {getFieldDecorator('idCard', {
              rules: [
                { pattern: ID_CORD, message: '身份证格式不正确' },
                { required: true, message: '请填写身份证号' }],
              initialValue: personalOpen.idCard?personalOpen.idCard: null
            })(<Input maxLength={'20'}/>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="备注"
          >
            {getFieldDecorator('remark', {
              initialValue: personalOpen.remark?personalOpen.remark: null
            })(<Input.TextArea autosize={{ minRows: 2, maxRows: 10 }} maxLength={500}/>)}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary"  htmlType="submit" loading={this.props.param.personalOpenLoading}>提交</Button>
          </FormItem>
        </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(FormComponent);

@connect((state)=>({
  personalOpenLoading: state.userData.personalOpenLoading,
  personalOpen: state.userData.personalOpen
}))
export default class PersonalOpening extends React.Component{
  render() {
    return (
      <div>
        <WrappedRegistrationForm param={this.props}/>
      </div>
    );
  }
}


