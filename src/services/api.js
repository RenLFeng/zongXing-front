import { stringify } from 'qs';
import request from '../utils/request';

const BASE_URL = 'http://192.168.1.4:8001';

const POSITION_KEY = 'd5bf6909751ae65e4406e1bf656ecb59';

export async function userLogin(param) {
  return request(`${BASE_URL}/zjb-manage/users?${stringify(param)}`);
}

export async function getLocation() {
	return request(`http://restapi.amap.com/v3/ip?&key=${POSITION_KEY}`);
}

export async function getHomeSwiperImg() {
  return request(`${BASE_URL}/zjb-website/home/banner`);
}

export async function getHomeProjectList(param) {
  return request(`${BASE_URL}/zjb-website/project/homeProject${param ? '/?cityCode=' + param : ''}`);
}
