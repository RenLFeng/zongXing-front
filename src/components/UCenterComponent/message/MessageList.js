import React from 'react';
import {Icon, message} from 'antd';
import {Switch, Route, } from 'dva/router';
import '../../../assets/MessageList/messageList.scss';
import {messageList} from '../../../services/api.js';
import moment from 'moment';
import {STATION_MESSAGE} from '../../../common/pagePath';
import { pageShows } from '../../../common/systemParam';

export default class MessageList extends React.Component {
 constructor(props){
   super(props);
   this.state = {
     pageCurrent: 1,
     pageSize: 3,
     arr :[]
   }
 }

  componentDidMount() {
    this.fetchData(1);
  }

  async fetchData(page) {
   const response = await messageList({ pageCurrent:page, pageSize:this.state.pageSize });
   if (response.code === 0) {
     this.setState({
       arr: response.data.infoList
     });

   }else {
     message.error(response.msg);
   }
  }
  render() {
    const page_num = pageShows(currentPage, maxPage);
    return (
      <div className="fr uc-rbody" >
        <ul>
          <li>
            <div className="list_title">
              <div className="icon_">状态</div>
              <span className="title_I">主题</span>
              <span className="title_time">发送时间</span>
            </div>
          </li>
          {/*遍历数组*/}
          {this.state.arr.map((data, index) => {
            return (
              <li key={data.noticeId}>
                <div className={`${index % 2 == 1  ? 'list_content1' : 'list_content2'}`}>
                  <div className={`${data.isRead == 0 ? 'icon_1' : 'icon_2'}`}><Icon type="mail" /></div>
                  <a onClick = {()=>this.props.history.push(STATION_MESSAGE+`/${data.noticeId}`)} className="title_I">{data.title}</a>
                  <span className="title_time">{moment(data.datetime).format('YYYY-MM-DD HH:mm:ss')}</span>
                </div>
              </li>
            );
          })}
        </ul>

        {/*分页：获取列表总数，并且和每页显示的最大条数向上取整*/}

        <div className="pagination">
          <a className="num">&lt;</a>
          <a className="num">1</a>
          <a className="num">2</a>
          <a className="num">&gt;</a>
        </div>
      </div>
    );
  }
}
