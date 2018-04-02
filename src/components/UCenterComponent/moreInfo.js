import React from 'react';
import {Table} from 'antd';
import {capitalDynamics} from '../../services/api.js';
import {message} from "antd/lib/index";
import moment from 'moment';
import '../../assets/MessageList/messageList.scss';
import {pageShows} from "../../common/systemParam";


export default class MoreInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      pageCurrent: 1,
      pageIndex: 1,
      pageSize:10,
      data:[
        {
          faccount_id:111,
          ftime:2018/3/29,
          fremark:'转账',
          fin_money:1000,
          fout_money:100,
          freal_name:'啦啦啦啦',
          fbegin_money:1000,
          fend_name:100
        },{
          faccount_id:222,
          ftime:2018/3/29,
          fremark:'转账',
          fin_money:1000,
          fout_money:100,
          freal_name:'啦啦啦啦',
          fbegin_money:1000,
          fend_name:100
        },{
          faccount_id:333,
          ftime:2018/3/29,
          fremark:'转账',
          fin_money:1000,
          fout_money:100,
          freal_name:'啦啦啦啦',
          fbegin_money:1000,
          fend_name:100
        },{
          faccount_id:444,
          ftime:2018/3/29,
          fremark:'转账',
          fin_money:1000,
          fout_money:100,
          freal_name:'啦啦啦啦',
          fbegin_money:1000,
          fend_name:100
        },{
          faccount_id:555,
          ftime:2018/3/29,
          fremark:'转账',
          fin_money:1000,
          fout_money:100,
          freal_name:'啦啦啦啦',
          fbegin_money:1000,
          fend_name:100
        },{
          faccount_id:666,
          ftime:2018/3/29,
          fremark:'转账',
          fin_money:1000,
          fout_money:100,
          freal_name:'啦啦啦啦',
          fbegin_money:1000,
          fend_name:100
        }
      ],
      infoList:[],   //资金动态列表
      num:'',
      maxPage: 0,     //最大页
    }
  }

  componentDidMount() {
    this.getCapitalDynamics(1);  //调用请求
  }

  async getCapitalDynamics(page){
    const response = await capitalDynamics({companyNo: "", pageCurrent: page, pageIndex: this.state.pageIndex, pageSize: this.state.pageSize});
    console.log(response);
    if(response.code === 0){
      const maxPage = Math.ceil(response.data.totalNumber / this.state.pageSize);
      this.setState({
        maxPage:maxPage,
        infoList:response.data.infoList,
        pageCurrent: page,
        num:response.data.totalNumber
      });

    } else {
      response.msg && message.error(response.msg);
    }
  }

  render(){
    const {infoList,num,pageCurrent,pageSize,data} = this.state;
    const page_num = pageShows(this.state.pageCurrent, this.state.maxPage);

    return(
      <div className="fr uc-rbody"  >
        <div className="title">
          <span className="title1">资金动态</span>
        </div>

        <div className="content_">
          <div className="messageGroup">
            <ul >
              <li className="massageList">
                <span className="massageListTitle3">往来单位</span>
                <span className="massageListTitle1">类型</span>
                <span className="massageListTitle">收入</span>
                <span className="massageListTitle">支出</span>
                <span className="massageListTitle">账户初始金额</span>
                <span className="massageListTitle">账户剩余金额</span>
                <span className="massageListTitle2">时间</span>
              </li>

              {
                infoList.map((data)=>{
                  return(
                    <li className="massageList" key={data.fid}>
                      <span className="massageListTitle3">{data.fotherName}</span>
                      <span className="massageListTitle1">{data.busType}</span>
                      <span className="massageListTitle">{(data.finMoney+'').fm()}元</span>
                      <span className="massageListTitle">{(data.foutMoney+'').fm()}元</span>
                      <span className="massageListTitle">{(data.fbeginMoney+'').fm()}元</span>
                      <span className="massageListTitle">{(data.fendMoney+'').fm()}元</span>
                      <span className="massageListTitle2">{moment(data.ftime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </li>
                  )
                })
              }

              <li className="footer_">
                <span>共<i>{this.state.num}</i>项</span>
                <div className="box_">
                  <div className="pagination">
                    {page_num.lastPage ?
                      <a className="num" onClick={() => this.getCapitalDynamics(this.state.pageCurrent - 1)}>&lt;</a> :
                      <a className="num" style={{backgroundColor: '#eee'}}>&lt;</a>}
                    {page_num.firstPage ?
                      <a className={`${1 == this.state.pageCurrent ? 'hover_' : ''}`} onClick={() => this.getCapitalDynamics(1)}>1</a> :
                      null}
                    {page_num.leftEllipsis ?
                      <a>...</a> :
                      null}
                    {page_num.page.map((pageNum) => {
                      return (
                        <a key={pageNum} className={`${pageNum * 1 == this.state.pageCurrent ? 'hover_' : ''}`}
                           onClick={() => this.getCapitalDynamics(pageNum)}>{pageNum}</a>
                      );
                    })}
                    {page_num.rightEllipsis ?
                      <a>...</a> :
                      null}
                    {page_num.finalPage ?
                      <a
                        className={`${this.state.maxPage == this.state.pageCurrent ? 'hover_' : ''}`}
                        onClick={() => this.getCapitalDynamics(this.state.maxPage)}
                      >{this.state.maxPage}</a> :
                      null}
                    {page_num.nextPage ?
                      <a className="num" onClick={() => this.getCapitalDynamics(this.state.pageCurrent + 1)}>&gt;</a> :
                      <a className="num" style={{backgroundColor: '#eee'}}>&gt;</a>
                    }
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>

      </div>
    )
  }
}
