import React from 'react';
import {message, Pagination} from 'antd'; 
import moment from 'moment';
import LeftMenu from '../UCenterComponent/leftMenu' 
import '../../assets/ucenter/receivePlan.scss';
import LineReact from '../../components/Echarts/LineReact';
import { receivePlanByTop, receivePlanByTime } from '../../services/api';
export default class ReceivePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 10,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: [],
      num:0,  //总条数
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
      lastRepayBill: null, // 最近一次回款计划
      showPro: true, // 按项目查看
      interest: 0, // 待收利息
      money: 0, // 待回款总额度
      principal: 0, // 待收本金
      year: '',
      timePageList: [],
      timePageParam: {  // 按时间查看翻页
        pageSize: 8,
        pageCurrent: 1,
        total: 0
      },
      proPageParam: { // 按项目查看翻页
        pageSize: 4,
        pageCurrent: 1,
        total: 0
      }
    }
  }

  componentDidMount() {
    this.renderCanvas();
    this.getReceivePlanTopData();
    this.getReceivePlanByTime();
  } 

  // 获取回款计划顶部数据
  async getReceivePlanTopData() {
    const response = await receivePlanByTop();
    console.log('getReceivePlanTopData', response);
    if (response.code === 0) {
      // 生成全部回款折线图数据结构
      let planArr = [];
      for (let obj of response.data.repayPlanView) {
        planArr.push([obj.month, obj.money]);
      }
      // 
      this.setState({
        interest: response.data.interest,
        money: response.data.money,
        principal: response.data.principal,
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
            data: planArr,
            type: 'line',
            lineStyle: {
              color: '#FEA063'
            },
            itemStyle: {
              color: '#28F3AD'
            }
          }]
        }
      });
    } else {  
      response.msg && message.error(response.msg);
    }
  }

  // 按时间获取回款计划数据
  async getReceivePlanByTime() {
    if (this.state.planByTimeLoading) {
      return;
    }
    this.setState({planByTimeLoading: true});
    const response = await receivePlanByTime({
      pageParam: this.state.timePageParam,
      year: this.state.year.toString()
    });
    if (response.code === 0) {
      this.setState({
        timePageParam: {
          ...this.state.timePageParam,
          total: response.data.totalNumber
        },
        timePageList: response.data.infoList
      })
    } else {
      response.msg && message.error(response.msg);
    }
  }
  // 按项目获取数据
  async getReceivePlanByPro() {
    if (this.state.planByProLoading) {
      return;
    }
    this.setState({planByProLoading: true});

    this.setState({planByProLoading: false});
  }
  // 按时间获取翻页
  handlerPageChange = (page) => {
    this.setState({timePageParam: {...this.state.timePageParam, pageCurrent: page}},()=> {
      this.getReceivePlanByTime();
    })
  }
  // 按项目翻页
  handlerPageChange = () => {
    this.setState({proPageParam: {...this.state.proPageParam, pageCurrent: page}},()=> {
      this.getReceivePlanByPro();
    })
  }
  // 使用年份切换 
  switchYear(param){
    this.setState({
      timePageParam: {
        pageSize: 8,
        pageCurrent: 1,
        total: 0
      },
      year: param.toString()
    }, ()=> {
      this.getReceivePlanByTime();
    });
  } 
  // 渲染圆图
  renderCanvas() {
    const canvasDom = this.canvas;
    console.log(canvasDom);

  }

  

  render() { 
    let success = true;
    return (
      <div>
        <LeftMenu param={this.props}/>
        <div className="fr uc-rbody"> 
          <div className="rp_top">
            <span className="rp_top_left">回款计划</span>
            <span className="rp_top_right">目前共有<span style={{color: '#ff9900'}}>8个</span>项目正在回款</span>
          </div>
          {this.state.lastRepayBill ? 
            <div className="rp_current_plan">
              <span className="rp_title">·<span style={{paddingLeft: '9px', fontSize: '18px', color: '#333', fontWeight: 'normal'}}>近期回款</span></span>
              <div className="rp_content">
                {/* 时间 */}
                <span className="rp_content_time">{moment().format('YYYY/MM/DD')}</span>
                <div className="rp_content_step">
                  <div className="rp_content_step_circle"/>
                  <div className="rp_content_step_line"/>
                </div>
                <div className="rp_content_moeny_div">
                  <span style={{display:'block'}}>￥500&nbsp;&nbsp;&nbsp;&nbsp;本金:500.00&nbsp;&nbsp;&nbsp;&nbsp;利息:45.00&nbsp;&nbsp;&nbsp;&nbsp;佣金:32.00</span>
                  <span style={{display: 'block', marginTop: '16px'}}>6/12期回款</span>
                  <span style={{display: 'block', marginTop: '4px'}}>项目编号:</span>
                  <span style={{display: 'block', marginTop: '4px'}}>项目名称:</span>
                </div>
              </div>
            </div> : 
            <div className="rp_current_plan" style={{height: 60}}>
              <span style={{display: 'inline-block',fontSize: 18, width: '100%', textAlign: 'center',color: '#a4a4a4'}}>暂无近期回款计划</span>
            </div> 
          }
        </div>  
        <div className="fr uc-rbody" style={{marginTop: 35}}> 
          <div className="rp_top" style={{border: '0px',verticalAlign:'bottom',marginTop: '-10px'}}>
            <span className="rp_top_left" style={{fontSize: '16px',marginTop: '10px'}}>全部回款</span>
            <span className="rp_top_right">
              待回款总额度:&nbsp;<span style={{color: '#ff9900'}}>￥{`${this.state.money}`.fm()}</span>&nbsp;&nbsp;&nbsp;
              待收本金:&nbsp;<span style={{color: '#ff9900'}}>￥{`${this.state.principal}`.fm()}</span>&nbsp;&nbsp;&nbsp;
              待收利息:&nbsp;<span style={{color: '#ff9900'}}>￥{`${this.state.interest}`.fm()}</span>&nbsp;&nbsp;&nbsp;
            </span>
          </div>
          <LineReact height="450px" width="900px" option={this.state.lineOption}/>
        </div>
        <div className="fr uc-rbody rp" style={{marginTop: 35}}> 
          <div className="rp_top" style={{border: 0}}>
            <div className="rp_top_left">
              <span className={`${this.state.showPro?'time_detail': 'time_detail_choose'}`} onClick={()=>this.setState({showPro: false})}>按时间查看</span><span style={{color: '#f3f3f3',fontSize: 18}}>丨</span><span className={`${this.state.showPro?'pro_detail_choose': 'pro_detail'}`} onClick={()=>this.setState({showPro: true})}>按项目查看</span>
            </div>
            {this.state.showPro ? null: 
              <div className="rp_top_right">
                <span className={`${this.state.year.length===0?'time_detail_choose':'time_detail'}`}>全部</span>
                <span className={`${this.state.year.length==moment().format('YYYY')?'time_detail_choose':'time_detail'}`} onClick={()=>this.switchYear(moment().format('YYYY'))}>{moment().format('YYYY')}</span>
                <span className={`${this.state.year.length==(moment().format('YYYY')*1+1)?'time_detail_choose':'time_detail'}`} onClick={()=>this.switchYear(moment().format('YYYY')*1+1)}>{moment().format('YYYY')*1+1}</span>
                <span className={`${this.state.year.length==(moment().format('YYYY')*1+2)?'time_detail_choose':'time_detail'}`} onClick={()=>this.switchYear(moment().format('YYYY')*1+2)}>{moment().format('YYYY')*1+2}</span>
              </div>
            }
          </div>
          
          {this.state.showPro ? 
            <div>
              <ReceiveDetail id={1}/> 
              <ReceiveDetail id={2}/> 
              <ReceiveDetail id={3}/> 
              {
                Math.ceil(this.state.proPageParam.total/this.state.proPageParam.pageSize)>1?<div className='page_switch'>
                  <Pagination current={this.state.proPageParam.pageCurrent} pageSize={this.state.proPageParam.pageSize} onChange={this.handlerPageChange} total={this.state.proPageParam.total} />
                </div>:null
              } 
              <span style={{display:'inline-block',width: '100%',textAlign: 'right', marginTop: 10,fontSize: 16, color: '#A4A4A4'}}>
                已回款总额：<span style={{color: '#ff9900'}}>￥{`500`.fm()}</span>&nbsp;已收本金：<span style={{color: '#ff9900'}}>￥{`500`.fm()}</span>&nbsp;已收利息：<span style={{color: '#ff9900'}}>￥{`500`.fm()}</span>
              </span>
            </div> :
            <div className="rp_detail_time_div">
              {/* 按照时间查看样式 */}
              {this.state.timePageList.map((data, index)=> {
                return (
                  <div className="rp_detail_time_item" key={index}>
                    <div className="rp_detail_time_item_left" style={data.ispay ? {marginTop: '0px'}:{marginTop: '-5px'}}>
                      <span>{moment(data.fpayTime).format('YYYY/MM/DD')}</span>
                    </div>
                    <div className="rp_detail_time_item_center" >
                      {
                        !data.ispay ? 
                        <div className="rp_detail_time_item_tip"/> :
                        <div className='rp_detail_time_item_tip_choose'>
                          <i className="zjb zjb-duihao1"  style={{color: '#fff',fontSize: '14px'}}/>
                        </div>
                      }
                      <div className="rp_detail_time_item_line" />
                    </div>
                    <div className="rp_detail_time_item_right" style={data.ispay ? {marginTop: '0px'}:{marginTop: '-5px'}}>
                      <span style={{display:'block'}}><span style={{color: '#ff9900'}}>￥{`${data.allMoney}`.fm()}</span>&nbsp;&nbsp;&nbsp;本金:&nbsp;{`${data.fprincipal}`.fm()}&nbsp;&nbsp;&nbsp;利息:&nbsp;{`${data.finterest}`.fm()}&nbsp;&nbsp;&nbsp;佣金:&nbsp;{`${data.fkickBack}`.fm()}</span>
                      <span style={{display: 'block', marginTop: '16px'}}>{data.fsort}/{data.month}期回款</span>
                      <span style={{display: 'block', marginTop: '4px'}}>项目编号:&nbsp;{data.fprojectNo}</span>
                      <span style={{display: 'block', marginTop: '4px'}}>项目名称:&nbsp;{data.fname}</span>
                      {
                        data.ispay ? 
                        <span style={{display: 'block', marginTop: '4px',color: '#ff9900'}}>到账日期:&nbsp;{moment(data.fpayTime).format('YYYY/MM/DD HH:mm')}</span>
                        :null
                      }
                    </div>
                  </div>
                );
              })}
              
              {
                Math.ceil(this.state.timePageParam.total/this.state.timePageParam.pageSize)>1?<div className='page_switch'>
                  <Pagination  current={this.state.timePageParam.pageCurrent} pageSize={this.state.timePageParam.pageSize} onChange={this.handlerPageChange} total={this.state.timePageParam.total} />
                </div>:null
              } 
            </div>
          }
          
          
        </div>
      </div> 
    );
  }
}

class ReceiveDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isComplete: false,
      showCircle: true
    }

  }

  render() {
    return (
      <div className='rp_detail'>
        <div className='rp_detail_top'>
          <span className="rp_detail_top_left">项目编号: dasdsadsa </span>
          <div className="rp_detail_top_right">
            <i className={`zjb zjb-bingtu ${this.state.showCircle?'rp_pro_icon_choose': 'rp_pro_icon'}`} onClick={()=>this.setState({showCircle: true})} style={{marginRight: 8}}/>
            <i className={`zjb zjb-biaoge ${this.state.showCircle?'rp_pro_icon': 'rp_pro_icon_choose'}`} onClick={()=>this.setState({showCircle: false})}/>
          </div>
        </div>
        { this.state.showCircle ?
        <div className="rp_detail_content">
          <p className="rp_pro_title">川天骄火锅</p>
          {this.state.isComplete?null:
            <p className="rp_pro_time" >{moment().format('YYYY/MM/DD')} - {moment().format('YYYY/MM/DD')}</p>
          }
          {this.state.isComplete?
            <i className="zjb zjb-yiwancheng" style={{color: '#4cd964', fontSize: 150,marginLeft: 130}}/>:
            <div style={{width: '100%', paddingLeft: 70,marginTop: '10px',marginBottom: '15px'}}>
              <CanvasCircle id={this.props.id} width={300} height={155} data={[{status: 1},{status: 2},{status: 3},{status: 2},{status: 1},{status: 1}]}/>
            </div> }
            
            <div className="rp_pro_money_div">
              <div style={{width: `${100/3}%`,display: 'inline-block'}}>
                <p className="rp_pro_label">利息收入</p>
                <p className="rp_pro_value">3300元</p>
                <p className="rp_pro_label" style={{marginTop: 10}}>投资金额</p>
                <p className="rp_pro_value">3300元</p>
              </div>
              <div style={{width: `${100/3}%`,display: 'inline-block'}}>
                <p className="rp_pro_label">待收本金</p>
                <p className="rp_pro_value">3300元</p>
                <p className="rp_pro_label" style={{marginTop: 10}}>已收本金</p>
                <p className="rp_pro_value">3300元</p>
              </div>
              <div style={{width: `${100/3}%`,display: 'inline-block'}}>
                <p className="rp_pro_label">待收利息</p>
                <p className="rp_pro_value">3300元</p>
                <p className="rp_pro_label" style={{marginTop: 10}}>已收利息</p>
                <p className="rp_pro_value">3300元</p>
              </div>
            </div>
          </div>: 
          <div className="rp_detail_content">
            {/* 表格 */}
            <div className="rp_detail_table_item">
              <div className="rp_detail_table_item_left">
                <span className={'chosse'}>第02期</span>
                <div className="rp_detail_table_item_left_line"/>
              </div>
              <div style={{display: 'inline-block'}}>
                <span style={{display:'block'}}><span style={{color: '#ff9900'}}>￥500</span>&nbsp;&nbsp;&nbsp;本金:500.00&nbsp;&nbsp;&nbsp;利息:45.00&nbsp;&nbsp;&nbsp;佣金:32.00</span>
                <span style={{display: 'block', marginTop: '16px'}}>回款日期:</span>
                <span style={{display: 'block', marginTop: '4px',color: '#ff9900'}}>到账日期:</span>
              </div>
            </div>
          </div>
        }
      </div>
    )
  }
}


