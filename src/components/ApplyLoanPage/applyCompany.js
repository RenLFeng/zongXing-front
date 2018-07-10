import React from 'react';
import ImgUpload from '../../components/UpLoad/imgUpload';
import {Form, Select, Input, Button, Row, Col, Cascader, message} from 'antd';
import {MONEY_REG, BANK_CARD, TEL_PHONE, IMG_BASE_URL, LICENSE, reg_REG1, china_REG, ZHUZHI_REG, reg_REG} from '../../common/systemParam';
import {city} from '../../common/cityData';
import {getProjectType, getAddressCoordinate, POSITION_KEY, getCompanyByAccount} from '../../services/api';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 12},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 12},
    sm: {span: 14},
  },
};
const formItemLayoutTextArea = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 4},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 19},
  },
};
const formItemLayoutSmail = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 14},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 10},
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
      companyArr: [],
      companyName: ''
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
    this.fetchProjectType();
    this.getCompany();
  }

  async getCompany() {
    const response = await getCompanyByAccount();
    if (response.code === 0) {
      this.setState({
        companyArr: response.data
      });
    }
  }

  async getCoordinateByAddress(e) {
    const response = await getAddressCoordinate({
      key: POSITION_KEY,
      address: e.target.value,
      batch: true
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.commit !== nextProps.commit) {
      this.props.form.validateFieldsAndScroll((err, values) => {
        for (let i = 0; i < 14; i++) {
          if (this.state[`pic${i}loading`]) {
            message.warning('图片正在上传请稍后');
            return;
          }
        }
        if (!err) {
          const data = {
            company: {
              fsocialCreditCode: values.fsocialCreditCode
            },
            companyInfo: {
              fname: values.fname,
              fbankName: values.fbankName,
              fbankNo: values.fbankNo,
              fbusAddress: values.fbusAddress,
              fbusTrade: values.fbusTrade,
              ftelephone: values.ftelephone,
              ftopsh: values.ftopsh,
              fbusLicense: this.state.pic1 ? this.state.pic1 : '',
              ftaxPermit: this.state.pic2 ? this.state.pic2 : '',
              fbankPermit: this.state.pic3 ? this.state.pic3 : '',
              fhygienePermit: this.state.pic4 ? this.state.pic4 : '',
              fotherFile1: this.state.pic9 ? this.state.pic9: '',
              fotherFile2: this.state.pic10 ? this.state.pic10: '',
              fotherFile3: this.state.pic11 ? this.state.pic11: '',
              fauditFile: this.state.pic5 ? this.state.pic5 : '',
              fstatementFile: this.state.pic6 ? this.state.pic6 : '',
              fstockholderFile: this.state.pic7 ? this.state.pic7 : '',
              fplaceLease: this.state.pic8 ? this.state.pic8 : '',
              fjoinInstructionBook: this.state.pic12 ? this.state.pic12 : '',
              fjoinFile: this.state.pic13 ? this.state.pic13 : ''
            },
            project: {
              fId: this.props.fid
            }
          };
          this.props.switchPage(err, data, 3);
        } else {
          this.props.switchPage(err);
        }
      });
    }
    if (this.props.data !== nextProps.data) {
      this.setState({
        pic1: nextProps.data.fbus_license,
        pic2: nextProps.data.ftax_permit,
        pic3: nextProps.data.fbank_permit,
        pic4: nextProps.data.fhygiene_permit,
        pic5: nextProps.data.faudit_file,
        pic6: nextProps.data.fstatement_file,
        pic7: nextProps.data.fstockholder_file,
        pic8: nextProps.data.fplace_lease,
        pic9: nextProps.data.fother_file1,
        pic10: nextProps.data.fother_file2,
        pic11: nextProps.data.fother_file3,
        pic12: nextProps.data.fjoin_instruction_book,
        pic13: nextProps.data.fjoin_file,
      });
    }
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
        this.fetchParam();
      }
    });
  };

  async fetchParam() {
    // 调取接口返回数据
    this.props.setData({1: 1});
  }

  validateNumber = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    if (MONEY_REG.test(value) && value * 1 <= 2) {
      callback('金额不能小于2');

    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  };
  handleChange(val) {
    for (let data of this.state.companyArr) {
      if (data.fname === val) {
        this.props.form.setFieldsValue({
          fsocialCreditCode: data.fsocialCreditCode
        });
        return;
      }
    }
  }

  changeLoading(name, status) {
    this.setState({
      [`${name}loading`]: status
    })
  }
  changeState(name, src) {
    this.setState({
      [name]: src
    });
  }

  validateName = (rule, value, callback) => {
    const { getFieldValue } = this.props.form;
    if (value && /^[0-9]*$/.test(value)) {
      callback('不能为纯数字');
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    const { pageNum, dateCode, fProjectNo, data} = this.props;
    const dataPath = `project/${dateCode}/${fProjectNo}/`;
    return (
      <div className={`aform ${pageNum === 3 ? '' : 'none'}`} style={{paddingTop: 30}}>
        <Form onSubmit={this.handleSubmit}>
          <Row gutter={4}>
            <Col span={12}>
              <div style={{position: 'relative'}}>
                <span style={{color: 'red',position:'absolute',left:93,top:7,fontSize:20}}>*</span>
                <FormItem
                  {...formItemLayout}
                  label={<span style={styles.label}>公司名称</span>}
                >
                  {getFieldDecorator('fname', {
                    initialValue: data.companyName ? data.companyName : '',
                    rules: [{validator: this.validateName}]
                  })(<Select
                    mode="combobox"
                    id="fname"
                    defaultActiveFirstOption={false}
                    showArrow={false}
                    filterOption={false}
                    onChange={(val)=>this.handleChange(val)}
                  >
                    {this.state.companyArr.map((data, index)=>{
                      return (
                        <Select.Option value={data.fname} key={index}>{data.fname}</Select.Option>
                      );
                    })}
                  </Select>)}
                </FormItem>
              </div>
            </Col>
            <Col span={12}>
              <div style={{position: 'relative'}}>
                <span style={{color: 'red',position:'absolute',left:25,top:7,fontSize:20}}>*</span>
                <FormItem
                  {...formItemLayout}
                  label={<span style={styles.label}>统一社会信用代码</span>}
                >
                  {getFieldDecorator('fsocialCreditCode', {
                    initialValue: data.fsocial_credit_code ? data.fsocial_credit_code : '',
                    rules: [{pattern: LICENSE, message: '请输入正确的统一社会信用代码'}]
                  })(<Input id="fsocialCreditCode" style={styles.inputHeight} maxLength={'50'}/>)}
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={12}>
              <div style={{position: 'relative'}}>
                <span style={{color: 'red',position:'absolute',left:76,top:7,fontSize:20}}>*</span>
                <FormItem
                  {...formItemLayout}
                  label={<span style={styles.label}>企业开户行</span>}
                >
                  {getFieldDecorator('fbankName', {
                    initialValue: data.fcbank_name ? data.fcbank_name : '',
                    rules: [ {validator: this.validateName}]
                  })(<Input id="fbankName" style={styles.inputHeight} maxLength={'50'}/>)}
                </FormItem>
              </div>
            </Col>
            <Col span={12}>
              <div style={{position: 'relative'}}>
                <span style={{color: 'red',position:'absolute',left:47,top:7,fontSize:20}}>*</span>
                <FormItem
                  {...formItemLayout}
                  label={<span style={styles.label}>企业银行卡账号</span>}
                >
                  {getFieldDecorator('fbankNo', {
                    initialValue: data.fcbank_no ? data.fcbank_no : '',
                    rules: [{
                      pattern: BANK_CARD, message: '请输入正确的银行卡账号'
                    }]
                  })(<Input id="fbankNo" style={styles.inputHeight} maxLength={'50'}/>)}
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={12}>
              <div style={{position: 'relative'}}>
                <span style={{color: 'red',position:'absolute',left:62,top:7,fontSize:20}}>*</span>
                <FormItem
                  {...formItemLayout}
                  label={<span style={styles.label}>实际经营地址</span>}
                >
                  {getFieldDecorator('fbusAddress', {
                    initialValue: data.fbus_address ? data.fbus_address : '',
                    rules: [{pattern:ZHUZHI_REG, message:'请输入正确的经营地址（只能包含汉字，数字，字母，下划线）'}],
                  })(<Input id="fbusAddress" style={styles.inputHeight} maxLength={'100'} onChange={(e)=>this.getCoordinateByAddress(e)}/>)}
                </FormItem>
              </div>
            </Col>
            <Col span={12}>
              <div style={{position: 'relative'}}>
                <span style={{color: 'red',position:'absolute',left:93,top:7,fontSize:20}}>*</span>
                <FormItem
                  {...formItemLayout}
                  label={<span style={styles.label}>经营行业</span>}
                >
                  {getFieldDecorator('fbusTrade', {
                    rules: [],
                    initialValue: data.fbus_trade? data.fbus_trade: this.state.industryType[0] ? this.state.industryType[0].fTypeCode : ''
                  })(
                    <Select size="large" style={styles.inputHeight}>
                      {
                        this.state.industryType.map((data) => {
                          return (
                            <Select.Option key={data.fTypeCode} value={data.fTypeCode}>{data.fTypeName}</Select.Option>
                          );
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </div>
            </Col>
          </Row>
          <Row gutter={4}>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label={<span style={styles.label}>单位座机</span>}
              >
                {getFieldDecorator('ftelephone', {
                  initialValue: data.fctelephone ? data.fctelephone : '',
                  rules: [{
                    pattern: TEL_PHONE, message: '请输入正确的单位座机'
                  }]
                })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem
                {...formItemLayout}
                label={<span style={styles.label}>股东持股比例</span>}
              >
                {getFieldDecorator('ftopsh', {
                  initialValue: data.ftopsh ? data.ftopsh : '',
                  rules: []
                })(<Input style={styles.inputHeight} maxLength={'50'}/>)}
              </FormItem>
            </Col>
          </Row>
        </Form>
        <div style={{display: 'flex', paddingLeft: 105, paddingRight: 47, justifyContent: 'space-between'}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize: 16, marginRight: 13}}>营业执照</span>
            <div style={{
              width: 314, height: 172, border: '1px solid #ccc', display: 'flex', justifyContent: 'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic1} name="pic1" tipText="上传营业执照"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize: 16, marginRight: 13}}>税务登记许可证</span>
            <div style={{
              width: 314, height: 172, border: '1px solid #ccc', display: 'flex', justifyContent: 'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic2} name="pic2" tipText="税务登记许可证"/>
            </div>
          </div>
        </div>
        <div
          style={{display: 'flex', paddingLeft: 58, paddingRight: 47, justifyContent: 'space-between', marginTop: 25}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize: 16, marginRight: 13}}>银行开户许可证</span>
            <div style={{
              width: 314, height: 172, border: '1px solid #ccc', display: 'flex', justifyContent: 'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic3} name="pic3" tipText="银行开户许可证"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize: 16, marginRight: 13}}>卫生许可证</span>
            <div style={{
              width: 314, height: 172, border: '1px solid #ccc', display: 'flex', justifyContent: 'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic4} name="pic4" tipText="卫生许可证"/>
            </div>
          </div>
        </div>
        <div
          style={{display: 'flex', paddingLeft: 44, paddingRight: 47, justifyContent: 'space-between', marginTop: 25}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize: 16, marginRight: 13}}>企业财务审计报告</span>
            <div style={{
              width: 314, height: 172, border: '1px solid #ccc', display: 'flex', justifyContent: 'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic5} name="pic5" tipText="企业财务审计报告"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize: 16, marginRight: 13}}>企业三个月银行流水</span>
            <div style={{
              width: 314, height: 172, border: '1px solid #ccc', display: 'flex', justifyContent: 'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic6} name="pic6" type="documents/" tipText="企业三个月银行流水"/>
            </div>
          </div>
        </div>
        <div
          style={{display: 'flex', paddingLeft: 44, paddingRight: 47, justifyContent: 'space-between', marginTop: 25}}>
          <div style={{display: 'flex'}}>
            <span style={{fontSize: 16, marginRight: 13}}>企业股东构成文件</span>
            <div style={{
              width: 314, height: 172, border: '1px solid #ccc', display: 'flex', justifyContent: 'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic7} name="pic7" type="documents/" tipText="企业股东构成文件"/>
            </div>
          </div>
          <div style={{display: 'flex'}}>
            <span style={{fontSize: 16, marginRight: 13}}>企业经营场地租赁合同</span>
            <div style={{
              width: 314, height: 172, border: '1px solid #ccc', display: 'flex', justifyContent: 'center',
              alignItems: 'center', borderRadius: 3
            }}>
              <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic8} name="pic8" type="documents/" tipText="企业经营场地租赁合同"/>
            </div>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>其他资质文件</i>
          </div>
          <div className="imgbox border avatar-uploader" style={{display: 'flex', paddingLeft: 15}}>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic9} name="pic9" tipText="其他资质文件照片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic10} name="pic10" tipText="其他资质文件照片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic11} name="pic11" tipText="其他资质文件照片"/>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="tit">
            <i>企业加盟合同</i>
          </div>
          <div className="imgbox border avatar-uploader" style={{display: 'flex', paddingLeft: 15}}>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic12} name="pic12" tipText="企业加盟授权书-照片"/>
            <ImgUpload {...this.data} prefix={dataPath} imageUrl={this.state.pic13} name="pic13" type="documents/" tipText="企业加盟合同-附件"/>
          </div>
        </div>
      </div>
    );
  }
}
export default Form.create()(Forms);
