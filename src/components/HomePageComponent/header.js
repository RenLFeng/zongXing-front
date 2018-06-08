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

  }

  render() {
    const {match, location, history} = this.props.param;
    const styleS = location.pathname.indexOf('/index/howLoan') !== -1 || location.pathname.indexOf('/index/howInvest') !== -1 ? {position:'fixed'}: {position:'absolute'};
    if (location.pathname.indexOf('/index/uCenter') === -1 && location.pathname.indexOf('/index/login') === -1 && location.pathname.indexOf('index/collection') === -1) {
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
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/projectLoan`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>借款项目</a>
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/howLoan`);
              $(window).scrollTop(0);
            }}>如何借款</a>
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/howInvest`);
              $(window).scrollTop(0);
            }}>如何投资</a>
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/businessDiscount`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>商家优惠</a>
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/loanCollege`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>众借学院</a>
            <a className="btn btn1" onClick={()=>{
              history.push(`${match.path}/collection`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>收藏项目</a>
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
              <a className="btn btn2" onClick={()=>{
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
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/projectLoan`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>借款项目</a>
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/howLoan`);
              $(window).scrollTop(0);
            }}>如何借款</a>
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/howInvest`);
              $(window).scrollTop(0);
            }}>如何投资</a>
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/businessDiscount`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>商家优惠</a>
            <a className="a1" onClick={()=>{
              history.push(`${match.path}/loanCollege`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>众借学院</a>
            <a className="btn btn1" onClick={()=>{
              history.push(`${match.path}/collection`);
              $("#fix").removeClass('fix');
              $(window).scrollTop(0);
            }}>收藏项目</a>
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
              <a className="btn btn2" onClick={()=>{
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
