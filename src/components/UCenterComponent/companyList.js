import React from 'react';
import {Icon, message, Table, Badge, Button, Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

import '../../assets/MessageList/messageList.scss';
import {messageList} from '../../services/api.js';
import moment from 'moment';
import Path from '../../common/pagePath';
import {pageShows, LICENSE} from '../../common/systemParam';
import { getCompanylist, saveCompant, getCompanyByAccount } from '../../services/api';

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
        title: '营业执照号',
        dataIndex: 'fsocialCreditCode',
        key: 'fsocialCreditCode'
      },
      {
        title: '操作',
        render: (val) => (
          <div>
              <a onClick={() => {
                console.log(val.companyId);
                window.open('https://www.baidu.com');
              }} style={{color: 'blue'}}>查看</a>
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
      const response = await saveCompant();
      console.log(response);
      form.resetFields();
      this.setState({ visible: false });
    });
  };

  render() {
    return (
      <div className="fr uc-rbody">
        <Button type="primary" style={{marginBottom: 30}} onClick={()=>this.setState({visible: true})}>新建企业</Button>
        <Table
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
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
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
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '企业名称不能为空' }
                ,{validator: this.validateName}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="营业执照" {...formItemLayout}>
            {getFieldDecorator('description', {
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
