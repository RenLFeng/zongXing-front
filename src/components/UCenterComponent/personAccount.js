import React from 'react';
import { Link } from 'dva/router';
import PieReact from '../../components/Echarts/PieReact';
import LineReact from '../../components/Echarts/LineReact'
import Path from '../../common/pagePath';
import {connect} from 'dva';

@connect((state)=>({
  personalStatus: state.account.personalStatus,
  personal: state.account.personal
}))
export default class PersonAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 个人中心 饼图
      pieOption: {
        tooltip: {
          trigger: 'item',
        },
        color: ['#03B9CB', '#F84B23', '#8BC25B', '#FD9F09', '#C7C7C7'],
        legend: {
          orient: 'vertical',
          x: 'right',
          align: 'left',
          itemGap: 20,
          textStyle: {
            fontFamily: 'Arial',
            fontSize: 16,
            rich:{
              b:{
                fontSize:16,
                align:'right',
                padding:[0,10,0,0],
                width: 100,
                fontWeight: 'bold',
              },
              c:{
                fontSize:16,
                align:'right',
                padding:[0,10,0,0],
                width: 100,
                fontWeight: 'bold',
                color: '#FF6600'
              }
            }
          },
          formatter:  function(name){
            if (name==='可用余额') {
              return `${name}  {c|100,000.01}`
            } else if (name === '冻结金额') {
              return `${name}  {b|2.01}`
            } else if (name === '待收金额') {
              return `${name}  {b|100,000.01}`
            } else if (name === '待收收益') {
              return `${name}  {b|10,000.01}`
            } else {
              return `${name}  {b|100.01}`
            }
          },
          left: '50%',
          y: 'center',
          data:[{
            name: '可用余额',
            icon: 'circle'
          },{
            name: '冻结金额',
            icon: 'circle'
          },{
            name: '待收本金',
            icon: 'circle'
          },{
            name: '待收收益',
            icon: 'circle'
          },{
            name: '待还总额',
            icon: 'circle'
          }]
        },
         grid: {
           right: '70%'
         },
        series: [
          {
            name:'金额',
            type:'pie',
            radius: ['100%', '90%'],
            center: ['20%', '50%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:335, name:'可用余额'},
              {value:310, name:'冻结金额'},
              {value:234, name:'待收本金'},
              {value:135, name:'待收收益'},
              {value:1548, name:'待还总额'}
            ]
          }
        ]
      },
      // 个人账户 折线图
      lineOption: {
        xAxis: {
          type: 'value',
          nameLocation: 'end',
          minInterval: 1,
          min: 1,
          max: 12,
          scale: true,
          interval: 1,
          name: '月'
        },
        yAxis: {
          name: '元'
        },
        series: [{
          data: [[1, 20], [2, 400], [3, 5000]],
          type: 'line',
          lineStyle: {
            color: '#FEA063'
          },
          itemStyle: {
            color: '#28F3AD'
          }
        }]
      },
      // 是否已经开户的标识 TODO: 需要存在redux中获取
    }

  }

  componentDidMount() {
    // 获取个人账户信息
    this.props.dispatch({
      type: 'account/getAccount',
      payload: '0'
    });
    // 获取数据之后重新渲染
    setTimeout(()=>{
      this.setState({
        pieOption: {
          ...this.state.pieOption,
          legend: {
            ...this.state.pieOption.legend,
            formatter:  function(name){
              if (name==='可用余额') {
                return `${name}  {c|23,413.01}`
              } else if (name === '冻结金额') {
                return `${name}  {b|2.01}`
              } else if (name === '待收金额') {
                return `${name}  {b|100,000.01}`
              } else if (name === '待收收益') {
                return `${name}  {b|10,000.01}`
              } else {
                return `${name}  {b|100.01}`
              }
            }
          },
          series: [
            {
              name:'金额',
              type:'pie',
              radius: ['100%', '90%'],
              avoidLabelOverlap: false,
              hoverAnimation: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:23413.01, name:'可用余额'},
                {value:2354.00, name:'冻结金额'},
                {value:10000.01, name:'待收本金'},
                {value:10000.01, name:'待收收益'},
                {value:2354.00, name:'待还总额'}
              ]
            }
          ]
        }
      });
    }, 2000);
  }

  render() {
    if (!this.props.personalStatus) {
      return (
        <div className="fr uc-rbody">
          <span>个人账户开户失败，请重新尝试 <Link to={Path.OPEN_ACCOUNT+'/0'} style={{color: 'blue'}}>点击此处</Link></span>
        </div>
      );
    }
    if (!this.props.personalStatus) {
      return (
        <div className="fr uc-rbody">
          <span>个人账户开户中，请稍后查看</span>
        </div>
      );
    }
    if (!this.props.personalStatus) {
      return (
        <div className="fr uc-rbody">
          <span>您还没有开通个人账户，开通 <Link to={Path.OPEN_ACCOUNT+'/0'} style={{color: 'blue'}}>点击此处</Link></span>
        </div>
      );
    }
    return (
      <div className="fr uc-rbody">
        <div className="ptit">
          <i>账户总资产</i>
          <b>20,986.04</b>
          <em>单位：元</em>
        </div>
        <div className="tright hd1">
          <a className="fl">
            <i>累计充值</i>
            <b className="f18">20,000.00</b>
          </a>
          <a className="fl">
            <i>累计提现</i>
            <b className="f18">1,000.00</b>
          </a>
          <a className="btn btn1">充值</a>
          <a className="btn btn2">提现</a>
          <a className="btn btn3">好友转账</a>
        </div>
        <div className="border shadow box1">
          <div className="pieDiv">
            <div>
              <span style={{fontSize: '22px'}}>20,948.00</span>
              <span style={{fontSize: '14px'}}>账户总资产</span>
            </div>
          </div>
          <PieReact width='500px' height="200px"  option={this.state.pieOption}/>
          <div className="coupon">
            <i className="c6">代金券</i>
            <i className="fr">30.00</i>
          </div>
        </div>

        <div className="hd2 clearfix">
          <a className="fl">回款计划</a><i className="fl">|</i><a className="fl hover">还款计划</a>
          <a className="fr">更多 &gt;&gt;</a>
        </div>
        <div>
          <LineReact height="450px" width="900px" option={this.state.lineOption}/>
        </div>

        <div className="hd3">
          <a className="fl">资金动态</a>
          <a className="fr">查看更多 &gt;&gt;</a>
        </div>
        <div>
          <div className="timetree">
            <div className="end"/>
            <div className="list">
              <div className="item">
                <p className="date">
                  <i className="y">2018</i><br /><i className="d">4-10</i>
                </p>
                <i className="cc"/>
                <p className="text">还款完成</p>
              </div>
              <div className="item">
                <p className="date">
                  <i className="y">2018</i><br /><i className="d">3-15</i>
                </p>
                <i className="cc"/>
                <p className="text">50万借款审核通过，发布</p>
              </div>
              <div className="item">
                <p className="date">
                  <i className="y">2018</i><br /><i className="d">2-6</i>
                </p>
                <i className="cc"/>
                <p className="text">筹款成功，给投资人发放5万元代金券的额外回报</p>
              </div>
              <div className="item">
                <p className="date">
                  <i className="y">2018</i><br /><i className="d">1-16</i>
                </p>
                <i className="cc"/>
                <p className="text">第五期还款</p>
              </div>
              <div className="item hover">
                <p className="date">
                  <i className="y">2017</i><br /><i className="d">12-17</i>
                </p>
                <i className="cc"/>
                <p className="text">新店开业，给投资人发放免费体验券</p>
              </div>
            </div>
            <div className="start"/>
          </div>
        </div>
      </div>
    );
  }
}
