
import React from 'react';
import CouponSmall from './CouponSmall';
import {CouponService} from '../../services/api2';
import {message} from 'antd';

export default class  CouponDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            fid:props.fid,
            detail:{
                fflag:0,
                fname:'',
                ffull_sub_money:0,
                ffull_sub_condition:0,
                fend_time:null,
                flogo_pic:'',
                countNum:0,
            },
         } 
    }
    componentWillReceiveProps(props){ 
        if(props.fid == ''){
            return ;
        } 
        this.setState({
            fid:props.fid,
        },()=>{
            this.getCouponDetail();
        }); 
    } 
    
    //获取详细信息
    async getCouponDetail(){  
        message.info(this.state.fid) 
        const rest = await CouponService.myCouponDetail({
            couponUserId:this.state.fid,
        });
        if(rest.code===0){  
            this.setState({
                detail:rest.data,
            });
        }  
    }
 
    render() { 
        return ( 
            <div>
                <p>{this.state.detail.couponName||''}</p> 
                <p>当前代金券编码</p> 
                <p>{this.state.detail.couponCode||''}</p> 
                <div>
                    二维码 
                </div>
                <p>借款公司名称</p>
                <CouponSmall data={this.state.detail}></CouponSmall> 
                <p>代金券使用地址</p>
                <ul>
                    <li>深圳市232323</li>
                    <li>深圳市232323</li>
                </ul>
            </div>
        )
    }
}
  

