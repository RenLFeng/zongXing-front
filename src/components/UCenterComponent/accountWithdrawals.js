import React from 'react';
import {Form, Input, Button, Select, Modal, message} from 'antd';


export default class AccountWithdrawals extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  componentDidMount() {
    // 获取跳转类型 0：个人 1：企业
    console.log(this.props.match.params.type)
  }

  render() {
    const { match } = this.props;
    return (
      <div className="fr uc-rbody">
        <Withdrawals  />
      </div>
    );
  }
}

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
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

class EnterprisePresentation extends React.Component{
  render(){
    console.log(this.props);
    const { getFieldDecorator } = this.props.form;
    return(
      <Form layout="inline">
        <FormItem label="指定银行卡">
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Username is required!' }],
          })(<Input />)}
        </FormItem>
      </Form>
    );
  }
}
const Withdrawals = Form.create()(EnterprisePresentation);
