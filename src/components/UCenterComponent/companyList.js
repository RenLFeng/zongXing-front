import React from 'react';
import {Icon, message, Table, Badge, Button, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

import '../../assets/MessageList/messageList.scss';
import {messageList} from '../../services/api.js';
import moment from 'moment';
import Path from '../../common/pagePath';
import {pageShows, LICENSE} from '../../common/systemParam';
import { getCompanylist,saveCompany, loginCompany, getCompanyByAccount } from '../../services/api';

export default class LoanList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      current: 1,
      total: 0,
      pageSize: 20,
      dataSource: [],
      visible: false,
      createLoading: false
    };
    this.colums = [
      {
        title: '企业名称',
        dataIndex: 'fname',
        key: 'fname'
      },
      {
        title: '统一社会信用代码',
        dataIndex: 'fsocialCreditCode',
        key: 'fsocialCreditCode'
      },
      {
        title: '操作',
        render: (val) => (
          <div>
              <a onClick={async () => {
                //const response = await loginCompany(val.fid);
                //console.log(response);
                //if (response.code === 0) {
                //  localStorage.setItem('companyToken', response.data.token);
                //  localStorage.setItem('companyName', response.data.companyName);
                window.location.href = `http://192.168.1.192:8001?token=${localStorage.getItem('accessToken')}&id=${val.fid}`;
                //} else {
               //   message.error(response.msg)
                //}
              }} style={{color: 'blue'}}>进入后台</a>
          </div>
        ),
      },
    ];
  }

  componentDidMount() {
    this.fetchData(1);
  }

  async fetchData(page) {
    this.setState({
      loading: true,
      current: page
    });
    try {
      const response = await getCompanyByAccount({pageCurrent:page,pageSize: this.state.pageSize});
      this.setState({loading: false});
      console.log(response);
      if (response.code === 0) {
        this.setState({
          total: response.data.totalNumber,
          dataSource: response.data.infoList
        });
      } else {
        this.setState({dataSource: []});
        message.error(response.msg);
      }
    } catch(e) {
      this.setState({
        loading: false,
        dataSource: []
      });
      if (typeof e === 'object' && e.name === 288) {
        throw e;
      }
      console.log(e);
    }
  }

  handleCancel = () => {
    this.setState({visible: false});
  };

  handleCreate =  () => {
    const form = this.createCompany;
    form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      try {
        this.setState({createLoading: true});
        const response = await saveCompany(values);
        console.log(response);
        this.setState({createLoading: false});
        if (response.code === 0) {
          this.fetchData(1);
          localStorage.setItem('companyToken', response.token);
          localStorage.setItem('companyName', response.companyName);
        } else {
          message.error(response.msg)
        }
      } catch (e) {
        this.setState({createLoading: false});
        if (typeof e === 'object' && e.name === 288) {
          message.error('未登录或登录超时');
          localStorage.removeItem('accessToken');
          this.props.history.push('/index/login');
          this.props.dispatch({
            type: 'login/logoutData'
          });
        }
      }
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  render() {
    return (
      <div className="fr uc-rbody">
        <Button type="primary" style={{marginBottom: 30}} onClick={()=>this.setState({visible: true})}>新建企业</Button>
        <Table
          rowKey={record => record.fid}
          columns={this.colums}
          dataSource={this.state.dataSource}
          pagination={{
            current: this.state.current,
            pageSize: this.state.pageSize,
            total: this.state.total,
            onChange: (page)=>this.fetchData(page)
          }}
          locale={{
            filterConfirm: '确定',
            filterReset: '重置',
            emptyText: '暂无数据'
          }}
          loading={this.state.loading}
        />
        <CreateCompany
          ref={(ref)=>this.createCompany = ref}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          loading={this.state.createLoading}
        />
      </div>
    );
  }
}


class CreateCompanyComponent extends React.Component {

  validateName =(rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && /^[0-9]*$/.test(value)) {
      callback('不能为纯数字');
    }
    callback();
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };
    const formItemsLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 17 },
    };
    const { visible, onCancel, onCreate, form, loading } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="创建企业"
        okText="创建"
        cancelText="取消"
        onCancel={onCancel}
        confirmLoading={loading}
        onOk={onCreate}
      >
        <Form layout="horizontal" style={{width: '100%'}}>
          <FormItem label="企业名称" {...formItemLayout}>
            {getFieldDecorator('companyName', {
              rules: [{ required: true, message: '企业名称不能为空' }
                ,{validator: this.validateName}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="统一社会信用代码" {...formItemsLayout}>
            {getFieldDecorator('fsocialCreditCode', {
              rules: [{ required: true, message: '营业执照不能为空' },
                {pattern: LICENSE, message: '营业执照格式不正确'}],
            })(<Input />)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

const CreateCompany = Form.create()(CreateCompanyComponent);
