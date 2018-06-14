import React from 'react';
import {Table} from 'antd';
import {message} from "antd/lib/index";
import moment from 'moment'; 
import {pageShows} from "../../common/systemParam";
import LeftMenu from '../UCenterComponent/leftMenu';
import {accountService} from '../../services/api2.js';
import { Steps } from 'antd';
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
    }
  }

  componentDidMount() {
    //this.getCapitalDynamics(1);  //调用请求
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
      console.log(res);
      if(res.code === 0){ 
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
                    <li className='active'>全部信息</li>
                    <li>充值</li>
                    <li>提现</li>
                    <li>投资</li>
                    <li>回款</li>  
                </ul>  
            </div>  
            {/* 内容区域 */}
          <div>
            <Steps current={1} progressDot direction="vertical" size="small">
                <Step title="Finished" description="You can hover on the dot." />
                <Step title="In Progress" description="You can hover on the dot." />
                <Step title="Waiting" description="You can hover on the dot." />
                <Step title="Waiting" description="You can hover on the dot." />
            </Steps>
          </div> 
        </div>
      </div> 
    )
  }
}
