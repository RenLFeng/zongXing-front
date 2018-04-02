import { saveUserBase, getUserBaseData, getPersonalOpen, getCompanyOpen,savePersonalOpen, saveCompanyOpen } from '../services/api';
import {message} from 'antd';

export default {
  namespace: 'userData',
  state: {
    userBaseData: {},  // 基础资料数据
    userBaseLoading: false, // 基础资料数据提交/获取状态
    changeDataStatus: false, // 保存基础资料数据
  },
  effects: {
    // 提交基础资料数据
    *commitUserBase({payload}, {call, put}) {
      yield put({type: 'saveUserBase'});
      try {
        const response = yield call(saveUserBase, payload);
        if (response.code === 0) {
          yield put({
            type: 'endSuccess'
          });
          message.info('保存成功');
          yield put({
            type: 'login/changeNickName',
            payload: {
              nickName: payload.user.fnickName
            }
          });
          // 将数据存在本地缓存中
          const data = JSON.parse(localStorage.getItem('accessToken'));
          data.nickName = payload.user.fnickName;
          localStorage.setItem('accessToken',JSON.stringify(data))
        } else {
          yield put({
            type: 'endFetchUserBase',
          });
          message.error(response.msg);
          console.log(response.msg);
        }
      } catch(e) {
        yield put({
          type: 'endFetchUserBase',
        });
        if (typeof e === 'object' && e.name === 288) {
          throw e;
        }
        message.error('服务器繁忙，请稍后重试');
      }

    },
    // 获取基础资料数据
    *getUserBase({payload}, {call, put}) {
      yield put({type: 'startFetchData'});
      try {
        const response = yield call(getUserBaseData, payload);
        if (response.code === 0) {
          yield put({
            type: 'getUserDataSuccess',
            payload: response.data
          });
        } else {
          yield put({
            type: 'endFetchUserBase',
          });
          console.log(response.msg);
        }
      } catch(e) {
        yield put({
          type: 'endFetchUserBase',
        });
        if (typeof e === 'object' && e.name === 288) {
          throw e;
        }
        message.error('服务器繁忙，请稍后重试');

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
        userBaseLoading: false
      };
    },
    saveUserBase(state, { payload }) {
      return {
        ...state,
        userBaseLoading: true,
        changeDataStatus: true
      }
    },
    endSuccess(state, { payload }) {
      return {
        ...state,
        changeDataStatus: false,
        userBaseLoading: false
      }
    },
    getUserDataSuccess(state, { payload }) {
      return {
        ...state,
        userBaseLoading: false,
        userBaseData: {
          ...payload
        }
      }
    }
  },
};
