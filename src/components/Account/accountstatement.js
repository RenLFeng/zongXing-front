import React from 'react';
import {Table,Pagination} from 'antd';
import {message} from "antd/lib/index";
import moment from 'moment'; 
import {pageShows} from "../../common/systemParam";
import LeftMenu from '../UCenterComponent/leftMenu';
import {accountService} from '../../services/api2.js'; 
import Statement from '../common/Statement';
import '../../assets/account/accountstatement.scss';
/**
 * 资金流水界面
 */
export default class AccountStatement extends React.Component{
  constructor(props){
    super(props);
    this.state={
      activeCode:'1404',
      pageCurrent: 1,
      pageSize:5,
      totalNum:0,
      //业务类型码:1201:充值，1301：提现，1405：项目还款，1404：项目投资，若为null,则全查
      lables:[
        {lable:'总账',code:'0000'},
        {lable:'充值',code:'1201'},
        {lable:'提现',code:'1301'},
        {lable:'投资',code:'1404'},
        {lable:'回款',code:'1405'},
      ], 
      loading:false, 
      //资金动态列表
      infoList:[],  
      chongzData:[],
      tixianData:[],
      touziData:[],
      huiKuanData:[], 
    }
  }

  componentDidMount() {
    this.getCapitalDynamics();  //调用请求
  }
  //获取资金动态列表
  async getCapitalDynamics(){
    try {  
      this.setState({
        loading:true,
      });
      let param = { 
        busTypeCode:this.state.activeCode==='0000'?null:this.state.activeCode,
        pageCurrent: this.state.pageCurrent, 
        pageSize: this.state.pageSize
      }; 
      //调用后台
      const res = await accountService.getAccountStatement(param); 
      console.log("res",res);
      if(res.code === 0){  
        this.setState({  
          totalNum:res.data.totalNumber,
          infoList:[],
          chongzData:[],
          tixianData:[],
          touziData:[],
          huiKuanData:[]
        }); 
        if(this.state.activeCode==='0000'){
          this.setState({  
            infoList:res.data.infoList, 
          }); 
        }else if(this.state.activeCode==='1201'){
          this.setState({  
            chongzData:res.data.infoList, 
          }); 
        }else if(this.state.activeCode==='1301'){
          this.setState({  
            tixianData:res.data.infoList, 
          }); 
        }else if(this.state.activeCode==='1404'){
          this.setState({  
            touziData:res.data.infoList, 
          }); 
        }else if(this.state.activeCode==='1405'){
          this.setState({  
            huiKuanData:res.data.infoList, 
          }); 
        } 
      } else { 
        res.msg && message.error(res.msg);
      } 
      this.setState({
        loading:false,
      });
    } catch(e) {
      this.setState({
        loading:false,
      });
      if (typeof e === 'object' && e.name === 288) { 
        localStorage.removeItem('accessToken');
        this.props.history.push('/index/login');
      }
      console.log(e);
    }
  } 
  //方法区域
  // 点击选择类型
  handlerClcikLable=(code)=>{
     this.setState({
      activeCode:code,
     },()=>{
      this.getCapitalDynamics();
     });
  } 
 //点击分页
 handlerPageChange=(page)=>{
  this.setState({  
      pageCurrent:page,//设置为第一页
  },()=>{
      this.getCapitalDynamics();
  });  
}
  render(){  
    //充值
    const chongzColumn = [{
        title: '序号', 
        align:'center',
        width:50,
        render:function(text,record,index){
          return index+1;
        }
      }, {
        title: '充值日期',
        dataIndex: 'ftime',
        align:'center',
        render:function(text,record,index){
          return text?moment(text).format('YYYY/MM/DD HH:mm'):'----/--/--/ --:--';
        }
      }, {
        title: '充值金额',
        dataIndex: 'resultObj',
        align:'right',
        render:function(text,record,index){
          return String(text.famount).fm();
        }
      }, {
        title: '充值状态',
        dataIndex: 'resultCode',
        align:'center',
        render:function(text,record,index){
          if(text == '88'){
            return '成功';
          }else{
            return record.resultMessage;
          }
        }
    }]; 
    //提现
    const tixianColumn = [{
        title: '序号', 
        align:'center',
        width:50,
        render:function(text,record,index){
          return index+1;
        }
      },  {
        title: '提现日期',
        dataIndex: 'ftime',
        align:'center',
        render:function(text,record,index){
          return text?moment(text).format('YYYY/MM/DD HH:mm'):'----/--/--/ --:--';
        }
      }, {
        title: '手续费',
        align:'right',
        dataIndex: 'resultObj.fuserFeeWithdraw',
        render:function(text,record,index){
          return String(text).fm();
        }
      }, {
        title: '提现到账金额',
        align:'right',
        dataIndex: 'resultObj.famount',
        render:function(text,record,index){
          return String(text - record.resultObj.fuserFeeWithdraw).fm();
        }
        
      }, {
        title: '提现银行卡', 
        align:'center',
        dataIndex: 'resultObj.bankName',
        render:function(text,record,index){
          return text + ' 尾号'+record.resultObj.fcardNo.substring(record.resultObj.fcardNo.length-4);
        }
      }, {
        title: '提现状态',
        dataIndex: 'resultCode',
        align:'center',
        render:function(text,record,index){
          if(text == '88'){
            return '成功';
          }else{
            return record.resultMessage;
          }
        }
    }]; 
    //投资
    const touzColumn = [{
        title: '序号', 
        align:'center',
        width:50,
        render:function(text,record,index){
          return index+1;
        }
      }, {
        title: '投资日期',
        dataIndex: 'ftime',
        align:'center',
        render:function(text,record,index){
          return text?moment(text).format('YYYY/MM/DD HH:mm'):'----/--/--/ --:--';
        }
      }, {
        title: '投资金额',
        dataIndex: 'resultObj.invAmount',
        align:'right',
        render:function(text,record,index){
          return String(text).fm();
        }
      }, {
        title: '项目编号',
        align:'center', 
        dataIndex: 'resultObj.projectNo',
      }, {
        title: '项目名称',
        align:'center', 
        dataIndex: 'resultObj.projectName',
      }, {
        title: '投资状态',
        dataIndex: 'resultCode',
        align:'center',
        render:function(text,record,index){
          if(text == '88'){
            return '成功';
          }else{
            return record.resultMessage;
          }
        }
      }]; 
    //回款
    const huikColumn = [{
        title: '序号',
        dataIndex: 'name',
        render:function(text,record,index){
          return index+1;
        }
      }, {
        title: '回款日期',
        dataIndex: 'age',
      }, {
        title: '本金',
        dataIndex: 'address',
      }, {
        title: '利息',
        dataIndex: 'address1',
      }, {
        title: '佣金',
        dataIndex: 'address2',
      }, {
        title: '当期回款总金额',
        dataIndex: 'address3',
      }, {
        title: '项目编号',
        dataIndex: 'address4',
      }, {
        title: '项目名称',
        dataIndex: 'address5',
      }, {
        title: '还款期数',
        dataIndex: 'address6',
      }]; 

      const locale = {
        filterTitle: '筛选',
        filterConfirm: '确定',
        filterReset: '重置',
        emptyText: '暂无数据',
      };
    return(
      <div>
        <LeftMenu param={this.props}/>
        <div className="fr as-account-statement" >
            {/* 顶部搜索区域 */}
            <div className='search-area'>
                <p className='top-title'>资金流水 </p>
                <ul className='search-tag'>
                    {
                      this.state.lables.map(item=>{
                        return <li onClick={this.handlerClcikLable.bind(this,item.code)} className={item.code===this.state.activeCode?'active':''} >{item.lable}</li>
                      })
                    }
                </ul>
                <span> 单位（元）</span>
            </div>  
            {/* 内容区域 */}
          <div className='as-list'>
            {/* 总账 */}
            <div className={this.state.activeCode==='0000'?'':'hide'}>
              {
                this.state.infoList.map((item,index)=>{
                  return <Statement showTitle={index==0} data={item}></Statement>
                })
              } 
            </div>
            {/* 充值 */}
            <div className={this.state.activeCode==='1201'?'':'hide'}>
              <Table columns={chongzColumn} locale={locale} dataSource={this.state.chongzData} loading={this.state.loading} pagination={false} bordered size="small" />
            </div>
            {/* 提现 */}
            <div className={this.state.activeCode==='1301'?'':'hide'}>
              <Table columns={tixianColumn} locale={locale} dataSource={this.state.tixianData} loading={this.state.loading} pagination={false} bordered size="small" />
            </div>
            {/* 投资 */}
            <div className={this.state.activeCode==='1404'?'':'hide'}>
              <Table columns={touzColumn} locale={locale} dataSource={this.state.touziData} loading={this.state.loading} pagination={false} bordered size="small" /> 
            </div>
            {/* 回款 */}
            <div className={this.state.activeCode==='1405'?'':'hide'}>
             <Table columns={huikColumn} locale={locale} dataSource={this.state.huiKuanData} loading={this.state.loading}  pagination={false}  bordered size="small" /> 
            </div>
             {/* 分页 */}
             {
                Math.ceil(this.state.totalNum/this.state.pageSize)>1?
                <div className='as-paging'>
                  <Pagination  current={this.state.pageCurrent} pageSize={this.state.pageSize} onChange={this.handlerPageChange} total={this.state.totalNum} />
                </div>:null
              } 
          </div> 
        </div>
      </div> 
    )
  }
}
