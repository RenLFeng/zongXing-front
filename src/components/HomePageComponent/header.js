import React from 'react';
import { Link } from 'dva/router';
import {connect} from 'dva';
import Login from '../LoginComponent/login';
import QueueAnim from 'rc-queue-anim';

const styles = {
  masker : {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: '100vh',
    background: 'rgba(0,0,0,.5)',
    zIndex: 5
  },
};

@connect((state)=>({
  loginStatus: state.login.status
}))
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      fixContent:'uCenter,login,collection,register,forgetPassWord,couponCenter'
    }
  }

  render() {
    // couponCenter
    const {match, location, history} = this.props.param;
    let localPath =location.pathname;
    const styleS = localPath.indexOf('/index/howLoan') !== -1 || localPath.indexOf('/index/howInvest') !== -1 ? {position:'fixed'}: {position:'absolute'};
    let fontColor = 'null';
          if(localPath.indexOf('/index/projectLoan')!== -1){
            fontColor='project';
          }else if(localPath.indexOf('/index/howLoan')!== -1){
            fontColor='howLoan';
          }else if(localPath.indexOf('/index/howInvest')!== -1){
            fontColor='howInvest';
          }else if(localPath.indexOf('/index/companyDiscount')!== -1){
            fontColor='companyDiscount';
          }else if(localPath.indexOf('/index/loanCollege')!== -1){
            fontColor='loanCollege';
          }else if(localPath.indexOf('/index/uCenter/personAccount')!== -1){
            fontColor='uCenter';
          }
    let shouldFix=true;
    this.state.fixContent.split(',').map((item)=>{
      if(localPath.indexOf('/index/'+item)!=-1){
        shouldFix = false;
        return false;
      }
    });

  if (shouldFix) {
      return (
      <div id="fix" className="topnav" style={styleS}>
        <div className="w clearfix">
          <a className="logo fl" onClick={()=>{
            history.push(`${match.path}/`);
            $("#fix").removeClass('fix');
            $(window).scrollTop(0);
          }}>
            <img src={require('../../assets/img/logo.png')} />
          </a>
          <span className="fr">
            <a className={'a1 '+(fontColor=='project'?'project':null)} onClick={()=>{
              history.push(`${match.path}/projectLoan`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>投资项目</a>
            <a className={'a1 '+(fontColor=='howInvest'?'howInvest':null)} onClick={()=>{
              history.push(`${match.path}/howInvest`);
              $(window).scrollTop(0);
            }}>如何投资</a>
            <a className={'a1 '+(fontColor=='companyDiscount'?'companyDiscount':null)} onClick={()=>{
              history.push(`${match.path}/companyDiscount`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>商家优惠</a>
             <a className={'a1 '+(fontColor=='howLoan'?'howLoan':null)} onClick={()=>{
              history.push(`${match.path}/howLoan`);
              $(window).scrollTop(0);
            }}>如何借款</a>
            <a className={'a1 '+(fontColor=='loanCollege'?'loanCollege':null)} onClick={()=>{
              history.push(`${match.path}/loanCollege`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>信息披露</a>
            { !this.props.loginStatus ?
              <a className="btn btn2"
                >
                <span  onClick={()=>{
                   history.push('/index/login');
                   $("#fix").removeClass('fix');
                   $(window).scrollTop(0);
                }}>登录</span>
                <span style={{display:'inline-block',marginRight:10,marginLeft:10}}>|</span>
                <span  onClick={()=>{
                   history.push('/index/register');
                   $("#fix").removeClass('fix');
                   $(window).scrollTop(0);
                }}>注册</span>
                </a> :
              <a className={'btn btn2 '+(fontColor=='uCenter'?'uCenter':null)} onClick={()=>{
                  history.push('/index/uCenter/personAccount');
                  $("#fix").removeClass('fix');
                  $(window).scrollTop(0);
                }}>个人中心</a>
            }
          </span>
        </div>
      </div>

      );
    }
  	return (
      <div id="fix" className="topnav" style={{backgroundColor:'#333'}}>
        <div className="w clearfix">
          <a className="logo fl" onClick={()=>{
            history.push(`${match.path}/`);
            $("#fix").removeClass('fix');
            $(window).scrollTop(0);
          }}>
            <img src={require('../../assets/img/logo.png')} />
          </a>
          <span className="fr">
            <a className={'a1 '+(fontColor=='project'?'project':null)} onClick={()=>{
              history.push(`${match.path}/projectLoan`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>投资项目</a>
             <a className={'a1 '+(fontColor=='howInvest'?'howInvest':null)} onClick={()=>{
              history.push(`${match.path}/howInvest`);
              $(window).scrollTop(0);
            }}>如何投资</a>
            <a className={'a1 '+(fontColor=='companyDiscount'?'companyDiscount':null)} onClick={()=>{
              history.push(`${match.path}/companyDiscount`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>商家优惠</a>
            <a className={'a1 '+(fontColor=='howLoan'?'howLoan':null)} onClick={()=>{
              history.push(`${match.path}/howLoan`);
              $(window).scrollTop(0);
            }}>如何借款</a>
            <a className={'a1 '+(fontColor=='loanCollege'?'loanCollege':null)} onClick={()=>{
              history.push(`${match.path}/loanCollege`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>信息披露</a>
            { !this.props.loginStatus ?
              <a className="btn btn2"
                 >
                 <span onClick={()=>{
                   history.push('/index/login');
                   $("#fix").removeClass('fix');
                   $(window).scrollTop(0)}}>登录</span>
                 <span style={{display:'inline-block',marginRight:10,marginLeft:10}}>|</span>
                <span onClick={()=>{
                   history.push('/index/register');
                   $("#fix").removeClass('fix');
                   $(window).scrollTop(0)}}>注册</span>
                 </a> :
              <a className={'btn btn2 '+(fontColor=='uCenter'?'uCenter':null)} onClick={()=>{
                history.push('/index/uCenter/personAccount');
                $("#fix").removeClass('fix');
                $(window).scrollTop(0);
              }}>个人中心</a>
            }
          </span>
        </div>
      </div>
  	);
  }
}
