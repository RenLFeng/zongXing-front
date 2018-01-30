import React from 'react';
import '../../assets/personal/personal.scss';
import { Icon, Form, Modal, Input } from 'antd';
import { Link } from 'dva/router';
import { ID_CORD, VER_PHONE } from '../../common/systemParam';
import { connect } from 'dva';

@connect((state)=>({
  safeData: state.safeCenter.safeData,
  safeDataLoading: state.safeCenter.safeDataLoading
}))
export default class SafeCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameAuth: false,
      phoneAuth: false,
      emailAuth: false
    }
  }

  componentDidMount() {
    this.initFetchSafeData();
  }

  // 初始化安全中心首页数据
  initFetchSafeData= () => {
    this.props.dispatch({
      type: 'safeCenter/getSafe'
    })
  };

  handleCancel = () => {
    this.setState({
      nameAuth: false,
      phoneAuth: false,
      emailAuth: false
    })
  };
  //提交 实名认证
  changeNameAuth = () => {
    const form = this.nameForm;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('实名认证数据: ', values);
      form.resetFields();
      this.handleCancel();
    });
  };

  //提交 手机号绑定
  changePhoneAuth = () => {
    const form = this.phoneForm;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('手机号认证数据: ', values);
      form.resetFields();
      this.handleCancel();
    });
  };

  //提交 邮箱绑定
  changeEmailAuth = () => {
    const form = this.phoneForm;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('邮箱认证数据: ', values);
      form.resetFields();
      this.handleCancel();
    });
  };

  render() {
    const {match, safeData} = this.props;
    return (
      <div className="fr uc-rbody">
        <div className="safeCenter">
          <div className="tab-row">
            <div><span>实名认证</span></div>
            <div>{!!safeData.securityCenter.fCertification?<SuccessAuth/>:<FailAuth/>}</div>
            <div><span>{safeData.fRealName} {safeData.fIdcardNo?`(${safeData.fIdcardNo})`: null}</span></div>
            <div><a onClick={()=>this.setState({nameAuth: true})}>认证</a></div>
          </div>
          <div className="tab-row">
            <div><span>第三方开户</span></div>
            <div>{!!safeData.securityCenter.fThirdAccount?<SuccessAuth/>:<FailAuth/>}</div>
            <div><span>{safeData.fThirdAccountName}</span></div>
            <div><Link to={`/personal`}>开通</Link></div>
          </div>
          <div className="tab-row">
            <div><span>手机绑定</span></div>
            <div>{!!safeData.securityCenter.fMobileBinding?<SuccessAuth/>:<FailAuth/>}</div>
            <div><span>{safeData.fMobile}</span></div>
            <div><a onClick={()=>this.setState({phoneAuth: true})}>修改</a></div>
          </div>
          <div className="tab-row">
            <div><span>邮箱绑定</span></div>
            <div>{!!safeData.securityCenter.fEmailBinding?<SuccessAuth/>:<FailAuth/>}</div>
            <div><span>{safeData.fEmail}</span></div>
            <div><a onClick={()=>this.setState({emailAuth: true})}>修改</a></div>
          </div>
          <div className="tab-row" style={{borderBottom:'1px solid #F5F5F5'}}>
            <div><span>银行卡绑定</span></div>
            <div>{!!safeData.securityCenter.fBankCardBinding?<SuccessAuth/>:<FailAuth/>}</div>
            <div/>
            <div><Link to={'/personal/bankCard'}>银行卡管理</Link></div>
          </div>
          <NameAuth
            ref={(ref)=>this.nameForm = ref}
            visible={this.state.nameAuth}
            onCancel={this.handleCancel}
            onCreate={this.changeNameAuth}
          />
          <PhoneAuth
            ref={(ref)=>this.phoneForm = ref}
            visible={this.state.phoneAuth}
            onCancel={this.handleCancel}
            onCreate={this.changePhoneAuth}
          />
          <EmailAuth
            ref={(ref)=>this.emailForm = ref}
            visible={this.state.emailAuth}
            onCancel={this.handleCancel}
            onCreate={this.changeEmailAuth}
          />
        </div>
      </div>
    );
  }
}

const SuccessAuth = () => (
  <div>
    <Icon type="check-circle" style={{color: '#4BCC60'}}/>
    <span style={{color: '#4BCC60'}}>已验证</span>
  </div>
);
const FailAuth = () => (
  <div>
    <Icon type="close-circle" style={{color: '#DE5347'}}/>
    <span style={{color: '#DE5347'}}>未验证</span>
  </div>
);
const FormItem = Form.Item;
// 实名认证
const NameAuth = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="实名认证"
        okText="提交"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="姓名">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '姓名不能为空' }],
            })(<Input />)}
          </FormItem>
          <FormItem label="身份证号">
            {getFieldDecorator('description', {
              rules: [{ required: true, message: '身份证不能为空' },
                {pattern: ID_CORD, message: '身份证号格式不正确'}],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
// 手机绑定
const PhoneAuth = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="手机绑定"
        okText="提交"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="手机号">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '手机号不能为空' },
                {pattern: VER_PHONE, message: '手机号格式不正确'}],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
// 邮箱绑定
const EmailAuth = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="邮箱绑定"
        okText="提交"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="邮箱">
            {getFieldDecorator('title', {
              rules: [{ type: 'email', message: '邮箱格式不正确', },
                { required: true, message: '邮箱不能为空' }],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
