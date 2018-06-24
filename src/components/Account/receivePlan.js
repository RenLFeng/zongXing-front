import React from 'react';
import {message} from 'antd'; 
import moment from 'moment';
import LeftMenu from '../UCenterComponent/leftMenu' 
import '../../assets/ucenter/receivePlan.scss';
import LineReact from '../../components/Echarts/LineReact';
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
      showPro: true, // 按项目查看
    }
  }

  componentDidMount() {
    this.renderCanvas();
  } 

  //渲染圆图
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
          </div>
        </div>  
        <div className="fr uc-rbody" style={{marginTop: 35}}> 
          <div className="rp_top" style={{border: '0px',verticalAlign:'bottom',marginTop: '-10px'}}>
            <span className="rp_top_left" style={{fontSize: '16px',marginTop: '10px'}}>全部回款</span>
            <span className="rp_top_right">
              待回款总额度:&nbsp;<span style={{color: '#ff9900'}}>￥172.581.008</span>&nbsp;&nbsp;&nbsp;
              待收本金:&nbsp;<span style={{color: '#ff9900'}}>￥172.581.008</span>&nbsp;&nbsp;&nbsp;
              待收利息:&nbsp;<span style={{color: '#ff9900'}}>￥172.581.008</span>&nbsp;&nbsp;&nbsp;
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
                <span className={'time_detail'}>全部</span>
                <span className={'time_detail'}>2018</span>
                <span className={'time_detail'}>2019</span>
                <span className={'time_detail'}>2020</span>
              </div>
            }
          </div>
          
          {this.state.showPro ? 
            <ReceiveDetail/> :
            <div className="rp_detail_time_div">
              <div className="rp_detail_time_item">
                <div className="rp_detail_time_item_left" style={success ? {marginTop: '0px'}:{marginTop: '2px'}}>
                  <span>{moment().format('YYYY/MM/DD')}</span>
                </div>
                <div className="rp_detail_time_item_center" >
                  {
                    !success ? 
                    <div className="rp_detail_time_item_tip"/> :
                    <div className='rp_detail_time_item_tip_choose'>
                      <i className="zjb zjb-duihao1"  style={{color: '#fff',fontSize: '14px'}}/>
                    </div>
                  }
                  <div className="rp_detail_time_item_line" />
                </div>
                <div className="rp_detail_time_item_right" style={success ? {marginTop: '0px'}:{marginTop: '2px'}}>
                  <span style={{display:'block'}}><span style={{color: '#ff9900'}}>￥500</span>&nbsp;&nbsp;&nbsp;本金:500.00&nbsp;&nbsp;&nbsp;利息:45.00&nbsp;&nbsp;&nbsp;佣金:32.00</span>
                  <span style={{display: 'block', marginTop: '16px'}}>6/12期回款</span>
                  <span style={{display: 'block', marginTop: '4px'}}>项目编号:</span>
                  <span style={{display: 'block', marginTop: '4px'}}>项目名称:</span>
                  <span style={{display: 'block', marginTop: '4px',color: '#ff9900'}}>到账日期:</span>
                </div>
              </div>
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
      showCircle: false
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
              <CanvasCircle width={300} height={128} data={[{status: 1},{status: 2},{status: 3},{status: 2},{status: 1},{status: 1}]}/>
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
    let ele = document.getElementById('canvas_circle');
    
    
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
      cxt.arc(130,62.5,52.5,startAngle*Math.PI,endAngle*Math.PI,true);
      cxt.stroke();
    })
    cxt.lineWidth = 1;
    cxt.strokeStyle = '#d8d8d8';
    cxt.beginPath();
    cxt.setLineDash([9,3]);
    cxt.moveTo(140, 115);
    cxt.lineTo(205, 88.5);
    cxt.moveTo(205, 88.5);
    cxt.lineTo(248, 88.5);
    cxt.stroke();
    cxt.beginPath();
    cxt.font="14px Microsoft YaHei";
    cxt.fillStyle = '#999';
    cxt.fillText("佣金 1000",215,80);
    cxt.fillText("利息 1000",215,62);
    cxt.fillText("本金 1000",215,45);
    cxt.stroke();
    cxt.beginPath();
    cxt.fillStyle = '#ff9900';
    cxt.font="16px Microsoft YaHei";
    cxt.fillText("￥1000",210,25);
    cxt.stroke();
    cxt.beginPath();
    cxt.fillStyle = '#84e192';
    cxt.fillText("还款中",107,55);
    if (current > 10 && sum > 10) {
      cxt.fillText(`第${current}/${sum}期`,97,75);
    } else if (current < 10 && sum > 10) {
      cxt.fillText(`第${current}/${sum}期`,103,75);
    } else if (current < 10 && sum < 10) {
      cxt.fillText(`第${current}/${sum}期`,103,75);
    } else {
      cxt.fillText(`第${current}/${sum}期`,103,75);
    }
    cxt.stroke();

  }

  render() {
    const {width, height} = this.props;
    return (
        <canvas id='canvas_circle' width={width} height={height}/>
    );
  }
}