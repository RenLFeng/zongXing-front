import { saveUserBase, getUserBaseData, getPersonalOpen, getCompanyOpen,savePersonalOpen, saveCompanyOpen } from '../services/api';

export default {
  namespace: 'userData',
  state: {
    userBaseData: {},  //基础资料数据
    userBaseLoading: false, //基础资料数据提交/获取状态
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
  },
};
