
import React from 'react';
import { Link } from 'dva/router';
import { Form, Input, Button, Select, Radio, DatePicker, Cascader, Spin,Checkbox,Row, Col,Upload, Icon, message } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import {USER_REG, VER_PHONE, TEL_PHONE, ID_CORD, NAME_REG_, QQ_REG, WeChat_REG, ZHUZHI_REG, HOBBY_REG} from '../../common/systemParam';
import {city} from '../../common/cityData';

import { getJudgeUserName,getUserBaseData,saveUserBase } from '../../services/api';
import LeftMenu from '../../components/UCenterComponent/leftMenu';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
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

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ['Apple', 'Pear', 'Oranteteteteetg','gfgddhd','tfgfddfg'];
class UserBaseFormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      fid:null,
      userBase: {

      }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getUserBase();
  }

  componentWillReceiveProps(nextProps) {
    //if (this.props.param.successStatus && !nextProps.param.successStatus) {
    //  this.props.param.dispatch({
    //    type: 'userData/getUserBase'
    //  });
    //}
  }


  // 获取个人基础资料
  async getUserBase() {
    const response = await getUserBaseData();
    console.log(response);
    if(response.code===0){
      if(response.data){
        let base = response.data;
        this.setState({
          fid:base.fid,
          userBase: {
            ...base,
            fhobby: base.fhobby?JSON.parse(base.fhobby):[]
          }
        });
      }
    } else {
      response.msg && message.error(response.msg)
    }
  }
  async judgeUserName(e) {
    const response = await getJudgeUserName(e.target.value.trim());
    if (response.code === 0 ) {
      this.setState({error: false});
    } else {
      this.setState({error: true});
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async(err, values) => {
      if (!err) {
        // 数据格式转换 cityCode
        let fCityCode = '';
        if (values.fCityCode && values.fCityCode.length > 0) {
          fCityCode = values.fCityCode[values.fCityCode.length - 1];
        }
        // 获得后台需要的数据
        const userBase = {
          user:{
            fid:this.state.fid,
            fheadPic:values.fheadPic?values.fheadPic:""
          },
          userInfo: {
            fMarital: values.fMarital * 1,
            fDeucation: values.fDeucation,
            fQQ: values.fQQ,
            fWeichat: values.fweichat,
            fAddress: values.fAddress,
            fGender: values.fGender,
            fCityCode,
            fJob: values.fJob,
            fHobby: JSON.stringify(values.fHobby)
          }
        };
        console.log('数据接收后台需要的数据', userBase);

        const response = await saveUserBase(userBase);

        console.log(response);

        //this.props.param.dispatch({
        //  type: 'userData/commitUserBase',
        //  payload: userBase
        //});
      }
    });
  }
  filter = (inputValue, path) => {
    return (path.some(city => (city.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
  };
  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userBase } = this.state;
    return (
        <Form onSubmit={this.handleSubmit} className="user_form">
          <FormItem
            {...formItemLayout}
            label="头像" className="upload_box"
            >
            {getFieldDecorator('fhead_pic', {
              initialValue: userBase.fhead_pic?userBase.fhead_pic:null
            })(<Upload name="files" action="/upload" listType="picture"
              >
              <Button type="ghost">
                <Icon type="upload" /> 点击上传
              </Button>
            </Upload>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="性别"
            >
            {getFieldDecorator('fGender', {
              initialValue: userBase.fgender?userBase.fgender: '1'
            })(<Radio.Group >
              <Radio value='1'>男</Radio>
              <Radio value='2'>女</Radio>
            </Radio.Group>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="婚否"
            >
            {getFieldDecorator('fMarital', {
              initialValue: userBase.fmarital?userBase.fmarital+'':'1'
            })(<Radio.Group >
              <Radio value='1'>未婚</Radio>
              <Radio value='2'>已婚</Radio>
            </Radio.Group>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="学历"
            >
            {getFieldDecorator('fDeucation', {
              initialValue: userBase.fdeucation?userBase.fdeucation:'',
            })(<Radio.Group >
              <Radio value='本科'>本科</Radio>
              <Radio value='硕士'>硕士</Radio>
              <Radio value='博士'>博士</Radio>
              <Radio value='大专及以下'>大专及以下</Radio>
            </Radio.Group>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="微信号"
            >
            {getFieldDecorator('fweichat', {
              rules:[{pattern: WeChat_REG, message:'请输入合法的微信号'}],
              initialValue: userBase.fweichat ? userBase.fweichat : null
            })(<Input maxLength={'50'} placeholder={'请输入微信号'}/>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="QQ号"
            >
            {getFieldDecorator('fQQ', {
              rules:[
                //{ required: true, message: '请输入您QQ号' },
                {pattern: QQ_REG, message: '请输入合法的QQ号'}
              ],
              initialValue: userBase.fqq?userBase.fqq: null
            })(<Input maxLength={'50'} placeholder={'请输入QQ号'}/>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="工作"
            >
            {getFieldDecorator('fJob', {
              rules:[{pattern: HOBBY_REG, message: '请输入合法的内容'}],
              initialValue: userBase.fjob?userBase.fjob: null,
            })(<Input maxLength={'50'} placeholder={'输入工作职位'}/>)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="所在城市"
            >
            {getFieldDecorator('fCityCode', {
              initialValue: userBase.fcity_code ? userBase.fcity_code[0]==='0'&& userBase.fcity_code[1]===','?userBase.fcity_code.substring(2, userBase.fcity_code.length).split(','):userBase.fcity_code.split(','): null,
            })(
              <Cascader options={city} placeholder={'请选择'} showSearch={this.filter} notFoundContent={'无匹配项'}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="家庭住址"
            >
            {getFieldDecorator('fAddress', {
              rules:[{pattern: ZHUZHI_REG, message:'请输入合法的家庭住址信息' }],
              initialValue: userBase.faddress? userBase.faddress: null
            })(<Input.TextArea autosize={{ minRows: 5, maxRows: 8 }} maxLength={200}/>)}
          </FormItem>
        <FormItem
          {...formItemLayout}
          label="兴趣爱好"
        >
          {getFieldDecorator('fHobby', {
            initialValue: userBase.fhobby?userBase.fhobby : [],
          })(
            <CheckboxGroup options={plainOptions} />
          )}
        </FormItem>

        <FormItem {...btnLayout} className="ant_submit">
          <Button
            style={{width: '200px'}}
            type="primary" htmlType="submit" loading={this.props.param.loading}>提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const UserBaseForm = Form.create()(UserBaseFormInput);

@connect((state) => ({
  loading: state.userData.userBaseLoading,
  userBase: state.userData.userBaseData,
  successStatus: state.userData.changeDataStatus
}))
export default class UserBasic extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="fr uc-rbody user-form-box" style={{width:"100%",float:"none"}}>
          <Spin spinning={this.props.loading} tip="请稍后" size="large">
            <div className="real_title_">
              <span className="safeCenter_">实名认证</span>
              <span>&gt; 基础资料</span>
            </div>
            <UserBaseForm param={this.props}/>
          </Spin>
        </div>
      </div>

    );
  }
}
