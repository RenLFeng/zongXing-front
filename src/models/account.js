import {getPersonAccount, getPersonAccountNew,getCompanylist} from '../services/api';
import {message} from 'antd';

export default {
  namespace: 'account',
  state: {
    personal: {
      accountDynamicVos: [],
      plan: {},
      totalAssets: {}
    },
    companyListStatus: false,
    companyList: [],
    company: [],
    personalStatus: false,
    companyStatus: false,
    num: 0,
    company_page : {
      accountDynamicVos: [],
      plan: {},
      totalAssets: {}
    }
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
    *getCompanyAccount({payload}, {call,put}) {
      const res = yield call(getPersonAccountNew, payload );
      console.log(res);
      if (res.code === 0) {
        yield put({
          type: 'saveCompany',
          payload: res.data
        });
      } else {
        message.error(res.msg);
      }
    },
    *getCompanyLists({payload}, {call,put}) {
      const resp = yield call(getCompanylist, payload );
      console.log(resp);
      if(resp.code ===0) {
        yield put({
          type: 'saveCompanyList',
          payload: resp.data
        });
      } else {
        message.error(resp.msg);
      }
    }
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
        company_page: payload
      };
    },
    saveCompanyList(state, {payload}) {
      return {
        ...state,
        companyListStatus: true,
        companyList: payload
      };
    }
  },
};
