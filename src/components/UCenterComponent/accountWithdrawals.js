import React from 'react';

export default class AccountWithdrawals extends React.Component {
  componentDidMount() {
    // 获取跳转类型 0：个人 1：企业
    console.log(this.props.match.params.type)
  }

  render() {
    const { match } = this.props;
    return (
      <div className="fr uc-rbody">
        {match.params.type === '0'?'个人提现': '企业提现'}
      </div>
    );
  }
}
