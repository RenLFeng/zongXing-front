import React from 'react';
import {connect} from 'dva';
import {Button, Divider} from 'antd';

@connect((state) => ({
    nickName: state.login.nickName,
    baseData: state.login.baseData
}))
class LoginInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            nickName:'测试',
            isLogin:true,
         }
    } 
    render() { 
			const {baseData} = this.props
        return ( 
            <div>
                    {
                    this.state.isLogin ?  <div className="w">
                    <div className="uc-tbody clearfix"> 
                        {/* 用户头像 */}
                        <a className="fl"><img className="av" src={require('../../assets/img/ucenter/av1.png')} /></a>
                        {/* 用户信息 */}
                        <div className="fl">
                            {/* 用户名 */}
                            <p className="t1"><span>用户昵称</span><span className="split">|</span>{this.state.nickName}</p> 
                            <p className="uinfo">
                                <span>赵妮沙</span>
                                <span className="split">|</span> 
                                <i title="绑定手机号" className="zjb zjb-shouji-copy" style={baseData.userSecurityCenter.fMobileBinding?{color:'#f90'}:null}></i>
                                <i title="身份证认证" className="zjb zjb-shenfenrenzheng" style={baseData.userSecurityCenter.fCertification?{color:'#f90',fontSize: 22}:{fontSize: 22}}></i> 
                                <i title="银行卡绑定" className="zjb zjb-icon" style={baseData.userSecurityCenter.fBankCardBinding?{color:'#f90',fontSize: 18}:{fontSize: 18}}></i>
                            </p>
                            
                        </div>
                        <div className="fr">
                            {/* 去除退出系统按钮 */}
                            {/* <p style={{display:'none'}}>  
                                <a style={{color: 'blue'}} onClick={()=>this.props.dispatch({type: 'login/logout'})}>退出登录</a>
                            </p> */}
                            <p>  
                                <a style={{color: 'blue'}} onClick={()=>this.props.dispatch({type: 'login/logout'})}>退出登录</a>
                            </p>
                            <div className="account-content">
                                <p>待领取代金券</p>
                                <p className="account-money">{baseData.countCoupon}张</p>
                            </div >
                            <i></i>
                            <div className="account-content">
                                <p>券额</p>
                                <p className="account-money">￥{`${baseData.sumCoupon}`.fm()}</p>
                            </div>
                            <i></i>
                            <div className="account-content" style={{borderRight:'0px'}}>
                                <p>可用资金余额</p>
                                <p className="account-money">￥{`${baseData.balance}`.fm()}</p>
                            </div>
                        </div>  
                    </div>
                    <div className="uc-message">
                        <span className="text1">系统消息：</span>
                        <span className="text2">[6-5]微软以75亿美元的价格收购GitHub,引发了开发者群体的关注。</span> 
                        
												{ baseData.userSecurityCenter.fThirdAccount ?
                        	<Button className="buttonl">提现</Button> : null
												}
												{ baseData.userSecurityCenter.fThirdAccount ?
													<Button type="primary" className="buttonl">充值</Button> : null 
												}
                    </div> 
                </div>:''
                }
            </div>
            
         )
    }
}
 
export default LoginInfo;