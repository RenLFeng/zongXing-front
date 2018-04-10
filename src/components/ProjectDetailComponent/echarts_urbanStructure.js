import React from 'react';
import LineReact from '../../components/Echarts/LineReact';

export default class UrbanStructure extends React.Component{
    constructor(props){
      super(props);
      this.state = {
           //所在城市结构
      CityOption: {
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
            }
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['北京','上海','广州','深圳','南京','杭州','成都','长沙','武汉','天津','其他']
            }
        ],
        yAxis : [
            {
                type : 'value',
                name: '人数'
            }
        ],
        series : [
            {
              itemStyle: {
                normal: {color: '#03B9CB'},
              },
                type:'line',
                areaStyle: {normal: {}},
                data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }
        ]
      },
      }
    }

    componentWillReceiveProps(nextProps){
       let beijing = 0;
       let shanghai = 0;
       let guangzhou = 0;
       let shenzhen = 0;
       let nanjing = 0;
       let hangzhou = 0;
       let chengdu = 0;
       let changsha = 0;
       let wuhan = 0;
       let tianjing = 0;
       let other = 0;
;       if(this.props.city !== nextProps.city){
        nextProps.city.map((item)=>{
          switch(item.cityName){
             case '北京市':
                beijing = item.count ;
                break;
             case '上海市':
                shanghai = item.count;
                break;
             case '广州市':
                guangzhou = item.count;
                break;
             case '深圳市':
                shenzhen = item.count;
                break;
             case '南京市':
                nanjing = item.count;
                break;
             case '杭州市':
                hangzhou = item.count;
                break;
             case '成都市':
                chengdu = item.count;
                break;
             case '长沙市':
               changsha = item.count;
               break;
             case '武汉市':
                wuhan = item.count;
                break;
             case '天津市':
                tianjing = item.count;
                break;
             default:
                other = item.count;
          }
        })

          
           this.setState({
            CityOption: {
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                    }
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : ['北京','上海','广州','深圳','南京','杭州','成都','长沙','武汉','天津','其他']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        name: '人数',
                        minInterval : 1,
                        boundaryGap : [ 0, 0.1 ]
                    }
                ],
                series : [
                    {
                      itemStyle: {
                        normal: {color: '#03B9CB'},
                      },
                        type:'line',
                        areaStyle: {normal: {}},
                        data:[ beijing, shanghai, guangzhou, shenzhen, nanjing, hangzhou, chengdu, changsha, wuhan, tianjing, other]
                    }
                ]
              },
           })
       } 
    }


    render(){
        return(
            <LineReact
            width='300px'
            height='300px'
            option={this.state.CityOption}
            />
        )
    }
}
