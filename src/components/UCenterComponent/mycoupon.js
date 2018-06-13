import React from 'react';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import '../../assets/ucenter/mycoupon.scss';
import Coupon from '../common/Coupon';
import {CouponService} from '../../services/api2';
import { get } from 'http';
import { Pagination} from 'antd';
  
class MyCoupon extends React.Component {
    // "flag":1,   状态   0.待领取， 1：待生效   2：正常  3:兑换券  4：过期  5.已使用 
    constructor(props){
        super(props); 
        this.state = {
            loading:true,
            activeFlag:0, 
            activemoney:0,//激活状态下的优惠券总额
            currPage:1,
            pageSize:2,
            totalNum:0,
            lables:[
                {flag:0,lable:'待领取',val:0},
                {flag:1,lable:'待生效',val:0},
                {flag:2,lable:'待消费',val:0},
                {flag:3,lable:'兑换券',val:0},
                {flag:4,lable:'已使用',val:0},
                {flag:5,lable:'已失效',val:0},
            ], 
            flagCount:0,
            couponCount:{ 
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
        this.getSlelectLable();
    }
    //获取顶部查询列表
    async getSlelectLable(){ 
        //获取顶部标题数量
        let rest = await CouponService.getCouponCount();
        if(rest.code===0){ 
            console.log('获取顶部标题数量',rest.data);
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
            console.log('haveDataFlag',haveDataFlag);
            this.setState({
                couponCount:rest.data.couponCount,
                lables:temp,
                activeFlag:haveDataFlag,
            },()=>{
                //获取我的优惠券
                this.getCoupon();
            });
        }
    }
    /**
     * 获取我的优惠券
     * @param {*} flag 
     */
    async getCoupon(){ 
        var param={ 
            flag:this.state.activeFlag,  
            pageParam:{
                pageCurrent:this.state.currPage,//当前页数
                pageSize:this.state.pageSize,//每页条数
            }
        }; 
        let rest = await CouponService.getCoupon(param);
        if(rest.code===0){ 
            console.log('CouponService',rest.data);
            //设置总页数
            this.setState({
                totalNum:rest.data.totalNum,
                data:rest.data.list,
                activemoney:rest.data.money,
            }); 
        }
    }
    //点击顶部标题
    handlerLableClick(flag){  
        this.setState({ 
            activeFlag:flag, 
            currPage:1,//设置为第一页
        },()=>{
            //获取我的优惠券
            this.getCoupon();
        });  
    }
    handlerPageChange=(page)=>{
        this.setState({  
            currPage:page,//设置为第一页
        },()=>{
            //获取我的优惠券
            this.getCoupon();
        }); 
        
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
                    {
                         this.state.data.length >0 ?<p className='sub-text'> 
                            <span>优惠券总额度 </span>
                            <span className='val'>{String(this.state.activemoney).fm()}元</span> 
                        </p>:null
                    }
                    
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
                            Math.ceil(this.state.totalNum/this.state.pageSize)>1?<div className='coupon-paging'>
                                    <Pagination  current={this.state.currPage} pageSize={this.state.pageSize} onChange={this.handlerPageChange} total={this.state.totalNum} />
                                </div>:null
                        } 
                    </div>
                </div> 
            </div>
        )
    }
}
 
export default MyCoupon;