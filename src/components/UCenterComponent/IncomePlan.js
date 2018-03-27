import React from 'react';
import {Icon, message, Row, Col} from 'antd';
import '../../assets/myInvest/income.scss';
import { getPlantNotice, getOPlantNotice, getMyInvestment } from '../../services/api.js';
import moment from 'moment';
import {pageShows} from '../../common/systemParam';  //分页组件



export default class IncomePlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCurrent: 1, //当前页，初始值为第一页
      pageSize: 5,    //每页可显示的消息条数
      maxPage: 0,     //最大页
      arr: [],
      showMask:false,
      detail:'',
      num:0,  //总条数
      pageIndex:1,
    }
  }

  componentDidMount() {
    this.getMyinvestAjax(this.state.pageCurrent);
  }

  //获取我的投资列表
  async getMyinvestAjax(page) {
    const response = await getMyInvestment(page,this.state.pageSize);
    console.log(response);
    if(response.code ===0){
      const maxPage = Math.ceil(response.data.itemCount / this.state.pageSize);
      this.setState({
        maxPage: maxPage,
        pageIndex: page,
        arr:response.data.notices,
        num:response.data.notices.length,
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

  render() {
    const { arr,showMask,detail } = this.state;
    return (
      <div className="fr uc-rbody" >
        <div className="title33" style={{position: 'relative'}}>
          <span className="title1">收益计划</span>
          <div className="unit-yuan">
            <span style={{fontSize: 14, margin: '0 auto'}}>单位：元</span>
          </div>
        </div>
        <div className="content_">
          <Row style={{marginBottom: 20}}>
            <Col span={8} style={{textAlign: 'center'}}>
              <b style={{fontSize: 16}}>总本金&nbsp;<b style={{fontSize: 20,color: '#FF9900'}}>10.00</b></b>
            </Col>
            <Col span={8} style={{textAlign: 'center'}}>
              <b style={{fontSize: 16}}>总收益&nbsp;<b style={{fontSize: 20,color: '#FF9900'}}>10.00</b></b>
            </Col>
            <Col span={8} style={{textAlign: 'center'}}>
              <b style={{fontSize: 16}}>总利息&nbsp;<b style={{fontSize: 20,color: '#FF9900'}}>10.00</b></b>
            </Col>
          </Row>
          <div className="investGroup">
            <ul >
              <li className="investList">
                <span className="income_num"><p style={{cursor: 'auto'}}>期数</p></span>
                <span className="income_get">收益</span>
                <span className="income_capital">本金</span>
                <span className="income_Interest">利息</span>
              </li>
              <li className="investList">
                <span className="income_num">第<b style={{color: '#FF9900'}}>1</b>期</span>
                <span className="income_get"><b style={{color: '#FF9900'}}>10.00</b></span>
                <span className="income_capital"><b style={{color: '#FF9900'}}>10.00</b></span>
                <span className="income_Interest"><b style={{color: '#FF9900'}}>10.00</b></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
