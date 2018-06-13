import { stringify } from 'qs';
import {req} from '../utils/request';
import { build } from '../common/systemParam';

let BASE_URL = 'http://test.5izjb.com:8001'; // 测试服务器
  /*开发配置*/
BASE_URL = 'http://192.168.1.173:8001';
document.title ="众借帮--开发环境";
 
export const POSITION_KEY = 'd5bf6909751ae65e4406e1bf656ecb59'; // 高德地图key

//优惠券service
export const CouponService = {
    getCouponCount: async ()=> req.get('/zjb-website/coupon/inv/MyCoupon/count'),
    getCoupon:async(param)=>req.post('/zjb-website/coupon/inv/MyCoupon',param),


};