import {getPersonAccount, getPersonAccountNew} from '../services/api';

export default {
  namespace: 'account',
  state: {
    personal: {
      accountDynamicVos: [],
      plan: null,
      totalAssets: null
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
