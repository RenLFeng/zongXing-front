//优惠券交易中心
import React from 'react'; 
import Path from '../../common/pagePath'; 
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import '../../assets/couponCenter/couponcenter.scss';
import Coupon from '../Coupon/Coupon';

class CouponCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        <div className='coupon-center'>
            <LoginInfo/>
            <div>
                <span>
                    <span>我已兑换到的优惠券</span>
                    <span>目前账户优惠券：32个</span>
                </span>
                <span>
                    <span>账户中还有</span>
                    <span>16张</span>
                    <span>已领取的优惠券</span>
                    <span>可兑换</span>
                </span>
                
                 
                
                

            </div>
            <div className='coupon-items'>
                <Coupon></Coupon>
            </div>

        </div> 
        )
    }
}
 
export default CouponCenter;