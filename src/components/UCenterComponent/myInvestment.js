import React from 'react';
import {Input,Icon, message, Table, Button, Checkbox, Dropdown, Menu, Modal} from 'antd';
import {getPlantNotice, getMyInvestment, toPayment, delOrder} from '../../services/api.js';
import moment from 'moment';
import {pageShows, MY_INCOME_STATUS, ORDER_STATUS, MY_INVEST_URL} from '../../common/systemParam';  //分页组件
import '../../assets/myInvest/myInvest.scss'; 
import Path from '../../common/pagePath';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import LoanInfo from '../common/LoanInfo.js';

export default class MyInvestment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 5,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: [],
      flag: null, // 我的投资状态查询列表
      showText: '更多状态',
      dataSource: {}, //获取参数
      projectId: null
    }
  }

  componentDidMount() {
    // 判断有没有传过来projectId
    let projectId = null;
    if (this.props.location.state && this.props.location.state.projectId) {
      this.setState({
        projectId: this.props.location.state.projectId
      }, () => {
        // true 代表列表默认展开子列表
        this.getMyinvestAjax(1, 0);
      });
      return;
    }
    this.getMyinvestAjax(1);  //调用请求
  }

  //获取我的投资列表
  async getMyinvestAjax(page, flag) {
    try {
      const response = await getMyInvestment({
        pageParam: {
          pageSize: this.state.pageSize,
          pageCurrent: page
        },
        flag: this.state.flag,
        projectId: this.state.projectId
      });
      console.log(response);
      if(response.code ===0){
        const maxPage = Math.ceil(response.data.totalNumber / this.state.pageSize);
        this.setState({
          maxPage: maxPage,
          pageCurrent: page,
          arr: response.data.infoList.map((item, index)=>{
            if (index === flag) {
              item.isShow = true;
            }
            return item;
          }),
          num:response.data.totalNumber,
        })
      }  else {
        message.error(response.msg);
      }
    } catch(e) {
      if (typeof e === 'object' && e.name === 288) {
        message.error('未登录或登录超时');
        localStorage.removeItem('accessToken');
        this.props.history.push('/index/login');
      }
      console.log(e);
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
      flag: null,
      projectId: null
    }, ()=>{
      this.getMyinvestAjax(1);
    })
  }

  // 订单去付款接口
  async toPaymentAjax(payId, index) {
    // 防止重复提交
    if (this.state.loading) {
      return;
    }
    this.setState({loading: true});
    console.log(window.location.href);
    const response = await toPayment(payId, encodeURIComponent(window.location.href));
    this.setState({loading: false});
    console.log(response);
    if (response.code === 0) {
      this.setState({
        dataSource: response.data
      }, ()=> {
        this.formId.submit();
        Modal.info({
          title: '提示',
          content: '请在新页面完成操作,可刷新页面查看结果',
          okText: '确定',
          onOk: ()=> {
            // 刷新页面
            this.getMyinvestAjax(1, index);
          },
        });
      })
    } else {
      response.msg && message.error(response.msg);
    }
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
  // 删除订单
  async deleteOrderAjax(fid, index) {
    if (this.state.loading) {
      return;
    }
    this.setState({loading: true});
    const response = await delOrder(fid);
    this.setState({loading: false});
    if (response.code === 0) {
      this.getMyinvestAjax(1, index);
    } else {
      response.msg && message.error(response.msg);
    }
  }
  render() {
    const { arr,showMask,detail, dataSource } = this.state;
    const page_num = pageShows(this.state.pageCurrent, this.state.maxPage);
    const menu = (<Menu onClick={(e)=>{this.changeStatus(e.key)}}>
      {Object.keys(MY_INCOME_STATUS).map((data)=> {
        return (
          <Menu.Item key={data}>{MY_INCOME_STATUS[data]}</Menu.Item>
        );
      })}
    </Menu>);
    return (
      <div>
        <LeftMenu param={this.props}/>
        <div className="fr mi-my-invest"> 
          <div className='search-area'>
            <p className='top-title'>投资记录 </p>
              <ul className='search-tag'>
                  <li className='active'>全部(1)</li>
                  <li>筹款中(2)</li>
                  <li>待放款(3)</li>
                  <li>回款中(4)</li>
                  <li>已结清(5)</li>
                  <li>已流标(5)</li>
                  <li className='error'>回款异常(5)</li>
              </ul> 
              {/* 搜索文本区域 */}
              <div className='search-text'>
                  <span>项目名称</span>
                  <Input className='sarch-input'/>
                  <Button>查询</Button>
              </div> 
          </div>  
          <p>共8条记录</p>
          <div className='project-list'>
              <LoanInfo/> <LoanInfo/>
          </div> 
        </div>  
        {/* 之前代码 */}
        <div className='hide'>
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
                      <span className="investList_no"><p style={{cursor: 'auto'}}>项目编号</p></span>
                      <span className="investList_title">项目名称</span>
                      <span className="investList_money" style={{textAlign: 'right'}}>已投资金额</span>
                      <span className="investList_status" style={{textAlign: 'right'}}>待付款金额</span>
                      <span className="investList_time">状态</span>
                      <span className="investList_operation">操作</span>
                    </li>
                    {  this.state.arr.length <= 0 ?
                      <p style={{textAlign: 'center',paddingTop:15,color: '#B9B9B9'}}>暂无数据</p> :
                      this.state.arr.map((data, index)=> {
                        return (
                          <div key={data.finv_no}>
                            <li className="investList" >
                              <span className="investList_no" title={data.projectNo}>{data.projectNo}</span>
                              <span className="investList_title" title={data.projectName}>{data.projectName}</span>
                              <span className="investList_money" style={{textAlign: 'right',color: 'blue', cursor: 'pointer'}} onClick={()=>this.showChild(data)}>{`${data.invMoney}`.fm()}</span>
                              <span className="investList_status" style={{textAlign: 'right',color: 'blue', cursor: 'pointer'}} onClick={()=>this.showChild(data)}>{`${data.waitPayMoney}`.fm()}</span>
                              <span className="investList_time">{MY_INCOME_STATUS[`${data.projectFlag}`]}</span>
                              <span className="investList_operation">
                                {/*<a style={{color: 'blue'}}*/}
                                  {/*onClick={() => {*/}
                                    {/*this.props.history.push({pathname: Path.INCOME_PLAN,  query:{projectId: data.fproject_id, money: data.fmoney}})}}*/}
                                {/*>*/}
                                  {/*查看</a>*/}
                              </span>
                            </li>
                            { data.isShow?
                              <div>
                                <li className="investListChild">
                                  <span className="investListChild_no">订单编号</span>
                                  <span className="investListChild_money"><p style={{cursor: 'auto'}}>金额</p></span>
                                  <span className="investListChild_status">状态</span>
                                  <span className="investListChild_time">时间</span>
                                  <span className="investListChild_op">操作</span>
                                </li>
                                { data.invRecordChildVos.length <= 0 ?
                                  <p style={{textAlign: 'center',paddingTop:15,color: '#B9B9B9'}}>暂无订单数据</p>:
                                  data.invRecordChildVos.map((item)=> {
                                  return (
                                    <li key={item.invId} className="investListChild">
                                      <span className="investListChild_no" title={item.invNo}>{item.invNo}</span>
                                      <span className="investListChild_money" style={{textAlign: 'right'}}>{`${item.money}`.fm()}</span>
                                      <span className="investListChild_status">{ORDER_STATUS[item.invFlag]}</span>
                                      <span
                                        className="investListChild_time">{moment(item.invTime).format('YYYY-MM-DD HH:mm')}</span>
                                      {item.invFlag==0?
                                        <span className="investListChild_op">
                                          <a style={{
                                            borderRight: '2px solid #c9c9c9',
                                            paddingRight: 5,
                                            marginRight: 5,
                                            color: 'blue'
                                          }}
                                          onClick={()=>this.toPaymentAjax(item.invId, index)}
                                          >付款</a>
                                          <a style={{color: 'blue'}}
                                            onClick={()=>{this.deleteOrderAjax(item.invId, index)}}
                                          >删除订单</a>
                                        </span> : null }
                                    </li>
                                  );
                                })
                                }
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
                            <a className="num" onClick={() => this.getMyinvestAjax(this.state.pageCurrent - 1)}>&lt;</a> :
                            <a className="num" style={{backgroundColor: '#eee'}}>&lt;</a>}
                          {page_num.firstPage ?
                            <a className={`${1 == this.state.pageCurrent ? 'hover_' : ''}`} onClick={() => this.getMyinvestAjax(1)}>1</a> :
                            null}
                          {page_num.leftEllipsis ?
                            <a>...</a> :
                            null}
                          {page_num.page.map((pageNum) => {
                            return (
                              <a key={pageNum} className={`${pageNum * 1 == this.state.pageCurrent ? 'hover_' : ''}`}
                                onClick={() => this.getMyinvestAjax(pageNum)}>{pageNum}</a>
                            );
                          })}
                          {page_num.rightEllipsis ?
                            <a>...</a> :
                            null}
                          {page_num.finalPage ?
                            <a
                              className={`${this.state.maxPage == this.state.pageCurrent ? 'hover_' : ''}`}
                              onClick={() => this.getMyinvestAjax(this.state.maxPage)}
                            >{this.state.maxPage}</a> :
                            null}
                          {page_num.nextPage ?
                            <a className="num" onClick={() => this.getMyinvestAjax(this.state.pageCurrent + 1)}>&gt;</a> :
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
              <form ref={ref => this.formId = ref} id="form1" name="form1" action={dataSource.submitURL} method="post" target="_blank">
                <input id="Action" name="Action" value={dataSource.action?dataSource.action: ''} type="hidden" />
                <input id="ArrivalTime" name="ArrivalTime" value={dataSource.arrivalTime?dataSource.arrivalTime: ''} type="hidden" />
                <input id="LoanJsonList" name="LoanJsonList" value={dataSource.loanJsonList} type="hidden" />
                <input id="NeedAudit" name="NeedAudit" value={dataSource.needAudit} type="hidden" />
                <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={dataSource.platformMoneymoremore} type="hidden" />
                <input id="RandomTimeStamp" name="RandomTimeStamp" value={dataSource.randomTimeStamp} type="hidden" />
                <input id="TransferAction" name="TransferAction" value={dataSource.transferAction} type="hidden" />
                <input id="TransferType" name="TransferType" value={dataSource.transferType} type="hidden" />
                <input id="RandomTimeStamp" name="RandomTimeStamp" value={dataSource.randomTimeStamp} type="hidden" />
                <input id="Remark1" name="Remark1" value={dataSource.remark1} type="hidden" />
                <input id="Remark2" name="Remark2" value={dataSource.remark2} type="hidden" />
                <input id="Remark3" name="Remark3" value={dataSource.remark3} type="hidden" />
                <input id="ReturnURL" name="ReturnURL" value={dataSource.returnURL} type="hidden" />
                <input id="NotifyURL" name="NotifyURL" value={dataSource.notifyURL} type="hidden"  />
                <input id="SignInfo" name="SignInfo" value={dataSource.signInfo} type="hidden" />
              </form> 
          </div> 
      </div>
      
    );
  }
}
