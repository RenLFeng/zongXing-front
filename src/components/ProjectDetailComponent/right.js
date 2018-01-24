import React from 'react';
import Data from './data';
import FormProject from './form-project';

export default class Right extends React.Component {
  render() {
    return (
      <div>
        <div className="box1 shadow">
          <div className="trow clearfix" data-end="2018-2-5 12:0:0">
            <i className="tit">还剩</i>
            <div className="day">
              <p className="t1">0</p>
              <p className="t2">天</p>
            </div>
            <div className="time">
              <p className="t1">00 : 00 : 00</p>
              <p className="t2">小时<i/>分<i/>秒</p>
            </div>
          </div>
          <div className="data clearfix">
            <div className="circle" data-value="75"/>
            <i className="ctext">已筹款比例</i>
            <div className="fr">
              <p className="t1">已经筹款</p>
              <p className="t2">253689<em>元</em></p>
            </div>
          </div>
          <div className="bot">
            <a className="btn"><i>已投资人数</i><b>58</b>人</a>
          </div>
        </div>
        <div className="box2 shadow">
          <p className="tit">投资提醒</p>
          <div className="text">
            <p><b>小额：</b>建议单个项目的最大投资金额不要超过整个项目借款总金额的1%。</p>
            <p><b>分散：</b>投资项目尽量分散不同行业、不同地区、不同利率、不同借款周期。</p>
          </div>
          <p className="tit">投资风险提示</p>
          <div className="text">
            <p>投资具有一定风险，参与计划的人士应为风险识别、评估、承受能力较强的合格投资者。请确认您或您所代表的机构是一名“合格投资者”，并将遵守适用的有关法规。</p>
            <p>本网站所载的各种信息和数据等仅供参考，并不构成销售要约，或买入项目或其它投资工具的建议。投资者应仔细审阅相关金融产品的合同文件等以了解其风险因素，或寻求专业的投资顾问的建议。不承诺保本和最低收益，具有一定的投资风险。投资者的本金可能会因市场变动而蒙受损失，请投资者充分认识投资风险，谨慎投资。</p>
          </div>
          <p className="center bot1">
            <a className="btn">我要投资</a>
          </p>
          <p className="center bot2">
            <a className="like">23</a>
            <i className="share">
              <span>32</span>
              <span className="border shadow">
                <a className="qq"/>
                <a className="sina"/>
                <a className="weixin"/>
            </span>
            </i>
          </p>
        </div>
        <Data />
        <FormProject />
      </div>
    );
  }
}
