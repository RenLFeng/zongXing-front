import React from 'react';
import '../../assets/login/index.scss';
import { VER_PHONE, AUTH_CODE_TIME, AUTH_CODE_TIME_ } from '../../common/systemParam';
import { connect } from 'dva';
import {Spin, message, Button} from 'antd';
import { phoneExist, getAuthCode, regUser, changePW } from '../../services/api';

@connect((state) => ({
  login: state.login,
  submitting: state.login.submitting
}))
export default class  Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReg: false, //是否显示注册表单
      countDown: AUTH_CODE_TIME,  //获取验证码倒计时
      countDown_: AUTH_CODE_TIME_,
      showAuthCode: true, //显示获取验证码的接口
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

      flag:1,  //显示登陆页面
      loginName:'',  //验证身份时的手机号
      loginNameErr:'',

    };
    this.getAuthCode = this.getAuthCode.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submitReg = this.submitReg.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.checkPhoneNumber = this.checkPhoneNumber.bind(this);
    this.countDownFun = null;
  }

  componentWillUnmount() {
    if (this.countDownFun) {
      clearInterval(this.countDownFun);
    }
  }

  async close(){
    this.setState({
      showReg:false,
    })
    console.log(111)
  }

  async getAuthCode(){
    const { regPhone } = this.state;
    if (regPhone.length === 0) {
      this.setState({regNameErr:'手机号不能为空'});
      return;
    }
    if (!VER_PHONE.test(regPhone)) {
      this.setState({regNameErr:'请输入正确的手机号'});
      return;
    }
    this.setState({regNameErr: ''});
    // 发送验证码的时间存在本地
    const sendTime = localStorage.getItem(regPhone);
    if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME * 1000 ) {
      alert(`${AUTH_CODE_TIME}秒内仅能获取一次验证码，请稍后重试`);
      return;
    }
    //调用获取验证码接口
    this.setState({authLoading: true});
    try {
      const response = await getAuthCode(regPhone);
      this.setState({authLoading: false});
      if (response.code === 0) {
        message.info('发送成功');
      } else {
        message.error(response.msg);
        return;
      }
    } catch(e) {
      this.setState({authLoading: false});
      message.error('请求失败');
      return;
    }
    localStorage.setItem(regPhone, new Date().getTime());
    //发送请求 按钮变不可点状态
    this.setState({ showAuthCode: false });
    //成功之后倒计时开始启动
    this.countDownFun = setInterval(() => {
      if (this.state.countDown === 0) {
        clearInterval(this.countDownFun);
        this.setState({ countDown: AUTH_CODE_TIME, showAuthCode: true });
      } else {
        this.setState({ countDown: this.state.countDown - 1 });
      }
    }, 1000);
  }


  getAuthCode_ = async() => {
    const {loginName} = this.state;
     if (loginName.length === 0) {
       this.setState({loginNameErr:'手机号不能为空'});
       return;
     }
     if (!VER_PHONE.test(loginName)) {
       this.setState({loginNameErr:'请输入正确的手机号'});
       return;
     }
     this.setState({loginNameErr: ''});
     // 发送验证码的时间存在本地
     const sendTime = localStorage.getItem(loginName);
     if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME_ * 1000 ) {
       alert(`${AUTH_CODE_TIME_}秒内仅能获取一次验证码，请稍后重试`);
       return;
     }

    this.setState({authLoading: true});
    try{
      const response  = await changePW(loginName);
      this.setState({authLoading: true});
      console.log(response);
    }catch(e) {
      this.setState({authLoading: false});
      message.error('请求失败');
      return;
    }
  };

  //修改所有input的state统一方法
  onChange(e) {
    const a = e.target.name;
    this.setState({
      [a]: e.target.value
    });
  }

  //注册提交方法
  async submitReg() {
    const { regPhone, regPwd, regAuthCode, readStatus } = this.state;
    let flag = true;
    if (regPhone.length === 0) {
      this.setState({regNameErr: '手机号码不能为空'});
      flag = false;
    }
    if (regAuthCode.length === 0) {
      this.setState({regAuthErr: '验证码不能为空'});
      flag = false;
    }
    if (regPwd.length === 0) {
      this.setState({regPwdErr: '密码不能为空'});
      flag = false;
    }
    if (!readStatus) {
      this.setState({textErr: '请先阅读注册协议'});
      flag = false;
    }
    if (!flag) {
      return;
    }
    this.setState({
      regNameErr: '',
      regAuthErr: '',
      regPwdErr: ''
    });
    let formatFlag = true;
    if (!VER_PHONE.test(regPhone)) {
      this.setState({regNameErr: '请输入正确的手机号'});
      formatFlag = false;
    }
    if (regAuthCode.length !== 6) {
      this.setState({regAuthErr: '验证码应为6位数'});
      formatFlag = false;
    }
    if (regPwd.length < 6) {
      this.setState({regPwdErr: '密码不小于6位'});
      formatFlag = false;
    }
    if (!formatFlag) {
      return;
    }
    this.setState({
      regPwdErr: '',
      regAuthErr: '',
      regNameErr: ''
    });
    const reg = {
      fmobile: regPhone,
      fpwd: regPwd,
      authcode: regAuthCode
    };
    // 调用注册接口
    try {
      this.setState({regLoading: true});
      const response = await regUser(reg);
      this.setState({regLoading: false});
      if (response.code === 0) {
        this.setState({showReg: false});
      } else {
        message.warning(response.msg);
      }
    } catch(e) {
      console.log(e);
      this.setState({regLoading: false});
      message.error('网络异常，请重试');
    }
  }

  //登录提交方法
  submitLogin() {
    const { loginPhone, loginPwd } = this.state;
    if (loginPhone.length === 0 && loginPwd.length === 0) {
      this.setState({
        loginNameErr: '登录用户名不能为空',
        loginPwdErr: '登录密码不能为空'
      });
      return;
    }
    if (loginPhone.length === 0) {
      this.setState({loginNameErr: '登录用户名不能为空'});
      return;
    }
    if (loginPwd.length === 0) {
      this.setState({loginPwdErr: '登录密码不能为空'});
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
      payload: login
    });
  }

  async checkPhoneNumber() {
    const phoneNum = this.state.regPhone;
    if (phoneNum && phoneNum.length > 0 && VER_PHONE.test(phoneNum)) {
      const response = await phoneExist(phoneNum);
      console.log(response);
      if (response.code !== 0) {
        this.setState({regNameErr: response.msg});
      } else {
        this.setState({regNameErr: ''});
      }
    }
  }

  pressKey(e) {
    if (e.keyCode === 13) {
      this.submitLogin();
    }
  }

  submitPwd() {
    this.setState({
      flag:1
    })

  }

  render() {
    const { showReg, showAuthCode, countDown, countDown_, regPhone, regPwd, regAuthCode, loginPhone, loginPwd, readStatus , flag,loginName} = this.state;
    console.log(loginName);
    return (
        <div className="logindiv1 shadow">
          { showReg ?
            <div className="form regf" onChange={this.onChange}>
              <div className="hd center">
                <a className="hover" onClick={()=>this.setState({ showReg: true})}>注册</a>
                <a onClick={()=>this.setState({ showReg: false})}>登录</a>
              </div>
              <Spin tip="请求中..." spinning={this.state.regLoading ||this.state.authLoading}>
                <div className="row">
                  <input className="put mobile" value={regPhone} maxLength={11} name="regPhone" type="tel" placeholder="请输入手机号码" onBlur={this.checkPhoneNumber}/>
                  <p>{this.state.regNameErr}</p>
                </div>
                <div className="row relative" style={{marginBottom: 0}}>
                  <input className="put vcode" value={regAuthCode} maxLength={6} name="regAuthCode" type="tel" placeholder="输入验证码"/>
                  { // 根据倒计时时间显示是否可以点击获取验证码按钮
                    showAuthCode ?
                      <a className="getvc center" onClick={this.getAuthCode}>获取验证码</a> :
                      <span className="getvc center" style={{ backgroundColor: '#D1D1D1' }}>{countDown}s后重新获取</span> }
                </div>
                <p style={{color: 'red', marginBottom: 20,marginTop: 5}}>{this.state.authErr}</p>
                <div className="row">
                  <input className="put pwd" value={regPwd} maxLength={16} name="regPwd" type="password" placeholder="设置登录密码"/>
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
            ((flag === 1)?
              <div className="form logf" onChange={this.onChange}>
              <div className="hd center">
                <a onClick={()=>this.setState({ showReg: true})}>注册</a>
                <a className="hover" onClick={()=>this.setState({ showReg: false})}>登录</a>
              </div>
              <Spin tip="登录中..." spinning={this.props.submitting}>
                <div className="row">
                  <input className="put user" onKeyUp={(e)=>this.pressKey(e)} value={loginPhone} maxLength={20} name="loginPhone" type="tel" placeholder="请输入手机号码/用户名"/>
                  <p>{this.state.loginNameErr}</p>
                </div>

                <div className="row">
                  <input className="put pwd" onKeyUp={(e)=>this.pressKey(e)} value={loginPwd} maxLength={16} name="loginPwd" type="password" placeholder="请输入登录密码"/>
                  <p>{this.state.loginPwdErr}</p>
                </div>
                <div>
                  <a className="btn" onClick={this.submitLogin}>登录</a>
                </div>
                <div>
                  <p className="tright"><a className="gray f14" onClick={()=> this.setState({flag:this.state.flag +1})}>忘记密码?</a></p>
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
              ((flag === 2)?
                <div className="form logf" onChange={this.onChange}>
                  <div className="hd center">
                    <a className="title">身份验证</a>
                  </div>
                  <div className="row">
                    <input className="put mobile"  type="tel"  value={loginName} name="loginName" placeholder="请输入手机号码" />
                    <p>{this.state.loginNameErr}</p>
                  </div>
                  <div className="row relative" >
                    <input className="put vcode" placeholder="输入验证码"/>
                    { // 根据倒计时时间显示是否可以点击获取验证码按钮
                      showAuthCode ?
                        <a className="getvc center" onClick={this.getAuthCode_}>获取验证码</a> :
                        <span className="getvc center" style={{ backgroundColor: '#D1D1D1' }}>{countDown_}s后重新获取</span> }
                  </div>

                <div>
                  <Button className="btns" type="primary" onClick={()=> this.setState({flag:this.state.flag +1})}>提交</Button>
                  <Button className="btns" type="primary" onClick={()=> this.setState({flag:this.state.flag -1})}>返回</Button>
                </div>
            </div> :
              <div className="form logf" >
              <div className="hd center">
                <a className="title">重置密码</a>
              </div>
                <div className="row">
                  <input className="put pwd"  value={loginName} name="loginName"  placeholder="请输入新密码"/>
                </div>

                <div className="row">
                  <input className="put pwd"  placeholder="请再次确认新密码" />
                </div>

                <div>
                  <Button className="btns" type="primary" onClick={()=> this.submitPwd()}>完成</Button>
                  <Button className="btns" type="primary" onClick={()=> this.setState({flag:this.state.flag -1})}>返回</Button>
                </div>
            </div> ) )
             }
        </div>


    );
  }
}
