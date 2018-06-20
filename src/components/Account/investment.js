import React from 'react';
import {Input, message,Button,Pagination} from 'antd'; 

import Path from '../../common/pagePath';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import LoanInfo from '../common/LoanInfo.js';
import '../../assets/account/investment.scss';
import {accountService}  from '../../services/api2';

export default class Investment extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 2,    //每页可显示的消息条数
      totalNum:0,
      activeFlag:0,
      projectName:'',
      Lables:[
        {lable:'全部',flag:0,value:0},
        {lable:'筹款中',flag:10,value:0},
        {lable:'待放款',flag:11,value:0},
        {lable:'回款中',flag:12,value:0},
        {lable:'已结清',flag:13,value:0},
        {lable:'已流标',flag:-1,value:0},
        {lable:'回款异常',flag:-4,value:0},
      ], 
      list:[], 
    }
  }

  componentDidMount() { 
    //this.getMyinvestAjax(1);  //调用请求
    this.getLables();
  }
  //获取顶部标签的个数
  async getLables(){
    let lables =[
      {lable:'全部',flag:0,value:0},
      {lable:'筹款中',flag:10,value:0},
      {lable:'待放款',flag:11,value:0},
      {lable:'回款中',flag:12,value:0},
      {lable:'已结清',flag:13,value:0},
      {lable:'已流标',flag:-1,value:0},
      {lable:'回款异常',flag:-4,value:0},
    ];
    const rest = await accountService.getInvestmentRecordCount();
    console.log('获取顶部标签的个数',rest)
    if(rest.code===0){
      if(!rest.data){
       return;
      } 
      var total = 0;
      rest.data.map(item=>{
        //全部  
        total +=item.count;
        //循环赋值
        lables.map(lab=>{
          if(item.flag=== lab.flag){
            lab.value = item.count;
          }
        })
      });
      //设置全部值
      lables[0].value = total; 
      this.setState({
        Lables:lables
      },()=>{
        //获取我的投资列表
        this.getMyinvest();
      }); 
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
      flag: this.state.activeFlag==0?null:this.state.activeFlag,
      projectName:this.state.projectName,
    }; 
    console.log(param);
    const rest = await accountService.getInvestmentRecord(param);
    console.log('获取我的投资列表',rest);
    if(rest.code===0){
      this.setState({
        list:rest.data.infoList,
        totalNum:rest.data.totalNumber
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
 

 
  //获取我的投资列表
  async getMyinvestAjax(page, flag) {
    try {
      const response = await accountService({
        pageParam: {
          pageSize: this.state.pageSize,
          pageCurrent: page
        },
        flag: this.state.flag,
        projectName: this.state.projectId
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
          content: '请在新页面完成操作,可刷sss新页面查看结果',
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
  
  render() { 
    return (
      <div>
        <LeftMenu param={this.props}/>
        <div className="fr mi-my-invest"> 
          <div className='search-area'>
            <p className='top-title'>投资记录 </p>
              <ul className='search-tag'>
                {
                  this.state.Lables.map((item)=>{
                      return <li onClick={this.handlerLableClick.bind(this,item.flag)} key={item.flag} className={`${item.flag === -4?'error':''} ${item.flag === this.state.activeFlag?'active':''}`}>{item.lable}({item.value})</li>
                  })
                } 
              </ul> 
              {/* 搜索文本区域 */}
              <div className='search-text'>
                  <span>项目名称</span>
                  <Input className='sarch-input'/>
                  <Button>查询</Button>
              </div> 
          </div>  
          <p>共{this.state.totalNum}条记录</p>
          <div className='project-list'>
            {
              this.state.list.length===0?<span>暂无数据</span>:null
            }
            {
              this.state.list.map(item=>{
                return <LoanInfo key={item.projectId} data={item} /> 
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
