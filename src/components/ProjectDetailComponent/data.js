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
        xAxis: {
            scale: true
        },
        yAxis: {
            scale: true
        },
        series: [{
            type: 'scatter',
            data: [[161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
                [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
                [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
                [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
                [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
                [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
                [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
                [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
                [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
                [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
                [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
                [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
                [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
                [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
                [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
                [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
                [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
                [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
                [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
                [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
                [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
                [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
                [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
                [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
                [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
                [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
                [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
                [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
                [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
                [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
                [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
                [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
                [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
                [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
                [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
                [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
                [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
                [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
                [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
                [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
                [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
                [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
                [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
                [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
                [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
                [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
                [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
                [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
                [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
                [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
                [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
                [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
            ],
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