class CanvasCircle extends React.Component {
  state = {
    color: {
      1: '#e6e6e6',  // 未还款
      2: '#ff9900', // 已还款
      3: 'red', // 已逾期
    }
  };
  componentDidMount() {
    this.initCircle()
  }

  initCircle() {
    const {width, height, data} = this.props;
    const {color} = this.state;
    let current = 1; // 当前期数
    let sum = 5; // 总期数
    // 获取节点
    let ele = document.getElementById(this.props.id);
    // 生成canvas对象
    const cxt = ele.getContext('2d');
    data.map((obj,index)=>{
      cxt.lineWidth = 10;
      cxt.strokeStyle = color[obj.status];
      cxt.beginPath();
      let startAngle = 1.5-(index*(1/data.length)*2);
      let endAngle = 1.5-((index+1)*(1/data.length)*2);
      if (startAngle<0) {
        startAngle+=2
      }
      console.log(endAngle);
      if (endAngle<0) {
        endAngle+=2
      }
      cxt.arc(130,72.5,62.5,startAngle*Math.PI,endAngle*Math.PI,true);
      cxt.stroke();
    })
    cxt.lineWidth = 1;
    cxt.strokeStyle = '#d8d8d8';
    cxt.beginPath();
    cxt.setLineDash([9,3]);
    cxt.moveTo(140, 135);
    cxt.lineTo(205, 98.5);
    cxt.moveTo(205, 98.5);
    cxt.lineTo(248, 98.5);
    cxt.stroke();
    cxt.beginPath();
    cxt.font="14px Microsoft YaHei";
    cxt.fillStyle = '#999';
    cxt.fillText("佣金 1000",215,90);
    cxt.fillText("利息 1000",215,72);
    cxt.fillText("本金 1000",215,55);
    cxt.stroke();
    cxt.beginPath();
    cxt.fillStyle = '#ff9900';
    cxt.font="16px Microsoft YaHei";
    cxt.fillText("￥1000",210,35);
    cxt.stroke();
    cxt.beginPath();
    cxt.fillStyle = '#84e192';
    cxt.fillText("还款中",107,65);
    if (current > 10 && sum > 10) {
      cxt.fillText(`第${current}/${sum}期`,97,85);
    } else if (current < 10 && sum > 10) {
      cxt.fillText(`第${current}/${sum}期`,103,85);
    } else if (current < 10 && sum < 10) {
      cxt.fillText(`第${current}/${sum}期`,103,85);
    } else {
      cxt.fillText(`第${current}/${sum}期`,103,85);
    }
    cxt.stroke();

  }

  render() {
    const {width, height} = this.props;
    return (
        <canvas id={this.props.id} width={width} height={height}/>
    );
  }
}