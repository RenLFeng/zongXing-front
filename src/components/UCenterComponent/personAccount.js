import React from 'react';
import { Link } from 'dva/router';
import PieReact from '../../components/Echarts/PieReact';
import LineReact from '../../components/Echarts/LineReact'
import Path from '../../common/pagePath';
import {connect} from 'dva';
import moment from 'moment';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import { Modal, Button } from 'antd';

@connect((state)=>({
  personal: state.account.personal,
  openStatus: state.account.openStatus,
  errorMessage: state.account.message
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
              return `${name}  {c|0.00}`
            } else if (name === '冻结金额') {
              return `${name}  {b|0.00}`
            } else if (name === '待收金额') {
              return `${name}  {b|0.00}`
            } else {
              return `${name}  {b|0.00}`
            }
          },
          left: '60%',
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
            name: '待收利息',
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
              {value:0, name:'可用余额'},
              {value:0, name:'冻结金额'},
              {value:0, name:'待收本金'},
              {value:0, name:'待收利息'}
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
          data: [],
          type: 'line',
          lineStyle: {
            color: '#FEA063'
          },
          itemStyle: {
            color: '#28F3AD'
          }
        }]
      },
    };
    this.jumpRecharge = this.jumpRecharge.bind(this);
  }

  componentDidMount() {
    this.getInitData();
  }

  getInitData() { 
    this.props.dispatch({
      type: 'account/getPersonalAccount',
      payload:{
        showNumInfo:4,
        jumpAuth:()=>this.jumpAuth()
      }
    }); 
  }

  jumpAuth() {
    var that = this;
    Modal.info({
      title: '您目前还没有开户，请先开户！', 
      okText:'去开户',
      onOk() {
        that.props.history.push('/index/uCenter/realName')
      },
    }); 
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.personal !== nextProps.personal) {
      const money = nextProps.personal.totalAssets;
      const data = nextProps.personal;
      // 回款计划
      const plan = nextProps.personal.plan?nextProps.personal.plan: [];
      let planArr = [];
      for (let obj of plan) {
        planArr.push([obj.month, obj.money])
      }
      this.setState({
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
                return `${name}       {c|${(money.availableBalance+'').fm()}}`
              } else if (name === '冻结金额') {
                return `${name}       {b|${(money.freezingAmount+'').fm()}}`
              } else if (name === '待收本金') {
                return `${name}       {b|${`${money.collectPrincipal}`.fm()}}`
              } else {
                return `${name}       {b|${`${money.collectInterest}`.fm()}}`
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
              name: '待收利息',
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
                {value:money.availableBalance, name:'可用余额'},
                {value:money.freezingAmount, name:'冻结金额'},
                {value:money.collectPrincipal, name:'待收本金'},
                {value:money.collectInterest, name:'待收利息'}
              ]
            }
          ]
        },
        lineOption: {
          tooltip : {
            trigger: 'axis',
            formatter: function (params) {
              params = params[0];
              return `${params.axisValue}月
              回款${params.data[1]}元`
            },
          },
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
            data: planArr,
            type: 'line',
            lineStyle: {
              color: '#FEA063'
            },
            itemStyle: {
              color: '#28F3AD'
            }
          }]
        },
      })
    }
  }

  jumpRecharge(accoundId) {
    this.props.history.push({pathname: Path.ACCOUNT_RECHARGE, state: {account:accoundId}})
  };
  jumpRecharge_(accoundId) {
    console.log(accoundId);
    this.props.history.push({pathname: Path.ACCOUNT_WITHDRAWALS, state: {account:accoundId}})
  };

  render() {
    const { openStatus, errorMessage } = this.props;
    if (openStatus === 0) {
      return (
        <div>
          <LeftMenu param={this.props}/>
          <div className="fr uc-rbody">
            <span>您还没有开通个人账户，开通 <Link to={Path.OPEN_ACCOUNT+'/0'} style={{color: 'blue'}}>点击此处</Link></span>
          </div>
        </div>
      );
    } else if (openStatus === 1) {
      return (
        <div>
          <LeftMenu param={this.props}/>
          <div className="fr uc-rbody">
            <span>您的账户开户中，可<a style={{color: 'blue'}} onClick={()=>this.getInitData()}>刷新</a>查看</span>
          </div>
        </div> 
      );
    } else if (openStatus === 2) {
      return (
        <div>
          <LeftMenu param={this.props}/>
          <div className="fr uc-rbody">
            <span>您的账户开户失败，原因：{errorMessage} ,可重新尝试开通，<Link to={Path.OPEN_ACCOUNT+'/0'} style={{color: 'blue'}}>点击此处</Link></span>
          </div>
        </div> 
      );
    }
    return (
      <div>
        <LeftMenu param={this.props}/>
        <div className="fr uc-rbody">
          <div className="ptit">
            <i>账户总资产</i>
            <b>{(this.props.personal.totalAssets.totalAssets.add(this.props.personal.totalAssets.collectPrincipal).add(this.props.personal.totalAssets.collectInterest)+'').fm()}</b>
            <em>单位：元</em>
          </div>
          <div className="tright hd1">
            <a className="fl" style={{cursor: 'default'}}>
              <i>累计充值</i>
              <b className="f18">{(this.props.personal.totalAssets.totalRecharge+'').fm()}</b>
            </a>
            <a className="fl" style={{cursor: 'default'}}>
              <i>累计提现</i>
              <b className="f18">{(this.props.personal.totalAssets.totalWithdrawals+'').fm()}</b>
            </a>
            <a className="btn btn1" onClick={()=>this.jumpRecharge(this.props.personal.totalAssets.accountId)}>充值</a>
            <a className="btn btn2" onClick={()=>this.jumpRecharge_(this.props.personal.totalAssets.accountId)}>提现</a>
            {/*<a className="btn btn3">好友转账</a>*/}
          </div>
          <div className="border shadow box1">
            <div className="pieDiv">
              <div>
                <span style={{fontSize: '22px'}}>{(this.props.personal.totalAssets.totalAssets.add(this.props.personal.totalAssets.collectPrincipal).add(this.props.personal.totalAssets.collectInterest)+'').fm()}</span>
                <span style={{fontSize: '14px'}}>账户总资产</span>
              </div>
            </div>
            <PieReact width='500px' height="200px"  option={this.state.pieOption}/>
            <div className="coupon">
              <i className="c6">代金券</i>
              <i className="fr">{(this.props.personal.totalAssets.capitalCoupon+'').fm()}</i>
            </div>
          </div>

          <div className="hd2 clearfix">
            <a className="fl hover">回款计划</a>
            {/*<i className="fl">|</i><a className="fl hover">还款计划</a>*/}
            <Link className="fr" to={Path.RECEIVE_PLAN}>更多 &gt;&gt;</Link>
          </div>
          <div>
            <LineReact height="450px" width="900px" option={this.state.lineOption}/>
          </div>

          <div className="hd3">
            <a className="fl">资金动态</a>
            <Link className="fr" to={Path.MORE_INFO}>查看更多 &gt;&gt;</Link>
          </div>
          <div>
            <div className="timetree">
              <div className="end"/>
              <div className="list">
                {
                  this.props.personal.accountDynamicVos.map((data,index) => {
                    let year_ = moment(data.time).format('YYYY');
                    let month = moment(data.time).format('MM-DD');
                    return(
                      <div className="item" key={index}>
                        <p className="date">
                          <i className="y">{year_}</i><br /><i className="d">{month}</i>
                        </p>
                        <i className="cc"/>
                        <p className="text">{data.remark} {data.inMoney=== 0 ? null : `收入: ${(data.inMoney+'').fm()}元`} { data.outMoney === 0 ? null : `支出: ${(data.outMoney+'').fm()}元`}</p>
                      </div>
                    );
                  })
                }
              </div>
              <div className="start"/>
            </div>
          </div>
        </div>
      </div>
     
    );
  }
}
