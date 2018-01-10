import { getHomeSwiperImg } from '../services/api';
import { initPage } from '../assets/home/index'

export default {
  namespace: 'systemData',
  state: {
    homeImg: []
  },
  effects: {
    *getHomeImg(_, { call, put }) {
      //开始请求 轮播图图片
      const response = yield call(getHomeSwiperImg);
      if (response.code === 0) {
        // 将图片信息全局管理起来
        yield put({
          type: 'saveHomeImg',
          payload: response.data
        });
        //当获取到图片的时候 加载轮播图
        initPage();
      }
    },
  },
  reducers: {
    saveHomeImg(state, { payload }) {
      return {
        ...state,
        homeImg: payload
      }
    }
  },
};
