import React from 'react';
import {Form, Select, Input, Button, Row, Col, Cascader, message } from 'antd';
import { MONEY_REG, MUN_INTEGER } from '../../common/systemParam';
import {city} from '../../common/cityData';
import {getCityCode} from '../../services/api';

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
      industryType: [],
      cityList: []
    }
  }

  componentDidMount() {
    this.getCityList();
  }

  async getCityList() {
    const response = await getCityCode();
    if (response.code === 0 && response.data) {
      this.setState({
        cityList: response.data
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.commit !== nextProps.commit) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          const data = {
            project : {
              ...values,
              fId: this.props.fid,
              fCreditMoney: values.fCreditMoney ? values.fCreditMoney * 1 : null,
              fCreditMonth: values.fCreditMonth ? values.fCreditMonth * 1 : null,
              fRatePredict: values.fRatePredict ? values.fRatePredict * 1 : null,
              fCityCode: values.fCityCode.toString()
            }
          };
          this.props.switchPage(err, data, 1);
        } else {
          this.props.switchPage(err);
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
    const { pageNum, data } = this.props;
    const {cityList} = this.state;
    console.log(data);
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
                initialValue: data.fcredit_money ? `${data.fcredit_money}` : '',
                rules: [
                  {pattern: MONEY_REG, message: '请输入正确的金额格式'}
                ]
              })(<Input id="fCreditMoney" style={styles.inputHeight} maxLength={'50'}/>)}
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
                    initialValue: data.fcredit_month ? data.fcredit_month + '': '',
                    rules: [{
                      pattern: MUN_INTEGER, message: '请输入正确的借款期数'
                    }]
                  })(<Input id="fCreditMonth" style={styles.inputHeight} maxLength={'50'}/>)}
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
                  initialValue: data.fchannel ? data.fchannel : '0'
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
                    initialValue: data.fcredit_use? data.fcredit_use :'',
                    rules: []
                  })(<Input id="fCreditUse" style={styles.inputHeight} maxLength={'50'}/>)}
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
                  initialValue: data.frate_predict ? data.frate_predict + '' : '',
                  rules: [{
                    pattern: MONEY_REG, message: '请输入正确的预期年化利率'
                  }]
                })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
              </Col>
              <Col span={2}>
                <span style={styles.label}>%</span>
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
                    initialValue: data.fcity_code ? data.fcity_code : cityList.length > 0 ? cityList[0].fCode : ''
                  })(
                    <Select size="large" style={styles.inputHeight}>
                      {cityList.map((data)=>{
                        return (
                          <Select.Option key={data.fCode} value={data.fCode}>{data.fCityName}</Select.Option>
                        );
                      })}
                  </Select>)}
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
