import React from 'react';
import '../../assets/login/index.scss';
import { VER_PHONE, AUTH_CODE_TIME } from '../../common/systemParam';
import { connect } from 'dva';
import {Spin} from 'antd';
import { phoneExist, getAuthCode, regUser } from '../../services/api';

@connect((state) => ({
  login: state.login,
  submitting: state.login.submitting
}))
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReg: true, //是否显示注册表单
      countDown: AUTH_CODE_TIME,  //获取验证码倒计时
      showAuthCode: true, //显示获取验证码的接口
      regPhone: '', //注册手机号
      regPwd: '', //注册密码
      regAuthCode: '', //注册验证码
      loginPhone: '', //登录手机号
      loginPwd: '', //登录密码
      readStatus: true, //阅读注册协议状态
      regLoading: false,
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

  async getAuthCode(){
    const { regPhone } = this.state;
    if (regPhone.length === 0) {
      alert('手机号不能为空');
      return;
    }
    if (!VER_PHONE.test(regPhone)) {
      alert('请输入正确的手机号');
      return;
    }
    // 发送验证码的时间存在本地
    const sendTime = localStorage.getItem(regPhone);
    if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME * 1000 ) {
      alert(`${AUTH_CODE_TIME}秒内仅能获取一次验证码，请稍后重试`);
      return;
    }
    //调用获取验证码接口
    const response = await getAuthCode(regPhone);
    if (response.code !== 0) {
      alert(response.msg);
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
    }, 1000)
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
    const { regPhone, regPwd, regAuthCode, readStatus } = this.state;
    if (regPhone.length === 0) {
      alert('手机号码不能为空');
      return;
    }
    if (regPwd.length === 0) {
      alert('请先阅读注册协议');
      return;
    }
    if (regAuthCode.length === 0) {
      alert('验证码不能为空');
      return;
    }
    if (!VER_PHONE.test(regPhone)) {
      alert('请输入正确的手机号');
      return;
    }
    if (regAuthCode.length !== 6) {
      alert('验证码格式错误');
      return;
    }
    if (regPwd.length < 6) {
      alert('密码不小于6位');
      return;
    }
    if (!readStatus) {
      alert('请先阅读注册协议');
      return;
    }
    const reg = {
      fmobile: regPhone,
      fpwd: regPwd,
      authcode: regAuthCode
    };
    // 调用注册接口
    this.setState({regLoading: true});
    const response = await regUser(reg);
    this.setState({regLoading: false});
    if (response.code === 0) {
      this.setState({showReg: false});
    } else {
      alert(response.msg);
    }
  }

  //登录提交方法
  submitLogin() {
    const { loginPhone, loginPwd } = this.state;
    if (loginPhone.length === 0) {
      alert('登录用户名不能为空');
      return;
    }
    if (loginPwd.length === 0) {
      alert('登录密码不能为空');
      return;
    }
    const login = {
      loginName: loginPhone,
      password: loginPwd
    };
    this.props.dispatch({
      type: 'login/login',
      payload: login
    })
  }

  async checkPhoneNumber() {
    const phoneNum = this.state.regPhone;
    if (phoneNum && phoneNum.length > 0 && VER_PHONE.test(phoneNum)) {
      const response = await phoneExist(phoneNum,0);
      if (response.code !== 0) {
        alert(response.msg);
      }
    }
  }

  render() {
    const { showReg, showAuthCode, countDown, regPhone, regPwd, regAuthCode, loginPhone, loginPwd, readStatus } = this.state;
    return (
      <div className="logindiv1 shadow">
        { showReg ?
        <div className="form regf" onChange={this.onChange}>
          <div className="hd center">
            <a className="hover" onClick={()=>this.setState({ showReg: true})}>注册</a>
            <a onClick={()=>this.setState({ showReg: false})}>登录</a>
          </div>
          <Spin tip="注册中..." spinning={this.state.regLoading}>
            <div className="row">
              <input className="put mobile" value={regPhone} maxLength={11} name="regPhone" type="tel" placeholder="请输入手机号码" onBlur={this.checkPhoneNumber}/>
            </div>
            <div className="row relative">
              <input className="put vcode" value={regAuthCode} maxLength={6} name="regAuthCode" type="tel" placeholder="输入验证码"/>
              { // 根据倒计时时间显示是否可以点击获取验证码按钮
                showAuthCode ?
              <a className="getvc center" onClick={this.getAuthCode}>获取验证码</a> :
                  <span className="getvc center" style={{ backgroundColor: '#D1D1D1' }}>{countDown}s后重新获取</span> }
            </div>
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
          </Spin>
        </div> :
        <div className="form logf" onChange={this.onChange}>
          <div className="hd center">
            <a onClick={()=>this.setState({ showReg: true})}>注册</a>
            <a className="hover" onClick={()=>this.setState({ showReg: false})}>登录</a>
          </div>
          <Spin tip="登录中..." spinning={this.props.submitting}>
            <div className="row">
              <input className="put user" value={loginPhone} maxLength={20} name="loginPhone" type="tel" placeholder="请输入手机号码/用户名"/>
            </div>
            <div className="row">
              <input className="put pwd" value={loginPwd} maxLength={16} name="loginPwd" type="password" placeholder="请输入登录密码"/>
            </div>
            <div>
              <a className="btn" onClick={this.submitLogin}>登录</a>
            </div>
            <div>
              {/*<p className="tright"><a className="gray f14">忘记密码?</a></p>*/}
            </div>
          </Spin>
          <div>
            <p className="other">
        <span>
            {/*<i className="fl c6">其他登录方式</i>*/}
            {/*<a className="qq"/>*/}
            {/*<a className="weixin"/>*/}
            {/*<a className="sina"/>*/}
        </span>
            </p>
          </div>
        </div> }
      </div>
    );
  }
}
