import React from 'react';
import '../../assets/personal/personal.scss';
import { Icon, Form, Modal, Input, message, Row, Col, Button} from 'antd';
import { Link } from 'dva/router';
import {AUTH_CODE_TIME, AUTH_CODE_TIME_, ID_CORD, VER_PHONE} from '../../common/systemParam';
import { connect } from 'dva';
import { getEmailAuth, getOldPhoneCode, getOldCode, changePhoneNum, getNewCode} from '../../services/api';
import Path from '../../common/pagePath';


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14},
  },
};
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
      emailAuth: false,
      loading:false,
      showAuthCode: true,//显示获取验证码的接口
      regPhone: '', //注册手机号
      token_:'',
      countDown: AUTH_CODE_TIME_,  //获取验证码倒计时

      countDown_: AUTH_CODE_TIME_,
      showAuthCode_: true,//显示获取验证码的接口
      changePhoneAuth: false,   //更新手机号码表单
      fmobile:'',  //更新后的手机号码
      authcode:'', //新验证码

      getCodeMobile: '',
      regPhoneErr: '',  //注册手机号提示
      regAuthErr: '', //验证码提示
    };
    this.countDownFun = null;
    this.countDownFun_ = null;
  }

 getCodeNum(val) {
    this.setState({getCodeMobile: val});
 }

  componentDidMount() {
    this.initFetchSafeData();
    if (this.countDownFun) {
      clearInterval(this.countDownFun);
    }

    if (this.countDownFun_) {
      clearInterval(this.countDownFun_);
    }
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
      emailAuth: false,
    });
    this.nameForm.resetFields();
    this.phoneForm.resetFields();
    this.emailForm.resetFields();
  };

  //提交新表单
  handleCancel_ = () => {
    this.setState({
      changePhoneAuth:false
    });
    this.changePhoneAuthForm.resetFields();
  }

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
    form.validateFields( async (err, values) => {
      if (err) {
        return;
      }
      const response = await getOldCode(values.captcha);
      if (response.code === 0) {
        console.log('手机号认证数据: ', values);
        this.setState({changePhoneAuth:true});
        form.resetFields();
        this.handleCancel();
      } else {
        message.error(response.msg);
      }
    });
  };

