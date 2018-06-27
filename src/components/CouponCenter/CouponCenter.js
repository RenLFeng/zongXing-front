//优惠券交易中心
import React from 'react';
import Path from '../../common/pagePath';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import '../../assets/couponCenter/couponcenter.scss';
import Coupon from '../common/Coupon';
import {Button, Pagination,message,Modal} from 'antd';
import {CouponService} from '../../services/api2.js';
import {getLoginData} from  '../../services/api.js';
import { Link } from 'dva/router';
import { connect } from 'dva';
@connect((state)=>({
}))


export default class  CouponCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeFace:0,//激活面值
      activaBuss:'all',//激活业务
      activaArea:'全部',//选中状态
      currPage:1,//优惠券中心---当前页
      pageSize:6,//分页大小
      totalNum:0,//优惠券中心--总数
      currPageMy:1, //我的优惠券--当前页数
      totalNumMy:0,//我的优惠券总数
      myCoupon:[],//我的优惠券
      allCoupon:[],//优惠券中心优惠券
      zhquane:0,//账户券额
      ylqCount:0,//已领取优惠券张数
      kdhMoney:0,//可兑换优惠券金额
      allCount:0,//优惠券中心优惠券数量
      visible:false, //是否显示提示框
      fcoupon_id:'',//代金券的id
      coupon_count:0,//代金券的数量
      faceMoney:0, //兑换代金券的券额
      area:[],//优惠券的地区
    }
  }
  componentWillMount(){
    this.getMyCoupons();
    this.getAllCoupons();
    this.getCouponsArea();
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
  //获取优惠券地理位置信息
  async getCouponsArea(){
    const rest = await CouponService.getCouponPlace();
    console.log('获取优惠券地理位置信息',rest);
    if(rest.code===0){
      let area = ['全部'];
      area = area.concat(rest.data);
      this.setState({
        area:area
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

  async reashLoginData(){
    const response = await getLoginData();
    if (response.code === 0) {
      this.props.dispatch({type: 'login/saveLoadingDataAfter', response: response.data})
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
    this.setState({
      visible:true,
      fcoupon_id : fcoupon_id,
      coupon_count:count,
      faceMoney:faceMoney,
    });
  }
  handleOk=()=>{
    this.setState({
      visible:false,
    },async()=>{
      let param = {
        //优惠券ID
        couponId:this.state.fcoupon_id,
        pieces:this.state.coupon_count,//兑换张数
        //兑换券额
        couponMoney:this.state.faceMoney
      };
      const rest = await CouponService.moneyConvertCoupon(param);
      if(rest.code===0){
        message.info(rest.msg);
        this.reashLoginData();
        this.getMyCoupons();
        this.getAllCoupons();
      }else{
        message.error(rest.msg);
      }
    });
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
    return (
      <div className='coupon-center'>
        <Modal title="警告" visible={this.state.visible}
               onOk={this.handleOk}
               onCancel={()=>{this.setState({visible:false})}}
               okText='去兑换'
               cancelText='算了'
          >
          <p>您确定要兑换该优惠券吗？</p>
        </Modal>

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
              {
                this.state.area.length>0?
                  <li>
                    <span>区域：</span>
                    <p>
                      {this.state.area.map((item,index) => (
                        <a onClick={this.areaClick.bind(this,item)}  className={this.state.activaArea===item?'active':''} key={index}>{item}</a>
                      ))}
                    </p>
                  </li>:null
              }

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
                {
                  this.state.allCount>0?
                    <span>共有<span className='light'>{this.state.allCount}张</span>优惠券</span>
                    :null
                }
              </div>
              <div  className='paging-component'>
                {
                  Math.ceil(this.state.totalNum/this.state.pageSize)>1?<div className='coupon-paging'>
                    <Pagination   current={this.state.currPage} pageSize={this.state.pageSize} onChange={this.handlerPageChange} total={this.state.totalNum} />
                  </div>:null
                }
              </div>
            </div>
            {/* 优惠券介绍 */}
            <div className='question-info'>
              <span className='text1'>代金券交换中心的常见问题：</span>
              <span className='text2'>更多></span>
              <div>
                <p className='question-title'>1 代金券是怎么来的？</p>
                <p className='question-content'>代金券是众借帮平台的借款企业答谢平台投资人的一种方式，可直接消费得优惠，也可以赠送朋友提升友谊，还可以直接交换，物尽其用。</p>
                <p className='question-title'>2 代金券是怎么来的？</p>
                <p className='question-content'>代金券是众借帮平台的借款企业答谢平台投资人的一种方式，可直接消费得优惠，也可以赠送朋友提升友谊，还可以直接交换，物尽其用。代金券是众借帮平台的借款企业答谢平台投资人的一种方式，可直接消费得优惠，也可以赠送朋友提升友谊，还可以直接交换，物尽其用.代金券是众借帮平台的借款企业答谢平台投资人的一种方式，可直接消费得优惠，也可以赠送朋友提升友谊，还可以直接交换，物尽其用</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
