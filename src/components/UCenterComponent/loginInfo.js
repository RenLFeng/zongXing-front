import React from 'react';
import {connect} from 'dva';
import {Button, Divider} from 'antd';
import '../../assets/login/login.scss';
import {ACCOUNT_RECHARGE, ACCOUNT_WITHDRAWALS} from '../../common/pagePath';

@connect((state) => ({
    nickName: state.login.nickName,
    baseData: state.login.baseData,
    status: state.login.status,
}))
class LoginInfo extends React.Component {
    constructor(props) {
        super(props); 
    }  
    render() { 
        const {baseData} = this.props
        return ( 
            <div className='lg-login'>
                    {
                    this.props.status ?  <div className="w">
                    <div className="uc-tbody clearfix"> 
                        {/* 用户头像 */}
                        <a className="fl">
                            <img className="av" src={require('../../assets/img/ucenter/av1.png')} />
                        </a>
                        {/* 用户信息 */}
                        <div className="fl">
                            {/* 用户名 */}
                            <p className="t1">
                                <span>用户名(系统默认自动成功)</span>
                                <span className="split">|</span>
                                {this.props.nickName}  
                                <a onClick={()=>this.props.dispatch({type: 'login/logout'})}>退出登录</a> 
                            </p> 
                            <p className="uinfo" style={{position: 'relative'}}>
                                <span className='uname'>{baseData.userSecurityCenter.fCertification?baseData?baseData.realName:'未认证':'未认证'}</span>
                                <span className="split">|</span> 
                                
                                <i title="绑定手机号" className={`zjb zjb-shouji-copy ${baseData.userSecurityCenter.fMobileBinding?'active':''}`}></i>
                                <i title="身份证认证" className={`zjb zjb-shenfenrenzheng ${baseData.userSecurityCenter.fCertification?'active':''}`}></i> 
                                <i title="银行卡绑定" className={`zjb zjb-icon ${baseData.userSecurityCenter.fBankCardBinding?'active':''}`}></i> 
                            </p>
                        </div>
                        <div className="fr">  
                            <div className="account-content">
                                <p>待领取代金券</p>
                                <p className="account-money">{baseData.countCoupon||'0'}张</p>
                            </div >  
                            <i></i>
                           <div className="account-content">
                                <p>券额</p>
                                <p className="account-money">￥{`${baseData.sumCoupon||0}`.fm()}</p>
                            </div>
                            <i></i>
                             <div className="account-content" style={{borderRight:'0px'}}>
                                <p>可用资金余额</p>
                                <p className="account-money">￥{`${baseData.balance||0}`.fm()}</p>
                            </div> 
                        </div>  
                    </div>
                    <div className="uc-message">
                        <span className="text1">系统消息：</span>
                        <span className="text2">[6-5]微软以75亿美元的价格收购GitHub,引发了开发者群体的关注。</span> 
                            { baseData.userSecurityCenter.fThirdAccount ?
                                <Button className="buttonl" onClick={()=>this.props.history.push(ACCOUNT_WITHDRAWALS)}>提现</Button> : null
                            }
                            { baseData.userSecurityCenter.fThirdAccount ?
                                <Button type="primary" className="buttonl" onClick={()=>this.props.history.push(ACCOUNT_RECHARGE)}>充值</Button> : null 
                            }
                    </div> 
                </div>:''
                }
            </div>
            
         )
    }
}
 
export default LoginInfo;