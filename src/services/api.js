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

export async function getHomeSwiperImg() {
  return request(`${BASE_URL}/zjb-website/home/banner`);
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

export async function testRequest(params) {
  return request(`${BASE_URL}/zjb-website/project/login`);
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

// 获取用户开户信息的接口
export async function getPersonalOpen() {
  return request(`${BASE_URL}/zjb-website/project/login`);
}

// 获取公司开户信息的接口
export async function getCompanyOpen() {
  return request(`${BASE_URL}/zjb-website/project/login`);
}

// 提交用户开户信息接口
export async function savePersonalOpen(params) {
  return request(`${BASE_URL}/zjb-website/project/login`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 提交公司开户信息接口
export async function saveCompanyOpen(params) {
  return request(`${BASE_URL}/zjb-website/project/login`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
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
