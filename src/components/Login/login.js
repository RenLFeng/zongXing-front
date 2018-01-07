import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div className="logindiv shadow">
        <a className="close"></a>
        <div className="form regf">
          <div className="hd center">
            <a className="hover">注册</a><a>登录</a>
          </div>
          <div className="row">
            <input className="put mobile" type="tel" placeholder="请输入手机号码"/>
          </div>
          <div className="row relative">
            <input className="put vcode" type="tel" placeholder="输入验证码"/>
            <a className="getvc center">获取验证码</a>
          </div>
          <div className="row">
            <input className="put pwd" type="password" placeholder="设置登录密码"/>
          </div>
          <div>
            <a className="btn">注册</a>
          </div>
          <div className="bot">
            <p>
              <input className="fl" id="chk1" type="checkbox" checked="checked"/>
              <label className="fl" for="chk1">
                <i>已阅读并接受</i>
                <a className="blue">注册协议</a>
              </label>
            </p>
          </div>
        </div>
        <div className="form logf none">
          <div className="hd center">
            <a>注册</a><a className="hover">登录</a>
          </div>
          <div className="row">
            <input className="put user" type="tel" placeholder="请输入手机号码/用户名"/>
          </div>
          <div className="row">
            <input className="put pwd" type="password" placeholder="请输入登录密码"/>
          </div>
          <div>
            <a className="btn">登录</a>
          </div>
          <div>
            <p className="tright"><a className="gray f14">忘记密码?</a></p>
          </div>
          <div>
            <p className="other">
        <span>
            <i className="fl c6">其他登录方式</i>
            <a className="qq"></a>
            <a className="weixin"></a>
            <a className="sina"></a>
        </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
