import React from 'react';
import ScatterReact from '../../components/Echarts/ScatterReact';

export default class Invest extends React.Component{
    constructor(props){
      super(props);
      this.state = {
      //投资额度
      option: {
        legend: {
            width: 200
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross'
          }

       },
        xAxis: {
            scale: true,
            data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
            name:'天'
        },
        yAxis: {
            scale: true,
            name:'元'
        },
        series: [{
          itemStyle: {
            normal: {color: '#3EE9C5'},
          },
            type: 'scatter',
            data: [],
        }]
      },
      }
    }

    componentWillReceiveProps(nextProps){
        let day = nextProps.invest.collectDay;
        if(this.props.invest !== nextProps.invest){
            let arr = [];
            for (let i of nextProps.invest.list) {
              arr.push([i.days-1,i.money]); 
            }
            console.log(arr)

            
            this.setState({
                option: {
                    grid: {
                        right: 'center',
                        width:200,
                        // left:1
                    },
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                          type: 'cross'
                      }

                   },
                    xAxis: {
                        scale: true,
                        data: this.loopDay(day),
                        name:'天'
                    },
                    yAxis: {
                        scale: true,
                        name:'元'
                    },
                    series: [{
                      itemStyle: {
                        normal: {color: '#3EE9C5'},
                      },
                        type: 'scatter',
                        data: arr,
                    }]
                  },
            })
        }
    }

    //循环柱形图X轴30天
    loopDay(day) {
       let arr = [];
       for(let i = 1; i <= day ; i++) {
          arr.push(i);      
       }
       return arr;
    }

    render(){
        return(
            <ScatterReact
            width='300px'
            height='300px'
            option={this.state.option}
            />
        )
    }
}