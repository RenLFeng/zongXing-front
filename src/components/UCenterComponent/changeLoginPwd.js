
import React from 'react';
import { Input, Button, Spin} from 'antd';
import {  } from '../../services/api';
import { AUTHENTICATION, OPENQACCOUNT, BINDCARD ,USER_BASIC} from '../../common/pagePath';

export default class ChangeLPwd extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="fr uc-rbody user-form-box" style={{width:"100%",float:"none"}}>
          {/* <Spin spinning={this.props.loading} tip="请稍后" size="large"> */}
            <div className="real_title_">
              <span className="safeCenter_">实名认证</span>
              <span>&gt; 修改登录密码 &gt; 设置新登录密码</span>
            </div>

          {/* </Spin> */}
        </div>
      </div>

    );
  }
}
