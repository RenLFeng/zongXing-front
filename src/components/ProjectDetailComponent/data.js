import React from 'react';
import '../../assets/data/data.scss';
import {pageShows} from '../../common/systemParam';
import moment from 'moment';
import PieReact from '../../components/Echarts/PieReact';
import LineReact from '../../components/Echarts/LineReact';
import BarReact from '../../components/Echarts/BarReact';
import ScatterReact from '../../components/Echarts/ScatterReact';
import {getCityInvest, getGender, getAge} from '../../services/api';

export default class Data extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      // pageParam:{
      //   pageCurrent: 1, //当前页，初始值为第一页
      //   pageSize: 20,    //每页可显示的消息条数
      // },
      // projectId:'',
      // maxPage: 0,     //最大页
     
      //男女比例
      ringOption: {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                // name:'访问来源',
                color: ['#03B9CB', '#3EE9C5', '#f90'],
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
                    {value:335},
                    {value:310},
                    {value:234},
                  
                ]
            }
        ]
      },
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
                data:[120, 132, 101, 134, 90, 230, 210,120, 132, 101, 134]
            }
        ]
      },
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
          data: ['20岁以下','20-30岁','30-40岁','40-50岁','50-60岁','60岁以上'],
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
            data: [120,320, 332, 301, 334,150 ],
            type: 'bar'
          }]
      },
      //投资额度
      // option: {
      //   tooltip: {
      //       trigger: 'axis'
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     data: ['0', '2000', '4000', '6000', '8000', '10000'],
      //     name: '元'
      //   },
      //   yAxis: {
      //       type: 'value',
      //       name: '人数'
      //   },
      //   series: [
      //       {
      //         itemStyle: {
      //           normal: {color: '#3EE9C5'}
      //         },
      //           type:'line',
      //           data:[120, 132, 101, 134, 90,150,100]
      //       }
      //   ]
      // }

      option : {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross'
          }
       },
        xAxis: {
            scale: true,
            data: ['1', '2', '3', '4', '5'],
            name:'天'
        },
        yAxis: {
            scale: true
        },
        series: [{
          itemStyle: {
            normal: {color: '#3EE9C5'},
          },
            type: 'scatter',
            data: [120, 132, 101, 134, 90,150,100],
        }]
     }  
  }
}




  //获取所在城市结构相关数据
  async getCityInvest(){
    const response = await getCityInvest(this.props.projectId);
    console.log(response);
  }

  //获取性别
  async getGender(){
    const response = await getGender(this.props.projectId);
    console.log(response);
  }

  //获取性别
  async getAge(){
    const response = await getAge(this.props.projectId);
    console.log(response);
  }


  render() {
    const page_num = pageShows(this.props.pageCurrent, this.props.maxPage);
    // console.log(this.props);
    return (
      <div className="pd-data shadow none">
        <a className="close"/>
        <p className="tit">投资人统计{this.props.userCount?<i>（<em className="cf60">{this.props.userCount}</em>人）</i>: null}</p>
        <div className="clearfix">
          <div className="fl">
            {/*列表数据*/}
            <div className="list">
              <div className="row hd">
                <i className="col1">投资人</i>
                <i className="col2">投资资金</i>
                <i className="col3">投资时间</i>
              </div>
              
               { this.props.arr.length>0  ?
                  this.props.arr.map((data, index)=>{
                    return(
                      <div className="row" key={index}>
                        <i className="col1">{data.userName}</i>
                        <i className="col2">{data.money}</i>
                        <i className="col3">{moment(data.fTime).format("YYYY-MM-DD HH:mm:ss")}</i>
                      </div>
                      )
                  }) :
              
                <div className="row_" >暂无数据</div>
                }
             
              
             
              <div className="box_1">
                <dxiv className="pagination_">
                  {page_num.lastPage ?
                    <a className="" onClick={() => this.props.fetchData(this.props.pageCurrent - 1)}>&lt;</a> :
                    <a className="" style={{backgroundColor: '#eee'}}>&lt;</a>}
                  {page_num.firstPage ?
                    <a className={`${1 == this.props.pageCurrent ? 'hover_1' : ''}`} onClick={() => this.props.fetchData(1)}>1</a> :
                    null}
                  {page_num.leftEllipsis ?
                    <a>...</a> :
                    null}
                  {page_num.page.map((pageNum) => {
                    return (
                      <a key={pageNum} className={`${pageNum * 1 == this.props.pageCurrent ? 'hover_1' : ''}`}
                         onClick={() => this.props.fetchData(pageNum)}>{pageNum}</a>
                    );
                  })}
                  {page_num.rightEllipsis ?
                    <a>...</a> :
                    null}
                  {page_num.finalPage ?
                    <a
                      className={`${this.props.maxPage == this.props.pageCurrent ? 'hover_1' : ''}`}
                      onClick={() => this.props.fetchData(this.props.maxPage)}
                    >{this.props.maxPage}</a> :
                    null}
                  {page_num.nextPage ?
                    <a
                      className=""
                      onClick={() => this.props.fetchData(this.props.pageCurrent + 1)}
                    >&gt;</a> :
                    <a className="" style={{backgroundColor: '#eee'}}>&gt;</a>}
                </dxiv>
              </div>

            </div>
            <div className="bot">
              <i>累计已投金额</i>
              <i className="cf90">{this.props.allMoney}</i>
            </div>
          </div>
          <div className="fr">
            <p className="pictit">所在城市结构</p>
            <div>
              <LineReact
              width='300px'
              height='300px'
              option={this.state.CityOption}
              />
            </div>
            <p className="pictit">男女比例</p>
            <div className="center">
            <PieReact
              height="250px"
              width="250px"
              option={this.state.ringOption}
            />
            </div>
            <p className="pictit">年龄结构</p>
            <div>
              <BarReact
               height="300px"
               width="300px"
               option={this.state.barOption}
              />
            </div>
            <p className="pictit">投资额度结构</p>
            <div>
            <ScatterReact
              width='300px'
              height='300px'
              left='-30px !important'
              option={this.state.option}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
