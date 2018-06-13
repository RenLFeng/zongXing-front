import React from 'react';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import '../../assets/ucenter/mycoupon.scss';
import Coupon from '../Coupon/Coupon';
import {CouponService} from '../../services/api2';
import { get } from 'http';
import { Pagination } from 'antd';



// {
//     "code": 0,
//     "msg": "查询我的优惠券成功",
//     "data": {
//       "money": 0,
//       "allCount": 0,
//       "list":[{
//          fid,优惠券ID
//           fname,优惠券名称
//           ffull_sub_condition,满减条件
//           ffull_sub_money,面值
//           flogo_pic,企业logo
//           fend_time,有效期截至日期
//           fdesc,代金券说明
//           fsurplus_num,剩余数量（待领取时用）
//           fuser_place,使用地点
//           fproject_no,项目编号
//           freceive_time,领取时间
//           ftype_color 颜色
//        }]
//     }
//   }

// money:总面值，allcount：总张数

// {
//     "flag":1,状态0.待领取， 1：待生效   2：正常  3：过期  4.已使用 
//     "gainWays":1,获取方式：1.自己领取，2.兑换得到
//     "pageParam":{
//     "pageCurrent":1,当前页数
//     "pageSize":10  每页条数
//     }
//     }

class MyCoupon extends React.Component {
    // "flag":1,   状态   0.待领取， 1：待生效   2：正常  3:兑换券  4：过期  5.已使用 
    constructor(props){
        super(props); 
        this.state = {
            activeFlag:0,
            currPage:1,
            pageSize:10,
            totalPage:0,
            lables:[
                {flag:0,lable:'待领取',val:0},
                {flag:1,lable:'待生效',val:0},
                {flag:2,lable:'待消费',val:0},
                {flag:3,lable:'兑换券',val:0},
                {flag:4,lable:'已使用',val:0},
                {flag:5,lable:'已失效',val:0},
            ], 
            couponCount:{
                count: 0, //总数量
                allmoney: 0 , //总额度
                canConvert: 0,// 可兑换额度
            },
            data:[],
            coupon:{
                fproject_no:'P18060007',
                fid:2,
                ffull_sub_condition:100,
                ffull_sub_money:30,
                fname:'陕西魏家凉皮优惠券',
                fbus_type:'xfw',
                fuser_place:'西安',
                fend_time_str:'2018年12月30日',
                flogo_pic:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/company-logo.jpg',//企业logo
                fsurplus_num:9, 
                ffalg:1
            }
        }
    }
    componentWillMount(){
        this.getSlelectItem();
    }
    async getSlelectItem(){ 
        //获取顶部标题数量
        let rest = await CouponService.getCouponCount();
        if(rest.code===0){
            let temp = this.state.lables; 
            let  haveDataFlag = 0;
            if(rest.data.flagCount && rest.data.flagCount.length>0){
                rest.data.flagCount.map(item=>{
                    temp[item.flag].val = item.count; 
                    if(haveDataFlag!=0 && item.count!=0){
                        haveDataFlag = item.flag;
                    }
                });
            }
            this.setState({
                couponCount:rest.data.couponCount,
                lables:temp,
                activeFlag:haveDataFlag,
            });
            //获取我的优惠券
            this.getCoupon(haveDataFlag);
        }
    }
    //获取我的优惠券
    async getCoupon(flag){ 
        var param={ 
            flag:flag, 
            gainWays:flag==3?2:1,
            pageParam:{
                pageCurrent:this.state.currPage,//当前页数
                pageSize:this.state.pageSize,//每页条数
            }
        };
        console.log(param);
        let rest = await CouponService.getCoupon(param);
        if(rest.code===0){

            //设置总页数
            this.setState({
                 totalPage:Math.ceil(rest.data.totalNum/this.state.pageSize),
                 data:rest.data.list,
            });
            console.log(rest.data.list)
        }
    }
    //点击顶部标题
    handlerLableClick(flag){
        this.setState({
            activeFlag:flag,
            currPage:1,//设置为第一页
        });
        //获取我的优惠券
        this.getCoupon(flag);
    }

    render() { 
        return (
            <div>
                <LeftMenu  param={this.props} />
                <div  className="fr mycoupon">
                    <div className='top-content'>
                        <p className='top-title'>我的优惠券 </p>
                        <ul className='search-tag'>
                            {
                                this.state.lables.map(item=>{
                                    return  <li onClick={this.handlerLableClick.bind(this,item.flag)} className={this.state.activeFlag===item.flag?'active':''}>{item.lable}({item.val})</li>;
                                })
                            }
                        </ul> 
                    </div> 
                    {/* 
                    <Coupon  hasLine='false'></Coupon>*/}  
                    <p className='sub-text'>
                        <span>可用优惠券共 </span><span className='val'>{this.state.couponCount.count}张</span> 
                        <span>优惠券总额度 </span><span className='val'>{this.state.couponCount.allmoney}元</span>
                        <span>可兑换券总额度 </span><span className='val'>{this.state.couponCount.canConvert}元</span>
                    </p>
                    <div className='coupon-list'>
                        {
                             this.state.data.length===0?<div className='not-found'>暂无优惠券</div>:null
                        }
                        {
                            this.state.data.map(item=>{
                                return <div> <Coupon  data={item} showVal='true'  hasLine='true'></Coupon> </div>
                            })
                        } 

                        {
                            this.state.totalPage>1?<div className='coupon-paging'>
                                    <Pagination defaultCurrent={this.state.currPage} total={this.state.totalPage} />
                                </div>:null
                        }
                        
                    </div>
                </div> 
            </div>
        )
    }
}
 
export default MyCoupon;