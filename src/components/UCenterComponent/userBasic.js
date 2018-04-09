
import React from 'react';
import { Link } from 'dva/router';
import { Form, Input, Button, Select, Radio, DatePicker, Cascader, Spin } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import {USER_REG, VER_PHONE, TEL_PHONE, ID_CORD, NAME_REG_, QQ_REG, WeChat_REG, ZHUZHI_REG, HOBBY_REG} from '../../common/systemParam';
import {city} from '../../common/cityData';
import { getJudgeUserName } from '../../services/api';

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

class UserBaseFormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.param.dispatch({
      type: 'userData/getUserBase'
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.param.successStatus && !nextProps.param.successStatus) {
      this.props.param.dispatch({
        type: 'userData/getUserBase'
      });
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 数据格式转换 cityCode
        let fCityCode = '';
        if (values.fCityCode && values.fCityCode.length > 0) {
          fCityCode = values.fCityCode[values.fCityCode.length - 1];
        }
        // 获得后台需要的数据
        const userBase = {
          user: !values.frealName && !values.fnickName && !values.floginName ? null :  {
            frealName: values.frealName,
            fnickName: values.fnickName,
            floginName: values.floginName
          },
          userInfo: {
            fIdcardNo: values.fIdcardNo,
            fTelephone: values.fTelephone,
            fMarital: values.fMarital * 1,
            fDeucation: values.fDeucation,
            fQQ: values.fQQ,
            fWeichat: values.fweichat,
            fEmail: values.fEmail,
            fAddress: values.fAddress,
            fGender: values.fGender,
            fBirthday: values.fBirthday ? new Date(values.fBirthday.format('YYYY/MM/DD')): null,
            fCityCode,
            fJob: values.fJob,
            fHobby: values.fHobby
          }
        };
        console.log('数据接收后台需要的数据', userBase);
        this.props.param.dispatch({
          type: 'userData/commitUserBase',
          payload: userBase
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userBase } = this.props.param;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="真实姓名"
        >
          {getFieldDecorator('frealName', {
            rules:[{pattern: NAME_REG_, message: '请输入合法的中文'},
              {whitespace: true, message: '真实姓名中不能出现空格'}],
            initialValue: userBase.freal_name?userBase.freal_name: null
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="昵称"
        >
          {getFieldDecorator('fnickName', {
            rules:[{whitespace: true, message: '昵称中不能出现空格'}],
            initialValue: userBase.fnickname?userBase.fnickname: null
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户名"
          extra="用户名填写之后不可改!"
        >
          {getFieldDecorator('floginName', {
            rules:[{pattern: USER_REG, message: '用户名格式应为2到16位(可用字母，数字，下划线，减号)'}],
            initialValue: userBase.flogin_name?userBase.flogin_name: null
          })(<Input
           maxLength={'20'}
            disabled={!!userBase.flogin_name}
             onBlur={(e)=>this.judgeUserName(e)}
             
             />)}
        </FormItem>
        {this.state.error ? 
        <p style={{color: 'red',marginLeft: 195,marginTop: '-20px'}}>用户名已存在</p>: null}
        <FormItem
          {...formItemLayout}
          label="身份证号"
        >
          {getFieldDecorator('fIdcardNo', {
            rules:[{pattern: ID_CORD, message: '身份证号格式不正确'}],
            initialValue: userBase.fidcard_No?userBase.fidcard_No: null
          })(<Input maxLength={'50'} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="座机"
        >
          {getFieldDecorator('fTelephone', {
            rules:[{pattern: TEL_PHONE, message: '座机格式不正确,应为 xxx-xxxxxxxx'}],
            initialValue: userBase.ftelephone?userBase.ftelephone: null
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="婚否"
        >
          {getFieldDecorator('fMarital', {
            rules:[],
            initialValue: userBase.fmarital?userBase.fmarital+'':'0'
          })(<Select>
            <Select.Option value="0">未知</Select.Option>
            <Select.Option value="1">未婚</Select.Option>
            <Select.Option value="2">已婚</Select.Option>
          </Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="学历"
        >
          {getFieldDecorator('fDeucation', {
            rules:[],
            initialValue: userBase.fdeucation?userBase.fdeucation:'大专及以下'
          })(<Select>
            <Select.Option value="大专及以下">大专及以下</Select.Option>
            <Select.Option value="大学">大学</Select.Option>
            <Select.Option value="硕士">硕士</Select.Option>
            <Select.Option value="博士">博士</Select.Option>
          </Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="QQ号"
        >
          {getFieldDecorator('fQQ', {
            rules:[{pattern: QQ_REG, message: '请输入合法的QQ号'}],
            initialValue: userBase.fqq?userBase.fqq: null
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="微信号"
        >
          {getFieldDecorator('fweichat', {
            rules:[{pattern: WeChat_REG, message:'请输入合法的微信号'}],
            initialValue: userBase.fweichat ? userBase.fweichat : null
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('fEmail', {
            rules: [{ type: 'email', message: '邮箱格式不正确' }],
            initialValue: userBase.femail? userBase.femail : null
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="家庭住址"
        >
          {getFieldDecorator('fAddress', {
            rules:[{pattern: ZHUZHI_REG, message:'请输入合法的家庭住址信息' }],
            initialValue: userBase.faddress? userBase.faddress: null
          })(<Input.TextArea autosize={{ minRows: 2, maxRows: 3 }} maxLength={200}/>)}
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
          label="生日"
        >
          {getFieldDecorator('fBirthday', {
            initialValue: userBase.fbirthday ? moment(userBase.fbirthday): null
          })(
            <DatePicker placeholder={'请选择'}/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="所在城市"
        >
          {getFieldDecorator('fCityCode', {
            initialValue: userBase.fcity_code ? userBase.fcity_code[0]==='0'&& userBase.fcity_code[1]===','?userBase.fcity_code.substring(2, userBase.fcity_code.length).split(','):userBase.fcity_code.split(','): null,
          })(
            <Cascader options={city} placeholder={'请选择'}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工作"
        >
          {getFieldDecorator('fJob', {
            rules:[{pattern: HOBBY_REG, message: '请输入合法的内容'}],
            initialValue: userBase.fjob?userBase.fjob: null,
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="兴趣爱好"
        >
          {getFieldDecorator('fHobby', {
            rules:[{pattern: HOBBY_REG, message: '请输入合法的中文'}],
            initialValue: userBase.fhobby?userBase.fhobby : null,
          })(<Input maxLength={'50'}/>)}
        </FormItem>

        <FormItem {...btnLayout}>
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
      <div className="fr uc-rbody">
        <Spin spinning={this.props.loading} tip="请稍后" size="large">
          <UserBaseForm param={this.props}/>
        </Spin>
      </div>
    );
  }
}
