import { routerRedux } from 'dva/router';
import {userLogin} from '../services/api';

export default {
  namespace: 'login',
  state: {
    status: false
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put({
        type: 'changeSubmitting',
        payload: true,
      });
      const response = yield call(userLogin, payload);
      console.log(payload);
      console.log(response)
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      localStorage.setItem('webtoken', response)
      if (response[0].fstatus === 1) {
        console.log(123456)
        yield put(routerRedux.push('/'));
      }
    },
  },
  reducers: {
    changeSubmitting(state, {payload}) {
      return {
        ...state,
        submitting: payload
      };
    },
    changeLoginStatus(state, {payload}) {
      return { 
        ...state,
        status: payload.code === 0 ? ture : false,
        submitting: false,
      };
    },
  },
};
