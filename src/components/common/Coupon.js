import React from 'react';
import '../../assets/component/common/coupon.scss';
import {Button} from 'antd';
import moment from 'moment';

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
    //      countNum:0,//张数，
    //     fflag:1  //1:待领取  2：待生效  3:待消费  4：已使用  5：已失效
    //   }  
    // hasLine:是否存在线
    // handlerBtnClick:点击按钮回调事件，返回id，数据
    

    constructor(props) {
        super(props);   
        this.renderData(props);
    }

    componentWillReceiveProps(props){
        this.renderData(props);
    }

    renderData(props){
        let couponData  = {}
        if(props.data){
           couponData =  props.data;
        }  
        let canEdit= false; 
        if(couponData.fflag==1||couponData.fflag==2||couponData.fflag==3){
            canEdit = true;
        }
        let btnName = "";
        switch(couponData.fflag){
            case 0:
                btnName ='待领取'; 
                break;
            case 1:
                btnName ='待领取'; 
                break;
            case 2:
                btnName ='待消费'; 
                break;
            case 3:
                btnName ='兑换券'; 
                break;
            case 4:
                btnName ='已使用'; 
                break;
            case 5:
                btnName ='已失效'; 
                break;
            default:
                btnName=''; 
                break; 
        }   
        this.state = { 
            data: couponData,
            btnName:btnName,
            defaultHead:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/defut-head.jpg', 
            canEdit:canEdit
         }; 
    }

    render() { 
        return ( 
            <div className='cp-coupon-content'>
                <p><span className='project-title'>项目编号：</span><span className='project-no'>{this.state.data.fproject_no||''}</span></p>
                <div className={`cp-coupon ${this.state.data.fbus_type||'other'}${this.props.hasLine==='true'?'-line':''}-img`}> 
                    {/* 左*/}
                    <div className="cp-coupon-left" >
                        {/* logo */}
                        <img className="logo" src={this.state.data.flogo_pic||this.state.defaultHead}/>
                    </div>
                    {/* 中 */}
                    <div className="cp-coupon-center">
                        {/* 优惠券名称 */}
                        <span className="name">{this.state.data.fname||'优惠券名称'}</span>
                        {/* 金额 */}
                        <div className="money">
                            <div className="face-money">￥{this.state.data.ffull_sub_money||'0'}</div> 
                            {this.props.showVal==='true'?
                                <div className="face-vlaue">券额{this.state.data.ffull_sub_money||'0'}</div> :null
                            }
                            
                        </div>
                        <ul>
                            {/* 满多少抵扣 */}
                            <li>销费满{this.state.data.ffull_sub_condition||0}元，抵扣{this.state.data.ffull_sub_money||0}元</li>
                            {/* 截止时间 */}  
                            <li>{this.state.data.fend_time?moment(this.state.data.fend_time).format('YYYY年MM月DD日'):'----年--月--日'}前使用</li> 
                            {/* 使用地点 */}
                            <li>使用地点：{this.state.data.fuser_place||'优惠券使用地址'}</li>
                        </ul> 
                    </div>
                    {/* 右 */}
                    <div className={`cp-coupon-right  ${this.state.data.fflag===5?(this.state.data.fbus_type+'-disable' || 'other-disable'):''}`}>
                        {/* 上 按钮 */}
                        { this.props.hasLine==='true'?
                        <div className={`staus-btn ${this.state.canEdit?'canClick':''}`} onClick={this.props.handlerBtnClick&&this.state.canEdit?this.props.handlerBtnClick.bind(this,this.state.data.fid,this.state.data):()=>{} }>
                            {this.state.btnName}
                        </div>:null
                        } 
                        {/* 下 张数 */}
                        <span>共{this.state.data.countNum>0?this.state.data.countNum:1}张</span>
                    </div>
                </div>
                <div className='btns'>
                    {
                        this.props.giveFriend?
                        <Button onClick={this.props.handlerGiveFriedClick?this.props.handlerGiveFriedClick.bind(this,this.state.data.fid,this.state.data):()=>{alert('请绑定handlerGiveFriedClick回调事件');}} >{this.props.giveFriend}</Button>:null
                    }
                    {
                        this.props.exchange?
                        <Button onClick={this.props.handlerExchangeClick?this.props.handlerExchangeClick.bind(this,this.state.data.fid,this.state.data):()=>{alert('请绑定handlerExchangeClick回调事件');}} >{this.props.exchange}</Button>:null
                    }
                    
                </div>
            </div>
         )
    }
}
 
export default Coupon;