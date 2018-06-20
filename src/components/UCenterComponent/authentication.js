import React from 'react';
import { Link } from 'dva/router';
import { Icon, Input, Button, message, Spin } from 'antd';
import '../../assets/ucenter/realName.scss';
import { verifyIdcard } from '../../services/api';
import Path from '../../common/pagePath';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPage: 'idcard',
      realName: '',
      idcard: '',
    };
  }
  componentDidMount() {
  }

  updateRealName = (e) => {
    console.log('updateRealName', e.target.value);
    this.setState({ realName: e.target.value });
  };
  updateIdcard = (e) => {
    console.log('updateIdcard', e.target.value);
    this.setState({ idcard: e.target.value });
  };
  handleSubmit = async () => {
    if (this.state.loading) {
      return;
    }
    const param = {
      realName: this.state.realName,
      idcard: this.state.idcard,
    };
    if (!param.realName) {
      message.error('真实姓名不能为空！');
      return;
    }
    if (!param.idcard) {
      message.error('身份证号不能为空！');
      return;
    }
    this.setState({loading: true});
    const response = await verifyIdcard(param);
    this.setState({loading: false})
    if (response.code === 1) {
      response.msg && message.success(response.msg);
      this.setState({ showPage: 'ok' });
      this.props.history.push(Path.REALNAME_AUTHENTICATION);
    } else {
      response.msg && message.error(response.msg);
    }
  };

  render() {
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;

    return (
      <div className="pages">
        {
          this.state.showPage === 'idcard' ?
            <div>
              <div className="real_title_">
                <span className="safeCenter_">安全中心</span>
                <span> &gt; 身份认证 &gt; 选择身份认证证件类型</span>
              </div>
              <div className="card">
                <div className="id_card">
                  <Icon type="idcard" className="id_Card" />
                </div>
                <span className="china">中国大陆居民身份认证</span>
                <Button
                  type="primary"
                  onClick={() => this.setState({ showPage: 'chinaCard' })}
                >
                我要认证
                </Button>
              </div>
              <div className="card top">
                <div className="id_card">
                  <Icon type="idcard" className="id_Card" />
                  <Icon type="close-circle-o" className="close" />
                </div>
                <span className="china">港澳台居民身份认证</span>
                <Button type="primary">我要认证</Button>
              </div>
            </div> :
          (this.state.showPage === 'chinaCard') ?
            <div>
              <div className="real_title_">
                <span className="safeCenter_">安全中心</span>
                <span>&gt; 身份认证 &gt; 中国大陆居民身份认证</span>
              </div>
              <div className="Prompt">
                <img alt="提示" src={require('../../assets/img/u3530.png')} />
                <p className="p1" style={{textAlign: 'center'}}>完成成身份认证，有助于建立完善可靠的互联网信用体系</p>
                <p className="p2" style={{textAlign: 'center'}}>姓名必须与充值、提现的银行卡开户名保持一致</p>
              </div>
              {/* <Spin style={{height: 200}}> */}
                <div className="info">
                  <div className="inp">
                    <Input placeholder="请输入真实姓名" onChange={this.updateRealName} />
                    <img alt="真实姓名" src={require('../../assets/img/u186.png')} />
                  </div>
                  <div className="inp">
                    <Input placeholder="请输入第二代身份证号码" onChange={this.updateIdcard} />
                    <img alt="身份证id" src={require('../../assets/img/u192.png')} />
                  </div>
                  <Button onClick={this.handleSubmit} type="primary" loading={this.state.loading}>立即身份认证</Button>
                </div>
              {/* </Spin> */}
            </div> :
          (this.state.showPage === 'ok') ?
            <div>
              <div className="real_title_">
                <span className="safeCenter_">安全中心</span>
                <span> &gt; 身份认证 &gt; 身份认证成功</span>
              </div>
              <div className="info">
                <p>众借帮使用“全国公民身份证号码查询服务中心”（NCIIC）权威认证</p>
                <h1>
                  <img alt="ok" src={require('../../assets/img/u3551.png')} />
                  人名字，恭喜您已经通过身份认证
                </h1>
                <a className="goback">3秒后自动返回</a>
              </div>
            </div> : null
        }
      </div>
    );
  }
}
