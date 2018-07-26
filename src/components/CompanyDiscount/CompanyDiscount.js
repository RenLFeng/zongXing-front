import React from 'react';
import { Link,  } from 'dva/router'; 
import  '../../assets/companydiscount/companydiscount.scss';
import Path from '../../common/pagePath';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import CompanyCard from '../../components/CompanyDiscount/CompanyCard.js';
import { getCompanyDiscount, getDiscount } from '../../services/api';
import { message, Pagination } from 'antd';

export default class CompanyDiscount extends React.Component { 
  constructor(props) {
      super(props); 
      this.state = { 
        busType: null,
        pageParam: {
          pageCurrent: 1,
          pageSize: 5,
          total: 0
        },
        infoList: [], // 商家优惠数据结构
        bussiness: [
          {text:'最新',val:null, show: true },
          {text:'新零售',val:'xls'},
          {text:'新服务',val:'xfw'},
          {text:'新餐饮',val:'xcy'},
          {text:'新农业',val:'xny'},
          {text:'新娱乐',val:'xyl'},
          {text:'其他',val:'other'},
        ]
      }
  }

  componentDidMount() {
    this.getCompanyDiscountAjax()
  }

  // 获取商家优惠
  async getCompanyDiscountAjax() {
    if (this.state.loading) {
      return;
    }
    this.setState({loading: true});
    const response = await getCompanyDiscount({
      busType: this.state.busType,
      pageParam: this.state.pageParam
    });
    this.setState({loading: false});
    if (response.code === 0) {
      this.setState({
        pageParam: {
          ...this.state.pageParam,
          total: response.data.totalNumber
        },
        infoList: response.data.infoList
      });
    } else {
      response.msg && message.error(response.msg);
    }
  }

  // 点击选择行业
  changeBusType = (data) => {
    for (let obj of this.state.bussiness) {
      if (data === obj.val) {
        obj.show = true;
      } else {
        obj.show = false;
      }
    }
    this.setState({
      bussiness: this.state.bussiness,
      pageParam: {
        pageCurrent: 1,
        pageSize: 5,
        total: 0
      },
      busType: data
    }, ()=> {
      this.getCompanyDiscountAjax();
    });
  }

  // 翻页获取数据
  handleChangePage = (page) => {
    this.setState({
      pageParam: {
        ...this.state.pageParam,
        pageCurrent: page
      }
    }, ()=> {
      this.getCompanyDiscountAjax();
    });
  }

  // 领取优惠券
  async handlerBtnClick(data) {
    if (this.state.getLoading) {
      return;
    }
    this.setState({getLoading: true});
    const response = await getDiscount({couponId: data.coupon_id})
    this.setState({getLoading: false});
    if (response.code === 0) {
      this.getCompanyDiscountAjax();
    } else {
      if (response.msg === '用户未做权限验证') {
        this.props.history.push('/index/login');
        return;
      }
      response.msg && message.error(response.msg);
    }
  }
	render() { 
		return(
			<div>
        <div style={{height: '148px'}}>
          {/* <img className="big" src={require('../../assets/img/companydiscount/banner.jpg')} />
          <div className="w"/> */}
        </div>
        <LoginInfo />

        <div className="w cats clearfix">
          <i className="tit">行业筛选</i>
          {
            this.state.bussiness.map((data,index)=>{
              return (
                <a key={index} className={data.show?'hover': ''} onClick={()=>{if (data.show){return;} this.changeBusType(data.val)}}>{data.text}</a>
              )
            })
          }
          <span className="to-coupon" onClick={()=>this.props.history.push(Path.COUPON_CENTER)}>
            代金券交换中心
          </span>
        </div>
        <div className="w clearfix">
          {
            this.state.infoList.map((data)=> {
              return (
                <CompanyCard data={data} handlerBtnClick={(data)=>this.handlerBtnClick(data)}/>                
              );
            })
          }  
          {
            Math.ceil(this.state.pageParam.total/this.state.pageParam.pageSize)>1?<div style={{width: '100%', textAlign: 'center',marginBottom: 10}}>
                  <Pagination current={this.state.pageParam.pageCurrent} pageSize={this.state.pageParam.pageSize} onChange={this.handleChangePage} total={this.state.pageParam.total} />
              </div>:null
          } 
        </div>
			</div>
		);
	}
}