//获取旧手机号验证码
  async getOldCode(data) {
    const { regPhone } = this.state;
    this.setState({loading:true});
    try{
      const response = await getOldPhoneCode(data);
      this.setState({loading:false});
      if(response.code ===0){
        const sendTime = localStorage.getItem(regPhone);
        if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME_ * 1000 ) {
          alert(`${AUTH_CODE_TIME_}秒内仅能获取一次验证码，请稍后重试`);
          return;
        }
        localStorage.setItem(regPhone, new Date().getTime());
        //发送请求 按钮变不可点状态
        this.setState({ showAuthCode: false });
        //成功之后倒计时开始启动
        this.countDownFun = setInterval(() => {
          if (this.state.countDown === 0) {
            clearInterval(this.countDownFun);
            this.setState({ countDown: AUTH_CODE_TIME_, showAuthCode: true });
          } else {
            this.setState({ countDown: this.state.countDown - 1 });
          }
        }, 1000);
      }  else{
        message.error(response.msg);
      }
    } catch(e){
      this.setState({loading:false});
      if (typeof e === 'object' && e.name === 288) {
        throw e;
      }
    }
  }

  //提交修改后的手机
  changePhoneAuth_ = () => {
    const form = this.changePhoneAuthForm;
    form.validateFields( async (err, values) => {
      if (err) {
        return;
      }
      const data = {
        fmobile: values.title,
        authcode: values.captcha,
      };
      const response = await changePhoneNum(data);
      if (response.code === 0) {
        this.setState({changePhoneAuth:false});
        form.resetFields();
        this.handleCancel_();
      } else {
        message.error(response.msg);
      }
    });
    location.reload(false);
  };

  //获取新手机号验证码
  async getNewCode_() {
    const {getCodeMobile} = this.state;
    if(getCodeMobile ===0){
      this.setState({regPhoneErr:'手机号码不能为空'});
      return;
    }
    if (!VER_PHONE.test(getCodeMobile)) {
      this.setState({regPhoneErr:'请输入正确的手机号'});
      return;
    }
    this.setState({loading:true});
    try{
      const response = await getNewCode(getCodeMobile);
      this.setState({loading:false});
      if(response.code ===0) {
        const sendTime = localStorage.getItem(getCodeMobile);
        if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME_ * 1000 ) {
          alert(`${AUTH_CODE_TIME_}秒内仅能获取一次验证码，请稍后重试`);
          return;
        }
        localStorage.setItem(getCodeMobile, new Date().getTime());
        //发送请求 按钮变不可点状态
        this.setState({ showAuthCode_: false });
        //成功之后倒计时开始启动
        this.countDownFun_ = setInterval(() => {
          if (this.state.countDown_ === 0) {
            clearInterval(this.countDownFun_);
            this.setState({ countDown_: AUTH_CODE_TIME_, showAuthCode_: true });
          } else {
            this.setState({ countDown_: this.state.countDown_ - 1 });
          }
        }, 1000);
      } else{
        message.error(response.msg);
      }
    } catch(e){
      this.setState({loading:false});
      if (typeof e === 'object' && e.name === 288) {
        throw e;
      }
    }
  }


  //提交 邮箱绑定
  changeEmailAuth = () => {
    const form = this.emailForm;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      console.log('邮箱认证数据: ', values);
      const response = await getEmailAuth(values.email);
      console.log(response);
      if (response.code === 0) {
        message.info('邮件发送成功');
        form.resetFields();
        this.handleCancel();
        this.setState({emailAuth:false});
        Modal.confirm({
          title: '提示',
          content: '邮件已发送,请注意查看',
          okText: '完成',
          cancelText: '取消',
          onOk: () => {
            this.props.dispatch({
              type: 'safeCenter/getSafe'
            });

          }
        });
      } else {
        message.error(response.msg);
      }
    });
  };



  render() {
    const {match, safeData} = this.props;
    return (
      <div className="fr uc-rbody">
        <div className="safeCenter">
          <div className="tab-row">
            <div><span>实名认证</span></div>
            <div>{!!safeData.userSecurityCenter.fCertification?<SuccessAuth/>:<FailAuth/>}</div>
            <div><span>{safeData.fRealName? safeData.fRealName: ''} {safeData.fIdcardNo?`(${safeData.fIdcardNo})`: null}</span></div>
            <div>{!!safeData.userSecurityCenter.fCertification?null:<Link to={Path.OPEN_ACCOUNT+'/0'}>认证</Link>}</div>
          </div>
          <div className="tab-row">
            <div><span>第三方开户</span></div>
            <div>{!!safeData.userSecurityCenter.fThirdAccount?<SuccessAuth/>:<FailAuth/>}</div>
            <div><span>{safeData.fThirdAccountName?safeData.fThirdAccountName: ''}</span></div>
            <div>{!!safeData.userSecurityCenter.fThirdAccount?null:<Link to={Path.OPEN_ACCOUNT+'/0'}>开通</Link>}</div>
          </div>
          <div className="tab-row">
            <div><span>手机绑定</span></div>
            <div>{!!safeData.userSecurityCenter.fMobileBinding?<SuccessAuth/>:<FailAuth/>}</div>
            <div><span>{safeData.fMobile? safeData.fMobile: ''}</span></div>
            <div><a onClick={()=>this.setState({phoneAuth: true})}>修改</a></div>
          </div>
          <div className="tab-row">
            <div><span>邮箱绑定</span></div>
            <div>{!!safeData.userSecurityCenter.fEmailBinding?<SuccessAuth/>:<FailAuth/>}</div>
            <div><span>{safeData.fEmail? safeData.fEmail: ''}</span></div>
            <div><a onClick={()=>this.setState({emailAuth: true})}>修改</a></div>
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
            token_={this.state.token_}
            getOldCode={()=> this.getOldCode(this.state.token_)}
            loading={this.state.loading}
            countDown={this.state.countDown}
            showAuthCode={this.state.showAuthCode}
          />
          <EmailAuth
            ref={(ref)=>this.emailForm = ref}
            visible={this.state.emailAuth}
            onCancel={this.handleCancel}
            onCreate={this.changeEmailAuth}
          />
          <ChangePhoneAuth
            ref={(ref)=>this.changePhoneAuthForm = ref}
            visible={this.state.changePhoneAuth}
            onCancel={this.handleCancel_}
            onCreate={this.changePhoneAuth_}
            getNewCode={()=> this.getNewCode_()}
            loading={this.state.loading}
            getCodeNum={(val) => this.getCodeNum(val)}
            countDown_={this.state.countDown_}
            showAuthCode_={this.state.showAuthCode_}
            getCodeMobile={this.state.getCodeMobile}
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
    const { visible, onCancel, onCreate, form ,token_} = props;
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
          <FormItem
            {...formItemLayout}
            label="验证码"
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '验证码不能为空' }],
                })(
                  <Input />
                )}
              </Col>
              <Col span={12}>
                  {
                    props.showAuthCode ? <Button onClick={()=> props.getOldCode()}>获取验证码</Button> :
                      <Button loading={props.loading}>
                        {props.countDown}s获取验证码
                    </Button>
                  }
                {
                  props.showAuthCode ? null :
                    <p>验证码已发送到手机,请注意查收!</p>
                }
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

const ChangePhoneAuth = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="更换手机号码"
        okText="提交"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem {...formItemLayout} label="新手机号">
          {getFieldDecorator('title', {
          rules: [{ required: true, message: '手机号不能为空' },
          {pattern: VER_PHONE, message: '手机号格式不正确'}],
          })(<Input onChange={(e) => props.getCodeNum(e.target.value)} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="验证码"
          >
            <Row gutter={8}>
              <Col span={12}>
                {getFieldDecorator('captcha', {
                  rules: [{ required: true, message: '验证码不能为空' }],
                })(
                  <Input />
                )}
              </Col>
              <Col span={12}>
                {
                  props.showAuthCode_ ? <Button onClick={()=> props.getNewCode(props.getCodeMobile)}>获取验证码</Button> :
                    <Button loading={props.loading}>
                      {props.countDown_}s获取验证码
                    </Button>
                }
                {
                  props.showAuthCode_ ? null :
                    <p>验证码已发送到手机,请注意查收!</p>
                }
              </Col>
            </Row>
          </FormItem>
        </Form>
      </Modal>
    );
  }
)

// 邮箱绑定
const EmailAuth = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="邮箱绑定"
        okText="发送"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form>
          <FormItem label="邮箱">
            {getFieldDecorator('email', {
              rules: [{ type: 'email', message: '邮箱格式不正确', },
                { required: true, message: '邮箱不能为空' }],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);
