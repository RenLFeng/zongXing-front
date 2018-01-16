import React from 'react';
import { Form, Input, Button, Select, Radio, DatePicker, Cascader } from 'antd';
import moment from 'moment';
import { connect } from 'dva';
import {USER_REG, VER_PHONE, TEL_PHONE, ID_CORD} from '../../common/systemParam';
import {city} from '../../common/cityData';

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
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
          ...values,
          fCityCode: fCityCode,
          fBirthday: values.fBirthday.format('YYYY/MM/DD')
        };
        console.log('数据接收后台需要的数据', userBase);
        this.props.param.dispatch({
          type: 'userData/getUserBase',
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
            rules:[{whitespace: true, message: '真实姓名中不能出现空格'}],
            initialValue: userBase.frealName?userBase.frealName: null
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="昵称"
        >
          {getFieldDecorator('fnickName', {
            rules:[{whitespace: true, message: '昵称中不能出现空格'}],
            initialValue: userBase.fnickName?userBase.fnickName: null
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="用户名"
          extra="用户名填写之后不可改!"
        >
          {getFieldDecorator('floginName', {
            rules:[{pattern: USER_REG, message: '用户名格式应为4到16位(可用字母，数字，下划线，减号)'}],
            initialValue: userBase.floginName?userBase.floginName: null
          })(<Input maxLength={'20'} disabled={!!userBase.floginName}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机号"
        >
          {getFieldDecorator('fmobile', {
            rules:[{pattern: VER_PHONE, message: '手机号格式不正确'}],
            initialValue: userBase.fmobile?userBase.fmobile: null
          })(<Input maxLength={'20'} disabled/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="身份证号"
        >
          {getFieldDecorator('fIdcardNo', {
            rules:[{pattern: ID_CORD, message: '身份证号格式不正确'}],
            initialValue: userBase.fIdcardNo?userBase.fIdcardNo: null
          })(<Input maxLength={'50'} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="座机"
        >
          {getFieldDecorator('fTelephone', {
            rules:[{pattern: TEL_PHONE, message: '座机格式不正确,应为 xxx-xxxxxxxx'}],
            initialValue: userBase.fTelephone?userBase.fTelephone: null
          })(<Input maxLength={'20'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="婚否"
        >
          {getFieldDecorator('fMarital', {
            rules:[],
            initialValue: userBase.fMarital?userBase.fMarital:'1'
          })(<Select>
              <Select.Option value="1">未婚</Select.Option>
              <Select.Option value="2">已婚</Select.Option>
              <Select.Option value="3">离异</Select.Option>
            </Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="学历"
        >
          {getFieldDecorator('fDeucation', {
            rules:[],
            initialValue: userBase.fDeucation?userBase.fDeucation:'1'
          })(<Select>
            <Select.Option value="1">大专及以下</Select.Option>
            <Select.Option value="2">大学</Select.Option>
            <Select.Option value="3">硕士</Select.Option>
            <Select.Option value="3">硕士</Select.Option>
          </Select>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="QQ号"
        >
          {getFieldDecorator('fQQ', {
            initialValue: userBase.fQQ?userBase.fQQ: null
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="微信号"
        >
          {getFieldDecorator('fWeichat', {
            initialValue: userBase.fWeichat ? userBase.fWeichat : null
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="邮箱"
        >
          {getFieldDecorator('fEmail', {
            rules: [{ type: 'email', message: '邮箱格式不正确' }],
            initialValue: userBase.fEmail? userBase.fEmail : null
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="家庭住址"
        >
          {getFieldDecorator('fAddress', {
            initialValue: userBase.fAddress? userBase.fAddress: null
          })(<Input.TextArea autosize={{ minRows: 2, maxRows: 3 }} maxLength={200}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="性别"
        >
          {getFieldDecorator('fGender', {
            initialValue: userBase.fGender?userBase.fGender: '1'
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
            initialValue: moment(userBase.fBirthday)
          })(
            <DatePicker />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="所在城市"
        >
          {getFieldDecorator('fCityCode', {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
          })(
            <Cascader options={city} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="工作"
        >
          {getFieldDecorator('fJo', {
            initialValue: userBase.fJo?userBase.fJo: null,
          })(<Input maxLength={'50'}/>)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="兴趣爱好"
        >
          {getFieldDecorator('fHobby', {
            initialValue: userBase.fHobby?userBase.fHobby : null,
          })(<Input maxLength={'50'}/>)}
        </FormItem>

        <FormItem {...btnLayout}>
          <Button style={{width: '200px'}} type="primary"  htmlType="submit" loading={this.props.param.loading}>提交</Button>
        </FormItem>
      </Form>
    );
  }
}

const UserBaseForm = Form.create()(UserBaseFormInput);

@connect((state) => ({
  loading: state.userData.userBaseLoading,
  userBase: state.userData.userBaseData
}))
export default class UserBaseInput extends React.Component {
  render() {
    return (
      <div>
        <UserBaseForm param={this.props}/>
      </div>
    );
  }
}
