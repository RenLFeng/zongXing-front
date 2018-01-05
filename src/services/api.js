import { stringify } from 'qs';
import request from '../utils/request';

const BASE_URL = 'http://192.168.1.4:8001'

export async function userLogin(param) {
  return request(`${BASE_URL}/zjb-manage/users?${stringify(param)}`);
}

export async function getLocation() {
	return request('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js');
}