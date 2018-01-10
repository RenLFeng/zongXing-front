import { getHomeProjectList } from '../services/api';
import { animate } from '../assets/home/animate';

export default {
  namespace: 'project',
  state: {
    homeProjectList: []
  },
  effects: {
    *getHomeProject({ payload }, { call, put }) {
      //开始请求 首页项目列表
      const response = yield call(getHomeProjectList, payload);
      if (response.code === 0) {
        // 将图片信息全局管理起来
        yield put({
          type: 'saveHomeProjectList',
          payload: response.data
        });
        //当获取到图片的时候 加载轮播图
        animate();
      }
    },
  },
  reducers: {
    saveHomeProjectList(state, { payload }) {
      return {
        ...state,
        homeProjectList: payload
      }
    }
  },
};
