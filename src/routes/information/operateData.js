import React from 'react';
import {Icon} from 'antd'
import BarReact from '../../components/Echarts/BarReact.js';
import MapReact from '../../components/Echarts/MapReact.js';
import PieReact from '../../components/Echarts/PieReact.js';
import LeftMenu from './leftMenu';
import '../../assets/infor/index';
export default class OperateData extends React.Component {
  constructor(props) {
    super(props);
    this.bl=67;
    this.state={
      data:{
        mey:[
          {
            tit:"项目逾期限小于90天(含)",
            nb:30
          },
          {
            tit:"项目逾期限91天-1800天(含)",
            nb:50
          },
          {
            tit:"项目逾期限大于181天(含)",
            nb:80
          },

        ],
        pro:[
          {
            tit:"金额逾期限小于90天(含)",
            nb:10
          },
          {
            tit:"金额逾期限91天-1800天(含)",
            nb:23
          },
          {
            tit:"金额逾期限大于181天(含)",
            nb:67
          }
        ],
        pie:{
          right:[
            {
              tit:"25岁及以下",
              nb:67
            },
            {
              tit:"26-30岁",
              nb:36
            },
            {
              tit:"31-35岁",
              nb:23
            },
            {
              tit:"36-40岁",
              nb:12
            },
            {
              tit:"41-50岁",
              nb:56
            },
            {
              tit:"46-50岁",
              nb:89
            },
            {
              tit:"51岁及以上",
              nb:39
            }
          ]
        }
      },
      barOption:{
        title: {
          text: '成交金额',
          textStyle:{
            color:'#696969',
            fontWeight:'400'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} ({c}亿)"
        },
        legend: {
          data:['']
        },
        xAxis: {
          data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]
        },
        yAxis: {
          //data: ["10亿", "25亿", "50亿","75亿","100亿"]
        },
        series: [
          {
            name: '成交金额',
            type: 'bar',
            color:["#3398DB"],
            data: [10, 25, 50,75,100,10, 25, 50,75,100,231,432],
            emphasis: {
              itemStyle: {
                // 高亮时点的颜色。
                color: '#1F84DB'
                }
              }
          }
        ]
      },
      mapOption:{
        title: {
          //text: '融资地域分布占比   丨  投资地域分布占比',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 800,
          max: 50000,
          text:['High','Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue','yellow', 'orangered']
          }
        },
        series: [
          {
            name: '成交金额',
            type: 'map',
            mapType: 'HK', // 自定义扩展图表类型
            itemStyle:{
              normal:{label:{show:true}},
              emphasis:{label:{show:true}}
            },
            data:[
              {name: '上海', value: 20057.34},
              {name: '河北', value:31686.1},
              {name: '山西', value: 31686.1},
              {name: '内蒙古', value: 6992.6},
              {name: '辽宁', value: 44045.49},
              {name: '吉林', value: 40689.64},
              {name: '黑龙江', value: 37659.78},
              {name: '江苏', value: 45180.97},
              {name: '浙江', value: 55204.26},
              {name: '安徽', value: 21900.9},
              {name: '福建', value: 4918.26},
              {name: '江西', value: 5881.84},
              {name: '山东', value: 4178.01},
              {name: '河南', value: 2227.92},
              {name: '湖北', value: 2180.98},
              {name: '湖南', value: 9172.94},
              {name: '广东', value: 3368},
              {name: '广西', value: 806.98},
              {name: '海南', value: 6992.6},
              {name: '四川', value: 44045.49},
              {name: '贵州', value: 40689.64},
              {name: '云南', value: 37659.78},
              {name: '西藏', value: 45180.97},
              {name: '陕西', value: 55204.26},
              {name: '甘肃', value: 21900.9},
              {name: '青海', value: 4918.26},
              {name: '宁夏', value: 5881.84},
              {name: '新疆', value: 4178.01},
              {name: '北京', value: 2227.92},
              {name: '天津', value: 2180.98},
              {name: '重庆', value: 9172.94},
              {name: '香港', value: 3368},
              {name: '澳门', value: 806.98}
            ],
            // 自定义名称映射
            nameMap: {
              'shanghai': '上海',
              'hebei': '河北',
              'shanxi': '山西',
              'neimenggu': '内蒙古',
              'liaoning': '辽宁',
              'jilin': '吉林',
              'heilongjiang': '黑龙江',
              'jiangsu': '江苏',
              'zhejiang': '浙江',
              'anhui': '安徽',
              'fujian': '福建',
              'jiangxi': '江西',
              'shandong': '山东',
              'henan': '河南',
              'hubei': '湖北',
              'hunan': '湖南',
              'guangdong': '广东',
              'guangxi': '广西',
              'hainan': '海南',
              'sichuan': '四川',
              'guizhou': '贵州',
              'yunnan': '云南',
              'xizang': '西藏',
              'shanxi1': '陕西',
              'gansu': '甘肃',
              'qinghai': '青海',
              'ningxia': '宁夏',
              'xinjiang': '新疆',
              'beijing': '北京',
              'tianjin': '天津',
              'chongqing': '重庆',
              'xianggang': '香港',
              'aomen': '澳门'
            }
          }
        ]
      },
      pieOption:{
        color:['#38a8da','#FFB19E'],
        title: {
          //text: '融资人性别年龄占比  丨  投资人性别年龄占比'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} ({d}%)"
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
                show: true,
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
              {value:this.bl,name:'男性占比'},
              {value:100-this.bl, name:'女性占比'}
            ]
          }
        ]
      }
    }
  }
  render() {
    return (
      <div className="infor" style={{marginTop:"150px"}}>
        <div  className="w clearfix">
          {/**/}<LeftMenu param={this.props}/>
          <div className="fr">
            <h2><span>运营信息</span><i>></i><span>运营数据</span></h2>
            <div className="top1 item">
              <ul className="tp1">
                <li>
                  <span className="color-y">3,320.60亿</span>
                  <span>累计交易总额</span>
                </li>
                <li>
                  <span className="color-y">1,320.60万</span>
                  <span>累计交易笔数</span>
                </li>
                <li>
                  <span className="color-y">1,320.60万</span>
                  <span>累计融资人总数</span>
                </li>
                <li>
                  <span className="color-y">320.60万</span>
                  <span>累计投资人总数</span>
                </li>
              </ul>
              <ul className="tp2">
                <li>
                  <span className="color-y">3,320.60亿</span>
                  <span>累计交易总额</span>
                </li>
                <li>
                  <span className="color-y">1,320.60万</span>
                  <span>累计交易笔数</span>
                </li>
                <li>
                  <span className="color-y">1,320.60万</span>
                  <span>累计融资人总数</span>
                </li>
              </ul>
              <div className="tp3">
                <ul>
                  <li>
                    <span className="icon"><Icon type="team" /></span>
                    <span className="bor">1000000人</span>
                    <span>融资人总数</span>
                  </li>
                  <li>
                    <span className="icon"><Icon type="user-add" /></span>
                    <span className="bor">1000000人</span>
                    <span>当前融资人数量</span>
                  </li>
                </ul>
                <p><span>前十大融资人待还金额占比&nbsp;&nbsp;0.02%</span><span>最大单户融资人待还金额占比&nbsp;&nbsp;0.01%</span></p>
            </div>
              <ul className="mk l"></ul>
              <ul className="mk r"></ul>
          </div>
            {/*成交金额 柱形图*/}
            <div className="top2">
              <BarReact width='800px' height="400px"  option={this.state.barOption}/>
              <p style={{textAlign:"center"}}>&nbsp;数据截止至 <span>2018-06-25</span></p>
            </div>
            {/*逾期数据*/}
            <div className="top3 item">
              <p className="tit"><span></span>逾期数据<span></span></p>
              <ul className="tp1">
                <li>
                  <span>0万元</span>
                  <span>逾期金额</span>
                </li>
                <li>
                  <span>0笔</span>
                  <span>逾期笔数</span>
                </li>
                <li>
                  <span>0%</span>
                  <span>金额逾期率</span>
                </li>
                <li>
                  <span>0笔</span>
                  <span>逾期项目数</span>
                </li>
                <li>
                  <span>0%</span>
                  <span>项目逾期率</span>
                </li>
                <li>
                  <span>0万元</span>
                  <span>代偿金额</span>
                </li>
              </ul>
              <div className="tp2 bar-box">
                <ul className="">
                  <li className="tit">项目分级逾期率</li>
                  {
                    this.state.data.pro.map((item,index)=>{
                      return(
                        <li key={index}><span>{item.tit}</span><span className="bar"><e style={{width:item.nb}}></e></span><i>{item.nb}%</i></li>
                      )
                    })
                  }
                </ul>
                <ul className="">
                  <li className="tit">金额分级逾期率</li>
                  {
                    this.state.data.mey.map((item,index)=>{
                      return(
                        <li key={index}><span>{item.tit}</span><span className="bar"><e style={{width:item.nb}}></e></span><i>{item.nb}%</i></li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            {/*全国地图*/}
            <div className="top4">
              <p className="tit">融资地域分布占比  <span><i>丨</i>投资地域分布占比</span></p>
              <MapReact width='800px' height="800px"  option={this.state.mapOption}/>
              <p style={{textAlign:"center"}}>&nbsp;数据截止至 <span>2018-06-25</span></p>
            </div>
            <div className="top5">
              <p className="tit">融资人性别年龄占比  <span><i>丨</i>投资人性别年龄占比</span></p>
              <p className="p" style={{fontSize:"16px"}}><span>累计投资人数量 1790642</span><span>当期投资人数量 707942</span></p>
              <div className="info-box">
                <div className="pie">
                  <PieReact width='360px' height="400px"  option={this.state.pieOption}/>
                  <p><span>女<i>{100-this.bl}%</i></span><span>男<i>{this.bl}%</i></span></p>
                  <div className="bar-box">
                    <ul className="">
                      <li className="tit"><Icon type="team" />年龄阶段分布各占比</li>
                      {
                        this.state.data.pie.right.map((item,index)=>{
                          return(
                            <li key={index}><span>{item.tit}</span><span className="bar"><e className="" style={{width:item.nb}}></e></span><i>{item.nb}%</i></li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              </div>
              <p style={{textAlign:"center"}}>&nbsp;数据截止至 <span>2018-06-25</span></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
