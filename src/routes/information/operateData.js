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
    this.city={
      "上海": 57.34,
      "河北":86.1,
      "山西": 86.,
      "内蒙古": 92.6,
      "辽宁": 45.49,
      "吉林": 89.64,
      "黑龙江": 59.78,
      "江苏": 80.97,
      "浙江": 4.26,
      "安徽": 80.9,
      "福建": 18.26,
      "江西": 81.84,
      "山东": 78.01,
      "河南": 27.92,
      "湖北": 80.98,
      "湖南": 92.94,
      "广东": 38,
      "广西": 6.98,
      "海南": 2.6,
      "四川": 45.49,
      "贵州": 89.64,
      "云南": 59.78,
      "西藏": 480.97,
      "陕西": 4.26,
      "甘肃": 21.9,
      "青海": 18.26,
      "宁夏": 51.84,
      "新疆": 78.01,
      "北京": 27.92,
      "天津": 80.98,
      "重庆": 72.94,
      "香港": 68,
      "澳门": 86.98
    }
    this.bl=69;
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
        },
        tooltip: {
          trigger: 'item',
          //formatter: '地域分布占比<br>{b}{c}%'
          formatter:(res)=>{
            var name=res.name;
            return '地域分布占比<br>'+res.name+':'+this.city[res.name]+'%';
          }
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
          show:false,
          min: 800,
          max: 50000,
          text:['High','Low'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['lightskyblue','yellow', 'orangered']
            //color: ['#FFB19E','#38a8da', '#f90']
          }
        },
        series: [
          {
            name: '',
            type: 'map',
            mapType: 'china', // 自定义扩展图表类型
            itemStyle:{
              normal:{label:{show:true}},
              emphasis:{label:{show:true}}
            },
            data:[
              {
                name:"南海诸岛",value:0,
                itemStyle:{
                  normal:{opacity:0,label:{show:false}}
                }
              },
              {name: '上海', value: 20057.34},
              {name: '河北', value:10},
              {name: '山西', value: 31686.1},
              {name: '内蒙古', value: 40689.43},
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
            ]
          }
        ]
      },
      pieOption:{
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
          <div className="fr opDa">
            <h2><span>运营信息</span><i>></i><span className="last">运营数据</span></h2>
            {/*top1*/}
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
              <div className="tp3 iconL">
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
            {/* top2  成交金额 柱形图*/}
            <div className="top2">
              <BarReact width='800px' height="400px"  option={this.state.barOption}/>
              <p style={{textAlign:"center"}}>&nbsp;数据截止至 <span>2018-06-25</span></p>
            </div>
            {/* top3   逾期数据*/}
            <div className="top3 item">
              <p className="dashed"><span className="dashed"></span>逾期数据<span className="dashed"></span></p>
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
                        <li key={index}><span>{item.tit}</span><span className="bar"><e style={{width:item.nb+'%'}}></e></span><i>{item.nb}%</i></li>
                      )
                    })
                  }
                </ul>
                <ul className="">
                  <li className="tit">金额分级逾期率</li>
                  {
                    this.state.data.mey.map((item,index)=>{
                      return(
                        <li key={index}><span>{item.tit}</span><span className="bar"><e style={{width:item.nb+'%'}}></e></span><i>{item.nb}%</i></li>
                      )
                    })
                  }
                </ul>
              </div>
            </div>
            {/* top4   全国地图*/}
            <div className="top4">
              <p className="tit">融资地域分布占比  <span><i>丨</i>投资地域分布占比</span></p>
              <div className="map-list">
                <p>地域分布</p>
                <ul>
                  <li><i>1</i><span>江苏省</span>13%</li>
                  <li><i>2</i><span>浙江省</span>14%</li>
                  <li><i>3</i><span>安徽省</span>13%</li>
                  <li><i>4</i><span>福建省</span>14%</li>
                  <li><i>5</i><span>江西省</span>13%</li>
                  <li><i>6</i><span>山东省</span>14%</li>
                  <li><i>7</i><span>河南省</span>13%</li>
                  <li><i>8</i><span>湖北省</span>14%</li>
                  <li><i>9</i><span>湖南省</span>13%</li>
                  <li><i>10</i><span>广西省</span>14%</li>
                </ul>
              </div>
              <MapReact width='850px' height="600px"  option={this.state.mapOption}/>
              <p style={{textAlign:"center",position:"relative",bottom:"90px"}}>&nbsp;数据截止至 <span>2018-06-25</span></p>
            </div>
            {/* top5  环形图*/}
            <div className="top5">
              <p className="tit">融资人性别年龄占比  <span><i>丨</i>投资人性别年龄占比</span></p>
              <p className="p" style={{fontSize:"16px"}}><span>累计投资人数量 1790642</span><span>当期投资人数量 707942</span></p>
              <div className="info-box">
                <div className="pie">
                  <PieReact width='360px' height="400px"  option={this.state.pieOption}/>
                  <a className="pie-use-icon">
                    <div>
                      <Icon type="user" />
                      <p>性别分布<br/>
                        男 {this.bl}%
                      </p>
                    </div>
                  </a>
                  <p><span className="wom">女<i>{100-this.bl}%</i></span><span>男<i>{this.bl}%</i></span></p>
                  <div className="bar-box">
                    <ul className="">
                      <li className="tit"><Icon type="team" />年龄阶段分布各占比</li>
                      {
                        this.state.data.pie.right.map((item,index)=>{
                          return(
                            <li key={index}><span>{item.tit}</span><span className="bar"><e className="" style={{width:item.nb+'%'}}></e></span><i>{item.nb}%</i></li>
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
    );
  }
}
