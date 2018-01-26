import React from 'react';
import Images from './images';

export default class SecLoan extends React.Component {

  componentDidMount() {
    const map = new AMap.Map('container',{
      resizeEnable: true,
      zoom: 16,
      center: [108.938497,34.27123]
    });
    const marker = new AMap.Marker({
      position: [108.938497, 34.27123]
    });
    marker.setMap(map);
  }

  render() {
    return (
      <div>
        <div className="lnav">
          <a className="a1 hover">我的自述</a>
          <a className="a2">我的项目</a>
          <a className="a3">为何众借</a>
          <a className="a4">还款计划</a>
          <a className="a5">我的位置</a>
        </div>
        <div className="rbody">
          <p>
            <img src={require('../../assets/img/project-detail/pic1.png')} />
          </p>
          <div className="textbox border">
            <i className="tit">我的自述</i>
            <p>
              我叫王爱兵，今年40岁，是土生土长的长沙人，因为我女儿皮肤敏感，贴身衣物都必须是纯棉材质，一直以来，我们都是木槿生活的忠实粉丝，非常理解木槿生活的品质和产品理念。有了加盟木槿生活的想法之后，对这个行业和这个品牌进行了全面的市场调研。目前在长沙，这种类似家居品牌有5个，分别是优衣库、无印良品、良品生活、千韩良品、尚优凡品。木槿生活目前在长沙只有1家直营店，我想加盟，在五一广场的B1层，大润发超市的出口，面积约100平米。
            </p>
          </div>
          <p>
            <img src={require('../../assets/img/project-detail/pic2.png')} />
          </p>
          <p>
            <img src={require('../../assets/img/project-detail/pic3.png')} />
          </p>
          <div className="tagbox">
            <i className="chk">实名认证</i>
            <i>婚姻认证</i>
            <i className="chk">学历认证</i>
            <i>住址认证</i>
            <i className="chk">征信认证</i>
            <i>职称认证</i>
            <i>社保认证</i>
            <i className="chk">车产认证</i>
            <i>房产认证</i>
            <i>现场认证</i>
            <i>银行流水认证</i>
            <i>营业执照认证</i>
            <i>审计报告认证</i>
            <i>税务认证</i>
            <i>关联企业认证</i>
          </div>
          <div className="textbox border">
            <i className="tit">我的项目</i>
            <p>
              木槿生活馆长沙五一广场店<br />
              木槿生活馆是从日常生活中激发创意灵感，以实用为根本并完美融入时尚元素，主张「轻生活」，倡导时尚、纯净、自然的生活理念，还原生活本来质地，用心为顾客提供物超所值的产品，营造家一般轻松、愉悦的购物体验，是全球领先的轻生活时尚休闲百货品牌。
            </p>
          </div>
          <Images />
          <p>
            木槿生活长沙万达广场店
          </p>
          <div className="textbox border">
            <i className="tit">为何众借</i>
            <p>
              木槿生活五一广场店初次资金投入需要90万元（含品牌运营费10万，保证金25万，装修费25万，货款30万）。自有资金50万，还有40万的资金缺口，不想寻找合作伙伴，担心后期运营过程中容易产生分歧。所以希望大家能支持我，支持木槿生活，我按时还款的同时，还会给我的投资伙伴送优惠，送惊喜。
            </p>
          </div>
          <div className="textbox border">
            <i className="tit">还款计划</i>
            <p>
              装修准备期1个月左右，营业后每月营业额预计30万左右，毛利40%。自有资金可以支持前三个月的还款，后面可以用每月的营业收入来还款。
            </p>
          </div>
          <div className="textbox border">
            <i className="tit">我的位置</i>
            <div>
              <div id="container">

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
