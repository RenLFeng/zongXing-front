import React from 'react';
import '../../assets/login/index.scss';
import {VER_PHONE, AUTH_CODE_TIME, AUTH_CODE_TIME_} from '../../common/systemParam';
import {connect} from 'dva';
import {Spin, message, Button, Icon, Steps, Modal, Form, Row, Col, Input} from 'antd';
import {phoneExist, regUser,  relieveAccountAjax, getAuthCode} from '../../services/api';


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
      loginError: true, 
      errorTime: 60
    };
    this.onChange = this.onChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.countDownErrorCode = null;
  }

  componentDidMount() {
  }
 
  componentWillUnmount() {
    if (this.countDownErrorCode) {
      clearInterval(this.countDownErrorCode);
    }
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
        loginNameErr: '请输入手机号',
        loginPwdErr: '请输入密码'
      });
      return;
    }
    if (loginPhone.trim().length === 0) {
      this.setState({loginNameErr: '请输入手机号'});
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
    // this.setState({
    //   loginNameErr: '',
    //   loginPwdErr: '', 
    // });
    this.props.dispatch({
      type: 'login/login',
      payload: login,
      passwordError: (phoneNumber) => this.passwordError(phoneNumber)
    });
  }

  passwordError(phoneNumber) {
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

  // 判断  手机号是否已被注册过
  async checkPhone() {
    const {loginPhone} = this.state;
    if (loginPhone.length === 0) {
      this.setState({loginNameErr:'手机号不能为空'})
      return;
    }
    if (!VER_PHONE.test(loginPhone)) {
      this.setState({loginNameErr:'手机号格式不正确'})
      return;
    }
    if (this.state.checkPhoneLoading) {
      return;
    }
    this.setState({checkPhoneLoading: true});
    const response = await phoneExist(loginPhone,0);
    this.setState({checkPhoneLoading: false});
    if (response.code === 0) {
      this.setState({loginError: false});
    } else {
      this.setState({loginError: true,loginNameErr:''});
    }
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


  render() {
    const {  loginPhone, loginPwd} = this.state;
    return (
      <div className="logindiv1 "  style={{height: 495,borderRadius:10,marginTop: 80,marginBottom: 500}}>
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

        <div className="back">
                <div className="form logf" onChange={this.onChange}>
                  <div className="hd center">
                    <a className="hover" style={{marginLeft:-60}}>欢迎登录</a>
                  </div>
                  <Spin tip="登录中..." spinning={this.props.submitting} >
                    <div className="row" style={{position:'relative'}}>
                      <input className="put" value={loginPhone} maxLength={20}
                            onChange={(e) => {this.setState({loginPhone: e.target.value})}} name="loginPhone" type="tel"
                            placeholder="手机号" onBlur={()=>this.checkPhone()} onKeyDown={(e)=>this.pressKey(e)}/>
                            <i className="zjb zjb-shouji-copy" style={{position:'absolute',top:'4px',left:'11px',fontSize:25,color:'#d5d5d5'}}></i>
                            <span style={{position:'absolute',top:'6px',left:'44px',fontSize:20,color:'#f0f0f0'}}>|</span>      
                      {
                        this.state.loginError ? this.state.loginNameErr?
                        <p className="registration-prompts_" >
                          {this.state.loginNameErr}
                        </p> : 
                        <p className="registration-prompts">
                          &nbsp;
                        </p>
                        :
                        <p className="registration-prompts">
                          该用户还未注册，<a onClick={() => this.props.history.push('./register')}>立即注册</a>
                        </p> 
                      }                 
                    </div>

                    <div className="row" style={{position:'relative'}}>
                      <input className="put"  value={loginPwd} maxLength="16"
                            name="loginPwd" type="password" onChange={(e) => this.setState({loginPwd: e.target.value})}
                            placeholder="请输入登录密码" onKeyDown={(e)=>this.pressKey(e)} style={{marginTop:4}}/>  
                            <i className="zjb zjb-mima" style={{position:'absolute',top:'7px',left:'11px',fontSize:24,color:'#d5d5d5'}} ></i>
                            <span style={{position:'absolute',top:'8px',left:'44px',fontSize:20,color:'#f0f0f0'}}>|</span>
                      <p className="prompts" style={{color: 'red',marginLeft:0}}>{this.state.loginPwdErr}</p>
                      <a className="gray f14"
                          style={{marginTop: 1}}
                          onClick={() => this.props.history.push('./forgetPassWord')}>
                          忘记密码
                        </a>
                    </div>
                    <div style={{marginTop:96,width:329}}>
                      <a className="btn" onClick={this.submitLogin}>登录</a>
                    </div>
                    <p className="safe-info">
                      <i className="zjb zjb-renzheng1" style={{color:'#4cd964',fontSize:14,marginRight:5}}/>
                      您的信息已使用SSL加密技术，数据传输安全
                    </p>
                  </Spin>
                </div> 
        </div>
        <div className="back_">
          <img src={require('../../assets/img/login_03.png')} />
        </div>
      </div>
      
    );
  }
}


