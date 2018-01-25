import React from 'react';
import { Link } from 'dva/router';

import {Form, Input, Button, Select, Modal, message } from 'antd';
import { connect } from 'dva';

import '../../assets/ucenter/modelCenter.scss';
import { VER_PHONE, ID_CORD } from '../../common/systemParam';
import Path from '../../common/pagePath';

import {getPersonAccount, commitOpenAccount} from '../../services/api';

const FormItem = Form.Item;

const TIME_OUT = 10;
export default class OpenAccount extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { match } = this.props;
    const type = match.params.type;
    return (
      <div className="fr uc-rbody" >
        <FormOpenComponent type={type}/>
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
      openType: this.props.type === '1' ? '1' : '0',
      visible: false,
      countDownTime: TIME_OUT,
      companyNumber: '',
      loading: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.countDown = null;
    this.confirmRequest = null;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll( async (err, values) => {
      console.log(err);
      if (!err) {
        console.log('表单获取的数据', values);
        // 提交表单接口
        this.setState({loading: true});
        try {
          const response = await commitOpenAccount(values);
          if (response.code === 0) {
            message.info(response.msg);
            // 提交表单接口回调成功使用
            // this.commitSuccess();
            if (values.accountType === '0') {
              this.props.history.push(Path.PERSONAL_ACCOUNT);
            } else if (values.accountType === '1') {
              this.props.history.push(Path.COMPANY_ACCOUNT);
            }
          } else {
            message.error(response.msg);
          }
        } catch (e) {
          message.error('服务器异常');
        }
        this.setState({loading: false});
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.countDown);
  }

  commitSuccess = () => {
    // 打开等待弹出层
    this.setState({visible: true});
    //开启2s一次请求
    this.confirmRequest = setInterval(() => {
      // 查个人账户是否创建成功
      if (this.state.openType === '0') {
        this.checkPersonalAccount();
      }
      // 查企业账户是否创建成功
      if (this.state.openType === '1') {
        this.checkCompanyAccount();
      }
    }, 2000);
    this.countDown = setInterval(() => {
      this.setState({
        countDownTime: this.state.countDownTime - 1
      }, () => {
        if (this.state.countDownTime === 0) {
          this.setState({
            countDownTime: TIME_OUT,
            visible: false
          });
          message.warning('请求超时,请稍后重试');
          clearInterval(this.countDown);
          clearInterval(this.confirmRequest);
        }
      });
    }, 1000);
  };

  // 检查个人账户是否已开户
  checkPersonalAccount = async () => {
    const response = await getPersonAccount(0); // 0: 个人账户 1: 企业账户
    if (response.code === 0 ) {

      clearInterval(this.countDown); // 清除倒计时
      clearInterval(this.confirmRequest); // 清除连续请求
      this.setState({   // 重置倒计时
        countDownTime: TIME_OUT,
        visible: false
      });
      message.info('开户成功');
    }
  };

  checkCompanyAccount = async () => {
    const response = await getPersonAccount(1); // 0: 个人账户 1: 企业账户
    /*
     *  判断企业是否已开户的状态 因为企业账户可能有多个，所以利用
     *  返回的企业数组使用 企业营业执照号 companyNumber 来判断 这个企业是否已经注册过了
     * **/
    if (response.code === 0 && response.accountInfos.length > 0) {
      for (let company of response.accountInfos) {
        if (company.companyNumber === this.state.companyNumber) {
          clearInterval(this.countDown); // 清除倒计时
          clearInterval(this.confirmRequest); // 清除连续请求
          this.setState({   // 重置倒计时
            countDownTime: TIME_OUT,
            visible: false
          });
          message.info('开户成功');
        }
      }
    }
  };

  handleCancel = () => {
    clearInterval(this.countDown);
    this.setState({
      visible: false
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="开户类型"
        >
          {getFieldDecorator('accountType', {
            rules:[{ required: true, message: '请选择开户类型' }],
            initialValue: this.props.type === '1' ? '1' : '0'
          })(
            <Select onChange={(val)=>this.setState({openType: val})}>
              <Select.Option value="0">个人开户</Select.Option>
              <Select.Option value="1">企业开户</Select.Option>
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机"
        >
          {getFieldDecorator('mobile', {
            rules: [{ pattern: VER_PHONE, message: '手机格式不正确' },
              { required: true, message: '请填写手机' }],
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('email', {
            rules: [{ type: 'email', message: '邮箱格式不正确', },
              { required: true, message: '请填写邮箱' }],
          })(<Input maxLength={'40'}/>)}
        </FormItem>
        { this.state.openType === '0' ?
          <div>
            <FormItem
              {...formItemLayout}
              label="真实姓名"
            >
              {getFieldDecorator('realName', {
                rules: [{ required: true, message: '请填写真实姓名' }],
              })(<Input maxLength={'20'}/>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="身份证号"
            >
              {getFieldDecorator('identificationNo', {
                rules: [
                  { pattern: ID_CORD, message: '身份证格式不正确' },
                  { required: true, message: '请填写身份证号' },
                ],
              })(<Input maxLength={'20'}/>)}
            </FormItem>
          </div> : null }
        { this.state.openType === '1' ?
          <div>
            <FormItem
              {...formItemLayout}
              label="企业名称"
            >
              {getFieldDecorator('realName', {
                rules: [{ required: true, message: '请填写企业名称' }],
              })(<Input maxLength={'50'}/>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="营业执照号"
            >
              {getFieldDecorator('identificationNo', {
                rules: [{ required: true, message: '请填写营业执照号' }],
              })(<Input maxLength={'60'} onChange={(e)=>this.setState({companyNumber: e.target.value})}/>)}
            </FormItem>
          </div> : null
          }
        <FormItem {...btnLayout}>
          <Button type="primary"  htmlType="submit" loading={this.state.loading} style={{width: '200px'}}>提交</Button>
        </FormItem>
        <Modal
          visible={this.state.visible}
          title="提交中"
          onCancel={this.handleCancel}
          footer={null}
          maskClosable={false}
        >
          <p style={{fontSize:20}}>正在开户, 请等待。。。({this.state.countDownTime}s)</p>
        </Modal>
      </Form>
    );
  }
}

const FormOpenComponent = Form.create()(FormComponent);
