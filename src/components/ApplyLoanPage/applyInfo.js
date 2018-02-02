import React from 'react';
import {Form, Select, Input, Button, Row, Col, Cascader, message } from 'antd';
import { MONEY_REG } from '../../common/systemParam';
import {city} from '../../common/cityData';
import {getProjectType} from '../../services/api';

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

  componentWillReceiveProps(nextProps) {
    if (this.props.commit !== nextProps.commit) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        this.props.switchPage(err);
        if (!err) {
          console.log('表单提交的数据');

        }
      });
    }
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
    const {pageNum} = this.props;
    return (
      <div className={`aform ${pageNum===1 ? '' : 'none'}`} style={{paddingTop: 30}}>
        <Form onSubmit={this.handleSubmit}>
          <div style={{position: 'relative'}}>
            <span style={{color: 'red',position:'absolute',left:185,top:7,fontSize:20}}>*</span>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>借款金额</span>}
            >
              <Row gutter={8}>
                <Col span={22}>
              {getFieldDecorator('fCreditMoney', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
                </Col>
                <Col span={2}>
                  <span style={styles.label}>万元</span>
                </Col>
              </Row>
            </FormItem>
          </div>

          <div style={{position: 'relative'}}>
            <span style={{color: 'red',position:'absolute',left:185,top:7,fontSize:20}}>*</span>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>借款期数</span>}
            >
              <Row gutter={8}>
                <Col span={22}>
                  {getFieldDecorator('fCreditMonth', {
                    rules: []
                  })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
                </Col>
                <Col span={2}>
                  <span style={styles.label}>个月</span>
                </Col>
              </Row>
            </FormItem>
          </div>
          <FormItem
            {...formItemLayout}
            label={<span style={styles.label}>获客渠道</span>}
          >
            <Row gutter={8}>
              <Col span={22}>
                {getFieldDecorator('fChannel', {
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
          <div style={{position: 'relative'}}>
            <span style={{color: 'red',position:'absolute',left:185,top:7,fontSize:20}}>*</span>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>借款用途</span>}
            >
              <Row gutter={8}>
                <Col span={22}>
                  {getFieldDecorator('fCreditUse', {
                    rules: []
                  })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
                </Col>
                <Col span={2}>
                </Col>
              </Row>
            </FormItem>
          </div>
          <FormItem
            {...formItemLayout}
            label={<span style={styles.label}>预期年化利率</span>}
          >
            <Row gutter={8}>
              <Col span={22}>
                {getFieldDecorator('fRatePredict', {
                  rules: []
                })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
              </Col>
              <Col span={2}>
              </Col>
            </Row>
          </FormItem>
          <div style={{position: 'relative'}}>
            <span style={{color: 'red',position:'absolute',left:185,top:7,fontSize:20}}>*</span>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>所在城市</span>}
            >
              <Row gutter={8}>
                <Col span={22}>
                  {getFieldDecorator('fCityCode', {
                    initialValue: ['zhejiang', 'hangzhou', 'xihu'],
                    rules: []
                  })(<Cascader size="large" options={city} />)}
                </Col>
                <Col span={2}>
                </Col>
              </Row>
            </FormItem>
          </div>
        </Form>
      </div>
    );
  }
}
export default Form.create()(Forms);
