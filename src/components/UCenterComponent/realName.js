import React from 'react';
import '../../assets/ucenter/realName.scss';
import { Icon, Form, Modal, Input, message, Row, Col, Button, Card,Steps} from 'antd';
import { Link } from 'dva/router';
import {AUTH_CODE_TIME, AUTH_CODE_TIME_, ID_CORD, VER_PHONE, AUTH_PAGE_URL} from '../../common/systemParam';
import { connect } from 'dva';
import { getEmailAuth, getOldPhoneCode, getOldCode, changePhoneNum, getNewCode, distribution, authorizationState,closeAuthorization, phoneExist} from '../../services/api';
import {AUTHENTICATION} from '../../common/pagePath';

const Step = Steps.Step;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20},
  },
};
@connect((state)=>({
  safeData: state.safeCenter.safeData,
  safeDataLoading: state.safeCenter.safeDataLoading
}))
export default class RealName extends React.Component {
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

      distribution:{},  //授权表单数据
      url:'',     //提交表单乾多多链接
      status:'',  //投标状态
      showAuth: false , //判断开户展示授权

      // data:{},  //取消授权
      // closeUrl:'',
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

    this.getAuthorizationState();
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
      countDown_: AUTH_CODE_TIME_,
      showAuthCode: true
    });
    this.nameForm.resetFields();
    this.phoneForm.resetFields();
    this.emailForm.resetFields();
    if (this.countDownFun){
      clearInterval(this.countDownFun);
    }
  };

  //提交新表单
  handleCancel_ = () => {
    this.setState({
      changePhoneAuth:false
    });
    this.changePhoneAuthForm.resetFields();
    if (this.countDownFun_){
      clearInterval(this.countDownFun_);
    }
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
    const sendTime = localStorage.getItem(regPhone);
    if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME_ * 1000 ) {
      alert(`${AUTH_CODE_TIME_}秒内仅能获取一次验证码，请稍后重试`);
      return;
    }
    try{
      const response = await getOldPhoneCode(data);
      this.setState({loading:false});
      if(response.code ===0){
        
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
      message.error('服务器繁忙，请稍后重试');
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
        this.initFetchSafeData();
        this.setState({changePhoneAuth:false});
        form.resetFields();
        this.handleCancel_();
      } else {
        message.error(response.msg);
      }
    });
  };

  //获取新手机号验证码
  async getNewCode_() {
    const {getCodeMobile} = this.state;
    if(getCodeMobile.trim().length ===0){
      message.error('手机号不能为空')
      return;
    }
    if (!VER_PHONE.test(getCodeMobile)) {
      this.setState({regPhoneErr:'请输入正确的手机号'});
      return;
    }
    this.setState({loading:true});
    const res = await phoneExist(getCodeMobile);
    if (res.code !== 0) {
      this.setState({loading:false});
      if (res.msg === '该手机号已注册，请直接登录！') {
        message.error('手机号已注册');
        return;
      } 
      message.error(res.msg);
      return;
    }
    try{
      const response = await getNewCode(getCodeMobile);
      this.setState({loading:false});
      if(response.code ===0) {
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

//授权
  async getDistribution(type) {
    this.setState({loading:true});
    const response = await distribution(type,'',encodeURIComponent(window.location.href));
    this.setState({loading:false});
    if(response.code === 0){
      this.setState({
        distribution:response.data.param,
        url:response.data,
      },()=>{
        this.formId.submit();
        Modal.info({
          title: '提示',
          content: '请在新页面完成操作,可刷新页面查看结果',
          okText: '确定',
          onOk: ()=> {
            this.getAuthorizationState();
          },
        });
      });
    }else {
      response.msg && message.error(response.msg);
    }
  }


  //查询授权状态  1:自动投标，2：自动还款，3：二次分配自动通过
  async getAuthorizationState(){
    this.setState({loading:true});
    const response = await authorizationState('');
    console.log('1234', response);
    this.setState({loading:true});
    if(response.code === 0){
      this.setState({
        status:response.data?response.data: '',
      })
    } else if (response.code === -3) {
      this.setState({
        showAuth: true
      })
    } else {
      response.msg && message.error(response.msg);
    }

  }

  //关闭授权
  async CloseAuthorization(type){
    const response = await closeAuthorization(type,'', encodeURIComponent(window.location.href));
    console.log(response);
    if(response.code === 0){
      this.setState({
        distribution:response.data.param,
        url:response.data,
      },()=>{
        this.formId.submit();
        Modal.info({
          title: '提示',
          content: '请在新页面完成操作,可刷新页面查看结果',
          okText: '确定',
          onOk: ()=> {
            this.getAuthorizationState();
          },
        });
      });
    } else {
      response.msg && message.error(response.msg);
    }

  }

  render() {
    const {distribution,url,status} = this.state;
    console.log(status);
    const { safeData} = this.props;
    return (
      <div>
        {/* <form ref={ref => this.formId = ref} action={url.submitUrl} method="post" target="_blank" style={{display:'none'}}>
          <input id="MoneymoremoreId" name="MoneymoremoreId" value={distribution.moneymoremoreId?distribution.moneymoremoreId:''}/>
          <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={distribution.platformMoneymoremore?distribution.platformMoneymoremore:''}/>
          <input id="AuthorizeTypeOpen" name="AuthorizeTypeOpen" value={distribution.authorizeTypeOpen?distribution.authorizeTypeOpen:''}/>
          <input id="AuthorizeTypeClose" name="AuthorizeTypeClose" value={distribution.authorizeTypeClose?distribution.authorizeTypeClose:''}/>
          <input id="RandomTimeStamp" name="RandomTimeStamp" value={distribution.randomTimeStamp?distribution.randomTimeStamp:''}/>
          <input id="Remark1" name="Remark1" value={distribution.remark1?distribution.remark1:''}/>
          <input id="Remark2" name="Remark2" value={distribution.remark2?distribution.remark2:''}/>
          <input id="Remark3" name="Remark3" value={distribution.remark3?distribution.remark3:''}/>
          <input id="ReturnURL" name="ReturnURL" value={distribution.returnURL?distribution.returnURL:''} />
          <input id="NotifyURL" name="NotifyURL" value={distribution.notifyURL?distribution.notifyURL:''}/>
          <input id="SignInfo" name="SignInfo" value={distribution.signInfo?distribution.signInfo:''}/>
        </form> */}

        <div className="fr uc-rbody">
          <div className="real_title">
             <span className="safeCenter_">安全中心</span>
             <span className="registrationTime">注册时间：2018/05/18 19:25</span>
          </div>
          <Steps progressDot current={0} direction="vertical">
            <Step title="第一步" 
            description={
            <div style={{marginBottom:50}}>
              <div className="first">
                <span style={{color:'#ff9900',fontSize:'28px',lineHeight:'28px',position:'absolute',left:'30px',top:'45px'}}>*</span> <span className="left">身份认证</span> 
                <span className="middle">用于提升账户安全性，认证后不能修改</span>
                <a className="right" onClick={() => this.props.history.push(AUTHENTICATION)}>立即认证</a>
              </div>
              <div className="personal">
                <span className="name">赵妮莎 |</span>
                <span className="id">610425198803202829</span>
                <span className="result" >认证通过</span>
              </div>
            </div>
            
            
        } />
            <Step title="第二步" description="This is a description." />
            <Step title="第三步" description="This is a description." />
          </Steps>
        </div>
      </div> 

    );
  }
}

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
              <Col span={6}>
                  {
                    props.showAuthCode ? <Button onClick={()=> props.getOldCode()}>获取验证码</Button> :
                      <Button loading={props.loading}>
                        {props.countDown}s获取验证码
                    </Button>
                  }
              </Col>
              <Col span={5} push={2}>
                {
                  props.showAuthCode ? null :
                    <span style={{lineHeight: '30px'}}>已发送</span>
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
              <Col span={6}>
                {
                  props.showAuthCode_ ? <Button onClick={()=> props.getNewCode(props.getCodeMobile)}>获取验证码</Button> :
                    <Button loading={props.loading}>
                      {props.countDown_}s获取验证码
                    </Button>
                }
              </Col>
              <Col span={6} push={2}>
                {
                  props.showAuthCode_ ? null :
                    <span style={{lineHeight: '30px'}}>已发送</span>
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
