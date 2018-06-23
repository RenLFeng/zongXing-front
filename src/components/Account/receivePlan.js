import React from 'react';
import {message} from 'antd'; 
import moment from 'moment';
import LeftMenu from '../UCenterComponent/leftMenu' 
export default class ReceivePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 10,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: [],
      num:0,  //总条数
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
    return (
      <div>
        <LeftMenu param={this.props}/>
        <div className="fr uc-rbody" > 
          <CanvasCircle width={300} height={128} data={[{status: 1},{status: 2},{status: 3},{status: 2},{status: 1},{status: 1}]}/>
        </div>  
      </div> 
    );
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
      <div>
        <canvas id='canvas_circle' width={width} height={height}/>
      </div>
    );
  }
}