import React from 'react';
import '../../assets/login/index.scss';
import {VER_PHONE, AUTH_CODE_TIME, AUTH_CODE_TIME_} from '../../common/systemParam';
import {connect} from 'dva';
import {Spin, message, Button, Icon, Steps, Modal, Form, Row, Col, Input} from 'antd';
import {phoneExist, regUser, changePW, checkCode, relieveAccountAjax} from '../../services/api';


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
  
      loginPhone: '', //登录手机号
      loginPwd: '', //登录密码
      loginNameErr: '', //登录用户名提示
      loginPwdErr: '', //登录密码提示
      loginName: '',  //验证身份时的手机号或用户名
      authCode: '',
      password: '',
      code: '', //忘记密码时验证码
      loginError: true

    };
    this.onChange = this.onChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }


  //修改所有input的state统一方法
  onChange(e) {
    const a = e.target.name;
    this.setState({
      [a]: e.target.value
    });
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
      password: loginPwd,
      type: 0, //投资用户
    };
    this.setState({
      loginNameErr: '',
      loginPwdErr: '',
     
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
    const {  loginPhone, loginPwd} = this.state;
    return (
      <div className="logindiv1 shadow">
        <div className="back">
                <div className="form logf" onChange={this.onChange}>
                  <div className="hd center">
                    <a className="hover">欢迎登录</a>
                  </div>
                  <Spin tip="登录中..." spinning={this.props.submitting}>
                    <div className="row">
                      <input className="put user" onKeyUp={(e) => this.pressKey(e)} value={loginPhone} maxLength={20}
                            onChange={(e) => {this.setState({loginPhone: e.target.value})}} name="loginPhone" type="tel"
                            placeholder="手机号|用户名"/>
                      <p className="prompts">{this.state.loginNameErr}</p>
                     
                      <p className="registration-prompts">
                        该手机号还未注册，<a onClick={() => this.props.history.push('./register')}>立即注册</a>
                      </p> 
                      
                    </div>

                    <div className="row">
                      <input className="put pwd" onKeyUp={(e) => this.pressKey(e)} value={loginPwd} maxLength={16}
                            name="loginPwd" type="password" onChange={(e) => this.setState({loginPwd: e.target.value})}
                            placeholder="登录密码"/>
                      <p className="prompts">{this.state.loginPwdErr}</p>
                      <a className="gray f14"
                          onClick={() => this.props.history.push('./forgetPassWord')}>
                          忘记密码?
                        </a>
                    </div>
                    {/* <p className="tright"> */}
                        
                      {/* </p> */}
                    <div style={{marginTop:89}}>
                      <a className="btn" onClick={this.submitLogin}>登录</a>
                    </div>
                    <p className="safe-info">
                      <img src={require('../../assets/img/login/u30.png')} />
                      您的信息已使用SSL加密技术，数据传输安全
                    </p>
                    {/* <div className="forget"> */}
                      
                    {/* </div> */}
                  </Spin>
                </div> 
        </div>
        <div className="back_">
          {/* <p>直接投资中国小微企业</p>
          <p>真正助力小微企业成长</p> */}
          <img src={require('../../assets/img/登陆_03.png')} />
        </div>
      </div>
      
    );
  }
}


