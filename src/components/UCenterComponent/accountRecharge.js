import React from 'react';
import Path from '../../common/pagePath';
import {Link} from 'dva/router';
export default class AccountRecharge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      personAccount: null,
      companyAccount: []
    };
  }

  componentDidMount() {
    // 获取跳转类型 0：个人 1：企业
    const type = this.props.match.params.type;
    if (type === '0') {
      // 请求个人账户信息
    } else if (type === '1') {
      // 请求企业账户信息
    }
  }

  render() {
    const { match } = this.props;
    const type = match.params.type;
    if (type==='0' && !this.state.personAccount) {
      return (
        <div className="fr uc-rbody">
          <span>暂未开通个人账户，请先开户 <Link to={Path.OPEN_ACCOUNT+'/0'} style={{color: 'blue'}}>点击此处</Link></span>
        </div>
      );
    }
    if (type==='1' && this.state.companyAccount.length === 0) {
      return (
        <div className="fr uc-rbody">
          <span>暂未开通任何企业账户，请先开户 <Link to={Path.OPEN_ACCOUNT+'/1'} style={{color: 'blue'}}>点击此处</Link></span>
        </div>
      );
    }
    return (
      <div className="fr uc-rbody">
        {match.params.type === '0'?'个人充值': '企业充值'}
      </div>
    );
  }
}
