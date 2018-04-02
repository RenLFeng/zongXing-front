import React from 'react';
import {Icon, message, Table, Button, Checkbox, Dropdown, Menu} from 'antd';
import '../../assets/myInvest/myInvest.scss';
import {getPlantNotice, getOPlantNotice, getMyInvestment} from '../../services/api.js';
import moment from 'moment';
import {pageShows, MY_INCOME_STATUS} from '../../common/systemParam';  //分页组件
import Path from '../../common/pagePath';

export default class MyInvestment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 5,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: [],
      flag: null, // 我的投资状态查询列表
      showText: '更多状态'
    }
  }

  componentDidMount() {
    this.getMyinvestAjax(1);  //调用请求
  }

  //获取我的投资列表
  async getMyinvestAjax(page) {
    const response = await getMyInvestment({
      pageParam: {
        pageSize: this.state.pageSize,
        pageCurrent: page
      },
      flag: this.state.flag
    });
    console.log(response);
    if(response.code ===0){
      const maxPage = Math.ceil(response.data.totalNumber / this.state.pageSize);
      this.setState({
        maxPage: maxPage,
        pageCurrent: page,
        arr:response.data.infoList,
        num:response.data.totalNumber,
      })
    }  else {
      message.error(response.msg);
    }
  }

//获取单个公告
  async getOPlantNotice(id) {
    this.setState({
      showMask:true
    });
    const response = await getOPlantNotice(id);
    console.log(response);
    if(response.code ===0){
      this.setState({
        detail:response.data,
      })
    }
  }

  // 根据选择的状态切换数据
  changeStatus(key) {
    this.setState({
      showText: MY_INCOME_STATUS[key],
      flag: key
    }, ()=>{
      this.getMyinvestAjax(1);
    })
  }

  // 搜索所有状态的我的投资
  searchAll() {
    this.setState({
      showText: '更多状态',
      flag: null
    }, ()=>{
      this.getMyinvestAjax(1);
    })
  }

  // 展开子菜单
  showChild(data) {
    if (data.isShow) {
      data.isShow = false;
    } else {
      data.isShow = true;
    }
    this.forceUpdate()
  }
  render() {
    const { arr,showMask,detail } = this.state;
    const page_num = pageShows(this.state.pageCurrent, this.state.maxPage);
    const menu = (<Menu onClick={(e)=>{this.changeStatus(e.key)}}>
      {Object.keys(MY_INCOME_STATUS).map((data)=> {
        return (
          <Menu.Item key={data}>{MY_INCOME_STATUS[data]}</Menu.Item>
        );
      })}
    </Menu>);
    return (
      <div className="fr uc-rbody" >
        <div className="title">
          <span className="title1">我的投资</span>
        </div>
        <div className="content_">
          <div className="btns_myInvest">
            <Button onClick={()=>this.searchAll()}>所有</Button>
            <Dropdown overlay={menu}>
              <Button>
                {this.state.showText}<Icon type="down" />
              </Button>
            </Dropdown>
          </div>
          <div className="investGroup">
            <ul >
              <li className="investList">
                <span className="investList_no"><p style={{cursor: 'auto'}}>编号</p></span>
                <span className="investList_title">项目名称</span>
                <span className="investList_money" style={{textAlign: 'right'}}>投资金额</span>
                <span className="investList_status" style={{textAlign: 'right'}}>待付款金额</span>
                <span className="investList_time">状态</span>
                <span className="investList_operation">操作</span>
              </li>
              { this.state.arr.map((data, index)=> {
                  return (
                    <div key={data.finv_no}>
                      <li className="investList" >
                        <span className="investList_no">{data.finv_no}</span>
                        <span className="investList_title">{data.fname}</span>
                        <span className="investList_money" style={{textAlign: 'right',color: 'blue', cursor: 'pointer'}} onClick={()=>this.showChild(data)}>{`${data.fmoney}`.fm()}</span>
                        <span className="investList_status" style={{textAlign: 'right',color: 'blue', cursor: 'pointer'}} onClick={()=>this.showChild(data)}></span>
                        <span className="investList_time">{MY_INCOME_STATUS[`${data.fflag}`]}</span>
                        <span className="investList_operation">
                          <a style={{color: 'blue'}}
                             onClick={() => {
                               this.props.history.push({pathname: Path.INCOME_PLAN,  query:{projectId: data.fproject_id, money: data.fmoney}})}}
                          >
                            查看</a>
                        </span>
                      </li>
                      { data.isShow?
                        <div>
                          <li className="investListChild">
                            <span className="investListChild_money"><p style={{cursor: 'auto'}}>金额</p></span>
                            <span className="investListChild_status">状态</span>
                            <span className="investListChild_time">时间</span>
                            <span className="investListChild_op">操作</span>
                          </li>
                          <li className="investListChild">
                            <span className="investListChild_money" style={{textAlign: 'right'}}>{'133'.fm()}</span>
                            <span className="investListChild_status">未付款</span>
                            <span
                              className="investListChild_time">{moment(new Date()).format('YYYY-MM-DD HH:mm')}</span>
                            <span className="investListChild_op">
                            <a style={{
                              borderRight: '2px solid #c9c9c9',
                              paddingRight: 5,
                              marginRight: 5,
                              color: 'blue'
                            }}>付款</a>
                            <a style={{color: 'blue'}}>撤销</a>
                          </span>
                          </li>
                        </div>: null
                      }
                    </div>
                  );
                })
              }
              <li className="footer_">
                <span>共<i>{this.state.num}</i>项</span>
                <div className="box_">
                  <div className="pagination">
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

            </ul>
          </div>
        </div>

        {
          showMask?
            <div className="mask" onClick={()=>{this.setState({showMask:false})}}>
              <div className="mask_content">
                <div className="mask_title">
                  <p className="p1">{detail.ftitle}<p className="p2">{moment(detail.fpublishTime).format('YYYY-MM-DD HH:mm:ss')}</p></p >
                </div>
                <div className="mask_word">
                  <p className="mask_word1">尊敬的众借帮客户，您好！</p>
                  <p className="mask_word2">{detail.article ? detail.article.fcontent : null }</p>
                </div>
                <div className="logo">
                  <div className="logo_img"><img src={require('../../assets/img/logo2.png')} alt=""/></div>
                  <div className="time">{moment(detail.fpublishTime).format('YYYY-MM-DD')}</div>
                </div>
              </div>
            </div> : null
        }
      </div>
    );
  }
}
