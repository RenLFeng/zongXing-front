import React from 'react';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import '../../assets/ucenter/mycoupon.scss';
import Coupon from '../Coupon/Coupon';

class MyCoupon extends React.Component {
 
    constructor(props){
        super(props); 
        this.state = {
            coupon:{
                fid:2,
                ffull_sub_condition:100,
                ffull_sub_money:30,
                fname:'陕西魏家凉皮优惠券',
                fbus_type:'xfw',
                fuser_place:'西安',
                fend_time_str:'2018年12月30日',
                flogo_pic:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/company-logo.jpg',//企业logo
                fsurplus_num:9, 
            },
            coupon2:{
                fid:1,
                ffull_sub_condition:50,
                ffull_sub_money:10,
                fname:'西安生鲜面',
                fbus_type:'xny',
                fuser_place:'咸阳',
                fend_time_str:'2018年9月30日',
                flogo_pic:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/company-logo.jpg',//企业logo
                fsurplus_num:16,
            }
        }
    }
   
    render() { 
        return (
            <div>
                <LeftMenu  param={this.props} />
                <div  className="fr uc-rbody"> 
                    <Coupon data={this.state.coupon} btnName='待领取' hasLine='true' handlerBtnClick={(id,data)=>{
                         console.log(id);
                         console.log(data);
                        }} ></Coupon> 
                    <Coupon btnName='已失效' hasLine='false'></Coupon>
                    <Coupon  data={this.state.coupon2} btnName='去使用' hasLine='true'></Coupon>
                </div>
            </div>
        )
    }
}
 
export default MyCoupon;