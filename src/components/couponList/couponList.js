import React from 'react';
import './index.scss';
import CouponSmall from '../../components/common/CouponSmall';

export default class CouponList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, // 展示更多数据
      dataSource: [{name: 1},{name: 2},{name: 3},{name: 4},{name: 5},],
      pageCurrent: 1,
      top: 0, // top值60 分割400
    }
  }
  
  render() {
    return (
      <div className="cl_coupon">
        <div className="cl_coupon_detail" onMouseOver={()=>this.setState({show: true})}>
          <CouponSmall />
        </div>
        { !this.state.show? null: 
          <div className="cl_coupon_list" onMouseLeave={()=>this.setState({show: false})}>
            <i className="zjb zjb-jiantou-copy cl_coupon_list_top_icon" />
            <i className="zjb zjb-jiantou cl_coupon_list_bottom_icon" />
            <div className="cl_coupon_list_div">
              {this.state.dataSource.map((data, index)=> {
                return (
                  <div key={index} className="cl_coupon_item" style={{top: `${this.state.top+(115*index)}`}}>
                     <CouponSmall  data={{}}/>
                  </div>
                );
              })}
            </div>
            
          </div>
        }
      </div>
    );
  }
}