import React from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

export default class EchartsTest extends React.Component{
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      title: { text: '当月借贷项目' ,subtext: '纯属虚构',},
      tooltip: {},
      xAxis: {
        data: ['一月','二月','三月','四月','五月','六月','七月','八月']
      },
      yAxis: {},
      series: [{
        name: '累计',
        type: 'bar',
        data: [600, 380, 560, 1000, 1200, 2000,1800,2400]
      }]
    });

    var myChartMember = echarts.init(document.getElementById('member'));
    // 绘制图表
    myChartMember.setOption({
      title : {
        text: '从业人员',
        subtext: '纯属虚构',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['管理','营销','保障','客服','运维']
      },
      series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:[
            {value:6, name:'管理'},
            {value:8, name:'营销'},
            {value:4, name:'保障'},
            {value:8, name:'客服'},
            {value:3, name:'运维'}
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });
  }

  render() {
    return (
      <div className="fr shadow">
        <p className="c6">经营信息披露</p>
        <p className="q">累计交易金额<i className="dl"/></p>
        <p className="a">
          <div id="main" style={{ width: 800, height: 400 }}></div>
        </p>
        <p className="q">从业人员<i className="dl"/></p>
        <p className="a">
           <div id="member" style={{ width: 800, height: 400 }}></div>
        </p>

      </div>
    );
  }
}
