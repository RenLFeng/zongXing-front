import React from 'react';
import '../../assets/login/index.scss';
import {VER_PHONE, AUTH_CODE_TIME, AUTH_CODE_TIME_,CARD_REG} from '../../common/systemParam';
import {connect} from 'dva';

import {Spin, message, Button, Icon, Steps, Modal, Form, Row, Col, Input } from 'antd';
import {phoneExist, getAuthCode, regUser, changePW,  changePassword, relieveAccountAjax, fp_getCode, fp_checkInfo} from '../../services/api';
import {SliderLock} from '../../components/UCenterComponent/slider'


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
      countDown: AUTH_CODE_TIME,  //获取验证码倒计时
      showAuthCode: true, //显示获取验证码的接口
      authLoading: false, //验证码接口发送状态

      message1: '', //第一次输入密码时提示
    
      flagPage:'first',  //第一步
      currentNum:0,    //当前步骤
      firstPhone:'',    //忘记密码第一步
      prompt:'',   //提示语
      firstClick:null,  //第一步按钮状态
      whetherAuthentication:false,   //是否实名认证
      realName:'',    //真实姓名
      idCard:'',      //身份证号
      code:'',       //验证码
      password:'',    //修改之后的密码
      down:false


    };
    this.fp_getCode = this.fp_getCode.bind(this);
    this.checkPhoneNumber = this.checkPhoneNumber.bind(this);
    this.countDownFun = null;
  }

  componentWillUnmount() {
    if (this.countDownFun) {
      clearInterval(this.countDownFun);
    }
    this.SliderLock();
  }

  //检验手机号是否存在
  async checkPhoneNumber() {
    const phoneNum = this.state.firstPhone;
    if (phoneNum.length === 0) {
      this.setState({prompt: '请输入手机号'});
      return;
    } else {
      this.setState({prompt: ''});
    }
    if (!VER_PHONE.test(phoneNum)) {
      this.setState({prompt: '请输入正确的手机号'});
      return;
    } else {
      this.setState({prompt: ''});
    }
    if (phoneNum && phoneNum.length > 0 && VER_PHONE.test(phoneNum)) {
      const response = await phoneExist(phoneNum);
      console.log('jiaoyan',response)
      if (response.code !== 0) {
        this.setState({
         firstClick:true
       });
      } else {
        message.info('该手机号还未注册,请先去注册')  
      }
    }
  }

  //获取验证码及判断是否实名认证
  async fp_getCode(){
    const {firstPhone} = this.state;
    // 发送验证码的时间存在本地
    const sendTime = localStorage.getItem(firstPhone);
    if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME * 1000) {
      alert(`${AUTH_CODE_TIME}秒内仅能获取一次验证码，请稍后重试`);
      return;
    }
    this.setState({authLoading: true});
    try{
      const response = await fp_getCode(firstPhone);
      console.log('2222',response)
      if(response.code === 0){
        message.info('发送成功');
         this.setState({
           whetherAuthentication:response.data.isCertification,
           showAuthCode:false
         })
      } else {
        response.msg && message.error(response.msg)
      }
    } catch(e) {
      this.setState({authLoading: false});
          message.error('请求失败');
          return;
    }
    localStorage.setItem(firstPhone, new Date().getTime());
    //   //发送请求 按钮变不可点状态
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


//校验用户信息
  async fp_checkInfo(){
    if(!CARD_REG.test(this.state.idCard)){
       this.setState({
        id_prompt:'身份证格式不正确'
       })
       return;
    } else {
      this.setState({
        id_prompt:''
       })
    }
    let params = {
       mobile:this.state.firstPhone,
       authCode:this.state.code,
       realName:this.state.realName,
       idCard:this.state.idCard
    }
    const response = await fp_checkInfo(params);
    console.log('xinxi',response)
    if(response.code === 0){
      this.setState({
        flagPage:'third',
        currentNum:2
      })
    } else {
      response.msg && message.error(response.msg) 
    }
  }

