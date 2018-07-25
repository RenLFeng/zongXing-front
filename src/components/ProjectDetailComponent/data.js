import React from 'react';
import '../../assets/data/data.scss';
import {pageShows} from '../../common/systemParam';
import moment from 'moment';
import {message} from 'antd';
import UrbanStructure from './echarts_urbanStructure';
import Gender from './echarts_gender';
import Age from './echarts_age';
import Invest from './echarts_invest';
import { connect } from 'dva';

import {getCityInvest, getGender, getAge, getInvest, alreadyInvested} from '../../services/api';

@connect((state)=>({
  count: state.account.count
}))
export default class Data extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      city:{},        //所在城市结构
      cityShow:true,
      gender:{},      //性别
      genderShow:true,
      age:{},         //年龄结构
      ageShow:true,
      invest:{},      //投资额度
      investShow:true,
      pageParam:{
        pageCurrent:1, //当前页，初始值为第一页
        pageSize: 20,    //每页可显示的消息条数
      },
      maxPage: 0,
      arr: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.count !== nextProps.count) {
      this.setState({
        arr: [],
      }, ()=> {
        this.getData(1);
      });
    }
  }

  // 获取以投资人数列表
  async getData(page) {
    //调用子级方法
    this.getCityInvest(this.props.projectId);
    this.getGender(this.props.projectId);
    this.getAge(this.props.projectId);
    this.getInvest(this.props.projectId);
    const response = await alreadyInvested({pageParam:{...this.state.pageParam,pageCurrent: page }, projectId:this.props.projectId});
    //判断请求状态
    if (response.code === 0) {
      const maxPage = Math.ceil(this.props.userCount*1 / this.state.pageParam.pageSize *1 );
      this.setState({
        pageParam:{
          pageCurrent:page, //当前页，初始值为第一页
          pageSize: 20,    //每页可显示的消息条数
        },
        projectId: this.props.projectId,
        arr: response.data,
        maxPage: maxPage
      });
      $('.pd-data').before('<div class="_masker"></div>');
      $('.pd-data').removeClass('none').css('top', av.top() + 50 + 'px');
    } else {
      message.error(response.msg);
    }
  }

  //获取所在城市结构相关数据
  async getCityInvest(id) {
    const response = await getCityInvest(id);
    if(response.code === 0){
      if(response.data !== null){
        this.setState({
          city:response.data,
        })
      } else {
        this.setState({
         cityShow:false,
        })
      }

    } else {
      response.msg && message.error(response.msg);
    }

  }

  //获取性别
  async getGender(id) {
    const response = await getGender(id);
    if(response.code === 0){
      if(response.data !== null){
        this.setState({
          gender:response.data,
        })
      } else {
        this.setState({
          genderShow:false,
        })
      }

    } else {
      response.msg && message.error(response.msg);
    }
  }

  //获取年龄
  async getAge(id) {
    const response = await getAge(id);
    if(response.code === 0){
      if(response.data !== null){
        this.setState({
          age:response.data,
        })
      } else {
        this.setState({
          ageShow:false,
        })
      }
    } else {
      response.msg && message.error(response.msg);
    }
  }

  //获取投资额度
  async getInvest(id) {
    const response  = await getInvest(id);
    if(response.code === 0) {
      if(response.data !== null){
        this.setState({
          invest:response.data,
        })
      } else {
        this.setState({
          investShow:false,
        })
      }
    } else {
      response.msg && message.error(response.msg);
    }
  }

  render() {
    const page_num = pageShows(this.state.pageParam.pageCurrent, this.state.pageParam.maxPage);
    return (
      <div className="pd-data shadow none g" style={{zIndex: 170}}>
        <a className="close"/>
        <p className="tit">投资人统计{this.props.userCount?<i>（<em className="cf60">{this.props.userCount}</em>人）</i>: null}</p>
        <div className="clearfix">
          <div className="fl">
            {/*列表数据*/}
            <div className="list">
              <div className="row hd">
                <span className="col1" style={{display: 'inline-block'}}>投资人</span>
                <span className="col2">投资资金</span>
                <span className="col3">投资时间</span>
              </div>
               { this.state.arr.length>0  ?
                  this.state.arr.map((data, index)=>{
                    return(
                      <div className="row" key={index}>
                        <span className="col1" style={{display: 'inline-block'}}>{data.userName}</span>
                        <span className="col2">{`${data.money}`.fm()}</span>
                        <span className="col3">{moment(data.fTime).format("YYYY-MM-DD HH:mm:ss")}</span>
                      </div>
                      )
                  }) :
                <div className="row_" >暂无数据</div>
                }
              <div className="box_1">
                <dxiv className="pagination_">
                  {page_num.lastPage ?
                    <a className="" onClick={() => this.getData(this.state.pageParam.pageCurrent - 1)}>&lt;</a> :
                    <a className="" style={{backgroundColor: '#eee'}}>&lt;</a>}
                  {page_num.firstPage ?
                    <a className={`${1 == this.state.pageParam.pageCurrent ? 'hover_1' : ''}`} onClick={() => this.getData(1)}>1</a> :
                    null}
                  {page_num.leftEllipsis ?
                    <a>...</a> :
                    null}
                  {page_num.page.map((pageNum) => {
                    return (
                      <a key={pageNum} className={`${pageNum * 1 == this.state.pageParam.pageCurrent ? 'hover_1' : ''}`}
                         onClick={() => this.getData(pageNum)}>{pageNum}</a>
                    );
                  })}
                  {page_num.rightEllipsis ?
                    <a>...</a> :
                    null}
                  {page_num.finalPage ?
                    <a
                      className={`${this.state.pageParam.maxPage == this.state.pageParam.pageCurrent ? 'hover_1' : ''}`}
                      onClick={() => this.getData(this.state.pageParam.maxPage)}
                    >{this.state.pageParam.maxPage}</a> :
                    null}
                  {page_num.nextPage ?
                    <a
                      className=""
                      onClick={() => this.getData(this.state.pageParam.pageCurrent + 1)}
                    >&gt;</a> :
                    <a className="" style={{backgroundColor: '#eee'}}>&gt;</a>}
                </dxiv>
              </div>

            </div>
            <div className="bot">
              <i>累计已投金额</i>
              <i className="cf90">{`${this.props.allMoney}`.fm()}</i>
            </div>
          </div>
          <div className="fr">
          {
            this.state.cityShow ?
            <div>
            <p className="pictit">所在城市结构</p>
             <UrbanStructure city={this.state.city}/>
            </div> : null
          }

          {
            this.state.genderShow ?
            <div >
            <p className="pictit">男女比例</p>
             <Gender gender={this.state.gender}/>
            </div> : null
          }



            {
              this.state.ageShow ?
              <div>
              <p className="pictit">年龄结构</p>
              <Age age={this.state.age}/>
              </div>: null
            }

            {
              this.state.investShow ?
              <div>
                <p className="pictit">投资额度结构</p>
                <Invest invest={this.state.invest} />
              </div> : null
            }



          </div>
        </div>
      </div>
    );
  }
}
