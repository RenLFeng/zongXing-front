import React from 'react';
import {Icon, message, Table, Button, Checkbox,Menu, Dropdown } from 'antd';
import '../../../assets/MessageList/messageList.scss';
import {messageList} from '../../../services/api.js';
import moment from 'moment';
import {STATION_MESSAGE} from '../../../common/pagePath';
import {pageShows} from '../../../common/systemParam';
import {Modal} from "antd/lib/index";

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 1,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: [
        {
          id:'1',
          type:'运营消息',
          title:'这是一个很搞笑的运营消息',
          time:'2018-3-19 14:30',
          content:'啦啦啦啦啦啦啦啦阿联啦啦啦啦啦法沙发拉拢腐蚀尖峰时刻的',
          status:'0', //未读
        },{
          id:'2',
          type:'合作消息',
          title:'这是一个很搞笑的合作消息',
          time:'2018-3-19 14:30',
          content:'啦啦啦啦啦啦啦啦阿联啦啦啦啦啦法沙发拉拢腐蚀尖峰时刻的',
          status:'1', //已读
        },{
          id:'3',
          type:'产品消息',
          title:'这是一个很搞笑的产品消息',
          time:'2018-3-19 14:30',
          content:'啦啦啦啦啦啦啦啦阿联啦啦啦啦啦法沙发拉拢腐蚀尖峰时刻的',
          status:'0', //未读
        },{
          id:'4',
          type:'产品消息',
          title:'这是一个很搞笑的产品消息',
          time:'2018-3-19 14:30',
          content:'啦啦啦啦啦啦啦啦阿联啦啦啦啦啦法沙发拉拢腐蚀尖峰时刻的',
          status:'0', //未读
        }
      ], //消息列表
      arr1:[{
        id:'1',
        type:'运营消息',
        title:'这是一个很搞笑的运营消息',
        time:'2018-3-19 14:30',
        content:'啦啦啦啦啦啦啦啦阿联啦啦啦啦啦法沙发拉拢腐蚀尖峰时刻的',
        status:'0', //未读
      },{
        id:'2',
        type:'合作消息',
        title:'这是一个很搞笑的合作消息',
        time:'2018-3-19 14:30',
        content:'啦啦啦啦啦啦啦啦阿联啦啦啦啦啦法沙发拉拢腐蚀尖峰时刻的',
        status:'1', //已读
      },{
        id:'3',
        type:'产品消息',
        title:'这是一个很搞笑的产品消息',
        time:'2018-3-19 14:30',
        content:'啦啦啦啦啦啦啦啦阿联啦啦啦啦啦法沙发拉拢腐蚀尖峰时刻的',
        status:'0', //未读
      },{
        id:'4',
        type:'产品消息',
        title:'这是一个很搞笑的产品消息',
        time:'2018-3-19 14:30',
        content:'啦啦啦啦啦啦啦啦阿联啦啦啦啦啦法沙发拉拢腐蚀尖峰时刻的',
        status:'0', //未读
      }],
      allCheck:false,
      num:0,
    }
  }

  componentDidMount() {
    // this.fetchData(1);  //调用请求
  }

  all(){
    let {arr,arr1} = this.state;
    let list = arr.filter((data)=>data.id !== null);
    this.setState({
      arr1:arr,
    })
  }
  search(){
    console.log('运营')
    const {arr,arr1} = this.state;
    const list = arr.filter((data)=> data.type == '运营消息');
    this.setState({
      arr1:list
    },()=>{
      console.log(this.state.arr1);
    })
  }

  search1 (){
    const {arr,arr1} = this.state;
    const list = arr.filter((data)=> data.type == '合作消息');
    this.setState({
      arr1:list
    },()=>{
      console.log(this.state.arr1);
    })
  }
  search2 (){
    const {arr,arr1} = this.state;
    const list = arr.filter((data)=> data.type === '产品消息');
    this.setState({
      arr1:list
    },()=>{
      console.log(this.state.arr1);
    })
  }

  // dele() {
  //   console.log(1111)
  //   let list = this.state.arr;
  //   const arr1_ = list.filter((item)=>item.checkboxValue !== true);
  //   console.log(arr1_);
  //   this.setState({
  //     arr1: arr1_,
  //     num:arr1_.length,
  //   },()=>{
  //     const arr2 = arr1_.filter((item)=>item.checkboxValue === true);
  //     this.setState({
  //       num: arr2.length,
  //     });
  //     if(arr2.length === 0){
  //       this.setState({
  //         allCheck:false,
  //       })
  //     }
  //   });
  // }

  dele(id) {
    let list = this.state.arr;
    const arr_ = list.filter((item)=>item.id !==id );
    const arr1 = arr_.filter((item)=>item.checkboxValue === true);
    console.log(arr_);
    this.setState({
      arr: arr_,
      num:arr1.length,
    });
  }


  read(){
    let list = this.state.arr1;
    const arr_ = list.filter((item)=>item.checkboxValue === true );
    console.log(arr_);

    // this.setState({
    //   arr:arr_,
    // },()=>{
    //   const arr2 = this.state.arr1.filter((item)=>item.status )
    // })
  }
  readAll(){

  }

  del_all() {
    let list = this.state.arr1;
    const arr_ = list.filter((item)=>item.checkboxValue !== true );
    console.log(arr_);
    this.setState({
      arr: arr_,
      allCheck:false,
      num:arr_.length,
    });
  }

  onChange(e,data, index){
    // this.dele();
    let list = this.state.arr1;
    list[index].checkboxValue =  e.target.checked;
    this.setState({
      arr1: list,
    },() => {
      let arr_ = this.state.arr1.filter((item) => item.checkboxValue === true);
      this.setState({num:arr_.length});
      if(arr_.length === list.length){
        this.setState({
          allCheck: true,
        });
      } else {
        this.setState({
          allCheck: false,
        });
      }
    });
  }

  handleCheckAll(e) {
    let list = this.state.arr1;
    for( let obj of list) {
      obj.checkboxValue = e.target.checked
  }
    this.setState({
      allCheck: e.target.checked,
      arr1: list
    },() => {
      let arr_ = list.filter((item)=>(item.checkboxValue ===  true));
    });
    this.forceUpdate();
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

 handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }

  handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  render() {
    const { arr, arr1, allCheck } = this.state;
    const page_num = pageShows(this.state.pageCurrent, this.state.maxPage);
    const menu = (
      <Menu onClick={()=>this.handleMenuClick()}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
        <Menu.Item key="4">3rd item</Menu.Item>
        <Menu.Item key="5">3rd item</Menu.Item>
      </Menu>
    );
    return (
      <div className="fr uc-rbody" >
        <div className="title">
          <span className="title1">站内消息</span>
          <span className="title2">共<i>7</i>封，其中<i>3</i>封未读</span>
        </div>
        <div className="content">
          <div className="btns">
            <div className="btn1">
              <Button onClick={(e)=>this.dele(e.target.id)}>删除</Button>
              <Button onClick={()=>this.read()}>标记为已读</Button>
              <Button>已读所有消息</Button>
            </div>
           <div className="btn2">
             <Button onClick={()=>this.all()}>全部</Button>
             <Button onClick={()=>this.search()}>运营消息</Button>
             <Button onClick={()=>this.search1()}>合作消息</Button>
             <Dropdown.Button onClick={()=>this.handleButtonClick()} overlay={menu}>
               产品消息
             </Dropdown.Button>

             {/*<Button onClick={()=>this.search2()}></Button>*/}
           </div>
          </div>
          <div className="messageGroup">
            <ul>
              <li className="massageList">
                <span className="massageList_title" onClick={()=>this.del_all()}>
                  <Checkbox className="check" onChange={(val)=>this.handleCheckAll(val)} checked={this.state.allCheck}>消息内容</Checkbox>
                </span>
                <span className="massageList_time_">发送时间</span>
              </li>

              {
                this.state.arr1.map((data,index)=>{
                  return(
                    <li className="massageList" key={data.id}>
                      <Checkbox className="check" onChange={(val,data)=>this.onChange(val,data, index)} checked={data.checkboxValue?data.checkboxValue: false}/>
                      <span className={`${data.status == 0 ? 'massageList_title1': 'massageList_title'}`}>
                        <Icon type="mail" className={`${data.status == 0 ? 'icon2': 'icon1'}`}/>
                        <p onClick={() => this.props.history.push(STATION_MESSAGE + `/${data.id}`)}>{data.title}</p>
                      </span>
                      <span className="massageList_time">{data.time}</span>
                    </li>
                    )
                })
              }


              <li className="footer_">
                <span>已选<i>{this.state.num}</i>项，共<i>7</i>项</span>
                <div className="box_">
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
                </div>>
              </li>

            </ul>
          </div>
        </div>



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


      </div>





    );
  }
}
