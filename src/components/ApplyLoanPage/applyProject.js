import React from 'react';
import ImgUpload from '../../components/UpLoad/imgUpload';
import {Form, Select, Input, Button, Row, Col, Cascader, message } from 'antd';
import { MONEY_REG, IMG_BASE_URL } from '../../common/systemParam';
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

    };
    this.data = {
      className:"ant-uploa",
      type:"images/",
      divClassName:"upload-div",
      changeState: (name, src)=>this.changeState(name, src),
      changeLoading: (name, status) => this.changeLoading(name, status),
      baseUrl: IMG_BASE_URL
    };
  }

  componentDidMount() {
  }


  componentWillReceiveProps(nextProps) {
    if (this.props.commit !== nextProps.commit) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        for (let i = 0; i < 15; i++) {
          if (this.state[`pic${i}loading`]) {
            message.warning('图片正在上传请稍后');
            return;
          }
        }
        const fReadMePic = [];
        for (let i = 3; i< 9; i++) {
          fReadMePic.push(this.state[`pic${i}`]);
        }
        const fMyProjectPic = [];
        for (let i = 9; i< 15; i++) {
          fMyProjectPic.push(this.state[`pic${i}`]);
        }
        if (!err) {
          console.log('表单提交的数据');
          const data = {
            project: {
              fName: values.fName
            },
            projectInfo: {
              fVideoPath: values.fVideoPath,
              fCardPicPath: this.state.pic1?this.state.pic1: '',
              fBannerPicPath: this.state.pic2?this.state.pic2: '',
              fReadMePic: fReadMePic.toString(),
              fMyProjectPic: fMyProjectPic.toString(),
              fWhyLoan: values.fWhyLoan,
              fPayFrom: values.fPayFrom
            },
            myProjectDesc: values.myProjectDesc,
            readmeDesc: values.readmeDesc
          };
          this.props.switchPage(err, data, 2);
        } else {
          this.props.switchPage(err);
        }
      });
    }
  }
  changeLoading(name, status) {
    this.setState({
      [`${name}loading`]: status
    })
  }
  changeState(name, src) {
    console.log('name', name);
    console.log('src', src);
    this.setState({
      [name]: src
    });
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
    const { pageNum, dateCode, fProjectNo} = this.props;
    const dataPath = `project/${dateCode}/${fProjectNo}/`;
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
                })(<Input id="projectName" style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </div>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>借款视频</span>}
            >
              {getFieldDecorator('account', {
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>
        <div style={{display: 'flex', paddingLeft: 44,paddingRight: 47, justifyContent: 'space-between',marginBottom: 25}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>借款项目展示图片</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic1} name="pic1" tipText="上传借款项目展示图片"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize:16, marginRight: 13}}>添加项目展示背景大图</span>
            <div style={{width: 314,height: 172,border:'1px solid #ccc',display: 'flex',justifyContent:'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic2} name="pic2" tipText="上传添加项目展示背景大图"/>
            </div>
          </div>
        </div>
        <FormItem
          {...formItemLayoutTextArea}
          label={<span style={styles.label}>我的自述</span>}
        >
          {getFieldDecorator('readmeDesc', {
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
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic3} name="pic3" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic4} name="pic4" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic5} name="pic5" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic6} name="pic6" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic7} name="pic7" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic8} name="pic8" tipText="上传图片"/>
          </div>
        </div>
        <FormItem
          {...formItemLayoutTextArea}
          label={<span style={styles.label}>我的项目</span>}
        >
          {getFieldDecorator('myProjectDesc', {
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
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic9} name="pic9" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic10} name="pic10" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic11} name="pic11" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic12} name="pic12" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic13} name="pic13" tipText="上传图片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic14} name="pic14" tipText="上传图片"/>
          </div>
        </div>
        <FormItem
          {...formItemLayoutTextArea}
          label={<span style={styles.label}>为何众借</span>}
        >
          {getFieldDecorator('fWhyLoan', {
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
          {getFieldDecorator('fPayFrom', {
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
