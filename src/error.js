  import { routerRedux } from 'dva/router';
import {message} from 'antd';

const error = (e, dispatch) => {
  // if (e.name === 288) {
  //   //console.log(e);
  //   message.error('未登录或登录超时');
  //   //跳转登录页面
  //   localStorage.removeItem('accessToken');
  //   dispatch(routerRedux.push('/index/login'));
  //   dispatch({
  //     type: 'login/logoutData'
  //   });
  //   return;
  // }
  // message.error('请求失败');
};

export default error;
