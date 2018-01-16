import { saveUserBase, getUserBaseData, getPersonalOpen, getCompanyOpen,savePersonalOpen, saveCompanyOpen } from '../services/api';

export default {
  namespace: 'userData',
  state: {
    userBaseData: {},  //基础资料数据
    userBaseLoading: false, //基础资料数据提交/获取状态
    personalOpenLoading: false, // 用户开户信息提交/获取状态
    personalOpen: {},  // 用户开户信息
    companyOpenLoading: false,  // 企业开户信息提交/获取状态
    companyOpen: {}    // 企业开户信息
  },
  effects: {
    // 提交基础资料数据
    *commitUserBase({payload}, {call, put}) {
      yield put({type: 'startFetchData'});
      const response = yield call(saveUserBase, payload);
      if (response.code === 0) {
        yield put({
          type: 'endFetchUserBase',
          payload: response.data
        });
      } else {
        yield put({
          type: 'endFetchUserBase',
          payload: payload
        });
        console.log(response.msg);
      }
    },
    // 获取基础资料数据
    *getUserBase({payload}, {call, put}) {
      yield put({type: 'startFetchData'});
      const response = yield call(getUserBaseData, payload);
      if (response.code === 0) {
        yield put({
          type: 'endFetchUserBase',
          payload: response.data
        });
      } else {
        yield put({
          type: 'endFetchUserBase',
          payload: {}
        });
        console.log(response.msg);
      }
    },
    // 提交用户开户数据
    *commitUserOpen({payload}, {call, put}) {
      yield put({type: 'startFetchPersonal'});
      const response = yield call(savePersonalOpen, payload);
      if (response.code === 0) {
        yield put({
          type: 'endFetchPersonal',
          payload: response.data
        });
      } else {
        yield put({
          type: 'endFetchPersonal',
          payload: payload
        });
        console.log(response.msg);
      }
    },
    // 获取用户开户数据
    *getUserOpen({payload}, {call, put}) {
      yield put({type: 'startFetchPersonal'});
      const response = yield call(getPersonalOpen, payload);
      if (response.code === 0) {
        yield put({
          type: 'endFetchPersonal',
          payload: response.data
        });
      } else {
        yield put({
          type: 'endFetchPersonal',
          payload: {}
        });
        console.log(response.msg);
      }
    },
    // 提交企业开户数据
    *commitCompanyOpen({payload}, {call, put}) {
      yield put({type: 'startFetchCompany'});
      const response = yield call(saveCompanyOpen, payload);
      if (response.code === 0) {
        yield put({
          type: 'endFetchCompany',
          payload: response.data
        });
      } else {
        yield put({
          type: 'endFetchCompany',
          payload: payload
        });
        console.log(response.msg);
      }
    },
    // 获取企业开户数据
    *getCompanyOpen({payload}, {call, put}) {
      yield put({type: 'startFetchCompany'});
      const response = yield call(getCompanyOpen, payload);
      if (response.code === 0) {
        yield put({
          type: 'endFetchCompany',
          payload: response.data
        });
      } else {
        yield put({
          type: 'endFetchCompany',
          payload: {}
        });
        console.log(response.msg);
      }
    },
  },
  reducers: {
    startFetchData(state) {
      return {
        ...state,
        userBaseLoading: true
      };
    },
    endFetchUserBase(state, { payload }) {
      return {
        ...state,
        userBaseLoading: false,
        userBaseData:{
          ...payload
        }
      };
    },
    startFetchPersonal(state) {
      return {
        ...state,
        personalOpenLoading: true
      }
    },
    endFetchPersonal(state, { payload }) {
      return {
        ...state,
        personalOpenLoading: false,
        personalOpen: {
          ...payload
        }
      }
    },
    startFetchCompany(state) {
      return {
        ...state,
        companyOpenLoading: true
      }
    },
    endFetchCompany(state, { payload }) {
      return {
        ...state,
        companyOpenLoading: false,
        companyOpen: {
          ...payload
        }
      }
    }
  },
};
