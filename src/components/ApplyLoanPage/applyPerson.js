import React from 'react';
import ImgUpload from '../../components/UpLoad/imgUpload';
import {Form, Select, Input, Button, Row, Col, Cascader, message } from 'antd';
import { MONEY_REG,IMG_BASE_URL,ID_CORD, VER_PHONE, TEL_PHONE, BANK_CARD, E_MAIL } from '../../common/systemParam';
import {city} from '../../common/cityData';


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
const Bucket = 'zjb01-1255741041';
const Region = 'ap-shanghai';
class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      industryType: [],
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
        for (let i = 0; i < 7; i++) {
          if (this.state[`pic${i}loading`]) {
            message.warning('图片正在上传请稍后');
            return;
          }
        }
        if (!err) {
          console.log('表单提交的数据');
          const arr = [];
          // 获取关系人社会信息
          for (let i = 1; i < 4; i++) {
            const personalData = {
              fName: values[`fName${i}`] ? values[`fName${i}`] : '',
              fIdcardNo: values[`fIdcardNo${i}`] ? values[`fIdcardNo${i}`] : '',
              fPhone: values[`fPhone${i}`] ? values[`fPhone${i}`] : '',
              fRelation: values[`fRelation${i}`] ? values[`fRelation${i}`] : '',
              ftype: i
            };
            arr.push(personalData);
          }
          const data = {
            lender: {
              fName: values.fName,
              fIDCardNo: values.fIDCardNo,
              fMobile: values.fMobile,
              fTelephone: values.fTelephone,
              fMarriage: values.fMarriage,
              fEducation: values.fEducation,
              fQQ: values.fQQ,
              fWeiChat: values.fWeiChat,
              fBankNo: values.fBankNo,
              fBankName: values.fBankName,
              fCompanyEmail: values.fCompanyEmail,
              fAddress: values.fAddress,
              fProperty: values.fProperty,
              fIDCardPic1: this.state.pic1 ? this.state.pic1 : '',
              fIDCardPic2: this.state.pic2 ? this.state.pic2 :'',
              fIDCardPic3: this.state.pic3 ? this.state.pic3 : '',
              fCarPic: this.state.pic4 ? this.state.pic4 : '',
              fHousePic1: this.state.pic5 ? this.state.pic5 : '',
              fOtherPicJson: this.state.pic6 ? this.state.pic6: ''
            },
            lenderOtherContactList: arr,
            project: {
              fId: this.props.fid
            }
          };
          this.props.switchPage(err, data, 2);
        } else {
          this.props.switchPage(err);
        }
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('表单提交的数据');
        const arr = [];
        // 获取关系人社会信息
        for (let i = 1; i < 4; i++) {
          const personalData = {
            fName: values[`fName${i}`] ? values[`fName${i}`] : '',
            fIdcardNo: values[`fIdcardNo${i}`] ? values[`fIdcardNo${i}`] : '',
            fPhone: values[`fPhone${i}`] ? values[`fPhone${i}`] : '',
            fRelation: values[`fRelation${i}`] ? values[`fRelation${i}`] : '',
            ftype: i
          };
          arr.push(personalData);
        }
        const data = {
          lender: {

          },
          lenderOtherContactList: arr
        };
        console.log(data);
        this.props.switchPage(err, data, 2);
      } else {
        this.props.switchPage(err);
      }
    });
  };

  async fetchParam() {
    // 调取接口返回数据
    this.props.setData({1:1});
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
      <div className={`aform ${pageNum===2 ? '' : 'none'}`} style={{ paddingTop: 30 }}>
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={4}>
          <Col span={12}>
            <div style={{position: 'relative'}}>
              <span style={{color: 'red',position:'absolute',left:124,top:7,fontSize:20}}>*</span>
              <FormItem
                {...formItemLayout}
                label={<span style={styles.label}>姓名</span>}
              >
              {getFieldDecorator('fName', {
                rules: [],
                initialValue: ''
              })(<Input id="personalName" style={styles.inputHeight} maxLength={'20'}/>)}
              </FormItem>
            </div>
          </Col>
          <Col span={12}>
            <div style={{position: 'relative'}}>
              <span style={{color: 'red',position:'absolute',left:92,top:7,fontSize:20}}>*</span>
              <FormItem
                {...formItemLayout}
                label={<span style={styles.label}>身份证号</span>}
              >
                {getFieldDecorator('fIDCardNo', {
                  rules: [{
                    pattern: ID_CORD, message: '请填写正确的身份号'
                  }],
                  initialValue: ''
                })(<Input id="fIDCardNo" style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </div>
          </Col>
        </Row>
        <Row gutter={4}>
          <Col span={12}>
            <div style={{position: 'relative'}}>
            <span style={{color: 'red',position:'absolute',left:124,top:7,fontSize:20}}>*</span>
              <FormItem
                {...formItemLayout}
                label={<span style={styles.label}>手机</span>}
              >
                {getFieldDecorator('fMobile', {
                  initialValue: '',
                  rules: [{
                    pattern: VER_PHONE, message: '请填写正确的手机号'
                  }]
                })(<Input id="fMobile" style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </div>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>座机</span>}
            >
              {getFieldDecorator('fTelephone', {
                initialValue: '',
                rules: [{
                  pattern: TEL_PHONE, message: '请填写正确的座机号'
                }]
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
              {getFieldDecorator('fMarriage', {
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
              {getFieldDecorator('fEducation', {
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
              {getFieldDecorator('fQQ', {
                initialValue: '',
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>微信号</span>}
            >
              {getFieldDecorator('fWeiChat', {
                initialValue: '',
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
              {getFieldDecorator('fBankNo', {
                initialValue: '',
                rules: [{
                  pattern: BANK_CARD, message: '请输入正确的银行卡号'
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>开户银行</span>}
            >
              {getFieldDecorator('fBankName', {
                initialValue: '',
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
              {getFieldDecorator('fCompanyEmail', {
                initialValue: '',
                rules: [{
                  pattern:E_MAIL, message: '请输入正确的企业邮箱'
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              {...formItemLayout}
              label={<span style={styles.label}>家庭地址</span>}
            >
              {getFieldDecorator('fAddress', {
                initialValue: '',
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>
        <FormItem
          {...formItemLayoutTextArea}
          label={<span style={styles.label}>个人资产说明</span>}
        >
          {getFieldDecorator('fProperty', {
            initialValue: '',
            rules: [],
          })(
            <Input.TextArea autosize={{ minRows: 6, maxRows: 7 }} />
          )}
        </FormItem>
        <Row>
          <Col span={6} push={1}>
            <div style={{position: 'relative'}}>
              <span style={{color: 'red',position:'absolute',left:5,top:7,fontSize:20}}>*</span>
              <FormItem
                labelCol={{xs: { span: 24 }, sm: { span: 15 }}}
                wrapperCol={{xs: { span: 24 }, sm: { span: 9 }}}
                label={<span style={styles.label}>（第一联系人）姓名</span>}
              >
                {getFieldDecorator('fName1', {
                  initialValue: '',
                  rules: []
                })(<Input id="fName1" style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </div>
          </Col>
          <Col span={6} push={1}>
            <div style={{position: 'relative'}}>
              <span style={{color: 'red',position:'absolute',left:50,top:7,fontSize:20}}>*</span>
              <FormItem
                labelCol={{xs: { span: 24 }, sm: { span: 12 }}}
                wrapperCol={{xs: { span: 24 }, sm: { span: 12 }}}
                label={<span style={styles.label}>身份证号</span>}
              >
                {getFieldDecorator('fIdcardNo1', {
                  initialValue: '',
                  rules: [{
                    pattern: ID_CORD, message: '请填写正确的身份号'
                  }]
                })(<Input id="fIdcardNo1" style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </div>
          </Col>
          <Col span={6}>
            <div style={{position: 'relative'}}>
              <span style={{color: 'red',position:'absolute',left:92,top:7,fontSize:20}}>*</span>
              <FormItem
                labelCol={{xs: { span: 24 }, sm: { span: 13 }}}
                wrapperCol={{xs: { span: 24 }, sm: { span: 11 }}}
                label={<span style={styles.label}>手机</span>}
              >
                {getFieldDecorator('fPhone1', {
                  initialValue: '',
                  rules: [{
                    pattern: VER_PHONE, message: '请填写正确的手机号'
                  }]
                })(<Input id="fPhone1" style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </div>
          </Col>
          <Col span={6} pull={1}>
            <div style={{position: 'relative'}}>
              <span style={{color: 'red',position:'absolute',left:70,top:7,fontSize:20}}>*</span>
              <FormItem
                {...formItemLayoutSmail}
                label={<span style={styles.label}>社会关系</span>}
              >
                {getFieldDecorator('fRelation1', {
                  initialValue: '',
                })(<Input id="fRelation1" style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={6} push={1}>
            <FormItem
              labelCol={{xs: { span: 24 }, sm: { span: 15 }}}
              wrapperCol={{xs: { span: 24 }, sm: { span: 9 }}}
              label={<span style={styles.label}>（商业伙伴）姓名</span>}
            >
              {getFieldDecorator('fName2', {
                initialValue: '',
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
              {getFieldDecorator('fIdcardNo2', {
                initialValue: '',
                rules: [{
                  pattern: ID_CORD, message: '请填写正确的身份号'
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
              {getFieldDecorator('fPhone2', {
                initialValue: '',
                rules: [{
                  pattern: VER_PHONE, message: '请填写正确的手机号'
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6} pull={1}>
            <FormItem
              {...formItemLayoutSmail}
              label={<span style={styles.label}>社会关系</span>}
            >
              {getFieldDecorator('fRelation2', {
                initialValue: '',
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
              {getFieldDecorator('fName3', {
                initialValue: '',
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
              {getFieldDecorator('fIdcardNo3', {
                initialValue: '',
                rules: [{
                  pattern: ID_CORD, message: '请填写正确的身份号'
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
              {getFieldDecorator('fPhone3', {
                initialValue: '',
                rules: [{
                  pattern: VER_PHONE, message: '请填写正确的手机号'
                }]
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
          <Col span={6} pull={1}>
            <FormItem
              {...formItemLayoutSmail}
              label={<span style={styles.label}>社会关系</span>}
            >
              {getFieldDecorator('fRelation3', {
                initialValue: '',
                rules: []
              })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
            </FormItem>
          </Col>
        </Row>


      </Form>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>身份证上传</i>
          </div>
          <div className="imgbox border avatar-uploader" style={{display: 'flex', paddingLeft: 15}}>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic1} name="pic1" tipText="身份证正面"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic2} name="pic2" tipText="身份证反面"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic3} name="pic3" tipText="手持身份证"/>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>个人资产证明</i>
          </div>
          <div className="imgbox border avatar-uploader" style={{display: 'flex', paddingLeft: 15}}>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic4} name="pic4" tipText="本人手持车本"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic5} name="pic5" tipText="本人手持房本"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic6} name="pic6" tipText="上传债券,股票等"/>
          </div>
        </div>
      </div>
    );
  }
}
export default Form.create()(Forms);
