import { getHomeProjectList, getProjectList } from '../services/api';
import { animate } from '../assets/home/animate';
import { startAnimate } from '../assets/project/index';

export default {
  namespace: 'project',
  state: {
    homeProjectList: [],
    completeProjectList: {
      loading: false,
      list: [],
      maxPage: 0,
      currentPage: 0
    },
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
    *initCompletePage(_, { put }) {
      //初始化完成的项目页面
      yield put({
        type: 'initCompletePageData'
      })
    },
    *fetchCompleteProjectList({payload}, {call, put}) {
      //加载已完成的项目列表
      yield put({
        type: 'fetchCompleteProjectLoading',
      });
      const response = yield call(getProjectList, payload);
      if (response.code === 0) {
        // 将数据存进页面
        yield put({
          type: 'saveCompleteProject',
          payload: {...response.data, currentPage: payload.pageNow}
        });
        // 重置动画
        setTimeout(()=>{
          startAnimate();
        }, 300);
      } else {
        //console.log(response.msg);
      }
    }
  },
  reducers: {
    saveHomeProjectList(state, { payload }) {
      return {
        ...state,
        homeProjectList: payload
      }
    },
    initCompletePageData(state) {
      return {
        ...state,
        completeProjectList: {
          list: [],
          maxPage: 0,
          currentPage: 0
        }
      }
    },
    fetchCompleteProjectList(state, { payload }) {
      return {
        ...state,
      }
    },
    fetchCompleteProjectLoading(state) {
      return {
        ...state,
        completeProjectList: {
          loading: true,
          list: [],
          maxPage: 1,
          currentPage: 1
        }
      }
    },
    saveCompleteProject(state, {payload}) {
      return {
        ...state,
        completeProjectList: {
          loading: false,
          list: payload.projectCardVos,
          maxPage: payload.pageCount,
          currentPage: payload.currentPage
        }
      }
    }
  },
};
