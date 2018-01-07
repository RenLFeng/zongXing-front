import React from 'react';
import '../../assets/dist/home/bundle.css';

export default class HomeIndex extends React.Component {

  componentDidMount() {

  }

  render() {
    return (
      <div className="body">
        <div className="section banner swiper-container">
          <div className="swiper-wrapper">
            <div className="swiper-slide autosize">
              <img className="big" src="../assets/img/home/1.jpg"/>
              <a className="btn big" href=""><i>我要投资</i></a>
            </div>
            <div className="swiper-slide autosize">
              <img className="big" src="../assets/img/home/2.jpg"/>
              <a className="btn big" href=""><i>我要投资</i></a>
            </div>
            <div className="swiper-slide autosize">
              <img className="big" src="../assets/img/home/3.jpg"/>
              <a className="btn big" href=""><i>我要投资</i></a>
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>

        <div className="section sec-comp">
          <div className="w">
            <p className="tright">
              <a className="blue" href="">查看更多统计数据 &gt;</a>
            </p>
          </div>
          <div className="w col4 clearfix">
            <div>
              <p className="tit">23分钟<b>欧洲记录</b>100万欧元</p>
              <p className="logo">
                <img src="../assets/img/home/bigicon_03.png"/>
              </p>
              <p className="name">旷野沙发</p>
            </div>
            <div>
              <p className="tit"><b>欧洲记录</b>120万欧元</p>
              <p className="logo">
                <img src="../assets/img/home/bigicon_05.png"/>
              </p>
              <p className="name">亚特兰蒂斯</p>
            </div>
            <div>
              <p className="tit">在<b>6个小时内</b>建立了超过<b>40万欧元</b>的品牌</p>
              <p className="logo">
                <img src="../assets/img/home/bigicon_07.png"/>
              </p>
              <p className="name">贩小醉龙虾</p>
            </div>
            <div>
              <p className="tit"><b>亚洲记录</b>200万人民币</p>
              <p className="logo">
                <img src="../assets/img/home/bigicon_09.png"/>
              </p>
              <p className="name">梦橙影业</p>
            </div>
          </div>
        </div>


        <div className="section sec-proj">
          <div className="w center">
            <h1>最新推荐众借项目</h1>
            <p className="tit-line"><i>NEW PROJECTS</i></p>
            <p className="f18 c6">完善您的项目信息，提高您的信用评级，将有机会进入推荐项目</p>
          </div>
          <div className="w box6 clearfix">
            <div>
              <img className="pic" src="../assets/img/home/img-programe_03.png"/>
              <p className="name">川味四家大厨<br />火锅店</p>
              <div className="circle" data-value="20"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">B+</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_05.png"/>
              <p className="name">MABOCAKE<br />麦波月饼</p>
              <div className="circle" data-value="20"></div>
              <i className="price">￥200,000</i>
              <i className="city">北京</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">C+</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_07.png"/>
              <p className="name">尚工坊手工<br />活动中心</p>
              <div className="circle" data-value="50"></div>
              <i className="price">￥200,000</i>
              <i className="city">广东，深圳</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">A</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_12.png"/>
              <p className="name">川味四家大厨<br />火锅店</p>
              <div className="circle" data-value="60"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">D</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_13.png"/>
              <p className="name">快乐嘟嘟面包房</p>
              <div className="circle" data-value="70"></div>
              <i className="price">￥200,000</i>
              <i className="city">上海</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">B</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_14.png"/>
              <p className="name">WOKEUP<br />身姿曼妙健康饮料</p>
              <div className="circle" data-value="85"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">D</i>
            </div>
          </div>
          <div className="w">
            <p className="relative">
              <a className="btnmore c" href=""></a>
            </p>
          </div>
        </div>
        <div className="section sec-touzi">
          <div className="w">
            <div className="center sec1">
              <h1>直接投资中国小微企业</h1>
              <p className="tit2">固定收益+企业优惠，实现你情怀投资和共筑梦想</p>
            </div>
            <div className="textcol2 clearfix">
              <div className="fl sec2">
                <p className="tit4">自己决定你的投资项目</p>
                <div className="list-dot">
                  <p>选择熟悉的地区、了解的行业，根据你的兴趣爱好进行投资。</p>
                  <p>借款项目经过<b>五级专业审查</b>：申请资料初审、反欺诈风控模型、信用评分综合模型、系统性线下复核、行业专家组终审。</p>
                  <p>你的投资，直接用于提高小微企业的运营能力和品牌影响力。</p>
                  <p>所有借款项目来自中国认证的成长型公司和小微企业。</p>
                </div>
              </div>
              <div className="fr sec3">
                <p className="tit4">投资实体经济，获取丰厚收益</p>
                <div className="list-suc">
                  <p>门槛低，100元起投</p>
                  <p>8%+的固定利率回报</p>
                  <p>小额分散，低风险</p>
                  <p>直接参与小微企业成长</p>
                  <p>企业让利，额外惊喜</p>
                </div>
                <p><a className="btn btn-green" href="">详细了解如何投资</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="section sec-rongzi">
          <div className="w">
            <div className="center sec1">
              <h1>小微企业融资</h1>
              <p className="tit2">真正助力小微企业成长，搭建借贷平台</p>
            </div>
            <div className="textcol2 clearfix">
              <div className="fl sec2">
                <p className="tit4">众借，解决小微企业融资难题</p>
                <div className="list-dot">
                  <p>想扩大你的生意、想加盟一个品牌，可以众借；</p>
                  <p>有成千上百的人相信并支持你的事业；</p>
                  <p>融资，无需稀释股份，还能精准营销；</p>
                  <p>借款，无需抵押，无需担保，只要真实和信用</p>
                </div>
              </div>
              <div className="fr sec3">
                <p className="tit4">低成本，高效率</p>
                <div className="list-suc">
                  <p>最高可达100万</p>
                  <p>月利息低至0.68%</p>
                  <p>线上申请，快速便捷</p>
                  <p>融资过程，就是营销</p>
                </div>
                <p><a className="btn btn-green" href="">详细了解如何借款</a></p>
              </div>
            </div>
          </div>
        </div>
        <div className="section sec-tab3">
          <div className="w">
            <div className="tab3 center">
              <i></i>
              <a href="" className="hover">了解众借帮</a>
              <i></i>
              <a href="">加盟众借帮</a>
              <i></i>
              <a href="">成功的案例</a>
              <i></i>
            </div>
          </div>
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="w tab-con">
            <div className="con1">
              <p className="tit2">成功借款企业的采访</p>
              <video className="hide"
                     preload="metadata" controls="controls"
                     poster="../assets/img/home/1.jpg"
                     src="//n1video.hjfile.cn/zhuanti/2017/12/20/f5339abc403997a43fa9b9362b2a29cb.mp4">
                您的浏览器不支持视频播放，请升级浏览器
              </video>
            </div>
            <div className="con2">
            </div>
            <div className="con3">
            </div>
          </div>
        </div>
      </div>
    );
  }
}
