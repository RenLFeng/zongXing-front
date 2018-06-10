import React from 'react';
import { Link } from 'dva/router';
import { Icon, Input, Button, message, Row, Col, Form, Select,Checkbox  } from 'antd';
import '../../assets/ucenter/realName.scss';
import { verifyIdcard } from '../../services/api';
import Path from '../../common/pagePath';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
      xs: {span: 4},
      sm: {span: 4},
    },
    wrapperCol: {
      xs: {span: 8},
      sm: {span: 8},
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

class BindCard extends React.Component {
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

  handleSubmit = (e) => {
      console.log(1111)
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
       
      }
      this.props.history.push(Path.REALNAME_AUTHENTICATION) 
    });
  };

  render() {
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    const {getFieldDecorator} = this.props.form;


    return (
      <div className="pages">
        <div className="real_title_">
            <span className="safeCenter_">实名认证</span>
            <span>&gt; 我的银行卡 &gt; 绑定新银行卡</span>
        </div>
        <div className="forms">
            <p>
                <span className="name">持卡人姓名</span> <span>赵妮莎</span> </p>
            <Form layout="inline" >
                <FormItem label="银行卡号" {...formItemLayout}>
                {getFieldDecorator('userBankId', {
                    rules: [],
                })(<Select onChange={(e) => this.changeBank(e)} style={{height:41}}>
                    {/* {
                    this.state.bankInfos.map((data) => {
                        return (
                        <Select.Option value={data.userBankId} key={data.userBankId}>{data.bankName}</Select.Option>
                        )
                    })
                    } */}
                </Select>)}
                </FormItem>
                <FormItem label="开户银行" {...formItemLayout}>
                {getFieldDecorator('amount')
                   (<Input maxLength={'50'} style={{height:41}}/>)}
                </FormItem>
                <FormItem label="手机号码" {...formItemLayout}>
                {getFieldDecorator('amount')
                   (<Input maxLength={'50'} style={{height:41}}/>)}
                </FormItem>
                <FormItem label="短信验证码" {...formItemLayout}>
                {getFieldDecorator('amount')
                   ( <div style={{position:'relative'}}>        
                        <Input width="50px" style={{height:41,paddingRight:120}}/>
                        <span style={{position:'absolute',right:0,display:'inline-block',background:'#FF9900',width:124,height:41,color:'white'}}>点击获取验证码</span>
                    </div>
                  )}
                </FormItem>  
            </Form>

            <p className="word2_" >请输入登录密码，以验证身份。</p>
            <div className="inp">
                <Input placeholder="请输入登录密码"/>
                <img src={require('../../assets/img/u22.png')} className="img1"/>
                <img src={require('../../assets/img/u81.png')} className="img2"/>
            </div>  
            <Checkbox style={{display:'inline',textAlign:'center',marginLeft:95,}}>同意 <span style={{color:'#3399FF'}}>《用户协议》</span></Checkbox>
            <Button style={{width:285,height:41,marginLeft:95,background:'#169BD5',color:'white',fontSize:18,marginTop:5}} onClick={(e)=>{this.handleSubmit(e)}}>绑定</Button>
        </div>    
      </div>
    );
  }
}

export default Form.create()(BindCard);
