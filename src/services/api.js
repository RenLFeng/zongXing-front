import { stringify } from 'qs';
import request from '../utils/request';

const BASE_URL = 'http://192.168.1.4:8001';

const POSITION_KEY = 'd5bf6909751ae65e4406e1bf656ecb59';

export async function userLogin(param) {
  return request(`${BASE_URL}/zjb-website/login`, {
    method: 'POST',
    body: {
      ...param
    }
  });
}

export async function getLocation() {
	return request(`http://restapi.amap.com/v3/ip?&key=${POSITION_KEY}`);
}

export async function getHomeSwiperImg(param) {
  return request(`${BASE_URL}/zjb-website/webpage/banner?ftype=${param}`);
}

export async function getHomeProjectList(param) {
  return request(`${BASE_URL}/zjb-website/project/homecard?cityCode=${param ? param : ''}`);
}

export async function getProjectList(params) {
  return request(`${BASE_URL}/zjb-website/project/list`,{
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取账户信息的接口 ftype 0: 个人账户 1: 企业账户
export async function getPersonAccount(param) {
  return request(`${BASE_URL}/zjb-website/account/info?ftype=${param}`)
}

// 获取个人账户信息的接口
export async function getPersonAccountNew(params) {
  return request(`${BASE_URL}/zjb-website/account/show/info`,{
    method: 'POST',
    body: {
      ...params
    }
  });
}

// 获取企业信息的接口
export async function getCompany() {
  return request(`${BASE_URL}/zjb-website/company/self/show/num`)
}

// 提交开户资料的接口
export async function commitOpenAccount(params) {
  return request(`${BASE_URL}/zjb-dc/account/add`,{
    method: 'POST',
    body: {
      ...params,
    },
  })
}

export async function getProjectDetail(param) {
  return request(`${BASE_URL}/zjb-website/projectInfo/getOne/${param}`);
}

// 存储用户基础信息的接口
export async function saveUserBase(params) {
  return request(`${BASE_URL}/zjb-website/userInfo/saveUserInfo`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}



// 获取用户基础信息的接口
export async function getUserBaseData() {
  return request(`${BASE_URL}/zjb-website/userInfo/findOne`);
}

// 获取安全中心 首页数据接口
export async function getSafeData() {
  return request(`${BASE_URL}/zjb-website/securityCenter/findByuserId`)
}

// 校验手机号是否存在的接口
export async function phoneExist(param) {
  return request(`${BASE_URL}/zjb-website/check/${param}`)
}

// 获取注册验证码的接口
export async function getAuthCode(param) {
  return request(`${BASE_URL}/zjb-website/sendMessage/${param}`)
}

// 注册用户 接口
export async function regUser(params) {
  return request(`${BASE_URL}/zjb-website/register`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 测试充值 接口
export async function rechargeTest() {
  return request(`http://zjb2.ngrok.xiaomiqiu.cn/loan/recharge`);
}

//获取消息列表
export async function messageList(params) {
  return request(`http://192.168.1.79:9002/notice/record/show/self`,{
    method: 'POST',
    body: {
      ...params,
    }
  });
}
//查看详情
export async function isOrNot(params){
  return request(`http://192.168.1.79:9002/notice/specify/read/${params}`);
}

// 获取一个问题下所有问题
export async function getAnswerbyQaId(QaId) {
  return request(`${BASE_URL}/zjb-website/answer/getOne/${QaId}`);
}

// 添加问题回复
export async function addAnswer(params) {
  return request(`${BASE_URL}/zjb-website/answer/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 获取一个项目下所有问题
export async function getProQuestion(projectId) {
  return request(`${BASE_URL}/zjb-website/projectQuestion/getOne/${projectId}`);
}

// 添加问题
export async function addQuestion(params) {
  return request(`${BASE_URL}/zjb-website/projectQuestion/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 一个项目下的所有话题
export async function getProTopic(projectId) {
  return request(`${BASE_URL}/zjb-website/projectTopic/getOne/${projectId}`);
}

// 添加话题问题
export async function addQuestionTopic(params) {
  return request(`${BASE_URL}/zjb-website/projectTopic/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 获取我的话题
export async function getMyTopic(projectId) {
  return request(`${BASE_URL}/zjb-website/projectTopic/myTopic/${projectId}`)
}

// 获取一个话题下的所有回复
export async function getReplyByTopic(topicId) {
  return request(`${BASE_URL}/zjb-website/projectTopicReply/getOne/${topicId}`)
}

// 添加回复
export async function addReply(params) {
  return request(`${BASE_URL}/zjb-website/projectTopicReply/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 查询项目历程
export async function selectProJourney(projectId) {
  return request(`${BASE_URL}/zjb-website/projectJourney/getOne/${projectId}`)
}

// 添加项目历程
export async function addProJourney(params) {
  return request(`${BASE_URL}/zjb-website/projectJourney/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 点赞
export async function praise(journeyId) {
  return request(`${BASE_URL}/zjb-website/projectJourney/praise/${journeyId}`)
}

// 获取项目行业编码类别接口
export async function getProjectType() {
  return request(`${BASE_URL}/zjb-website/getProjectCode`)
}
