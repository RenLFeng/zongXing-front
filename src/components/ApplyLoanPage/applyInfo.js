import React from 'react';

export default class ApplyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: [ {cityCode: 610100, city: '西安'},{cityCode: 100100, city: '北京'}]
    }
  }
  componentDidMount() {

  }
  render() {
    const {money, period, customerChannel, purpose, expectedRate, city} = this.props.data;
    return (
      <form className="aform" onChange={(e) => this.props.changeLoanInfo(e)}>
        <div className="row">
          <div className="tit">
            <i className="high">借款金额</i>
          </div>
          <input type="text" className="put" name="money" value={money}/>
          <i className="dw">万元</i>
        </div>
        <div className="row">
          <div className="tit">
            <i className="high">借款期数</i>
          </div>
          <input type="text" className="put" name="period" value={period}/>
          <i className="dw">个月</i>
        </div>
        <div className="row">
          <div className="tit">
            <i>获客渠道</i>
          </div>
          <dl className="select">
            <dt value="loanInfo" type="customerChannel">网络搜索</dt>
            <dd>
              <i value="1">网络搜索</i>
              <i value="2">熟人推荐分享</i>
              <i value="3">线下宣传</i>
            </dd>
          </dl>
        </div>
        <div className="row">
          <div className="tit">
            <i className="high">借款用途</i>
          </div>
          <input type="text" className="put" name="purpose" value={purpose}/>
        </div>
        <div className="row">
          <div className="tit">
            <i>预期年化利率</i>
          </div>
          <input type="text" className="put" name="expectedRate" value={expectedRate}/>
        </div>
        <div className="row">
          <div className="tit">
            <i className="high">所在城市</i>
          </div>
          <dl className="select" id="selcity" style={{height: '42px'}}>
            <dt style={{height: '42px'}}>请选择</dt>
            <dd>
              {
                this.state.city.map((data)=>{
                  return (<i key={data.cityCode} onClick={()=>this.props.changeCity(data.cityCode)}>{data.city}</i>);
                })
              }
            </dd>
          </dl>
        </div>
      </form>
    );
  }
}
