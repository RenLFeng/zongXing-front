
import React from 'react';
import { Input, Button, Spin } from 'antd';
import { changePassword } from '../../services/api';
import { AUTHENTICATION, OPENQACCOUNT, BINDCARD ,USER_BASIC} from '../../common/pagePath';
import { AUTH_CODE_TIME} from '../../common/systemParam';
import '../../assets/ucenter/changePwd.scss';


export default class ChangeLPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      password:'',
      show:false,  //密码隐藏
      newPassword:'',
      newShow:false,//密码隐藏
      code:''  ,
      showAuthCode:true,
      loading:false,
      countDown: AUTH_CODE_TIME,  //获取验证码倒计时
      firstShow:true,
      num:3   //3秒后跳转
    }
    this.countDown = null;
  }

  componentWillUnmount() {
    if (this.countDown) {
      clearInterval(this.countDown);
    }
  }
  
  changePassStatus(flag,num) {
    if (flag === 'show' && num ===1) {
      this.setState({
        show: false
      })
    }   
    if (flag === 'hide'&& num ===1) {
      this.setState({
        show: true
      })
    }
    if (flag === 'show' && num ===2) {
      this.setState({
        newShow: false
      })
    }   
    if (flag === 'hide'&& num ===2) {
      this.setState({
        newShow: true
      })
    }
  }

  async getCode() {
    console.log('phone',this.props.baseData.mobile)
    //电话
    const { phone } = this.props.baseData.mobile;
    // 发送验证码的时间存在本地
    const sendTime = localStorage.getItem(phone);
    if (sendTime && new Date().getTime() - sendTime * 1 < AUTH_CODE_TIME * 1000) {
      alert(`${AUTH_CODE_TIME}秒内仅能获取一次验证码，请稍后重试`);
      return;
    }
    this.setState({ authLoading: true, loading: true });
    try {
      const response = await fp_getCode(phone);
      if (response.code === 0) {
        message.info('发送成功');
        this.setState({
          whetherAuthentication: response.data.isCertification,
          showAuthCode: false,
          loading: false
        })
      } else {
        response.msg && message.error(response.msg)
      }
    } catch (e) {
      this.setState({ authLoading: false, loading: false });
      message.error('请求失败');
      return;
    }
    localStorage.setItem(phone, new Date().getTime());
    //   //发送请求 按钮变不可点状态
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

  render() {
    const {password,newPassword,code,showAuthCode,countDown} = this.state
    return (

        <div className="fr uc-rbody user-form-box" style={{width:"100%",float:"none",height:900}}>
            
            {
              this.state.firstShow ?
              <div>
                <div className="real_title_">
                  <span className="safeCenter_" onClick={()=>this.props.history.push('/index/uCenter/realName')}>实名认证</span>
                  <span>&gt; 修改登录密码 &gt; 设置新登录密码</span>
               </div>
              <div style={{width:230,margin:'71px auto 0 auto'}}>
                {this.state.show ? 
                  <div className="pass">
                    <Input placeholder="请输入当前登录密码" className="inp" value={password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    <p className="prompts" style={{ marginBottom: 5, color: 'red' }}></p>
                    <i className="zjb zjb-mima2 img1" />
                    <i className="zjb zjb-mimakejian img2" onClick={() => { this.changePassStatus('show',1) }} />
                  </div>:
                  <div className="pass">
                    <Input placeholder="请输入当前登录密码" className="inp" value={password} type="password" onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    <p className="prompts" style={{ marginBottom: 5, color: 'red' }}></p>
                    <i className="zjb zjb-mima2 img1"  />
                    <i className="zjb zjb-htmal5icon08 img2" onClick={() => { this.changePassStatus('hide',1) }} />
                  </div>
                }    
              </div>
              <div style={{width:230,margin:'30px auto 0 auto'}}>
                {this.state.newShow ? 
                  <div className="pass">
                    <Input placeholder="请设置新登录密码" className="inp" value={newPassword} onChange={(e) => { this.setState({ newPassword: e.target.value }) }} />
                    <p className="prompts" style={{ marginBottom: 5, color: 'red' }}></p>
                    <i className="zjb zjb-mima2 img1" />
                    <i className="zjb zjb-mimakejian img2" onClick={() => { this.changePassStatus('show',2) }} />
                  </div>:
                  <div className="pass">
                    <Input placeholder="请设置新登录密码" className="inp" value={newPassword} type="password" onChange={(e) => { this.setState({ newPassword: e.target.value }) }} />
                    <p className="prompts" style={{ marginBottom: 5, color: 'red' }}></p>
                    <i className="zjb zjb-mima2 img1"  />
                    <i className="zjb zjb-htmal5icon08 img2" onClick={() => { this.changePassStatus('hide',2) }} />
                  </div>
                }    
              </div>
              <div style={{width:230,margin:'30px auto 0 auto'}} className="codeInp">
                <Input placeholder="输入短信验证码" className="input1" value={code} onChange={(e) => { this.setState({ code: e.target.value }) }} />
                  {// 根据倒计时时间显示是否可以点击获取验证码按钮
                    this.state.showAuthCode ?
                      <Button className="input2" onClick={() => this.getCode()} loading={this.state.loading}>点击获取验证码</Button> :
                      <Button className="input2" style={{ backgroundColor: '#D1D1D1' }}>{countDown}s后重新获取</Button>
                  }
                  <p className="prompts" style={{ marginBottom: 15, color: 'red', position: 'relative' }}>{this.state.code_prompt}</p>
              </div>
              <div style={{width:230,margin:'60px auto 0 auto'}} >
                <Button style={{width:230,fontSize:18}} type="primary" onClick={()=>{this.setState({firstShow:false})}}>确定</Button>
              </div>
            </div>:
            <div>
                <div className="real_title_">
                  <span className="safeCenter_" onClick={()=>this.props.history.push('/index/uCenter/realName')}>实名认证</span>
                  <span>&gt; 修改登录密码 &gt; 新登录密码设置成功</span>
                </div>
                <div className="success">
                  <h1>
                     <img alt="ok" src={require('../../assets/img/u3551.png')} />人名字，恭喜您修改登录密码成功
                  </h1>
                  <p className="goback">
                    <a  onClick={()=>this.props.history.push('/index/uCenter/realName')}>{this.state.num}秒后自动跳转</a>
                  </p>                
                </div>
                
            </div>
            }
           
           
        </div>

    );
  }
}
