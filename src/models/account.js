import {getPersonAccount} from '../services/api';

export default {
  namespace: 'account',
  state: {
    personal: null,
    company: [],
    personalStatus: false,
    companyStatus: false,
    num: 0
  },
  effects: {
    *getCompanyNum({payload}){

    },
    *getAccount({payload}, {call, put}) {
      console.log(payload);
      const response = yield call(getPersonAccount, payload);
      if (response.code === 0) {
        if (payload === '0') {
          yield put({
            type: 'savePersonal',
            payload: response.data.accountInfo
          });
        }
        if (payload === '1') {
          yield put({
            type: 'saveCompany',
            payload: response.data.accountInfos
          });
        }
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
