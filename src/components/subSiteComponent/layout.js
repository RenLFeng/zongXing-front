import React from 'react';


export default class Layout extends React.Component{
  render(){
    return(
      <div className="page_important">
        <div className="subsite-banner autosize">
          <img className="big" src={require('../../assets/img/subSite/banner.png')} />
        </div>

        <div className="w f14 subsite ">
          <div className="sec sec-about">
            <h2 className="tit"></h2>
            <div className="bd clearfix">
              <div className="fl">
                <p><img src={require('../../assets/img/subSite/te1.png')} /></p>
                <p>公司成立于1999年，网龙各项经济指标均位居国内同行业前列，跻身福布斯全球企业2000强，是国家规划布局的重点软件企业、国家文化产业示范基地、国家文化出口重点企业，连续三年全国文化企业30强，入选《福布斯》中文版“中国潜力企业”高成长上市企业百强榜单第三名，连续五年跻身国家工信部发布的“中国互联网企业百强榜”。</p>
                <p>作为网络游戏的先锋，自主研发著名的旗舰游戏《魔域》及《征服》，广受玩家欢迎；创造了最具影响力及最受欢迎的智能手机服务平台—91无线。2013年，网龙将91无线出售于百度，成为当时中国互联网史上最大的并购项目。</p>
                <p><a className="border">了解更多 +</a></p>
              </div>
              <div className="fr">
                <img src={require('../../assets/img/subSite/pic1.png')} />
              </div>
            </div>
          </div>
          <div className="sec sec-product">
            <h2 className="tit"></h2>
            <div className="tabs center">
              <i className="product">产品分类</i>
              <a className="hover_" id="hover_">产品分类1</a>
              <a  id="hover_">产品分类2</a>
              <a  id="hover_">产品分类3</a>
              <a  id="hover_">产品分类4</a>
            </div>
            <div className="bd clearfix">

              <div className="item">
                <i><img src={require('../../assets/img/subSite/pro1.png')} /></i>
                <p>产品名称1</p>
              </div>
              <div className="item">
                <i><img src={require('../../assets/img/subSite/pro2.png')} /></i>
                <p>产品名称1</p>
              </div>
              <div className="item">
                <i><img src={require('../../assets/img/subSite/pro3.png')} /></i>
                <p>产品名称1</p>
              </div>
              <div className="item">
                <i><img src={require('../../assets/img/subSite/pro4.png')} /></i>
                <p>产品名称1</p>
              </div>
              <div className="item">
                <i><img src={require('../../assets/img/subSite/pro5.png')} /></i>
                <p>产品名称1</p>
              </div>
              <div className="item">
                <i><img src={require('../../assets/img/subSite/pro6.png')} /></i>
                <p>产品名称1</p>
              </div>
              <div className="item">
                <i><img src={require('../../assets/img/subSite/pro7.png')} /></i>
                <p>产品名称1</p>
              </div>
              <div className="item">
                <i><img src={require('../../assets/img/subSite/pro8.png')} /></i>
                <p>产品名称1</p>
              </div>
            </div>
          </div>
          <div className="sec sec-honor">
            <h2 className="tit"></h2>
            <div className="bd swiper-container">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <p className="t1">荣获中国互联网百强企业-1</p>
                  <p className="t2">2016年中国互联网百强企业 东方财富信息股份有限公司在2016年中国互联网百强企业中,排名19,中国互联网协会及工业和信息化部信息中心颁发证书。</p>
                  <img className="pic" src={require('../../assets/img/subSite/pic2.png')} />
                </div>
                <div className="swiper-slide">
                  <p className="t1">荣获中国互联网百强企业-2</p>
                  <p className="t2">2016年中国互联网百强企业 东方财富信息股份有限公司在2016年中国互联网百强企业中,排名19,中国互联网协会及工业和信息化部信息中心颁发证书。</p>
                  <img className="pic" src={require('../../assets/img/subSite/pic2.png')} />
                </div>
                <div className="swiper-slide">
                  <p className="t1">荣获中国互联网百强企业-3</p>
                  <p className="t2">2016年中国互联网百强企业 东方财富信息股份有限公司在2016年中国互联网百强企业中,排名19,中国互联网协会及工业和信息化部信息中心颁发证书。</p>
                  <img className="pic" src={require('../../assets/img/subSite/pic2.png')} />
                </div>
                <div className="swiper-slide">
                  <p className="t1">荣获中国互联网百强企业-4</p>
                  <p className="t2">2016年中国互联网百强企业 东方财富信息股份有限公司在2016年中国互联网百强企业中,排名19,中国互联网协会及工业和信息化部信息中心颁发证书。</p>
                  <img className="pic" src={require('../../assets/img/subSite/pic2.png')} />
                </div>
                <div className="swiper-slide">
                  <p className="t1">荣获中国互联网百强企业-5</p>
                  <p className="t2">2016年中国互联网百强企业 东方财富信息股份有限公司在2016年中国互联网百强企业中,排名19,中国互联网协会及工业和信息化部信息中心颁发证书。</p>
                  <img className="pic" src={require('../../assets/img/subSite/pic2.png')} />
                </div>
              </div>
              <div className="page">
                <b>1/5</b>
                <a className="btn prev">&lt;</a>
                <a className="btn next">&gt;</a>
              </div>
            </div>
          </div>
          <div className="sec sec-news">
            <h2 className="tit"></h2>
            <div className="bd clearfix">
              <div className="item">
                <i className="day">20</i>
                <i className="month">2018-01</i>
                <p className="t1">通用电动车抢先机 雪佛兰Volt售4.1......</p>
                <p className="t2 c6">2009年中国电力装机容量为8.7亿千瓦，同一年中国的汽车保有量为7619万辆，如果这些汽车全部为10千瓦的电动汽车，那......                </p>
              </div>
              <div className="item">
                <i className="day">22</i>
                <i className="month">2018-01</i>
                <p className="t1">通用电动车抢先机 雪佛兰Volt售4.1......</p>
                <p className="t2 c6">2009年中国电力装机容量为8.7亿千瓦，同一年中国的汽车保有量为7619万辆，如果这些汽车全部为10千瓦的电动汽车，那......                </p>
              </div>
              <div className="item">
                <i className="day">13</i>
                <i className="month">2018-01</i>
                <p className="t1">通用电动车抢先机 雪佛兰Volt售4.1......</p>
                <p className="t2 c6">2009年中国电力装机容量为8.7亿千瓦，同一年中国的汽车保有量为7619万辆，如果这些汽车全部为10千瓦的电动汽车，那......                </p>
              </div>
              <div className="item">
                <i className="day">15</i>
                <i className="month">2017-12</i>
                <p className="t1">通用电动车抢先机 雪佛兰Volt售4.1......</p>
                <p className="t2 c6">2009年中国电力装机容量为8.7亿千瓦，同一年中国的汽车保有量为7619万辆，如果这些汽车全部为10千瓦的电动汽车，那......                </p>
              </div>
              <div className="item">
                <i className="day">03</i>
                <i className="month">2017-12</i>
                <p className="t1">通用电动车抢先机 雪佛兰Volt售4.1......</p>
                <p className="t2 c6">2009年中国电力装机容量为8.7亿千瓦，同一年中国的汽车保有量为7619万辆，如果这些汽车全部为10千瓦的电动汽车，那......                </p>
              </div>
              <div className="item">
                <i className="day">15</i>
                <i className="month">2017-11</i>
                <p className="t1">通用电动车抢先机 雪佛兰Volt售4.1......</p>
                <p className="t2 c6">2009年中国电力装机容量为8.7亿千瓦，同一年中国的汽车保有量为7619万辆，如果这些汽车全部为10千瓦的电动汽车，那......                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="subsite-contact">
          <div className="w">
            <h2 className="tit"></h2>
            <div className="bd clearfix">
              <div className="fl">
                <p className="f18">地址：北京xx区XX路XX街道XX号</p>
                <p>邮编：100086</p>
                <p>座机：400-000-000</p>
                <p>手机：12334433355</p>
                <p>传真：010-000000</p>
                <p>邮箱：34553@qq.com</p>
              </div>
              <div className="fr form">
                <p>姓名</p>
                <p><input type="text" className="put" /></p>
                <p>电话</p>
                <p><input type="text" className="put" /></p>
                <p>内容</p>
                <p><textarea className="put" rows="3"></textarea></p>
                <div><a className="btn">提 交</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
