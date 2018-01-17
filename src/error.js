import { routerRedux } from 'dva/router';

const error = (e, dispatch) => {
  if (e.name === 400 || e.name === 403) {
  	console.log('状态码403');
    return;
  }
  if (e.name <= 504 && e.name >= 500) {
    console.log('状态码500');
    return;
  }
  if (e.name >= 404 && e.name < 422) {
   console.log('状态码404');
  }
};

export default error;
