import { routerRedux } from 'dva/router';
import {message} from 'antd';

const error = (e, dispatch) => {
  if (e.name === 403) {
    message.error('请先登录');
    //跳转登录页面
    dispatch(routerRedux.push('/index/login'));
    return;
  }
  console.log(123,e.name);
  message.error('请求失败');
};

export default error;
