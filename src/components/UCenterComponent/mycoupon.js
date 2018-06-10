import React from 'react';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import '../../assets/ucenter/mycoupon.scss';
import Coupon from '../Coupon/Coupon';

class MyCoupon extends React.Component {
 
    constructor(props){
        super(props); 
        this.state = {
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
            },
            coupon2:{
                fproject_no:'P18050004',
                fid:1,
                ffull_sub_condition:50,
                ffull_sub_money:10,
                fname:'西安生鲜面',
                fbus_type:'xcy',
                fuser_place:'咸阳',
                fend_time_str:'2018年9月30日',
                flogo_pic:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/company-logo.jpg',//企业logo
                fsurplus_num:16,
                ffalg:1,
            },
            coupon3:{
                fproject_no:'P18050004',
                fid:1,
                ffull_sub_condition:50,
                ffull_sub_money:10,
                fname:'西安生鲜面',
                fbus_type:'xny',
                fuser_place:'咸阳',
                fend_time_str:'2018年9月30日',
                flogo_pic:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/company-logo.jpg',//企业logo
                fsurplus_num:16,
                ffalg:1,
            },
            searchTitleCount:{
                toReceive:12,
                toeFfective:15,
                toConsumption:17,
                haveBeenUsed:1,
                lostEfficacy:12, 
                couponTotalMoney:800.00,
                canConvertibleMoney:500,
            } 
        }
    }
   
    render() { 
        return (
            <div>
                <LeftMenu  param={this.props} />
                <div  className="fr mycoupon">
                    <div className='top-content'>
                        <p className='top-title'>我的优惠券 </p>
                        <ul className='search-tag'>
                            <li className='active'>待领取({this.state.searchTitleCount.toReceive})</li>
                            <li>待生效({this.state.searchTitleCount.toeFfective})</li>
                            <li>待消费({this.state.searchTitleCount.toConsumption})</li>
                            <li>已使用({this.state.searchTitleCount.haveBeenUsed})</li>
                            <li>已失效({this.state.searchTitleCount.lostEfficacy})</li>
                        </ul> 
                    </div> 
                    {/* 
                    <Coupon  hasLine='false'></Coupon>*/}  
                    <p className='sub-text'>
                        <span>待领取优惠券共 </span><span className='val'>{this.state.searchTitleCount.toReceive}张</span> 
                        <span>优惠券总额度 </span><span className='val'>{this.state.searchTitleCount.couponTotalMoney}元</span>
                        <span>可兑换券总额度 </span><span className='val'>{this.state.searchTitleCount.canConvertibleMoney}元</span>
                    </p>
                    <div className='coupon-list'> 
                        <div>
                            <Coupon data={this.state.coupon}   hasLine='true' handlerBtnClick={(id,data)=>{
                            console.log(id);
                            console.log(data);
                            }} ></Coupon>
                        </div>
                        <div>
                            <Coupon  data={this.state.coupon2} showVal='true'  hasLine='true'></Coupon> 
                        </div> 
                        <div>
                            <Coupon  data={this.state.coupon3}  hasLine='true'></Coupon> 
                        </div> 
                    </div>
                </div> 
            </div>
        )
    }
}
 
export default MyCoupon;