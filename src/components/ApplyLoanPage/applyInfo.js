import React from 'react';
import {Form, Select, Input, Button, Row, Col, Cascader, message } from 'antd';
import { MONEY_REG } from '../../common/systemParam';
import {city} from '../../common/cityData';
import {getProjectType} from '../../services/api';

export default class ApplyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: [ {cityCode: 610100, city: '西安'},{cityCode: 100100, city: '北京'}]
    }
  }
  componentDidMount() {

  }
  render() {
    const {pageNum} = this.props;
    return (
      <div className={`aform ${pageNum===1 ? '' : 'none'}`} style={{paddingTop: 30}}>
        <InfoForm />
      </div>
    );
  }
}

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
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
const styles = {
  label: {
    fontSize: 16,
  },
  inputHeight: {
    height: 40
  }
};
class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      industryType: []
    }
  }



  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单提交的数据');
        this.fetchParam();
      }
    });
  };

  async fetchParam() {
    // 调取接口返回数据
    this.props.setData({1:1});
  }

  validateNumber = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (MONEY_REG.test(value) && value * 1 <= 2 ) {
      callback('金额不能小于2');

    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={<span style={styles.label}>借款金额</span>}
        >
          <Row gutter={8}>
            <Col span={22}>
          {getFieldDecorator('account', {
            rules: [{
              required: true, message: '借款金额不能为空',
            }]
          })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </Col>
            <Col span={2}>
              <span style={styles.label}>万元</span>
            </Col>
          </Row>
        </FormItem>

        <FormItem
          {...formItemLayout}
          label={<span style={styles.label}>借款期数</span>}
        >
          <Row gutter={8}>
            <Col span={22}>
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '借款金额不能为空',
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </Col>
            <Col span={2}>
              <span style={styles.label}>个月</span>
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<span style={styles.label}>获客渠道</span>}
        >
          <Row gutter={8}>
            <Col span={22}>
              {getFieldDecorator('account', {
                rules: [],
                initialValue: '0'
              })(
              <Select size="large" style={styles.inputHeight}>
                <Select.Option value="0">网络搜索</Select.Option>
                <Select.Option value="1">熟人推荐分享</Select.Option>
                <Select.Option value="2">线下宣传</Select.Option>
              </Select>
              )}
            </Col>
            <Col span={2}>
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<span style={styles.label}>借款用途</span>}
        >
          <Row gutter={8}>
            <Col span={22}>
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '借款用途不能为空',
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </Col>
            <Col span={2}>
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<span style={styles.label}>预期年化利率</span>}
        >
          <Row gutter={8}>
            <Col span={22}>
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </Col>
            <Col span={2}>
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<span style={styles.label}>所在城市</span>}
        >
          <Row gutter={8}>
            <Col span={22}>
              {getFieldDecorator('cityCode', {
                initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                rules: [{
                  required: true, message: '请选择城市',
                }]
              })(<Cascader size="large" options={city} />)}
            </Col>
            <Col span={2}>
            </Col>
          </Row>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<span style={styles.label}>项目行业类别</span>}
        >
          <Row gutter={8}>
            <Col span={22}>
              {getFieldDecorator('type', {
                rules: [{
                  required: true, message: '请选择城市',
                }],
                initialValue: this.state.industryType[0]?this.state.industryType[0].fTypeCode:''
              })(
                <Select size="large" style={styles.inputHeight}>
                  {
                    this.state.industryType.map((data)=>{
                      return(
                        <Select.Option key={data.fTypeCode} value={data.fTypeCode}>{data.fTypeName}</Select.Option>
                      );
                    })
                  }
                </Select>
              )}
            </Col>
            <Col span={2}>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}
const InfoForm = Form.create()(Forms);
