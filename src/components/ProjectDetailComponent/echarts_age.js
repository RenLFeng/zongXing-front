import React from 'react';
import BarReact from '../../components/Echarts/BarReact';


export default class Age extends React.Component{
    constructor(props){
      super(props);
      this.state = {
       //年龄结构
      barOption: {
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        xAxis: {
          axisTick: {show: false},
          type: 'category',
          data: ['20岁以下','20-30岁','30-40岁','40-50岁','50-60岁','60岁以上','其他'],
        },
        yAxis: {
          type: 'value',
          name: '人数'
        },
        series: [{
            itemStyle: {
              normal: {color: '#03B9CB'}
            },
            barGap: 0,
            data: [0,0, 0, 0, 0,0,0 ],
            type: 'bar'
          }]
      }, 
      }
    }
    
    componentWillReceiveProps(nextProps){
        let twenty = 0;
        let thirty = 0;
        let forty = 0;
        let fivety = 0;
        let sixty = 0;
        let seventy = 0;
        let unKnow = 0;
        if(this.props.age !== nextProps.age){
            nextProps.age.map((item)=>{
              if(item.birthday<20){
                 twenty = item.count
              } else if(item.birthday>=20&&item.birthday<30){
                thirty = item.count
              } else if(item.birthday>=30&&item.birthday<40){
                forty = item.count
              } else if(item.birthday>=40&&item.birthday<50){
                fivety = item.count
              } else if(item.birthday>=50&&item.birthday<60){
                sixty = item.count
              } else if(item.birthday>=60){
                seventy = item.count
              } else {
                unKnow = item.count
              }
            })
           this.setState({
            barOption: {
                tooltip : {
                  trigger: 'axis',
                  axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                xAxis: {
                  axisTick: {show: false},
                  type: 'category',
                  data: ['20岁以下','20-30岁','30-40岁','40-50岁','50-60岁','60岁以上','未知'],
                },
                yAxis: {
                  type: 'value',
                  name: '人数',
                  minInterval : 1,
                  boundaryGap : [ 0, 0.1 ]
                },
                series: [{
                    itemStyle: {
                      normal: {color: '#03B9CB'}
                    },
                    barGap: 0,
                    data: [ twenty, thirty, forty, fivety, sixty, seventy, unKnow],
                    type: 'bar'
                  }]
              }, 
           })
        }
      }

    render() {
       return(
        <BarReact
          height="300px"
          width="300px"
          option={this.state.barOption}
        />
       )
    }
}