//修改密码
  async changePassword() {
    const {password,firstPhone} = this.state;
    if (password.trim().length === 0) {
      this.setState({
        message1: '该内容不能为空'
      });
      return;
    }
    if (password.trim().length < 6) {
      this.setState({
        message1: '密码长度不能小于6位'
      });
      return;
    }
    this.setState({authLoading: true});
    const respondse = await changePassword({
      loginName: this.state.firstPhone,
      password: this.state.password
    });
    if (respondse.code === 0) {
      this.setState({
        authLoading: false,
        password: '',
        message1: '',
        firstPhone: '',
        flagPage:'four',
        currentNum:3
      });
      message.info("密码修改成功！");
    } else {
      message.error(response.msg);
    }
  }

  prompt(){
    this.setState({firstClick:false},()=>{
      message.warning('请填写手机号')
    })
  }
 

  render() {
    const {showAuthCode, countDown, realName, idCard, firstPhone, code,password} = this.state;
    return (
      <div className="logindiv1 " >
        <div className="forget_page" style={{width:1197}}>
          <p className="forget_title">找回登录密码</p>
          <div className="forget_btnGroup">
            <Steps current={this.state.currentNum}>
              <Step title="验证手机"  />
              <Step title="验证身份" />
              <Step title="重设密码"  />
              <Step title="找回成功" />
            </Steps>
          </div>
          {
            this.state.flagPage === 'first' ? 
            <div className="forget_form">
              <div className="forget_inp">
                <Input placeholder="手机号"  value={firstPhone} onChange={(e)=>{this.setState({firstPhone:e.target.value})}}  onBlur={()=>{this.checkPhoneNumber()}} />
                <img alt="" src={require('../../assets/img/login/u45.png')} className="forget_phone"/>
                
              </div>
              <p className="prompts" style={{marginBottom:5,color:'red'}}>{this.state.prompt}</p>
              <p className="forget-prompts">该手机号还未注册，<a onClick={() => this.props.history.push('./register')}>立即注册</a></p>

              {/* <div className="slider" onClick={ SliderLock(".slider",function(){
                            alert("验证成功");
                            $(".slider").after('<div class="send_vercode" style="display:none"><input type="text" placeholder="验证码"><input type="button" value="发送验证码"></div>');
                            //保证足够的高度
                            
                            $(".send_vercode").fadeIn("slow");
                          }).init()
                        }>
                请按住滑块，拖到最右边
                <div className="block" > >> </div>
              </div> */}
               <div className="outer">
                  <div className="filter-box"></div>
                  <span>
                      按住滑块，请拖到最右边
                  </span>
                  <div className="inner">&gt;&gt;</div>
              </div>
              {
                this.state.firstClick ? 
                 <Button style={{width:300,marginTop:20,height:41,fontSize:18}} type="primary" onClick={()=>this.setState({flagPage:'second',currentNum:1})}>下一步</Button> : 
                <Button style={{width:300,marginTop:20,height:41,fontSize:18}} type="primary" onClick={()=>{this.prompt()}} >下一步</Button>
              }   
            </div> : 
             (this.state.flagPage === 'second') ? 
            <div className="forget_form">
              <p className="second_p">手机号      <span>{this.state.firstPhone.substr(0,3)+'****'+this.state.firstPhone.substr(7)}</span> </p>
              <div className="forget_inp">
                <Input placeholder="输入短信验证码"   className="input1" value={code} onChange={(e)=>{this.setState({code:e.target.value})}}/>
                {/* <Button className="input2">点击获取验证码</Button> */}
                 {// 根据倒计时时间显示是否可以点击获取验证码按钮
                        this.state.showAuthCode ?
                        <Button className="input2" onClick={()=> this.fp_getCode()}>点击获取验证码</Button> :
                        <Button className="input2" style={{backgroundColor: '#D1D1D1'}}>{countDown}s后重新获取</Button>
                        // <Button className="input2" style={{backgroundColor: '#D1D1D1'}}>点击获取验证码</Button>
                    }
              </div>
              {
                this.state.whetherAuthentication ? 
                 <div>
                  <div className="forget_inp">
                    <Input placeholder="请输入姓名"  value={realName} onChange={(e)=>{this.setState({realName:e.target.value})}} />
                    <img alt="" src={require('../../assets/img/u186.png')} className="forget_phone"/>
                  </div>
                  <div className="forget_inp">
                    <Input placeholder="请输入身份证号"  value={idCard} onChange={(e)=>{this.setState({idCard:e.target.value})}} />
                    <img alt="" src={require('../../assets/img/u192.png')} className="forget_phone"/>
                  </div>
                  <p className="prompts" style={{marginBottom:5,color:'red'}}>{this.state.id_prompt}</p>
                </div> :null
              }
              
              <Button style={{width:300,marginTop:20,height:41,fontSize:18}} type="primary" onClick={()=>this.fp_checkInfo()}>下一步</Button>
            </div> : 
            (this.state.flagPage === 'third') ? 
            <div className="forget_form">
              <div className="forget_third">
                <Input placeholder="请输入新登录密码" className="ft_inp" value={password} onChange={(e)=>{this.setState({password:e.target.value})}}/>
                <img alt="" src={require('../../assets/img/u22.png')} className="img1" />
                <img alt="" src={require('../../assets/img/u81.png')} className="img2" />
              </div>
              <Button style={{width:300,marginTop:30,height:41,fontSize:18}} type="primary" onClick={()=>this.changePassword()}>确认</Button>
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


