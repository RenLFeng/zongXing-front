import {getPersonAccount} from '../services/api';

export default {
  namespace: 'account',
  state: {
    personal: {},
    company: [],
    personalStatus: false,
    companyStatus: false
  },
  effects: {
    *getAccount({payload}, {call, put}) {
      const response = yield call(getPersonAccount, payload);
      if (response.code === 0) {
        if (payload === '0') {
          yield put({
            type: 'savePersonal',
            payload: response.data
          });
        }
        if (payload === '1') {
          yield put({
            type: 'saveCompany',
            payload: response.data
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
