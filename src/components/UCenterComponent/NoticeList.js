import React from 'react';
import {Icon, message, Table, Button, Checkbox} from 'antd';
import '../../assets/MessageList/messageList.scss';
import {messageList} from '../../services/api.js';
import moment from 'moment';
import {STATION_MESSAGE} from '../../common/pagePath';
import {pageShows} from '../../common/systemParam';

export default class NoticeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 15,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: [],
      showMask:false
    }
  }

  componentDidMount() {
    // this.fetchData(1);  //调用请求
  }

  async fetchData(page) {
    const response = await messageList({pageCurrent: page, pageSize: this.state.pageSize});
    console.log(response);
    //判断请求状态
    if (response.code === 0) {
      const maxPage = Math.ceil(response.data.totalNumber / this.state.pageSize);
      this.setState({
        maxPage: maxPage,
        pageCurrent: page,
        arr: response.data.infoList
      });
    } else {
      message.error(response.msg);
    }
  }


  render() {
    const { arr,showMask } = this.state;
    const columns = [{
      title: '状态',
      dataIndex: 'isRead',
      key: 'isRead',
      render: text => (
        text === '0' ? <div className= "icon_1"><Icon type="mail"/></div> : <div className= "icon_2"><Icon type="mail"/></div>
      ),
    }, {
      title: '主题',
      dataIndex: 'title',
      key: 'title',
      render: (text,record) => (
        <a onClick={() => this.props.history.push(STATION_MESSAGE + `/${record.noticeId}`)} className="title_I">{text}</a>
      ),
    }, {
      title: '时间',
      dataIndex: 'datetime',
      key:'datetime',
      render: text => (moment(text).format('YYYY-MM-DD HH:mm:ss')),
    }];

    const page_num = pageShows(this.state.pageCurrent, this.state.maxPage);
    return (
      <div className="fr uc-rbody" >
        <div className="title">
          <span className="title1">站内公告</span>
        </div>
        <div className="content_">
          <div className="messageGroup">
            <ul >
              <li className="massageList">
                <span className="massageList_title"><p>公告标题</p></span>
                <span className="massageList_time">发送时间</span>
              </li>

              <li className="massageList">
                <span className="massageList_title">
                  <p onClick={()=> this.setState({showMask:true})}>这是一个消息</p>
                </span>
                <span className="massageList_time">2018/3/16 16:58</span>
              </li>

              <li className="massageList">
                <span className="massageList_title">
                  <p onClick={()=> this.setState({showMask:true})}>这是一个消息</p>
                  <Icon type="exclamation-circle-o" className="icon_"/>
                </span>
                <span className="massageList_time">2018/3/16 16:58</span>
              </li>

              <li className="massageList">
                <span className="massageList_title">
                  <p onClick={()=> this.setState({showMask:true})}>这是一个消息</p>
                  <Icon type="exclamation-circle-o" className="icon_"/>
                  <span className="change">更新</span>
                </span>
                <span className="massageList_time">2018/3/16 16:58</span>
              </li>

              <li className="footer_">
                <span>共<i>7</i>项</span>
                <div className="box_">
                  <div className="pagination">
                    <a>&lt;</a>
                    <a>1</a>
                    <a>&gt;</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
      </div>

        {
          showMask?
          <div className="mask" onClick={()=>{this.setState({showMask:false})}}>
            <div className="mask_content">
              <div className="mask_title">
                <p className="p1">这是一个很重要的公告消息！！！<p className="p2">2018-03-19 10:08</p></p >
              </div>
              <div className="mask_word">
                <p className="mask_word1">尊敬的众借帮客户，您好！</p>
                <p className="mask_word2">这个消息很重要的，一定要阅读</p>
              </div>
              <div className="logo">
                <div className="logo_img"><img src={require('../../assets/img/logo2.png')} alt=""/></div>
                <div className="time">2018-03-19</div>
              </div>
            </div>
          </div> : null
        }








        {/*<ul>*/}
        {/*<li className="hang">*/}
        {/*<div className="list_title">*/}
        {/*<div className="icon_">状态</div>*/}
        {/*<span className="title_I">主题</span>*/}
        {/*<span className="title_time">时间</span>*/}
        {/*</div>*/}
        {/*</li>*/}
        {/*{this.state.arr.map((data, index) => {*/}
        {/*return (*/}
        {/*<li key={data.noticeId} className="hang">*/}
        {/*<div className={`${index % 2 == 1 ? 'list_content2' : 'list_content1'}`}>*/}
        {/*<div className={`${data.isRead == 0 ? 'icon_1' : 'icon_2'}`}><Icon type="mail"/></div>*/}
        {/*<a onClick={() => this.props.history.push(STATION_MESSAGE + `/${data.noticeId}`)}*/}
        {/*className="title_I">{data.title}</a>*/}
        {/*<span className="title_time">{moment(data.datetime).format('YYYY-MM-DD HH:mm:ss')}</span>*/}
        {/*</div>*/}
        {/*</li>*/}
        {/*);*/}
        {/*})}*/}
        {/*</ul>*/}
        {/*<div className="box_">*/}
        {/*<div className="pagination">*/}
        {/*{page_num.lastPage ?*/}
        {/*<a className="num" onClick={() => this.fetchData(this.state.pageCurrent - 1)}>&lt;</a> :*/}
        {/*<a className="num" style={{backgroundColor: '#eee'}}>&lt;</a>}*/}
        {/*{page_num.firstPage ?*/}
        {/*<a className={`${1 == this.state.pageCurrent ? 'hover_' : ''}`} onClick={() => this.fetchData(1)}>1</a> :*/}
        {/*null}*/}
        {/*{page_num.leftEllipsis ?*/}
        {/*<a>...</a> :*/}
        {/*null}*/}
        {/*{page_num.page.map((pageNum) => {*/}
        {/*return (*/}
        {/*<a key={pageNum} className={`${pageNum * 1 == this.state.pageCurrent ? 'hover_' : ''}`}*/}
        {/*onClick={() => this.fetchData(pageNum)}>{pageNum}</a>*/}
        {/*);*/}
        {/*})}*/}
        {/*{page_num.rightEllipsis ?*/}
        {/*<a>...</a> :*/}
        {/*null}*/}
        {/*{page_num.finalPage ?*/}
        {/*<a*/}
        {/*className={`${this.state.maxPage == this.state.pageCurrent ? 'hover_' : ''}`}*/}
        {/*onClick={() => this.fetchData(this.state.maxPage)}*/}
        {/*>{this.state.maxPage}</a> :*/}
        {/*null}*/}
        {/*{page_num.nextPage ?*/}
        {/*<a*/}
        {/*className="num"*/}
        {/*onClick={() => this.fetchData(this.state.pageCurrent + 1)}*/}
        {/*>&gt;</a> :*/}
        {/*<a className="num" style={{backgroundColor: '#eee'}}>&gt;</a>}*/}
        {/*</div>*/}
        {/*</div>*/}

      </div>


    );
  }
}
