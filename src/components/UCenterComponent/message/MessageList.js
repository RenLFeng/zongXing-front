import React from 'react';
import {Icon, message} from 'antd';
import '../../../assets/MessageList/messageList.scss';
import {messageList} from '../../../services/api.js';
import moment from 'moment';
import {STATION_MESSAGE} from '../../../common/pagePath';
import {pageShows} from '../../../common/systemParam';

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 1,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: []
    }
  }

  componentDidMount() {
    this.fetchData(1);  //调用请求
  }

  async fetchData(page) {
    const response = await messageList({pageCurrent: page, pageSize: this.state.pageSize});
    //判断请求状态
    if (response.code === 0) {
      const maxPage = Math.ceil(response.data.totalNumber / this.state.pageSize);
      this.setState({
        maxPage: maxPage,
        pageCurrent: page,
        arr: response.data.infoList,
      });
    } else {
      message.error(response.msg);
    }
  }

  render() {
    const page_num = pageShows(this.state.pageCurrent, this.state.maxPage);
    return (
      <div className="fr uc-rbody">
        <ul>
          <li className="hang">
            <div className="list_title">
              <div className="icon_">状态</div>
              <span className="title_I">主题</span>
              <span className="title_time">时间</span>
            </div>
          </li>
          {this.state.arr.map((data, index) => {
            return (
              <li key={data.noticeId} className="hang">
                <div className={`${index % 2 == 1 ? 'list_content2' : 'list_content1'}`}>
                  <div className={`${data.isRead == 0 ? 'icon_1' : 'icon_2'}`}><Icon type="mail"/></div>
                  <a onClick={() => this.props.history.push(STATION_MESSAGE + `/${data.noticeId}`)}
                     className="title_I">{data.title}</a>
                  <span className="title_time">{moment(data.datetime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="pagination">
          {page_num.lastPage ?
            <a className="num" onClick={() => this.fetchData(this.state.pageCurrent - 1)}>&lt;</a> :
            <a className="num" style={{backgroundColor: '#eee'}}>&lt;</a>}
          {page_num.firstPage ?
            <a className={`${1 == this.state.pageCurrent ? 'hover_' : ''}`} onClick={() => this.fetchData(1)}>1</a> :
            null}
          {page_num.leftEllipsis ?
            <a>...</a> :
            null}
          {page_num.page.map((pageNum) => {
            return (
              <a key={pageNum} className={`${pageNum * 1 == this.state.pageCurrent ? 'hover_' : ''}`}
                 onClick={() => this.fetchData(pageNum)}>{pageNum}</a>
            );
          })}
          {page_num.rightEllipsis ?
            <a>...</a> :
            null}
          {page_num.finalPage ?
            <a
              className={`${this.state.maxPage == this.state.pageCurrent ? 'hover_' : ''}`}
              onClick={() => this.fetchData(this.state.maxPage)}
            >{this.state.maxPage}</a> :
            null}
          {page_num.nextPage ?
            <a
              className="num"
              onClick={() => this.fetchData(this.state.pageCurrent + 1)}
            >&gt;</a> :
            <a className="num" style={{backgroundColor: '#eee'}}>&gt;</a>}
        </div>
      </div>
    );
  }
}
