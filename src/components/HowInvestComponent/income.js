import React from 'react';


export default class InCome extends React.Component {

  render() {
    return (
      <div className="section sec-income">
        <div className="w">
          <p className="tit">复利再投资，博取更大收益</p>
          <p className="desc">股神巴菲特说：全世界最厉害的力量叫做想象力，但最恐怖的力量叫做复利，复利可以让你的钱越变越大，大到你无法想象的地步。所以，众借帮帮助你如何复利再投资，以博取更大的回报。</p>
          <div className="shadow">
            <img className="pic" src={require('../../assets/img/invest/pic1.png')} />
            <p className="t1">世界上最厉害的武器不是原子弹，是</p>
            <p className="t2">“时间+复利”</p>
            <p className="t1">复利计算公式：F=P*(1+i)n</p>
            <p className="t3">复利是人类已知的世界第八大奇迹</p>
            <p className="t1 tright">----爱因斯坦</p>
          </div>
        </div>
      </div>
    );
  }
}
