//优惠券交易中心
import React from 'react';
import Path from '../../common/pagePath';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import '../../assets/couponCenter/couponcenter.scss';
import Coupon from '../common/Coupon';
import {Button} from 'antd';

class CouponCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasLogin:false,
            faceMoney:['100元','50元','30元','20元','10元'],
            tmt:['新零售','新服务','新餐饮','新农业','新娱乐','其他'],
            area:['北京','深圳','上海','成都','重庆','武汉'],
            coupons:[1,2,3,4,5]
         }
    }
    render() {
        return (
        <div className='coupon-center'>
            {/* 用户账户信息 */}
            <LoginInfo />
            <div className='coupon-center-content'>
                 {/* 用户账户优惠券明细 */}
                <div className='top-info'>
                    <span className='text-1'>
                        <span>我已兑换到的优惠券</span>
                        <span>目前账户优惠券：32个</span>
                    </span>
                    <a className='to-mycoupon'>前往兑换</a>
                    <span className='text-3'>
                        <span>可兑换券额总额度</span>
                        <span>760元</span>
                    </span>
                    <span className='text-2'>
                        <span>账户中还有</span>
                        <span>16张</span>
                        <span>已领取的优惠券</span>
                    </span>
                </div>
                {/* 我的优惠券 */}
                <div className='coupon-items'>
                    <Coupon hasLine='true' giveFriend='赠送好友'></Coupon>
                    <Coupon hasLine='true' giveFriend='赠送好友' exchange='兑换'></Coupon>
                    <Coupon hasLine='true' exchange='兑换'></Coupon>
                    <Coupon hasLine='true'></Coupon>
                    <Coupon hasLine='true'></Coupon>
                </div>
                <div className='search-area'>
                    {/* 搜索区域 */}
                    <ul >
                        <li>
                            <span>面值：</span>
                            <Button type='primary'>全部</Button>
                            <p>
                                {this.state.faceMoney.map((item) => (
                                    <a>{item}</a>
                                ))}
                            </p>
                        </li>
                        <li>
                            <span>行业：</span>
                            <Button type='primary'>全部</Button>
                            <p>
                                {this.state.tmt.map((item) => (
                                    <a>{item}</a>
                                ))}
                            </p>
                        </li>
                        <li>
                            <span>区域：</span>
                            <Button type='primary'>全部</Button>
                            <p>
                                {this.state.area.map((item) => (
                                    <a>{item}</a>
                                ))}
                            </p>
                        </li>
                    </ul>
                    <div className='coupons'>
                        {/* 优惠券中心 */}
                        {this.state.coupons.map((item) => (
                            <Coupon showVal='true' exchange='兑换'/>
                        ))}
                    </div>
                    <div className='coupons-paging'>
                        <div className='paging-info'>
                            <span>共有<span className='light'>128张</span>优惠券</span>
                        </div>
                        <div  className='paging-component'>
                            <h1>这里是分页组件</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default CouponCenter;
