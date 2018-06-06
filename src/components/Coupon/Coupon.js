import React from 'react';
import './coupon.scss';


class Coupon extends React.Component {
    //  data 
    //   { fid:0,//优惠券ID
    //     fname:'优惠券名称',
    //     ffull_sub_condition:'',//满减条件
    //     ffull_sub_money:0,//面值
    //     flogo_pic:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/company-logo.jpg',//企业logo 
    //     fend_time_str:'2018年12月30日',  
    //     fsurplus_num:0,//剩余数量（待领取时用）
    //     fuser_place:'',//使用地点  
    //     fbus_type :'other', //行业  
    //   } 

    //
    // btnName:按钮名称
    // hasLine:是否存在线
    // handlerBtnClick:点击按钮回调事件，返回id，数据
    //
    constructor(props) {
        super(props);  
        let couponData  = {}
        if(props.data){
           couponData =  props.data;
        }  
        this.state = { 
            data: couponData,
            defaultHead:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/defut-head.jpg',
            btnName:props.btnName,
         }; 
    }
    render() { 
        return ( 
            <div className={`coupon ${this.state.data.fbus_type||'other'}${this.props.hasLine==='true'?'-line':''}-img`}> 
                {/* 左*/}
                <div className="coupon-left" >
                    {/* logo */}
                    <img className="logo" src={this.state.data.flogo_pic||this.state.defaultHead}/>
                </div>
                {/* 中 */}
                <div className="coupon-center">
                    {/* 优惠券名称 */}
                    <span className="name">{this.state.data.fname||'优惠券名称'}</span>
                    {/* 金额 */}
                    <div className="money">
                        <span className="face-money">￥{this.state.data.ffull_sub_money}</span> 
                    </div>
                    <ul>
                        {/* 满多少抵扣 */}
                        <li>销费满{this.state.data.ffull_sub_condition||0}元，抵扣{this.state.data.ffull_sub_money||0}元</li>
                        {/* 截止时间 */}  
                        <li>{this.state.data.fend_time_str}前使用</li> 
                        {/* 使用地点 */}
                        <li>使用地点：{this.state.data.fuser_place||'优惠券使用地址'}</li>
                    </ul> 
                </div>
                {/* 右 */}
                <div className="coupon-right">
                    {/* 上 按钮 */}
                    { this.props.hasLine==='true'?
                    <div className="staus-btn" onClick={this.props.handlerBtnClick?this.props.handlerBtnClick.bind(this,this.state.data.fid,this.state.data):()=>{} }>
                         {this.state.btnName}
                    </div>:null
                    }
                    {/* 下 张数 */}
                    <span>共{this.state.data.fsurplus_num>0?this.state.data.fsurplus_num:1}张</span>
                </div>
            </div>
         )
    }
}
 
export default Coupon;