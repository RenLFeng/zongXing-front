import React from 'react';
import { connect } from 'dva';
import styles from './LoginPage.less';
import i18n from '../i18n/i18n';

@connect(state => ({
  user: state.user,
}))
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.change = this.change.bind(this);
    this.login = this.login.bind(this);
  }
  
  //用户账号密码的录入
  change(e) {
    const a = e.target.name;
    this.setState({
      [a] : e.target.value
    });
  }

  //用户登录
  login(e) {
    console.log('click login',this.state.username,this.state.password);
    const {dispatch} = this.props;
    dispatch({
      type: 'login/login',
      payload: {
        username: this.state.username,
        password: this.state.password
      },
    });
    e.preventDefault(); //阻止表单提交
  }

  render() {
    const { dispatch } = this.props;
    console.log(this.props)
    return (
      <form className={styles.content} onChange={this.change} onSubmit={this.login}>
      	<input type="text" name="username"/>
      	<input type="password" name="password"/>
      	<button type="submit">提交</button>
      </form>
    );
  }
}

