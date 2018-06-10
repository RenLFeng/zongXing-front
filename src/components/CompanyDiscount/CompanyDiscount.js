import React from 'react';
import { Link } from 'dva/router'; 
import  '../../assets/companydiscount/companydiscount.scss';
import Path from '../../common/pagePath';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import CompanyCard from '../../components/CompanyDiscount/CompanyCard.js';

export default class CompanyDiscount extends React.Component { 
  constructor(props) {
      super(props); 
      this.state = { 
        card1:{
          bustype:'xny',
          logo:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/company-logo.jpg',//企业logo
          fname:'花宿工匠',
          ftitle:'一个带有首座体验性质的珠宝首饰零售品牌',
          fsub_title:'花宿工匠将机器制品所无法代替的原创设计带入生活，用实际的态度珍惜每一件手作之物的情感和生命。',
          flike:2,
          fshare:10,
        }
       }
  }
	render() { 
		return(
			<div>
        <div className="banner autosize">
          <img className="big" src={require('../../assets/img/companydiscount/banner.jpg')} />
          <div className="w"/>
        </div>
        <LoginInfo />

        <div className="w cats clearfix">
          <i className="tit">行业筛选</i>
          <a>最新</a><a className="hover">餐饮美食</a><a>服装鞋包</a><a>美容保健</a><a>家居用品</a><a>生活服务</a><a>休闲娱乐</a><a>其他</a>
          <Link className='to-coupon' to={Path.COUPON_CENTER}>
            <img   src={require('../../assets/img/coupon/coupon-center.png')} />
          </Link>  
        </div>
        <div className="w clearfix">  
              <CompanyCard data={this.state.card1}/>
              <CompanyCard data={this.state.card1}/> 
              <CompanyCard data={this.state.card1}/> 
        </div>
			</div>
		);
	}
}
