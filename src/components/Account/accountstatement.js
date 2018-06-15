import React from 'react';
import {Table} from 'antd';
import {message} from "antd/lib/index";
import moment from 'moment'; 
import {pageShows} from "../../common/systemParam";
import LeftMenu from '../UCenterComponent/leftMenu';
import {accountService} from '../../services/api2.js';
import { Steps } from 'antd';
import Statement from '../common/Statement';
import '../../assets/account/accountstatement.scss';
/**
 * 资金流水界面
 */
export default class AccountStatement extends React.Component{
  constructor(props){
    super(props);
    this.state={
      pageCurrent: 1,
      pageIndex: 1,
      pageSize:10,
      infoList:[],   //资金动态列表
      num:'',
      maxPage: 0,     //最大页
      //业务类型码:1201:充值，1301：提现，1405：项目还款，1404：项目投资，若为null,则全查
      lables:[
        {lable:'总账',code:'0000'},
        {lable:'充值',code:'1201'},
        {lable:'提现',code:'1301'},
        {lable:'投资',code:'1404'},
        {lable:'回款',code:'1405'},
      ],
      activeCode:'0000',
    }
  }

  componentDidMount() {
    this.getCapitalDynamics(1);  //调用请求
  }

  async getCapitalDynamics(page){
    try {
      let param = {
        companyNo: "", 
        busTypeCode:'1201',
        pageCurrent: page, 
        pageSize: this.state.pageSize
      };
      const res = await accountService.getAccountStatement(param);
   
      if(res.code === 0){ 
        console.log(res);
        //const maxPage = Math.ceil(res.data.totalNumber / this.state.pageSize);
        // this.setState({
        //   maxPage:maxPage,
        //   infoList:res.data.infoList,
        //   pageCurrent: page,
        //   num:res.data.totalNumber
        // }); 
      } else {
        res.msg && message.error(res.msg);
      }
    } catch(e) {
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
     });
  }

  render(){ 
    const Step = Steps.Step;
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
            </div>  
            {/* 内容区域 */}
          <div className='as-list'>
            {/* 总账 */}
            <div className={this.state.activeCode==='0000'?'':'hide'}>
              <Statement showTitle={true}></Statement>
              <Statement></Statement>
              <Statement></Statement>
            </div>
            {/* 充值 */}
            <div className={this.state.activeCode==='1201'?'':'hide'}>
               
            </div>
            {/* 提现 */}
            <div className={this.state.activeCode==='1301'?'':'hide'}>
           
            </div>
            {/* 投资 */}
            <div className={this.state.activeCode==='1404'?'':'hide'}>
          
            </div>
            {/* 回款 */}
            <div className={this.state.activeCode==='1405'?'':'hide'}>
                    
            </div>
          </div> 
        </div>
      </div> 
    )
  }
}
