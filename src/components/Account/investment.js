import React from 'react';
import {Input, message,Button,Pagination, Modal} from 'antd'; 
import {connect} from 'dva';
import Path from '../../common/pagePath';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import LoanInfo from '../common/LoanInfo.js';
import '../../assets/account/investment.scss';
import {accountService}  from '../../services/api2';
@connect((state)=>({
  openStatus: state.account.openStatus,
}))
export default class Investment extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 5,    //每页可显示的消息条数
      totalNum:0,
      activeFlag:0,
      projectName:'',
      Lables:[
        {lable:'全部',flag:0,value:0},
        {lable:'筹款中',flag:13,value:0},
        {lable:'待放款',flag:14,value:0},
        {lable:'回款中',flag:15,value:0},
        {lable:'已结清',flag:16,value:0},
        {lable:'已流标',flag:-1,value:0},
        {lable:'回款异常',flag:-4,value:0}
      ], 
      list:[], 
      wfkShowFlag:false,
      hkycShowFlag:false,
    }
  }

  componentDidMount() {
     if(this.props.location.state && this.props.location.state.flag){
        this.handlerLableClick(null)
      } else{
        if (this.props.openStatus == 3) {
          this.getMyinvest();
          return;
        }
        this.jumpAuth();
      } 
  }
  
  jumpAuth() {
    var that = this;
    Modal.info({
      title: '您目前还没有开户，请先开户！',
      okText:'去开户',
      onOk() {
        that.props.history.push('/index/uCenter/realName')
      },
    });
  }



  //获取顶部标签的个数
  async getLables(wfkFlag){
    let lables =[
      {lable:'全部',flag:0,value:0},
      {lable:'筹款中',flag:13,value:0},
      {lable:'待放款',flag:14,value:0},
      {lable:'回款中',flag:15,value:0},
      {lable:'已结清',flag:16,value:0},
      {lable:'已流标',flag:-1,value:0},
      {lable:'回款异常',flag:-4,value:0},
    ];
    const rest = await accountService.getInvestmentRecordCount();
    if(rest.code===0){
      if(!rest.data){
       return;
      } 
      var total = 0;
      rest.data.map(item=>{
        //全部  
        total += item.count;
        //循环赋值
        lables.map(lab=>{
          if(item.flag === lab.flag){
            lab.value = item.count;
          }
        })
      });
      //设置全部值
      lables[0].value = total; 
     if(!wfkFlag){
      this.setState({
        Lables:lables
      });
     } else {
      lables.push({lable:'未付款',flag:null,value:0})
      this.setState({
        Lables:lables
      });
     }  
    }else{
      message.error(rest.msg);
    }
  }
  //获取我的投资列表
  async getMyinvest(){ 
    let param ={
      pageParam: {
        pageSize: this.state.pageSize,
        pageCurrent: this.state.pageCurrent,
      },
      flag: this.state.activeFlag==0 ? null : this.state.activeFlag,
      projectName: this.state.activeFlag=== null ? null : this.state.projectName,
      invFlag:this.state.activeFlag===null ? 0 : null,
    }; 
    const rest = await accountService.getInvestmentRecord(param);
    if(rest.code===0){
      this.setState({
        list:rest.data.infoList,
        totalNum:rest.data.totalNumber,
        wfkShowFlag:rest.data.hasWaitPay,
        hkycShowFlag:rest.data.hasLoanException
      },()=>{
        this.getLables(this.state.wfkShowFlag)
      });
    }else{
      message.error(rest.msg);
    } 
  }
  //点击顶部标签
  handlerLableClick =(flag)=>{
     this.setState({
       activeFlag:flag,
       pageCurrent:1,
     },()=>{
       this.getMyinvest()
     });
  }

  handlerPageChange=(page)=>{
    this.setState({  
      pageCurrent:page,
    },()=>{
        //获取我的投资列表
        this.getMyinvest();
    });  
}
 handlerOnChange=(e)=>{
   this.setState({
     projectName:e.target.value
   });
 }
 handlerSearchClick=()=>{
    this.setState({  
      pageCurrent:1,
    },()=>{
        //获取我的投资列表
        this.getMyinvest();
    });  
 }

 handllerTZClick = (id, data) =>{
  this.props.history.push(`/index/projectDetail/${data.projectId}`)
 }

 
  render() { 
 
    return (
      <div>
        <LeftMenu param={this.props}/>
        <div className="fr mi-my-invest"> 
          <div className='search-area'>
            <p className='top-title'>投资记录 </p>
              <ul className='search-tag'>
                {
                  !this.state.hkycShowFlag ? 
                  this.state.Lables.map((item)=>{
                    if(item.flag === null){
                      return <li onClick={this.handlerLableClick.bind(this,item.flag)} key={item.flag} className={`${item.flag === -4?'error':''} ${item.flag === this.state.activeFlag?'active':''}`}>{item.lable}</li>
                    } else {
                      return <li onClick={this.handlerLableClick.bind(this,item.flag)} key={item.flag} className={`${item.flag === -4?'error':''} ${item.flag === this.state.activeFlag?'active':''}`}>{item.lable}({item.value})</li>
                    }
                  }) :
                  this.state.Lables.map((item)=>{
                    if(item.flag === null){
                      return <li onClick={this.handlerLableClick.bind(this,item.flag)} key={item.flag} className={`${item.flag === this.state.activeFlag?'active':''}`}>{item.lable}</li>
                    } else {
                      return <li onClick={this.handlerLableClick.bind(this,item.flag)} key={item.flag} className={`${item.flag === this.state.activeFlag?'active':''}`}>{item.lable}({item.value})</li>
                    }
                  })
                }
        
              </ul> 
              {/* 搜索文本区域 */}
              <div className='search-text'>
                  <span>项目名称</span>
                  <Input className='sarch-input' value={this.state.projectName} onChange={this.handlerOnChange}/>
                  <Button onClick={this.handlerSearchClick}>查询</Button>
              </div> 
          </div>  
          <p>共{this.state.totalNum}条记录</p>
          <div className='project-list'>
            {
              this.state.list.length===0?<span>暂无数据</span>:null
            }
            {
              this.state.list.map(item=>{
                return <LoanInfo key={item.projectId} data={item} handllerMXClick={this.handllerTZClick} handllerTZClick={this.handllerTZClick} getMyinvest={this.getMyinvest.bind(this)}/> 
              })
            } 
            {
              Math.ceil(this.state.totalNum/this.state.pageSize)>1?
              <div className='im-paging'>
                <Pagination   current={this.state.pageCurrent} pageSize={this.state.pageSize} onChange={this.handlerPageChange} total={this.state.totalNum} />
              </div>:null
            } 
          </div> 
        </div>   
      </div> 
    );
  }
}
