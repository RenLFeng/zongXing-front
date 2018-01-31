import {getPersonAccount, getPersonAccountNew} from '../services/api';
import {message} from 'antd';

export default {
  namespace: 'account',
  state: {
    personal: {
      accountDynamicVos: [],
      plan: {},
      totalAssets: {}
    },
    company: [],
    personalStatus: false,
    companyStatus: false,
    num: 0
  },
  effects: {
    *getCompanyNum({payload}){

    },
    *getPersonalAccount({payload}, {call, put}) {
      console.log(payload);
      const response = yield call(getPersonAccountNew, payload);
      if (response.code === 0) {
        yield put({
          type: 'savePersonal',
          payload: response.data
        });
      } else {
        message.error(response.msg);
      }
    },
  },
  reducers: {
    savePersonal(state, {payload}) {
      return {
        ...state,
        personalStatus: true,
        personal: payload
      }
    },
    saveCompany(state, {payload}) {
      return {
        ...state,
        companyStatus: true,
        company: payload
      };
    },
  },
};
