//优惠券交易中心
import React from 'react'; 
import Path from '../../common/pagePath'; 
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import '../../assets/couponCenter/couponcenter.scss';
import Coupon from '../common/Coupon';
import {Button, Pagination,message} from 'antd'; 
import {CouponService} from '../../services/api2.js';
import { Link } from 'dva/router'; 

class CouponCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin:false,
            activeFace:0,
            activaBuss:'all',
            activaArea:'全部',
            currPage:1,
            pageSize:6,
            totalNum:0,
            currPageMy:1, 
            totalNumMy:0,
            myCoupon:[],
            allCoupon:[],
            zhquane:0,
            ylqCount:0,
            kdhMoney:0,
            allCount:0,
         }
    }
    componentWillMount(){
        this.getMyCoupons();
        this.getAllCoupons();
    }
    //获取我的兑换优惠券信息
    async getMyCoupons(){ 
        let param  = {
            pageCurrent:this.state.currPageMy,  
		    pageSize:this.state.pageSize, 
        }
        const rest = await CouponService.getMyConvertCoupon(param);
        console.log('获取我的兑换优惠券信息',rest);
        if(rest.code===0){
            this.setState({
                zhquane:rest.data.amount,
                ylqCount:rest.data.count,
                kdhMoney:rest.data.money,
                totalNumMy:rest.data.totalSize,
                myCoupon:rest.data.list,
            });
        }else{
            message.error(rest.msg);
        } 
    }

    async getAllCoupons(){
        let param  = {
            busType: this.state.activaBuss==='all'?null:this.state.activaBuss,
            city: this.state.activaArea==='全部'?null:this.state.activaArea,
            money: this.state.activeFace===0?null:this.state.activeFace,
            pageParam: {
                pageCurrent: this.state.currPage,
                pageSize: this.state.pageSize
            }
        }
        const rest = await CouponService.getCenterCoupon(param);
        console.log('获取众借帮可兑换的优惠券',rest);
        if(rest.code===0){
            this.setState({ 
                totalNum:rest.data.totalSize,
                allCount:rest.data.allCount,
                allCoupon:rest.data.list,
            });
        }else{
            message.error(rest.msg);
        } 
    }
 
    faceClick(activeFace){
        this.setState({
            activeFace:activeFace
        },()=>{
            this.getAllCoupons();
        });
    }
    bussClick(activaBuss){
        this.setState({
            activaBuss:activaBuss
        },()=>{
            this.getAllCoupons();
        });
    }
    areaClick(activaArea){
        this.setState({
            activaArea:activaArea
        },()=>{
            this.getAllCoupons();
        });
    }
    handlerPageChange=(page)=>{
        this.setState({  
            currPage:page,//设置为第一页
        },()=>{ 
            this.getAllCoupons(); 
        });  
    }
    handlerMyPageChange=(page)=>{
        this.setState({  
            currPageMy:page,//设置为第一页
        },()=>{
            //获取我的优惠券
            this.getMyCoupons();
        }); 
    }
    //将优惠券兑换到我的账户
    handlerExchangeClick=async (fcoupon_id,count,faceMoney)=>{ 
        //message.info("您要消耗"+faceMoney*count +'券额，来兑换'+count +'张优惠券!');
        if(this.state.zhquane< faceMoney*count){
            message.error('您的账户券额余额不足（余额：'+this.state.zhquane+'元，需要'+faceMoney*count+'元）！');
            return ;
        }
        let param = {
            //优惠券ID
            couponId:fcoupon_id,
            pieces:count,//兑换张数 
            //兑换券额
            couponMoney:faceMoney   
        };
        const rest = await CouponService.moneyConvertCoupon(param);
        console.log('将优惠券兑换到我的账户',rest);
        if(rest.code===0){
            this.getMyCoupons();
            this.getAllCoupons();
        }else{
            message.error(rest.msg);
        } 
    } 
 

    render() {  
        const  faceMoney= [
            {text:'全部',val:0},
            {text:'100元',val:100},
            {text:'50元',val:40},
            {text:'30元',val:30},
            {text:'20元',val:20},
            {text:'10元',val:10}, 
        ];
        const bussiness = [
            {text:'全部',val:'all'},
            {text:'新零售',val:'xls'},
            {text:'新服务',val:'xfw'},
            {text:'新餐饮',val:'xcy'},
            {text:'新农业',val:'xny'},
            {text:'新娱乐',val:'xyl'},
            {text:'其他',val:'other'},
        ]; 
        const area =[
            '全部','北京','深圳','上海','成都','重庆','武汉'
        ];  
        return ( 
        <div className='coupon-center'>
            {/* <Modal title=""
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            >
            <p>Some contents...</p> 
            </Modal> */}

            {/* 用户账户信息 */}
            <LoginInfo />
            <div className='coupon-center-content'>
                 {/* 用户账户优惠券明细 */}
                <div className='top-info'>
                    <span className='text-1'>
                        <span>我已兑换到的优惠券</span>
                        <span>目前账户券额：{String(this.state.zhquane).fm()}元</span>
                    </span>
                    <a className='to-mycoupon'>
                        <Link  to={Path.MY_COUPON}>前往兑换</Link> 
                    </a>
                    <span className='text-3'>
                        <span>可兑换券额总额度</span>
                        <span>{String(this.state.kdhMoney).fm()}元</span>
                    </span>
                    <span className='text-2'>
                        <span>账户中还有</span>
                        <span>{this.state.ylqCount}张</span>
                        <span>已领取的优惠券</span>  
                    </span>
                </div>
                {/* 我的优惠券 */}
                <div className='coupon-items'> 
                    {
                        this.state.myCoupon.map(item=>{
                            return <Coupon hasLine='true' giveFriend='赠送好友'  data={item} key={item.fcoupon_id}></Coupon>  
                        })
                    } 
                    {
                        this.state.myCoupon.length===0?
                        <div className='cc-no-data'>
                            暂无已兑换到的优惠券
                        </div>:null
                    } 
                    {
                    Math.ceil(this.state.totalNumMy/this.state.pageSize)>1?<div className='coupon-paging'>
                            <Pagination   current={this.state.currPageMy} pageSize={this.state.pageSize} onChange={this.handlerMyPageChange} total={this.state.totalNumMy} />
                        </div>:null
                    }     
                </div> 
                
                <div className='search-area'>
                    {/* 搜索区域 */} 
                    <ul >
                        <li>
                            <span>面值：</span> 
                            <p> 
                                {faceMoney.map((item) => (
                                    <a onClick={this.faceClick.bind(this,item.val)} className={this.state.activeFace===item.val?'active':''} key={item.val}>{item.text}</a>
                                ))}
                            </p>
                        </li>
                        <li>
                            <span>行业：</span> 
                            <p> 
                                {bussiness.map((item) => (
                                    <a onClick={this.bussClick.bind(this,item.val)}  className={this.state.activaBuss===item.val?'active':''}  key={item.val}>{item.text}</a>
                                ))}
                            </p>
                        </li>
                        <li>
                            <span>区域：</span> 
                            <p> 
                                {area.map((item,index) => (
                                    <a onClick={this.areaClick.bind(this,item)}  className={this.state.activaArea===item?'active':''} key={index}>{item}</a>
                                ))}
                            </p>
                        </li>
                    </ul> 
                    <div className='coupons'>
                        {/* 优惠券中心 */}
                        {this.state.allCoupon.map((item) => ( 
                            <Coupon showVal='true' exchange='兑换' out={true} handlerExchangeClick={this.handlerExchangeClick} data={item}  key={item.fcoupon_id}/> 
                        ))}
                        {
                            this.state.allCoupon.length===0?
                            <div className='cc-no-data'>
                                暂无可兑换的优惠券
                            </div>:null
                        }
                    </div>
                    <div className='coupons-paging'>
                        <div className='paging-info'>
                            <span>共有<span className='light'>{this.state.allCount}张</span>优惠券</span>
                        </div>
                        <div  className='paging-component'>
                            {
                                Math.ceil(this.state.totalNum/this.state.pageSize)>1?<div className='coupon-paging'>
                                        <Pagination   current={this.state.currPage} pageSize={this.state.pageSize} onChange={this.handlerPageChange} total={this.state.totalNum} />
                                    </div>:null
                            } 
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
        )
    }
}
 
export default CouponCenter;