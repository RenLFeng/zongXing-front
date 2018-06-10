import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Icon, Input, Button, message, Row, Col, Form, Select, Checkbox } from 'antd';
import '../../assets/ucenter/realName.scss';
import { verifyBankCard, getUserBaseData } from '../../services/api';
import Path from '../../common/pagePath';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 8 },
    sm: { span: 8 },
  },
};
const btnLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

@connect((state) => ({
  safeData: state.safeCenter.safeData,
  safeDataLoading: state.safeCenter.safeDataLoading,
}))
class BindCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPage: 'idcard',
      realName: '',
      idcard: '',
      submitDisabled: true, // 标记提交按钮是否可用
      inputDisabled: true, // 标记input 是否可用
      bankCardNo: '', // 银行卡号
      userBaseInfo: null, // 当前登录用户的信息
    };
  }
  componentDidMount() {
    this.queryUserBaseInfo();
  }

  // 查询当前登录的用户
  queryUserBaseInfo = async () => {
    let response = await getUserBaseData();
    if (response.code === 0) {
      this.setState({ userBaseInfo: response.data });
    } else {
      response.msg && message.error(response.msg);
    }
  }
  updateRealName = (e) => {
    console.log('updateRealName', e.target.value);
    this.setState({ realName: e.target.value });
  };
  updateIdcard = (e) => {
    console.log('updateIdcard', e.target.value);
    this.setState({ idcard: e.target.value });
  };
  handleSubmit = async (values) => {
    const param = {
      realName: this.state.realName,
      idcard: this.state.idcard,
    };
    if (!param.realName) {
      message.error('真实姓名不能为空！');
      return;
    }
    if (!param.idcard) {
      message.error('银行卡号不能为空！');
      return;
    }
    const response = await verifyIdcard(param);
    if (response.code === 1) {
      response.msg && message.success(response.msg);
      this.setState({ showPage: 'ok' });
      this.props.history.push(Path.REALNAME_AUTHENTICATION);
    } else {
      response.msg && message.error(response.msg);
    }
  };

  verifyBankCard = () => {
    console.log("verifyBankCard,bankcard:",this.state.bankCardNo);
  }
  updateBankCard = (e) => {
    this.setState({ bankCardNo: e.target.value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log("submit.value:",values);
      if (!err) {

      }

      this.props.history.push(Path.REALNAME_AUTHENTICATION);
    });
  };


  render() {
    //console.log("this.props:",this.props);
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="pages">
        <div className="real_title_">
          <span className="safeCenter_">实名认证</span>
          <span>&gt; 我的银行卡 &gt; 绑定新银行卡</span>
        </div>
        <div className="forms">
          <p>
            <span className="name">持卡人姓名</span> <span>{this.state.userBaseInfo ? this.state.userBaseInfo.freal_name : ''}</span> </p>
          <Form layout="inline" >
            <FormItem label="银行卡号" {...formItemLayout}>
              {getFieldDecorator('bankCardNo', {
                rules: [],
              })(<Input
                placeholder="输入完成后请点击右侧按钮进行校验"
                addonAfter={<Icon type="enter" style={{ cursor: 'pointer' }} onClick={this.verifyBankCard} />}
                onChange={this.updateBankCard} maxLength={'50'} style={{ height: 41 }}
              />)}
            </FormItem>
            <FormItem label="开户银行" {...formItemLayout}>
              {getFieldDecorator('amount')(<Input maxLength={'50'} style={{ height: 41 }} disabled={this.state.inputDisabled} />)}
            </FormItem>
            <FormItem label="卡类型" {...formItemLayout}>
              {getFieldDecorator('amount')(<Input maxLength={'50'} style={{ height: 41 }} disabled={this.state.inputDisabled} />)}
            </FormItem>
            <FormItem>
              {/* <div>
                <span></span>
              </div> */}
              <div className="inp">
                <Input placeholder="请输入登录密码，以验证身份" disabled={this.state.inputDisabled} />
                <img alt="" src={require('../../assets/img/u22.png')} className="img1" />
                <img alt="" src={require('../../assets/img/u81.png')} className="img2" />
              </div>
              <Checkbox
                style={{ display: 'inline', textAlign: 'center', marginLeft: 95 }}
                disabled={this.state.inputDisabled}
              >同意 <span style={{ color: '#3399FF' }}>《用户协议》</span></Checkbox>
              <Button
                style={{ width: 285, height: 41, marginLeft: 95, background: '#169BD5', color: 'white', fontSize: 18, marginTop: 5 }}
                onClick={(e) => { this.handleSubmit(e); }}
                disabled={this.state.submitDisabled}
              >绑定</Button>
            </FormItem>
          </Form>
          
        </div>
      </div>
    );
  }
}

export default Form.create()(BindCard);
