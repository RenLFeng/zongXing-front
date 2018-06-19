import {req} from '../utils/request'; 
  
export const POSITION_KEY = 'd5bf6909751ae65e4406e1bf656ecb59'; // 高德地图key

//优惠券service
export const CouponService = {
    getCouponCount: async ()=> req.get('/zjb-website/coupon/inv/MyCoupon/count'),
    getCoupon:async(param)=>req.post('/zjb-website/coupon/inv/MyCoupon',param),
    receiveCoupon:async(param)=>req.get('/zjb-website/coupon/receive',param),
    

};

// 账户服务
export const accountService={
    //资金动态
    getAccountStatement:async(param)=>req.post('/zjb-dc/capital/dynamic',param),
}