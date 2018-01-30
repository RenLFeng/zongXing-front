import React from 'react';
import ImgUpload from '../../components/UpLoad/imgUpload';
import {Form, Select, Input, Button, Row, Col, Cascader, message } from 'antd';
import { MONEY_REG } from '../../common/systemParam';
import {city} from '../../common/cityData';
import {getProjectType} from '../../services/api';

export default class ApplyCompany extends React.Component {
  render() {
    const {pageNum} = this.props;
    return (
      <div className={`aform ${pageNum===3 ? '' : 'none'}`} style={{paddingTop: 30}}>
        <CompanyForm />
        <div style={{display: 'flex', paddingLeft: 105,paddingRight: 47, justifyContent: 'space-between'}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>营业执照</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传营业执照"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>税务登记许可证</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传税务登记许可证"/>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', paddingLeft: 58,paddingRight: 47, justifyContent: 'space-between',marginTop: 25}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>银行开户许可证</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传营业执照"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>卫生许可证</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传税务登记许可证"/>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', paddingLeft: 44,paddingRight: 47, justifyContent: 'space-between',marginTop: 25}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>企业财务审计报告</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传企业财务审计报告"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>企业三个月银行流水</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传企业三个月银行流水"/>
            </div>
          </div>
        </div>
        <div style={{display: 'flex', paddingLeft: 44,paddingRight: 47, justifyContent: 'space-between',marginTop: 25}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>企业股东构成文件</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="企业股东构成文件"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>企业经营场地租赁合同</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传企业经营场地租赁合同"/>
            </div>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>其他资质文件</i>
          </div>
          <div className="imgbox border avatar-uploader" style={{display: 'flex', paddingLeft: 15}}>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
          </div>
        </div>

        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>企业加盟合同</i>
          </div>
          <div className="imgbox border avatar-uploader" style={{display: 'flex', paddingLeft: 15}}>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传附件"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传附件"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传附件"/>
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
    this.fetchProjectType();
  }

  async fetchProjectType() {
    const response = await getProjectType();
    if (response.code === 0) {
      this.setState({
        industryType: response.data
      });
    } else {
      message.error('获取行业类别失败')
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
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>公司名称</span>}
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
              label={<span style={styles.label}>统一社会信用代码</span>}
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
              label={<span style={styles.label}>企业开户行</span>}
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
              label={<span style={styles.label}>企业银行账户</span>}
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
              label={<span style={styles.label}>实际经营地址</span>}
            >
              {getFieldDecorator('account', {
                rules: [{
                  required: true, message: '借款金额不能为空',
                }],
                initialValue: '0'
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>经营行业</span>}
            >
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
            </FormItem>
          </Col>
        </Row>
        <Row gutter={4}>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>单位座机</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>股东持股比例</span>}
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
const CompanyForm = Form.create()(Forms);
