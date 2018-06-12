import React from 'react';
import '../../assets/login/index.scss';
import {VER_PHONE, AUTH_CODE_TIME, AUTH_CODE_TIME_} from '../../common/systemParam';
import {connect} from 'dva';
import {Spin, message, Button, Icon, Steps, Modal, Form, Row, Col, Input, Slider} from 'antd';
import {phoneExist, getAuthCode, regUser, changePW, checkCode, changePassword, relieveAccountAjax} from '../../services/api';


const Step = Steps.Step;

@connect((state) => ({
  login: state.login,
  submitting: state.login.submitting
}))
@Form.create()
export default class ForgetPassWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReg: false, //是否显示注册表单
      countDown: AUTH_CODE_TIME,  //获取验证码倒计时
      countDown_: AUTH_CODE_TIME_,
      showAuthCode: true, //显示获取验证码的接口
      showAuthCodeFor: true, // 显示忘记密码获取验证码的状态
      regPhone: '', //注册手机号
      regPwd: '', //注册密码
      regAuthCode: '', //注册验证码
      loginPhone: '', //登录手机号
      loginPwd: '', //登录密码
      readStatus: true, //阅读注册协议状态
      regLoading: false,
      loginNameErr: '', //登录用户名提示
      loginPwdErr: '', //登录密码提示
      regNameErr: '',  //注册手机号提示
      regAuthErr: '', //验证码提示
      regPwdErr: '', //注册密码提示
      textErr: '',  //阅读注册协议提示
      authLoading: false, //验证码接口发送状态
      errorTime: 60,
      flag: 1,  //显示登陆页面
      loginName: '',  //验证身份时的手机号或用户名
      mobile: '',
      authCode: '',
      codeNameErr1: '',   //验证手机号码提示
      codeNameErr2: '',   //验证验证码提示语
      newPass: '',  //
      newPass_: '',
      message1: '', //第一次输入密码时提示
      message2: '',  //第二次输入密码时提示
      password: '',
      code: '', //忘记密码时验证码

      flagShow: false, //验证码发送之后提示语

      registerShow:true,  //校验手机号是否存在时，发送验证码按钮的状态

      flagPage:'first'  //第一步


    };
    this.getAuthCode = this.getAuthCode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitReg = this.submitReg.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.checkPhoneNumber = this.checkPhoneNumber.bind(this);
    this.countDownFun = null;
    this.countDownFun_ = null;
    this.countDownErrorCode = null;
  }

  componentWillUnmount() {
    if (this.countDownFun) {
      clearInterval(this.countDownFun);
    }

    if (this.countDownFun_) {
      clearInterval(this.countDownFun_);
    }

    if (this.countDownErrorCode) {
      clearInterval(this.countDownErrorCode);
    }
  }

  async close() {
    this.setState({
      showReg: false,
    })
    console.log(111)
  }

  check() {
    const {regPhone} = this.state;
  }

  //检验手机号是否存在
  async checkPhoneNumber(type) {
    const phoneNum = this.state.regPhone;
    if (phoneNum.length === 0) {
      this.setState({regNameErr: '请输入手机号'});
      return;
    }
    if (!VER_PHONE.test(phoneNum)) {
      this.setState({regNameErr: '请输入正确的手机号'});
      return;
    }
    if (phoneNum && phoneNum.length > 0 && VER_PHONE.test(phoneNum)) {
      const response = await phoneExist(phoneNum);
      if (response.code !== 0) {
        this.setState({
          regNameErr: response.msg,
          registerShow: false,
        });
      } else {
        this.setState({
          registerShow: true,
        },()=>{
        if(type === false){
          this.getAuthCode();
        }
          this.setState({regNameErr: ''});
        })  
      }
    }
  }

  //获取验证码
  async getAuthCode() {
    const {regPhone} = this.state;
    if (regPhone.length === 0) {
      this.setState({regNameErr: '手机号不能为空'});
      return;
    }
    if (!VER_PHONE.test(regPhone)) {
      this.setState({regNameErr: '请输入正确的手机号'});
      return;
    }
    this.setState({regNameErr: ''});
    // 发送验证码的时间存在本地
    const sendTime = localStorage.getItem(regPhone);
    if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME * 1000) {
      alert(`${AUTH_CODE_TIME}秒内仅能获取一次验证码，请稍后重试`);
      return;
    }
    //调用获取验证码接口
    this.setState({authLoading: true});
    try {
      const response = await getAuthCode(regPhone);
      if (response.code === 0) {
        this.setState({authLoading: false});
        message.info('发送成功');
      } else {
        message.error(response.msg);
        return;
      }
    } catch (e) {
      this.setState({authLoading: false});
      message.error('请求失败');
      return;
    }
    localStorage.setItem(regPhone, new Date().getTime());
    //发送请求 按钮变不可点状态
    this.setState({showAuthCode: false});
    //成功之后倒计时开始启动
    this.countDownFun = setInterval(() => {
      if (this.state.countDown === 0) {
        clearInterval(this.countDownFun);
        this.setState({countDown: AUTH_CODE_TIME, showAuthCode: true});
      } else {
        this.setState({countDown: this.state.countDown - 1});
      }
    }, 1000);
  }

  // 身份验证——手机号
  getAuthCode_ = async () => {
    const {loginName, mobile, authCode} = this.state;
    if (loginName.length === 0) {
      this.setState({codeNameErr1: '手机号/用户名不能为空'});
      return;
    }

    this.setState({codeNameErr1: ''});
    // 发送验证码的时间存在本地
    const sendTime = localStorage.getItem(loginName);
    if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME_ * 1000) {
      alert(`${AUTH_CODE_TIME_}秒内仅能获取一次验证码，请稍后重试`);
      return;
    }
    this.setState({authLoading: true});
    try {
      const response = await changePW(loginName);
      if (response.code === 0) {
        this.setState({
          authLoading: false,
          mobile: response.data,
          flagShow: true,
        });
      } else {
        message.error(response.msg);
        return;
      }
    } catch (e) {
      this.setState({authLoading: false});
      message.error('请求失败');
      return;
    }
    localStorage.setItem(loginName, new Date().getTime());
    //发送请求 按钮变不可点状态
    this.setState({showAuthCodeFor: false});
    //成功之后倒计时开始启动
    this.countDownFun_ = setInterval(() => {
      if (this.state.countDown_ === 0) {
        clearInterval(this.countDownFun_);
        this.setState({countDown_: AUTH_CODE_TIME_, showAuthCodeFor: true, flagShow: false,});
      } else {
        this.setState({countDown_: this.state.countDown_ - 1});
      }
    }, 1000);
  };

  //提交验证手机号码
  async submitInformation() {
    const {mobile, authCode, codeNameErr1, codeNameErr2} = this.state;
    if (mobile.trim().length === 0) {
      this.setState({codeNameErr1: '请获取验证码'});
      return
    }
    // if (!VER_PHONE.test(mobile.trim())) {
    //   this.setState({codeNameErr1: '请输入正确的手机号'});
    //   return;
    // }
    if (authCode.trim().length === 0) {
      this.setState({codeNameErr2: '验证码不能为空'});
      return
    }
    this.setState({authLoading: true});
    try {
      const response = await checkCode(mobile, authCode);
      if (response.code === 0) {
        this.setState({authLoading: false});
        if (this.countDownFun_) {
          clearInterval(this.countDownFun_);
        }
        this.setState({
          flag: this.state.flag + 1,
          countDown_: AUTH_CODE_TIME_,
          showAuthCodeFor: true,
          flagShow: false,
          authCode: '',
          codeNameErr1: '',
          codeNameErr2: '',
        });
        console.log(this.state.mobile);
      } else {
        message.error(response.msg);
      }
    } catch (e) {
      console.log(e);
      message.error('服务器繁忙，请稍后重试');
      this.setState({authLoading: false});
    }
  }


  //修改密码
  async changePassword() {
    const {newPass, newPass_} = this.state;
    if (newPass.trim().length === 0) {
      this.setState({
        message1: '该内容不能为空'
      });
      return;
    }
    if (newPass.trim().length < 6) {
      this.setState({
        message1: '密码长度不能小于6位'
      });
      return;
    }
    if (newPass_.trim().length === 0) {
      this.setState({
        message2: '该内容不能为空'
      });
      return;
    }
    if (newPass.trim() !== newPass_.trim()) {
      this.setState({
        message2: '两次输入的密码不一致'
      })
      return;
    }
    this.setState({authLoading: true});
    const {loginName, password} = this.state;
    const respondse = await changePassword({
      loginName: this.state.loginName,
      password: this.state.newPass
    });
    if (respondse.code === 0) {
      this.setState({
        flag: 1,
        authLoading: false,
        newPass: '',
        newPass_: '',
        message1: '',
        message2: '',
        loginName: '',
      });
      message.info("密码修改成功！");
    } else {
      message.error(response.msg);
    }
  }

  //修改所有input的state统一方法
  onChange(e) {
    const a = e.target.name;
    this.setState({
      [a]: e.target.value
    });
  }

  //注册提交方法
  async submitReg() {
    const {regPhone, regPwd, regAuthCode, readStatus} = this.state;
    let flag = true;
    if (regPhone.trim().length === 0) {
      this.setState({regNameErr: '请输入手机号'});
      flag = false;
    } else if (!VER_PHONE.test(regPhone.trim())) {
      this.setState({regNameErr: '手机号格式不正确'});
      flag = false
    } else {
      this.setState({regNameErr: ''});
    }
    if (regAuthCode.trim().length === 0) {
      this.setState({regAuthErr: '请输入验证码'});
      flag = false;
    } else if (regAuthCode.trim().length !== 6) {
      this.setState({regAuthErr: '验证码应为6位数'});
      flag = false;
    } else {
      this.setState({regAuthErr: ''});
    }
    if (regPwd.trim().length === 0) {
      this.setState({regPwdErr: '请输入密码'});
      flag = false;
    } else if (regPwd.trim().length < 6) {
      this.setState({regPwdErr: '密码不小于6位'});
      flag = false;
    } else {
      this.setState({regPwdErr: ''});
    }
    if (!readStatus) {
      this.setState({textErr: '请先阅读注册协议'});
      flag = false;
    } else {
      this.setState({textErr: ''});
    }
    if (!flag) {
      return;
    }
    this.setState({
      regNameErr: '',
      regAuthErr: '',
      regPwdErr: ''
    });
    const reg = {
      fmobile: regPhone.trim(),
      fpwd: regPwd.trim(),
      authcode: regAuthCode.trim()
    };
    // 调用注册接口
    try {
      this.setState({regLoading: true});
      const response = await regUser(reg);
      this.setState({regLoading: false});
      if (response.code === 0) {
        this.setState({showReg: false});
        this.setState({
          regPhone: '',
          regPwd: '',
          regAuthCode: '',
          showAuthCode: true,
        });
      } else {
        message.warning(response.msg);
      }
    } catch (e) {
      console.log(e);
      this.setState({regLoading: false});
      message.error('服务器繁忙，请稍后重试');
    }
  }

  //登录提交方法
  submitLogin() {
    const {loginPhone, loginPwd} = this.state;
    if (loginPhone.trim().length === 0 && loginPwd.trim().length === 0) {
      this.setState({
        loginNameErr: '请输入登录名',
        loginPwdErr: '请输入密码'
      });
      return;
    }
    if (loginPhone.trim().length === 0) {
      this.setState({loginNameErr: '请输入登录名'});
      return;
    }
    if (loginPwd.trim().length === 0) {
      this.setState({loginPwdErr: '请输入密码'});
      return;
    }
    const login = {
      loginName: loginPhone,
      password: loginPwd
    };
    this.setState({
      loginNameErr: '',
      loginPwdErr: ''
    });
    this.props.dispatch({
      type: 'login/login',
      payload: login,
      passwordError: (phoneNumber) => this.passwordError(phoneNumber)
    });
  }

  passwordError(phoneNumber) {
    console.log(phoneNumber);
    this.setState({
      phoneNumber,
      authPhone: true,
      errorAuthCode: ''
    });
  }

  pressKey(e) {
    if (e.keyCode === 13) {
      this.submitLogin();
    }
  }
  returnLogin() {
    this.setState({
      flag: 1,
      codeNameErr2: '',
      codeNameErr1: '',
      flagShow: false,
      authCode: '',
      loginName: '',
      newPass: '',
      newPass_: '',
      message1: '',
      message2:''
    })
  }

  // 用户5次错误之后 发送验证码的接口
  async sendErrorCodeAuth() {
    if (this.state.sendErrorCodeLoading) {
      return;
    }
    const sendTime = localStorage.getItem(`${this.state.phoneNumber}errorCode`);
    if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME_ * 1000) {
      alert(`${AUTH_CODE_TIME_}秒内仅能获取一次验证码，请稍后重试`);
      return;
    }
    this.setState({sendErrorCodeLoading: true});
    const response = await getAuthCode(this.state.phoneNumber);
    this.setState({sendErrorCodeLoading: false});
    if (response.code === 0) {
      localStorage.setItem(`${this.state.phoneNumber}errorCode`, new Date().getTime());
      this.setState({
        errorTime: 59
      }, ()=> {
        this.countDownErrorCode = setInterval(()=>{
          if (this.state.errorTime !== 0) {
            this.setState({ errorTime: this.state.errorTime - 1});
          } else {
            this.setState({ errorTime: 60 });
            clearInterval(this.countDownErrorCode);
          }
        }, 1000);
      })
    } else {
      response.msg && message.error(response.msg);
    }
  }

  // 解锁用户
  async relieveAccountLock() {
    if (this.state.relieveLoading) {
      return;
    }
    if (!this.state.errorAuthCode || (this.state.errorAuthCode && this.state.errorAuthCode.trim().length === 0)) {
      message.error('请输入验证码')
      return;
    }
    this.setState({relieveLoading: true});
    const response = await relieveAccountAjax(this.state.phoneNumber, this.state.errorAuthCode.trim());
    this.setState({relieveLoading: false});
    if (response.code === 0) {
      message.info('用户已解锁，请重新登录');
      this.setState({authPhone: false});
    } else {
      response.msg && message.error(response.msg);
    }
  }

  render() {
    const {showReg, showAuthCode, authCode, countDown, countDown_, regPhone, regPwd, regAuthCode, loginPhone, loginPwd, readStatus, flag, loginName, codeNameErr, newPass, newPass_, show, code, flagShow} = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="logindiv1 ">
        <div className="forget_page">
          <p className="forget_title">找回登录密码</p>
          <div className="forget_btnGroup">
            <Button type="primary" onClick={()=>this.setState({flagPage:'first'})}>1.验证手机</Button>
            <span className="line">-----------</span>
            <Button className="btn2" type="primary" onClick={()=>this.setState({flagPage:'second'})}>2.验证身份</Button>
            <span className="line" >-----------</span>
            <Button className="btn2" type="primary" onClick={()=>this.setState({flagPage:'third'})}>3.重设密码</Button>
            <span className="line">-----------</span>
            <Button className="btn2" type="primary" onClick={()=>this.setState({flagPage:'four'})}>4.找回成功</Button>
          </div>
          {
            this.state.flagPage === 'first' ? 
            <div className="forget_form">
              <div className="forget_inp">
                <Input placeholder="手机号"  />
                <img alt="" src={require('../../assets/img/login/u45.png')} className="forget_phone"/>
              </div>
              <p className="forget-prompts">该手机号还未注册，<a onClick={() => this.props.history.push('./register')}>立即注册</a></p>

              <div className="slider-div">
                <Slider />
              </div>
              <Button style={{width:300,marginTop:20,height:41,fontSize:18}} type="primary" onClick={()=>this.setState({flagPage:'second'})}>下一步</Button>
            </div> : 
             (this.state.flagPage === 'second') ? 
            <div className="forget_form">
              <p className="second_p">手机号      <span>132*****082</span> </p>
              <div className="forget_inp">
                <Input placeholder="输入短信验证码"   className="input1"/>
                <Button className="input2">点击获取验证码</Button>
              </div>
              <div className="forget_inp">
                <Input placeholder="请输入姓名" />
                <img alt="" src={require('../../assets/img/u186.png')} className="forget_phone"/>
              </div>
              <div className="forget_inp">
                <Input placeholder="请输入身份证号"  />
                <img alt="" src={require('../../assets/img/u192.png')} className="forget_phone"/>
              </div>
              <Button style={{width:300,marginTop:20,height:41,fontSize:18}} type="primary" onClick={()=>this.setState({flagPage:'third'})}>下一步</Button>
            </div> : 
            (this.state.flagPage === 'third') ? 
            <div className="forget_form">
              <div className="forget_third">
                <Input placeholder="请输入新登录密码" className="ft_inp"/>
                <img alt="" src={require('../../assets/img/u22.png')} className="img1" />
                <img alt="" src={require('../../assets/img/u81.png')} className="img2" />
              </div>
              <Button style={{width:300,marginTop:30,height:41,fontSize:18}} type="primary" onClick={()=>this.setState({flagPage:'four'})}>确认</Button>
            </div> : 
             (this.state.flagPage === 'four') ? 
            <div className="forget_form4">
              <img src={require('../../assets/img/u179.png')} className="ok_img"/>
              <p style={{fontSize:20,marginTop:20,marginBottom:20,color:'#333333'}}>恭喜您，找回登录密码成功</p>
              <a style={{fontSize:20,color:'#FF9900',textDecorationLine:'underline',fontWeight:'bold'}} onClick={() => this.props.history.push('./login')}>返回登录</a>
            </div>: null
          }
          
        </div>
       </div>
      
    );
  }
}


