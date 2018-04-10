import React from 'react';
import PieReact from '../../components/Echarts/PieReact';
import '../../assets/data/data.scss';
import { relative } from 'path';

export default class Gender extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        //男女比例
        ringOption: {
        tooltip: {
            trigger: 'item',
            formatter: "{b}： {c} ({d}%)"
        },
        series: [
            {
                color: ['#03B9CB', '#3EE9C5', '#f90'],
                type:'pie',
                radius: ['50%', '70%'],
                label: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false,
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:0,name:'男性'},
                    {value:0,name:'女性'},
                    {value:0,name:'未知'},
                  
                ]
            }
         ]
        }, 
      }
    }

    componentWillReceiveProps(nextProps){
      let male = 0;
      let female = 0;
      let unKnow = 0;
      if(this.props.gender !== nextProps.gender){
      nextProps.gender.map((item)=>{
         if(item.gender === '1'){
           male = item.count;
         } else if(item.gender === '2'){
           female = item.count;
         } else {
           unKnow = item.count;
         }
       });

         this.setState({
          ringOption: {
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c} ({d}%)"
            },
            series: [
                {
                    color: ['#03B9CB', '#3EE9C5', '#f90'],
                    type:'pie',
                    radius: ['50%', '70%'],
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                    }
                },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                    data:[
                        {value:male,name:'男性'},
                        {value:female,name:'女性'},
                        {value:unKnow,name:'未知'},
                      
                    ]
                }
             ]
            },
         })
      }
    }

    render() {
      const male = this.props.gender;
       return(
         <div style={{position:'relative'}}>
            <PieReact
              height="250px"
              width="250px"
              option={this.state.ringOption}
            />
            <div className="proportion">
              3:1
            </div>
         </div>
       
       )
    }
}