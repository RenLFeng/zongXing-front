import React from 'react';

import { startAnimate } from '../../assets/sales/index';
export default class BusinessDiscount extends React.Component {
  componentDidMount() {
    startAnimate();
  }

	render() {
		return(
			<div>
        <div className="banner autosize">
          <img className="big" src={require('../../assets/img/sales/banner.jpg')} />
          <div className="w"/>
        </div>

        <div className="w cats clearfix">
          <i className="tit">行业筛选</i>
          <a>最新</a><a className="hover">餐饮美食</a><a>服装鞋包</a><a>美容保健</a><a>家居用品</a><a>生活服务</a><a>休闲娱乐</a><a>其他</a>
        </div>
        <div className="w clearfix">
          <div className="fl">
            <div className="list">
              <div className="item shadow clearfix">
                <div className="fl">
                  <img className="pic" src={require('../../assets/img/sales/pic1.jpg')} />
                </div>
                <div className="fr">
                  <p className="tit"><a className="tag tag1">餐饮美食</a><a className="name">花宿工匠</a></p>
                  <p className="tit2">一个带有首座体验性质的珠宝首饰零售品牌</p>
                  <p className="desc c6">花宿工匠将机器制品所无法代替的原创设计带入生活，用实际的态度珍惜每一件手作之物的情感和生命。</p>
                  <p className="tags">
                    <a>活动集</a>
                    <a className="hover">领优惠券</a>
                  </p>
                </div>
                <a className="ic ic_like">8</a>
                <a className="ic ic_share">0</a>
              </div>
              <div className="item shadow clearfix">
                <div className="fl">
                  <img className="pic" src={require('../../assets/img/sales/pic2.jpg')} />
                </div>
                <div className="fr">
                  <p className="tit"><a className="tag tag2">餐饮美食</a><a className="name">花宿工匠</a></p>
                  <p className="tit2">一个带有首座体验性质的珠宝首饰零售品牌</p>
                  <p className="desc c6">花宿工匠将机器制品所无法代替的原创设计带入生活，用实际的态度珍惜每一件手作之物的情感和生命。</p>
                  <p className="tags">
                    <a>活动集</a>
                    <a className="hover">领优惠券</a>
                  </p>
                </div>
                <a className="ic ic_like">8</a>
                <a className="ic ic_share">0</a>
              </div>
              <div className="item shadow clearfix">
                <div className="fl">
                  <img className="pic" src={require('../../assets/img/sales/pic3.jpg')} />
                </div>
                <div className="fr">
                  <p className="tit"><a className="tag tag3">餐饮美食</a><a className="name">花宿工匠</a></p>
                  <p className="tit2">一个带有首座体验性质的珠宝首饰零售品牌</p>
                  <p className="desc c6">花宿工匠将机器制品所无法代替的原创设计带入生活，用实际的态度珍惜每一件手作之物的情感和生命。</p>
                  <p className="tags">
                    <a>活动集</a>
                    <a className="hover">领优惠券</a>
                  </p>
                </div>
                <a className="ic ic_like">8</a>
                <a className="ic ic_share">0</a>
              </div>
              <div className="item shadow clearfix">
                <div className="fl">
                  <img className="pic" src={require('../../assets/img/sales/pic4.png')} />
                </div>
                <div className="fr">
                  <p className="tit"><a className="tag tag4">餐饮美食</a><a className="name">花宿工匠</a></p>
                  <p className="tit2">一个带有首座体验性质的珠宝首饰零售品牌</p>
                  <p className="desc c6">花宿工匠将机器制品所无法代替的原创设计带入生活，用实际的态度珍惜每一件手作之物的情感和生命。</p>
                  <p className="tags">
                    <a>活动集</a>
                    <a className="hover">领优惠券</a>
                  </p>
                </div>
                <a className="ic ic_like">8</a>
                <a className="ic ic_share">0</a>
              </div>
              <div className="item shadow clearfix">
                <div className="fl">
                  <img className="pic" src={require('../../assets/img/sales/pic5.jpg')} />
                </div>
                <div className="fr">
                  <p className="tit"><a className="tag tag5">餐饮美食</a><a className="name">花宿工匠</a></p>
                  <p className="tit2">一个带有首座体验性质的珠宝首饰零售品牌</p>
                  <p className="desc c6">花宿工匠将机器制品所无法代替的原创设计带入生活，用实际的态度珍惜每一件手作之物的情感和生命。</p>
                  <p className="tags">
                    <a>活动集</a>
                    <a className="hover">领优惠券</a>
                  </p>
                </div>
                <a className="ic ic_like">8</a>
                <a className="ic ic_share">0</a>
              </div>
            </div>
            <div className="tright">
              <div className="pager">
                <a className="first">&lt;</a>
                <a className="hover">1</a><a>2</a><a>3</a><a>4</a><a>5</a><a>...</a>
                <a className="last">&gt;</a>
              </div>
            </div>
          </div>
          <div className="fr rcon">
            <div className="box1">
              <a><img src={require('../../assets/img/sales/rtop.jpg')} /></a>
            </div>
            <div className="box2">
              <p className="hd">
                <i>关于内站搭建</i>
                <a className="fr">更多&gt;&gt;</a>
              </p>
              <div className="hb shadow">
                <p className="tit">搭建内站的好处：</p>
                <p className="ol">
                  1、众借帮是您新的宣传渠道和营销渠道；<br />
                  2、让投资人更了解并支持您的企业；<br />
                  3、发布企业活动，让投资人参与体验；<br />
                  4、发放优惠券，吸引客户。
                </p>
                <p className="tit">搭建内站的常见问题：</p>
                <p className="ol">
                  1、如何更好的描述“关于我们”？<br />
                  2、如何更好的利用“产品展示”功能？<br />
                  3、如何展现您公司的实力？<br />
                  4、如何发布更有吸引力的活动？<br />
                  5、如何发放优惠券？<br />
                  6、如何运营您的内站？<br />
                  7、如何统计您的优惠券使用情况？
                </p>
              </div>
            </div>
          </div>
        </div>
			</div>
		);
	}
}
