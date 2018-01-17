import {getSafeData} from '../services/api';

export default {
  namespace: 'safeCenter',
  state: {
    safeData: {
      securityCenter: {}
    },
    safeDataLoading: false
  },
  effects: {
    *getSafe(_, { call, put }) {
      //请求安全中心首页数据
      yield put({
        type: 'startSafeData'
      });
      const response = yield call(getSafeData);
      if (response.code === 0) {
        yield put({
          type: 'endSafeData',
          payload: response.data
        });
      } else {
        yield put({
          type: 'endSafeData',
          payload: {}
        });
      }
    },
  },
  reducers: {
    startSafeData(state) {
      return {
        ...state,
        safeDataLoading: true
      };
    },
    endSafeData(state, {payload}) {
      return {
        ...state,
        safeDataLoading: false,
        safeData: payload
      };
    }
  },
};
