import React from 'react';
import {message} from 'antd'; 
import moment from 'moment';
import LeftMenu from '../UCenterComponent/leftMenu' 
export default class ReceivePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 10,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: [],
      num:0,  //总条数
    }
  }

  componentDidMount() {
    //this.getRepayPlan(1);  //调用请求
  }

  // //获取计划列表
  // async getRepayPlan(page){
  //   const response = await repayPlan({pageCurrent:page,pageSize:this.state.pageSize});
  //   console.log(response);
  //   if(response.code === 0){
  //     const maxPage = Math.ceil(response.data.totalNumber / this.state.pageSize);
  //     this.setState({
  //       maxPage:maxPage,
  //       pageCurrent:page,
  //       arr:response.data.infoList,
  //       num:response.data.totalNumber
  //     })
  //   } else {
  //     response.msg && message.error(response.msg)
  //   }
  // }

  render() { 
 
    return (
      <div>
        <LeftMenu param={this.props}/>
        <div className="fr uc-rbody" > 
        </div>  
      </div> 
    );
  }
}
