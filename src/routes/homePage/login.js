import React from 'react';
import '../../assets/login/index.scss';
import {VER_PHONE, AUTH_CODE_TIME, AUTH_CODE_TIME_} from '../../common/systemParam';
import {connect} from 'dva';
import {Spin, message, Button, Icon, Steps, Modal, Form, Row, Col, Input} from 'antd';
import {phoneExist, getAuthCode, regUser, changePW, checkCode, changePassword, relieveAccountAjax} from '../../services/api';


const Step = Steps.Step;

@connect((state) => ({
  login: state.login,
  submitting: state.login.submitting
}))
@Form.create()
export default class Login extends React.Component {
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
      <div className="logindiv1 shadow">
        <Modal
          visible={this.state.authPhone}
          title="解除账号锁定"
          okText="提交"
          cancelText="取消"
          confirmLoading={this.state.relieveLoading}
          onOk={() => this.relieveAccountLock()}
          onCancel={() => {
            if (this.state.relieveLoading) {
              message.warning('请求处理中请稍后');
              return;
            }
            this.setState({authPhone: false});
          }}
        >
          <Row>
            <Col span={3}>手机号</Col>
            <Col span={15}>
              <Input value={this.state.phoneNumber} disabled/>
            </Col>
            <Col span={6} style={{textAlign: 'right'}}>
              <Button type="primary" loading={this.state.sendErrorCodeLoading} onClick={()=>this.sendErrorCodeAuth()} disabled={this.state.errorTime !== 60}>
                {this.state.errorTime === 60 ? '发送验证码' : `${this.state.errorTime}s后重试`}
              </Button>
            </Col>
          </Row>
          <Row style={{marginTop: 20}}>
            <Col span={3}>
              验证码
            </Col>
            <Col span={21}>
              <Input type="password" value={this.state.errorAuthCode} placeholder="请输入" onChange={(e)=>this.setState({errorAuthCode: e.target.value})} maxLength={10}/>
            </Col>
          </Row>
        </Modal>
        {showReg ?
          <div className="form regf" onChange={this.onChange}>
            <div className="hd center">
              <a className="hover" onClick={() => this.setState({showReg: true})}>注册</a>
              <a onClick={() => this.setState({showReg: false})}>登录</a>
            </div>
            <Spin tip="请求中..." spinning={this.state.regLoading || this.state.authLoading}>
              <div className="row">
                <input className="put mobile" value={regPhone} maxLength={11} name="regPhone" type="tel"
                       placeholder="请输入手机号码" onChange={(e) => this.setState({regPhone: e.target.value})}
                       onBlur={()=>this.checkPhoneNumber(true)} />
                <p>{this.state.regNameErr}</p>
              </div>
              <div className="row relative" style={{marginBottom: 0}}>
                <input className="put vcode" value={regAuthCode} maxLength={6} name="regAuthCode" type="tel"
                       placeholder="输入验证码" onChange={(e) => this.setState({regAuthCode: e.target.value})}/>
                <p>{this.state.regAuthErr}</p>
                {// 根据倒计时时间显示是否可以点击获取验证码按钮
                  this.state.registerShow ?
                    ((showAuthCode) ?
                    <a className="getvc center" onClick={()=>this.checkPhoneNumber(false)}>获取验证码</a> :
                    <span className="getvc center" style={{backgroundColor: '#D1D1D1'}}>{countDown}s后重新获取</span>) :
                    <span className="getvc center" style={{backgroundColor: '#D1D1D1'}}>获取验证码</span>
                }
              </div>
              <p style={{color: 'red', marginBottom: 20, marginTop: 5}}>{this.state.authErr}</p>
              <div className="row">
                <input 
                  className="put pwd" value={regPwd} maxLength={16} name="regPwd" type="password"
                  placeholder="设置登录密码" onChange={(e) => this.setState({regPwd: e.target.value})}/>
                <p>{this.state.regPwdErr}</p>
              </div>
              <div>
                <a className="btn" onClick={this.submitReg}>注册</a>
              </div>
              <div className="bot">
                <p>
                  <input
                    className="fl"
                    id="chk1"
                    checked={readStatus}
                    type="checkbox"
                    onChange={() => this.setState({readStatus: !readStatus})}
                  />
                  <label className="fl">
                    <i>已阅读并接受</i>
                    <a className="blue">注册协议</a>
                  </label>
                </p>
              </div>
              <br/><p style={{color: 'red'}}>{this.state.textErr}</p>
            </Spin>
          </div> :
          ((flag === 1) ?
              <div className="form logf" onChange={this.onChange}>
                <div className="hd center">
                  <a onClick={() => this.setState({showReg: true})}>注册</a>
                  <a className="hover" onClick={() => this.setState({showReg: false})}>登录</a>
                </div>
                <Spin tip="登录中..." spinning={this.props.submitting}>
                  <div className="row">
                    <input className="put user" onKeyUp={(e) => this.pressKey(e)} value={loginPhone} maxLength={20}
                           onChange={(e) => {this.setState({loginPhone: e.target.value})}} name="loginPhone" type="tel"
                           placeholder="请输入手机号码/用户名"/>
                    <p>{this.state.loginNameErr}</p>
                  </div>

                  <div className="row">
                    <input className="put pwd" onKeyUp={(e) => this.pressKey(e)} value={loginPwd} maxLength={16}
                           name="loginPwd" type="password" onChange={(e) => this.setState({loginPwd: e.target.value})}
                           placeholder="请输入登录密码"/>
                    <p>{this.state.loginPwdErr}</p>
                  </div>
                  <div>
                    <a className="btn" onClick={this.submitLogin}>登录</a>
                  </div>
                  <div>
                    <p className="tright"><a className="gray f14"
                                             onClick={() => this.setState({flag: this.state.flag + 1})}>忘记密码?</a></p>
                  </div>
                </Spin>
                <div>
                  <p className="other">
                <span>
                <i className="fl c6">其他登录方式</i>
                <a className="qq"/>
                <a className="weixin"/>
                <a className="sina"/>
                </span>
                  </p>
                </div>
              </div> :
              (flag === 2) ?
                <div className="form logf" onChange={this.onChange}>
                  <div className="hd center">
                    <a className="PwdTitle"><Icon type="lock"/>找回密码</a>
                  </div>
                  <div className="box">
                    <div className="row">
                      <input className="put mobile" type="tel" value={loginName} name="loginName"
                             placeholder="请输入手机号码/用户名" onChange={(e) => this.setState({loginName: e.target.value})}/>
                      <p>{this.state.codeNameErr1}</p>
                    </div>

                    <div className="row relative">
                      <input className="put vcode input_" value={authCode} name="code"
                             onChange={(e) => this.setState({authCode: e.target.value})} placeholder="输入6位验证码"/>
                      <p>{this.state.codeNameErr2}</p>
                      {flagShow ? <p
                        className="Prompt">短信已发送至绑定手机号{this.state.mobile.substr(0, 3) + "****" + this.state.mobile.substr(7)}，请注意查收！</p> : null
                      }

                      { // 根据倒计时时间显示是否可以点击获取验证码按钮
                        this.state.showAuthCodeFor ?
                          <a className="getvc center" onClick={this.getAuthCode_}>获取验证码</a> :
                          <span className="getvc center"
                                style={{backgroundColor: '#D1D1D1', border: '#D1D1D1'}}>{countDown_}s后重新获取</span>}
                    </div>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                      <a className="btn" style={{display: 'inline-block',width: '45%'}} onClick={() => this.returnLogin()}>返回登录</a>
                      <a className="btn" style={{display: 'inline-block',width: '45%'}} onClick={() => this.submitInformation()}>下一步</a>
                    </div>
                  </div>
                </div> :
                <div className="form logf" onChange={this.onChange}>
                  <div className="hd center">
                    <a className="PwdTitle"><Icon type="lock"/>重置密码</a>
                  </div>
                  <div className="row">
                    <input className="put pwd" value={newPass} name="newPass" type="password" placeholder="请输入新密码"
                           onChange={(e) => this.setState({newPass: e.target.value})}/>
                    <p>{this.state.message1}</p>
                  </div>

                  <div className="row">
                    <input className="put pwd" value={newPass_} name="newPass_" type="password" placeholder="请再次确认新密码"
                           onChange={(e) => this.setState({newPass_: e.target.value})}/>
                    <p>{this.state.message2}</p>
                  </div>
                  <div style={{display:'flex', justifyContent: 'space-between'}}>
                    <a className="btn" style={{display: 'inline-block',width: '45%'}} onClick={() => this.returnLogin()}>返回登录</a>
                    <a className="btn" style={{display: 'inline-block',width: '45%'}}  type="primary" onClick={() => this.changePassword()}>完成</a>
                  </div>
                </div>
          )
        }
      </div>
    );
  }
}


