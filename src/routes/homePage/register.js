import React from 'react';
import '../../assets/login/index.scss';
import {VER_PHONE, AUTH_CODE_TIME, AUTH_CODE_TIME_} from '../../common/systemParam';
import {connect} from 'dva';
import {Spin, message, Button, Icon, Steps, Modal, Form, Row, Col, Input} from 'antd';
import {phoneExist, getAuthCode, regUser, changePW, checkCode, changePassword, relieveAccountAjax} from '../../services/api';
import { setTimeout } from 'timers';


const Step = Steps.Step;

@connect((state) => ({
  login: state.login,
  submitting: state.login.submitting
}))
@Form.create()
export default class Register extends React.Component {
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
      loginError: true

    };
    this.getAuthCode = this.getAuthCode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitReg = this.submitReg.bind(this);
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
      console.log('注册手机号',response)
      if (response.code !== 0) {
        if (response.msg === '该手机号已注册，请直接登录！') {
          this.setState({
            registerShow: false,
            loginError: false
          });
          return;
        }
        this.setState({
          regNameErr: response.msg,
          registerShow: true,
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
    let that = this.props;
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
      authcode: regAuthCode.trim(),
      type: 0, //投资用户
    };
    // 调用注册接口
    try {
      this.setState({regLoading: true});
      const response = await regUser(reg);
      console.log('注册数据',response)
      this.setState({regLoading: false});
      if (response.code === 0) {
        this.setState({showReg: false});
        this.setState({
          regPhone: '',
          regPwd: '',
          regAuthCode: '',
          showAuthCode: true,
        });
        message.info('注册成功,即将跳转到登陆界面')
        setTimeout(function(){
          that.history.push('./login')
        },3000)
        
      } else {
        message.warning(response.msg);
      }
    } catch (e) {
      console.log(e);
      this.setState({regLoading: false});
      message.error('服务器繁忙，请稍后重试');
    }
  }

  // 判断  手机号是否已被注册过
  async checkPhone() {
    const {loginPhone} = this.state;
    if (loginPhone.length === 0) {
      return;
    }
    if (!VER_PHONE.test(loginPhone)) {
      return;
    }
    if (this.state.checkPhoneLoading) {
      return;
    }
    this.setState({checkPhoneLoading: true});
    const response = await phoneExist(loginPhone);
    console.log(response);
    this.setState({checkPhoneLoading: false});
    if (response.code === 0) {
      this.setState({
        loginError: true,
        registerShow: true
      });
    } else {
      this.setState({
        loginError: false,
        registerShow: false,
      });
    }
  }

  render() {
    const {showReg, showAuthCode, authCode, countDown, countDown_, regPhone, regPwd, regAuthCode, loginPwd, readStatus, flag, loginName, codeNameErr, newPass, newPass_, show, code, flagShow} = this.state;
    const { getFieldDecorator } = this.props.form;
    return (
       
      <div className="logindiv1 shadow" style={{height: 495}}>
        <div className="back">
                <div className="form logf" onChange={this.onChange} style={{paddingTop:80}}>
                  {/* <div className="hd center">
                    <a className="hover" onClick={() => this.setState({showReg: false})}>注册</a>
                  </div> */}
                  <Spin tip="注册中..." spinning={this.props.submitting} >
                    <div className="row">
                      <input className="put user"  value={regPhone} maxLength={20}
                            onChange={(e) => {this.setState({regPhone: e.target.value})}} name="regPhone" type="tel"
                            placeholder="手机号|用户名"/>
                      <p className="prompts">{this.state.regNameErr}</p>
                      <p className="registration-prompts">该手机号已注册，<a onClick={() => this.props.history.push('./login')}>立即登录</a></p>
                    </div>
                    <div className="row relative" style={{marginTop:-10,marginBottom:30}}>
                      <input className="put vcode" value={regAuthCode} maxLength={6} name="regAuthCode" type="tel"
                            placeholder="输入验证码" onChange={(e) => this.setState({regAuthCode: e.target.value})}/>
                      <p className="prompts">{this.state.regAuthErr}</p>
                      {// 根据倒计时时间显示是否可以点击获取验证码按钮
                        this.state.registerShow ?
                          ((showAuthCode) ?
                          <a className="getvc center" onClick={()=>this.checkPhoneNumber(false)}>点击获取验证码</a> :
                          <span className="getvc center" style={{backgroundColor: '#D1D1D1'}}>{countDown}s后重新获取</span>) :
                          <span className="getvc center" style={{backgroundColor: '#D1D1D1'}}>点击获取验证码</span>
                      }
                    </div>
                    <div className="row" style={{marginBottom:70}}>
                      <input className="put pwd"  value={regPwd} maxLength={16}
                            name="regPwd" type="password" onChange={(e) => this.setState({regPwd: e.target.value})}
                            placeholder="登录密码"/>
                      <p className="prompts">{this.state.regPwdErr}</p>
                      <p className="registration-prompts">密码不可纯数字，区分大小写，8-15位字符</p>
                    </div>
                   
                      <p  style={{position:'relative'}}>
                        <input
                          className="fl"
                          id="chk1"
                          checked={readStatus}
                          type="checkbox"
                          onChange={() => this.setState({readStatus: !readStatus})}
                          style={{position:'absolute',top:3}}
                        />
                        <label className="fl"  style={{ marginLeft:17,color:'#949494'}}>
                          <i>已阅读并接受</i>
                          <a className="blue">注册协议</a>
                      
                        </label>
                      </p>
              
                    <div style={{marginTop:95}}>
                      <a className="btn" onClick={this.submitReg}>注册</a>
                    </div>
                    <p className="safe-info">
                      <img src={require('../../assets/img/login/u30.png')} />
                      您的信息已使用SSL加密技术，数据传输安全
                    </p>
                  </Spin>
                </div> 
        </div>
        <div className="back_">
      
          <img  src={require('../../assets/img/注册_03.png')}  />
        </div>
      </div>
      
    );
  }
}


