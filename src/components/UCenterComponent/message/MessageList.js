import React from 'react';
import {Icon, message, Table, Button, Checkbox,Menu, Dropdown } from 'antd';
import '../../../assets/MessageList/messageList.scss';
import {getButtonType,getMessageType,setRead, setAllRead} from '../../../services/api.js';
import moment from 'moment';
import {STATION_MESSAGE} from '../../../common/pagePath';
import {pageShows} from '../../../common/systemParam';
// import {Modal} from "antd/lib/index";

export default class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxPage: 0,     //最大页

      arr: [], //消息列表
      arr1:[],  //暂存数据列表
      allCheck:false,
      num:0,  //已选数目
      nums:0,   //项目总个数
      not_num:0,  //未读个数
      buttonArr:[],

      pageIndex:0,  //当前页，初始值为第一页
      pageSize: 5,    //每页可显示的消息条数
      typeNo:''
    }
  }

  componentDidMount() {
    this.ButtonType();
    // this.readNot();
  }

  //获取按钮类型
  async ButtonType(){
    const response = await getButtonType();
    console.log(response);
    if(response.code === 0){
      this.setState({
        buttonArr:response.data,
      },()=>{
        this.setState({
          typeNo:response.data[0].fno,
        });
        this.MessageType(response.data[0].fno, 0)
      })
    } else {
      message.error(response.msg);
    }
  }

  //按类型获取消息列表
  async MessageType(no,page) {
    const response = await getMessageType({pageIndex:page,pageSize:this.state.pageSize,typeNo:no});
    console.log(response);
    if(response.code === 0){
      const maxPage = Math.ceil(response.data.itemCount / this.state.pageSize);
      this.setState({
        maxPage: maxPage,
        pageIndex: page,
        typeNo: no,
        arr: response.data.messages,
        arr1: response.data.messages,
        nums: response.data.messages.length,
      });
    } else {
      message.error(response.msg);
    }
  }

  //设置已读
  async setRead(){
    let list = this.state.arr1;
    const list1 = list.filter((item)=>(item.checkboxValue === true));
    const id = list1.map((item)=>(item.fid)).toString();
    const response = await setRead({fids:id});
    if(response.code ===0){
      this.MessageType(this.state.typeNo, this.state.pageIndex);
    } else {
      message.error(response.msg);
    }
  }

  //设置全部已读
  async setAllRead() {
    const response = await setAllRead();
    if(response.code ===0){
      this.MessageType(this.state.typeNo, this.state.pageIndex);
      console.log(11111);

    } else {
      message.error(response.msg);
    }
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

  del_shopping(id) {
    let list = this.state.arr1;
    const list1 = list.filter((item)=>(item.checkboxValue !== true));
    console.log(list1);
    const list2 = list1.filter((item)=>(item.fid !== id));
    console.log(list2);
    // const id = list1.map((item)=>(item.fid)).toString();
    this.setState({
      arr1: list2,
      nums:list2.length,
    });
  }

  // del_all() {
  //   let list = this.state.arr1;
  //   const arr_ = list.filter((item)=>item.checkboxValue !== true );
  //   console.log(arr_);
  //   this.setState({
  //     arr: arr_,
  //     allCheck:false,
  //     num:arr_.length,
  //   });
  // }



  onChange(e,data, index){
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

 handleButtonClick(e) {
    message.info('Click on left button');
    console.log('click left button', e);
  }

  handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }

  render() {
    const { arr, arr1, allCheck,buttonArr,pageSize,pageIndex } = this.state;
    const page_num = pageShows(this.state.pageIndex, this.state.maxPage);
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
          <span className="title2">共<i>{this.state.nums}</i>条，其中<i>{this.state.not_num}</i>条未读</span>
        </div>
        <div className="content">
          <div className="btns">
            <div className="btn1">
              <Button onClick={(e)=>this.del_shopping(e.target.fid)}>删除</Button>
              <Button onClick={(e)=>this.setRead(e.target.fid)}>标记为已读</Button>
              <Button onClick={()=>this.setAllRead()}>已读所有消息</Button>
            </div>
            <div className="btn2">
             {
               buttonArr.map((data,index)=>{
                 return(
                   // buttonArr.length > 3 ?
                   //   <div className="btnBox">
                   //     <Button onClick={()=>this.all()}>{data.fname}</Button>
                   //     <Button onClick={()=>this.search()}>运营消息</Button>
                   //     <Button onClick={()=>this.search1()}>合作消息</Button>
                   //     <Dropdown.Button onClick={()=>this.handleButtonClick()} overlay={menu}>
                   //       产品消息
                   //     </Dropdown.Button>
                   //   </div>
                   //   :
                       <Button onClick={()=>this.MessageType(data.fno, 0)} key={data.fno}>{data.fname}</Button>
                 )
               })
             }
          </div>

          </div>
          <div className="messageGroup">
            <ul>
              <li className="massageList">
                <span className="massageList_title" >
                  <Checkbox className="check" onChange={(val)=>this.handleCheckAll(val)} checked={this.state.allCheck}>消息内容</Checkbox>
                </span>
                <span className="massageList_time_">时间</span>
              </li>

              {
                this.state.arr1.map((data,index)=>{
                  return(
                    <li className="massageList" key={data.fid}>
                      <Checkbox className="check" onChange={(val,data)=>this.onChange(val,data, index)} checked={data.checkboxValue?data.checkboxValue: false}/>
                      <span className={`${data.fisRead == false ? 'massageList_title1': 'massageList_title'}`}>
                        <Icon type="mail" className={`${data.fisRead == false ? 'icon2': 'icon1'}`}/>
                        <p onClick={() => this.props.history.push(STATION_MESSAGE + `/${data.fid}`)}>{data.ftitle}</p>
                      </span>
                      <span className="massageList_time">{moment(data.fsendTime).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </li>
                    )
                })
              }


              <li className="footer_">
                <span>已选<i>{this.state.num}</i>项，共<i>{this.state.nums}</i>项</span>
                <div className="box_">
                  <div className="pagination">
                    {page_num.lastPage ?
                      <a className="num" onClick={() => this.MessageType(this.state.typeNo,this.state.pageIndex - 1)}>&lt;</a> :
                      <a className="num" style={{backgroundColor: '#eee'}}>&lt;</a>}
                    {page_num.firstPage ?
                      <a className={`${1 == this.state.pageIndex ? 'hover_' : ''}`} onClick={() => this.MessageType(this.state.typeNo,1)}>1</a> :
                      null}
                    {page_num.leftEllipsis ?
                      <a>...</a> :
                      null}
                    {page_num.page.map((pageNum) => {
                      return (
                        <a key={pageNum} className={`${pageNum * 1 == this.state.pageIndex ? 'hover_' : ''}`}
                           onClick={() => this.MessageType(this.state.typeNo,pageNum)}>{pageNum}</a>
                      );
                    })}
                    {page_num.rightEllipsis ?
                      <a>...</a> :
                      null}
                    {page_num.finalPage ?
                      <a
                        className={`${this.state.maxPage == this.state.pageIndex ? 'hover_' : ''}`}
                        onClick={() => this.MessageType(this.state.typeNo,this.state.maxPage)}
                      >{this.state.maxPage}</a> :
                      null}
                    {page_num.nextPage ?
                      <a className="num" onClick={() => this.MessageType(this.state.typeNo,this.state.pageIndex + 1)}>&gt;</a> :
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
