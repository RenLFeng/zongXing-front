import React from 'react';
import {Form, Input, Button, Select } from 'antd';
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
class CompanyFormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // this.props.param.dispatch({
    //   type: 'userData/getCompanyOpen'
    // });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      //console.log(err);
      if (!err) {
        //console.log('表单获取的数据', values);
        this.props.param.dispatch({
          type: 'userData/commitCompanyOpen',
          payload: values
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { companyOpen } = this.props.param;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="婚否"
        >
          {getFieldDecorator('fMarital', {
            rules:[],
          })(<Select>
            <Select.Option value="1">未婚</Select.Option>
            <Select.Option value="2">已婚</Select.Option>
            <Select.Option value="3">离异</Select.Option>
          </Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机"
        >
          {getFieldDecorator('phone', {
            rules: [{ pattern: VER_PHONE, message: '手机格式不正确' },
              { required: true, message: '请填写手机' }],
            initialValue: companyOpen.phone?companyOpen.phone: null
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
            rules: [{ type: 'email', message: '邮箱格式不正确', },
              { required: true, message: '请填写邮箱' }],
            initialValue: companyOpen.email?companyOpen.email: null
          })(<Input maxLength={'40'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="真实姓名"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请填写真实姓名' }],
            initialValue: companyOpen.name?companyOpen.name: null
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="身份证号"
        >
          {getFieldDecorator('idCard', {
            rules: [
              { pattern: ID_CORD, message: '身份证格式不正确' },
              { required: true, message: '请填写身份证号' },
            ],
            initialValue: companyOpen.idCard?companyOpen.idCard: null
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公司名称"
        >
          {getFieldDecorator('companyName', {
            rules: [{ required: true, message: '请填写公司名称' }],
            initialValue: companyOpen.companyName?companyOpen.companyName: null
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="营业执照号"
        >
          {getFieldDecorator('companyNumber', {
            rules: [{ required: true, message: '请填写营业执照号' }],
            initialValue: companyOpen.companyNumber?companyOpen.companyNumber: null
          })(<Input maxLength={'60'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="备注"
        >
          {getFieldDecorator('remark', {
            initialValue: companyOpen.remark?companyOpen.remark: null
          })(<Input.TextArea autosize={{ minRows: 2, maxRows: 10 }} maxLength={500}/>)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary"  htmlType="submit" loading={this.props.param.companyOpenLoading}>提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const CompanyForm = Form.create()(CompanyFormComponent);

@connect((state) => ({
  companyOpen: state.userData.companyOpen,
  companyOpenLoading: state.userData.companyOpenLoading
}))
export default class CompanyOpening extends React.Component {
  render() {
    return (
      <div>
        <CompanyForm param={this.props}/>
      </div>
    );
  }
}
