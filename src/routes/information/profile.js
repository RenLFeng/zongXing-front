import React from 'react';
import {Icon} from 'antd'
import LeftMenu from './leftMenu';
import PieReact from '../../components/Echarts/PieReact.js';
import '../../assets/infor/contactUs/profile.scss';
import {MANAGEMENT_TEAM} from '../../common/pagePath'
import '../../assets/infor/index';
const teamInfo={
  age:{
    peopleTotal:45,
    man:60,
    data:[
      {
        tit:"22-28岁",
        nb:24
      },
      {
        tit:"29-35岁",
        nb:16
      },
      {
        tit:"36-42岁",
        nb:3
      },
      {
        tit:"43-55岁",
        nb:1
      },
      {
        tit:"56-60岁",
        nb:1
      }
    ]
  },
  schooling:{
    be:{
      name:"本科",
      nub:35
    },
    so:{
      name:"硕士",
        nub:8
    },
    bo:{
      name:"博士",
        nub:2
    },
    data:[
      {name:"本科",nub:35},
      {name:"硕士",nub:8},
      {name:"博士",nub:2}
    ]
  }
}
export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      ageOption:{
        color:['#38a8da','#FFB19E'],
        title: {
  
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} ({d}%)",
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data:[]
        },
        series: [
          {
            name:'性别分布',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:teamInfo.age.man,name:'男性占比'},
              {value:100-teamInfo.age.man, name:'女性占比'}
            ]
          }
        ]
      },
      schoolOption:{
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c}人 ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['本科','硕士','博士']
        },
        series: [
            {
                name:'学历统计',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:teamInfo.schooling.be.nub, name:teamInfo.schooling.be.name},
                    {value:teamInfo.schooling.so.nub, name:teamInfo.schooling.so.name},
                    {value:teamInfo.schooling.bo.nub, name:teamInfo.schooling.bo.name}
                ]
            }
        ]
    }
    }
  }
  render() {
    return (
      <div className="fr opDa profile">
        <h2><span className="first" onClick={()=>{this.props.history.push(MANAGEMENT_TEAM)}}>管理团队</span><i>></i><span className="last">从业人员概况</span></h2>
        <div className="wrap clearfix">
          <div className="age">
            <div className="top5">
              <p className="tit"><Icon type="team"/>机构从业年龄性别分布  <span></span></p>
              <div className="info-box">
                <div className="pie">
                  <PieReact width='360px' height="400px"  option={this.state.ageOption}/>
                  <a className="pie-use-icon">
                    <div>
                      <Icon type="user" />
                      <p>性别分布<br/>
                        男 {teamInfo.age.man}%
                      </p>
                    </div>
                  </a>
                  <p><span className="wom">女({(100-teamInfo.age.man)/100*teamInfo.age.peopleTotal})<i>{100-teamInfo.age.man}%</i></span><span>男({teamInfo.age.man/100*teamInfo.age.peopleTotal})<i>{teamInfo.age.man}%</i></span></p>
                  <div className="bar-box">
                    <ul className="">                    
                      {
                        teamInfo.age.data.map((item,index)=>{                                                                                                                                                                                                                                        
                          return(
                            <li key={index}><span>{item.tit}({item.nb})</span><span className="bar"><e className="" style={{width:Math.floor((item.nb/teamInfo.age.peopleTotal*100)*100)/100+'%'}}></e></span><i>{(item.nb/teamInfo.age.peopleTotal*100).toFixed(2)}%</i></li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        <div className="schooling">
          <div className="top5">
              <p className="tit" style={{marginBottom:'50px'}}><Icon type="team"/>学历分布  <span></span></p>
              <div className="info-box">
                <div className="pie">
                  <PieReact width='360px' height="400px"  option={this.state.schoolOption}/>
                  <a className="pie-use-icon">
                    <div>
                      <Icon type="user" />
                      <p>本科<br/>
                        {teamInfo.schooling.be.nub}人
                      </p>
                    </div>
                  </a>
          
                  <div className="bar-box">
                    <ul className="">                                
                      {
                        teamInfo.schooling.data.map((item,index)=>{                                                                                                                                                                                                                                        
                          return(
                            <li key={index}>{item.name}<span>{item.nub}</span>人{(item.nub/teamInfo.age.peopleTotal*100).toFixed(2)}%</li>                        
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
