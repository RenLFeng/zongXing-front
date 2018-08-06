import React from 'react';
import {getSiteNotice} from '../../services/api.js';
import {message} from "antd/lib/index";
import moment from 'moment';
import '../../assets/MessageList/messageList.scss';
import {pageShows} from "../../common/systemParam";
import {NOTICE_DETAIL} from "../../common/pagePath";
const lists=[
  {"title":"1大事记","time":"2018年8月8日"},
  {"title":"2大事记","time":"2018年8月8日"},
  {"title":"3大事记","time":"2018年8月8日"},
  {"title":"4大事记","time":"2018年8月8日"},
  {"title":"5大事记","time":"2018年8月8日"},
  {"title":"6大事记","time":"2018年8月8日"},
  {"title":"7大事记","time":"2018年8月8日"},
  {"title":"8大事记","time":"2018年8月8日"},
  {"title":"9大事记","time":"2018年8月8日"},
  {"title":"10大事记","time":"2018年8月8日"},
  {"title":"11大事记","time":"2018年8月8日"},
  {"title":"12大事记","time":"2018年8月8日"},
  {"title":"13大事记","time":"2018年8月8日"},
  {"title":"14大事记","time":"2018年8月8日"},
  {"title":"15大事记","time":"2018年8月8日"},
  {"title":"16大事记","time":"2018年8月8日"},
  {"title":"17大事记","time":"2018年8月8日"},
  {"title":"18大事记","time":"2018年8月8日"},
  {"title":"19大事记","time":"2018年8月8日"},
  {"title":"20大事记","time":"2018年8月8日"}
]
export default class Plant extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      arr:[], //平台消息列表,
      pageSize: 10,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      pageIndex:1,
    }
  }
  componentDidMount() {
    this.getPlantNotice(1);  //调用请求
  }


  async getPlantNotice(page){
    const response = await getSiteNotice(page,this.state.pageSize);
    if(response.code === 0){
      const maxPage = Math.ceil(response.data.itemCount / this.state.pageSize);
      this.setState({
        maxPage: maxPage,
        arr:response.data.notices,
        pageIndex:page,
      })
    }  else {
      message.error(response.msg);
    }
  }

  render() {
    const page_num = pageShows(this.state.pageIndex, this.state.maxPage);
    return (
      <div className="fr shadow page">
        {
          this.state.arr.map((data)=>{
            return(
              <div className="list"  key={data.fid}>
                {data.ftype === "WARN" ? <p className="titleP">{data.ftitle}<span className="hot">HOT</span></p>:
                  <p className="titleP" onClick={() => this.props.history.push(NOTICE_DETAIL + `/${data.fid}`)}>{data.ftitle}</p>
                }
                <p className="timeP">{moment(data.fpublishTime).format('YYYY-HH-DD HH:mm:ss')}</p>
              </div>
              )
          })
        }

        <li className="footers">
          <div className="box_1">
            <div className="paginations">
              {page_num.lastPage ?
                <a className="num" onClick={() => this.getPlantNotice(this.state.pageIndex - 1)}>&lt;</a> :
                <a className="num" style={{backgroundColor: '#eee'}}>&lt;</a>}
              {page_num.firstPage ?
                <a className={`${1 == this.state.pageIndex ? 'hover_' : ''}`} onClick={() => this.getPlantNotice(1)}>1</a> :
                null}
              {page_num.leftEllipsis ?
                <a>...</a> :
                null}
              {page_num.page.map((pageNum) => {

                return (
                  <a key={pageNum} className={`${pageNum * 1 == this.state.pageIndex ? 'hover_' : ''}`}
                     onClick={() => this.getPlantNotice(pageNum)}>{pageNum}</a>
                );
              })}
              {page_num.rightEllipsis ?
                <a>...</a> :
                null}
              {page_num.finalPage ?
                <a
                  className={`${this.state.maxPage == this.state.pageIndex ? 'hover_' : ''}`}
                  onClick={() => this.getPlantNotice(this.state.maxPage)}
                >{this.state.maxPage}</a> :
                null}
              {page_num.nextPage ?
                <a className="num" onClick={() => this.getPlantNotice(this.state.pageIndex + 1)}>&gt;</a> :
                <a className="num" style={{backgroundColor: '#eee'}}>&gt;</a>
              }
            </div>
          </div>
        </li>

      </div>
    );
  }
}
