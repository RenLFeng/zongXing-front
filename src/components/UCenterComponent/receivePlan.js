import React from 'react';
import {message} from 'antd';
import '../../assets/MessageList/messageList.scss';
import {repayPlan} from '../../services/api.js';
import moment from 'moment';
import {pageShows} from '../../common/systemParam';  //分页组件

export default class ReceivePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 10,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: [],
      num:0,  //总条数
    }
  }

  componentDidMount() {
    this.getRepayPlan(1);  //调用请求
  }

  //获取计划列表
  async getRepayPlan(page){
    const response = await repayPlan({pageCurrent:page,pageSize:this.state.pageSize});
    console.log(response);
    if(response.code === 0){
      const maxPage = Math.ceil(response.data.totalNumber / this.state.pageSize);
      this.setState({
        maxPage:maxPage,
        pageCurrent:page,
        arr:response.data.infoList,
        num:response.data.totalNumber
      })
    } else {
      response.msg && message.error(response.msg)
    }
  }

  render() {
    const { arr,showMask,detail } = this.state;
    const page_num = pageShows(this.state.pageCurrent, this.state.maxPage);
    console.log(arr);
    return (
      <div className="fr uc-rbody" >
        <div className="title">
          <span className="title1">回款计划</span>
        </div>

        <div className="content_">
          <div className="messageGroup">
            <ul >
              <li className="planList">
                <span className="projectName"><p>项目名称</p></span>
                <span className="sumMoney">总金额</span>
                <span className="money">本金</span>
                <span className="Interest">利息</span>
                <span className="time">回款时间</span>
              </li>

              { !arr || arr && arr.length <= 0?
                <p className="planList center">暂无数据</p>:
                arr.map((data,index)=>{
                  return(
                    <li className="planList" key={index}>
                    <span className="projectName"><p>{data.fname}</p></span>
                    <span className="sumMoney">{data.allmoney ? (data.allmoney+'').fm() +'元': null}</span>
                    <span className="money">{data.allprincipal ? (data.allprincipal+'').fm() +'元': null}</span>
                    <span className="Interest">{data.allinterest ? (data.allinterest+'').fm() +'元': null}</span>
                    <span className="time">{data.time}</span>
                  </li>
                  )
                })
              }

              <li className="footer_">
                <span>共<i>{this.state.num}</i>项</span>
                <div className="box_">
                  <div className="pagination">
                    {page_num.lastPage ?
                      <a className="num" onClick={() => this.getRepayPlan(this.state.pageCurrent - 1)}>&lt;</a> :
                      <a className="num" style={{backgroundColor: '#eee'}}>&lt;</a>}
                    {page_num.firstPage ?
                      <a className={`${1 == this.state.pageCurrent ? 'hover_' : ''}`} onClick={() => this.getRepayPlan(1)}>1</a> :
                      null}
                    {page_num.leftEllipsis ?
                      <a>...</a> :
                      null}
                    {page_num.page.map((pageNum) => {
                      return (
                        <a key={pageNum} className={`${pageNum * 1 == this.state.pageCurrent ? 'hover_' : ''}`}
                           onClick={() => this.getRepayPlan(pageNum)}>{pageNum}</a>
                      );
                    })}
                    {page_num.rightEllipsis ?
                      <a>...</a> :
                      null}
                    {page_num.finalPage ?
                      <a
                        className={`${this.state.maxPage == this.state.pageCurrent ? 'hover_' : ''}`}
                        onClick={() => this.getRepayPlan(this.state.maxPage)}
                      >{this.state.maxPage}</a> :
                      null}
                    {page_num.nextPage ?
                      <a className="num" onClick={() => this.getRepayPlan(this.state.pageCurrent + 1)}>&gt;</a> :
                      <a className="num" style={{backgroundColor: '#eee'}}>&gt;</a>
                    }
                  </div>
                </div>
              </li>
            </ul>
          </div>
      </div>
      </div>
    );
  }
}
