import React from 'react';
import { Card, Icon, Button, Modal, Form, Input, Spin } from 'antd';
const { Meta } = Card;

export default class BankCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bankCard: [{id: 1, cardId: '12321312312321****33'},
        {id: 2, cardId: '12321312312321****33'},
        {id: 3, cardId: '12321312312321****33'},
        {id: 4, cardId: '12321312312321****33'},
        {id: 5, cardId: '12321312312321****33'},
        {id: 6, cardId: '12321312312321****33'}],
      cardId: '',
      showDelete: false,
      confirmLoading: false,
      addBankCard: false,
      addLoading: false
    };
  }
  deleteBankCard = () => {
    // 解除银行卡绑定的方法
    this.setState({confirmLoading: true});
    setTimeout(()=>{
      let bankCardArr = this.state.bankCard;
      bankCardArr.splice(this.state.cardId * 1, 1);
      this.setState({
        bankCard: bankCardArr,
        confirmLoading: false,
        showDelete: false
      });
    }, 1000)
  };
  addBankCard = () => {
    const form = this.addBankCardRef;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('提交银行卡的数据 ', values);
      this.setState({addLoading: true});
      setTimeout(() => {
        //添加银行卡请求
        const id = Math.random();
        const bankCardArr = this.state.bankCard;
        bankCardArr.push({id: id,cardId: values.bankCardId});
        form.resetFields();
        this.setState({ addBankCard: false,bankCard: bankCardArr,addLoading: false });
      }, 1000);
    });
  };
  // 关闭添加银行卡弹窗
  handleCancel = () => {
    this.setState({ addBankCard: false});
  };
  // 关闭删除银行卡弹窗
  hideModal = () => {
    this.setState({showDelete: false});
  };
  render() {
    return (
      <div style={{display: 'flex',minWidth: '1200px', width:'1600px',flexWrap: 'wrap'}}>
        {
          this.state.bankCard.map((data, index) => {
            return (
              <Card
                key={data.id}
                style={{ minWidth: '300px',width: '300px', marginRight: '50px',marginTop: '50px' }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={[<Icon type="delete" style={{fontSize: 18}} onClick={()=>this.setState({cardId: index, showDelete: true})}/>]}
              >
                <Meta
                  title={data.cardId}
                />
              </Card>
            );
          })
        }
        <Button
          type="dashed" onClick={()=>this.setState({addBankCard: true})}
          style={{ width: '300px',height: '290px',marginTop: '50px' }}>
          <Icon type="plus" /> 添加银行卡
        </Button>
        <Modal
          title="确认解绑"
          visible={this.state.showDelete}
          onOk={this.deleteBankCard}
          onCancel={this.hideModal}
          confirmLoading={this.state.confirmLoading}
          okText="确认"
          cancelText="取消"
        >
          <p>你确认解除这张银行卡的绑定吗?</p>
        </Modal>
        <AddBankCard
          ref={(ref)=> this.addBankCardRef = ref}
          visible={this.state.addBankCard}
          onCancel={this.handleCancel}
          onCreate={this.addBankCard}
          addBankCard={this.state.addLoading}
        />
      </div>
    );
  }
}

const AddBankCard = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form, addBankCard } = props;
    const { getFieldDecorator } = form;
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
    };
    return (
      <Modal
        visible={visible}
        title="绑定银行卡"
        okText="提交"
        cancelText="取消"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="horizontal">
          <Spin spinning={addBankCard}>
            <Form.Item label="预留手机" {...formItemLayout}>
              {getFieldDecorator('phone', {
                rules: [{ required: true, message: '预留手机号不能为空' }],
              })(
                <Input />
              )}
            </Form.Item>
            <div style={{display: 'flex'}}>
              <Form.Item style={{flex: 3,paddingLeft: '6px'}} label="验证码" labelCol={{span: 5}} wrapperCol={{span: 16}}>
                {getFieldDecorator('authCode', {
                  rules: [{ required: true, message: '验证码不能为空' }],
                })(
                  <Input />
                )}
              </Form.Item>
              <Form.Item style={{flex: 1, marginLeft: '-14px'}} wrapperCol={{span: 2}}>
                <Button type="primary">获取验证码</Button>
              </Form.Item>
            </div>
            <Form.Item label="银行卡号" {...formItemLayout}>
              {getFieldDecorator('bankCardId', {
                rules: [{ required: true, message: '银行卡号不能为空' }],
              })(
                <Input />
              )}
            </Form.Item>
          </Spin>
        </Form>
      </Modal>
    );
  }
);
