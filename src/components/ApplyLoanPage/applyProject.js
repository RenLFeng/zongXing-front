import React from 'react';
import ImgUpload from '../../components/UpLoad/imgUpload';
import {Form, Select, Input, Button, Row, Col, Cascader, message } from 'antd';
import { MONEY_REG } from '../../common/systemParam';
import {city} from '../../common/cityData';
import {getProjectType} from '../../services/api';

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

    }
  }

  componentDidMount() {
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
    const {pageNum} = this.props;
    return (
      <div className={`aform ${pageNum===4 ? '' : 'none'}`}>
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={4}>
          <Col span={12}>
            <div style={{position: 'relative'}}>
              <span style={{color: 'red',position:'absolute',left:93,top:7,fontSize:20}}>*</span>
              <FormItem
                {...formItemLayout}
                label={<span style={styles.label}>项目名称</span>}
              >
                {getFieldDecorator('account', {
                  rules: []
                })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </div>
          </Col>
          <Col span={12}>
            <div style={{position: 'relative'}}>
              <span style={{color: 'red',position:'absolute',left:93,top:7,fontSize:20}}>*</span>
              <FormItem
                {...formItemLayout}
                label={<span style={styles.label}>借款视频</span>}
              >
                {getFieldDecorator('account', {
                  rules: []
                })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </div>
          </Col>
        </Row>
        <div style={{display: 'flex', paddingLeft: 44,paddingRight: 47, justifyContent: 'space-between',marginBottom: 25}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>借款项目展示图片</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传借款项目展示图片"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>添加项目展示背景大图</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传添加项目展示背景大图"/>
            </div>
          </div>
        </div>
        <FormItem
          {...formItemLayoutTextArea}
          label={<span style={styles.label}>我的自述</span>}
        >
          {getFieldDecorator('account', {
            rules: [],
            initialValue: '0'
          })(
            <Input.TextArea autosize={{ minRows: 6, maxRows: 7 }} />
          )}
        </FormItem>
        <div className="row2 clearfix" style={{marginLeft: -18, marginBottom: 25}}>
          <div className="tit">
            <i></i>
          </div>
          <div className="imgbox border" style={{display: 'flex',flexWrap: 'wrap',padding: 25 }}>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
          </div>
        </div>
        <FormItem
          {...formItemLayoutTextArea}
          label={<span style={styles.label}>我的项目</span>}
        >
          {getFieldDecorator('account', {
            rules: [],
            initialValue: '0'
          })(
            <Input.TextArea autosize={{ minRows: 6, maxRows: 7 }} />
          )}
        </FormItem>
        <div className="row2 clearfix" style={{marginLeft: -18, marginBottom: 25}}>
          <div className="tit">
            <i></i>
          </div>
          <div className="imgbox border" style={{display: 'flex',flexWrap: 'wrap',padding: 25 }}>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
            <ImgUpload className="ant-uploa" divClassName="upload-div" tipText="上传图片"/>
          </div>
        </div>
        <FormItem
          {...formItemLayoutTextArea}
          label={<span style={styles.label}>为何众借</span>}
        >
          {getFieldDecorator('account', {
            rules: [],
            initialValue: '0'
          })(
            <Input.TextArea autosize={{ minRows: 6, maxRows: 7 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayoutTextArea}
          label={<span style={styles.label}>还款来源</span>}
        >
          {getFieldDecorator('account', {
            rules: [],
            initialValue: '0'
          })(
            <Input.TextArea autosize={{ minRows: 6, maxRows: 7 }} />
          )}
        </FormItem>
      </Form>
      </div>
    );
  }
}
export default Form.create()(Forms);
