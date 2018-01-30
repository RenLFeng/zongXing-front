import React from 'react';
import ImgUpload from '../../components/UpLoad/imgUpload';
import {Form, Select, Input, Button, Row, Col, Cascader, message } from 'antd';
import { MONEY_REG } from '../../common/systemParam';
import {city} from '../../common/cityData';

export default class ApplyPerson extends React.Component {
  render() {
    const {changePersonInfo, pageNum} = this.props;
    return (
      <div className={`aform ${pageNum===2 ? '' : 'none'}`} style={{ paddingTop: 30 }}>
        <PersonalForm />
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>身份证上传</i>
          </div>
          <div className="imgbox border avatar-uploader" style={{display: 'flex', paddingLeft: 15}}>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="身份证正面"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="身份证反面"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="手持身份证"/>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>个人资产证明</i>
          </div>
          <div className="imgbox border avatar-uploader" style={{display: 'flex', paddingLeft: 15}}>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="本人手持车本"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="本人手持房本"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传债券,股票等"/>
          </div>
        </div>
      </div>
    );
  }
}

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 12 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 12 },
    sm: { span: 14 },
  },
};
const formItemLayoutTextArea = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 },
  },
};
const formItemLayoutSmail = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 10 },
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

  componentDidMount() {

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
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>姓名</span>}
            >
            {getFieldDecorator('account', {
              rules: [{
                required: true, message: '借款金额不能为空',
              }]
            })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>身份证号</span>}
            >
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '借款金额不能为空',
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>手机</span>}
            >
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '借款金额不能为空',
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>座机</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>婚姻情况</span>}
            >
              {getFieldDecorator('account', {
                rules: [],
                initialValue: '0'
              })(<Select size="large" style={styles.inputHeight}>
                <Select.Option value="0">未婚</Select.Option>
                <Select.Option value="1">已婚</Select.Option>
                <Select.Option value="2">离异</Select.Option>
              </Select>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>学历</span>}
            >
              {getFieldDecorator('account', {
                rules: [],
                initialValue: '0'
              })(<Select size="large" style={styles.inputHeight}>
                <Select.Option value="0">大专及以下</Select.Option>
                <Select.Option value="1">本科</Select.Option>
                <Select.Option value="2">硕士</Select.Option>
                <Select.Option value="3">博士及以上</Select.Option>
              </Select>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>QQ号</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>微信号</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>银行卡号</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>开户银行</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>企业邮箱</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>家庭地址</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>
        <FormItem
          {...formItemLayoutTextArea}
          label={<span style={styles.label}>个人资产说明</span>}
        >
          {getFieldDecorator('account', {
            rules: [],
            initialValue: '0'
          })(
            <Input.TextArea autosize={{ minRows: 6, maxRows: 7 }} />
          )}
        </FormItem>
        <Row>
          <Col span={6} push={1}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 15 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 9 }}}
              label={<span style={styles.label}>（第一联系人）姓名</span>}
            >
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '借款金额不能为空',
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6} push={1}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 12 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 12 }}}
              label={<span style={styles.label}>身份证号</span>}
            >
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '借款金额不能为空',
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 13 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 11 }}}
              label={<span style={styles.label}>手机</span>}
            >
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '借款金额不能为空',
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6} pull={1}>
            <FormItem
              {...formItemLayoutSmail}
              label={<span style={styles.label}>社会关系</span>}
            >
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '借款金额不能为空',
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6} push={1}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 15 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 9 }}}
              label={<span style={styles.label}>（商业伙伴）姓名</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6} push={1}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 12 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 12 }}}
              label={<span style={styles.label}>身份证号</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 13 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 11 }}}
              label={<span style={styles.label}>手机</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6} pull={1}>
            <FormItem
              {...formItemLayoutSmail}
              label={<span style={styles.label}>社会关系</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={6} push={1}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 15 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 9 }}}
              label={<span style={styles.label}>（朋友）姓名</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6} push={1}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 12 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 12 }}}
              label={<span style={styles.label}>身份证号</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 13 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 11 }}}
              label={<span style={styles.label}>手机</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6} pull={1}>
            <FormItem
              {...formItemLayoutSmail}
              label={<span style={styles.label}>社会关系</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>


      </Form>
    );
  }
}
const PersonalForm = Form.create()(Forms);
