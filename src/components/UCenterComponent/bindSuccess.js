import React from 'react';
import { Link } from 'dva/router';
import { Icon, Input, Button, message, Spin } from 'antd';
import '../../assets/ucenter/realName.scss';
import { verifyIdcard } from '../../services/api';
import Path from '../../common/pagePath';

export default class BindSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countDownTiem: 5
    };
    let timeDown = null;
  }
  componentDidMount() {
    this.timeDown = setInterval(()=> {
      this.setState({
        countDownTiem: this.state.countDownTiem-1
      }, ()=> {
        if (!this.state.countDownTiem) {
          clearInterval(this.timeDown);
        }
      })
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timeDown) {
      clearInterval(this.timeDown);
    }
    
  }

  render() {
    const { userName } = this.state;

    return (
      <div className="pages">
        <div>
          <div className="real_title_">
            <span className="safeCenter_">实名认证</span>
            <span> &gt; 身份认证 &gt; 身份认证成功</span>
          </div>
          <div style={{marginTop: 50}}>
            <span>{'姓名'},恭喜您已通过身份认证</span>
            <span>下一步：前往开通资金托管账户</span>
            <a>{this.state.countDownTiem}秒后自动跳转</a>
          </div>
        </div>
      </div>
    );
  }
}
