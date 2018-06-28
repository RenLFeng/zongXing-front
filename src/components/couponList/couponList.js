import React from 'react';
import './index.scss';
import CouponSmall from '../../components/common/CouponSmall';

export default class CouponList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false, // 展示更多数据
      dataSource: props.list || [],
      pageCurrent: 1,
      top: -585, // top值60 分割400
      maxPage: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('list' in nextProps) {
      this.setState({
        dataSource: nextProps.list || [],
        maxPage: Math.ceil(nextProps.list.length / 4),
        show: false
      });
    }
  }

  // 向上
  turnUp() {
    if (this.state.pageCurrent == 1) {
      return;
    }
    this.setState({
      pageCurrent: this.state.pageCurrent - 1
    });
  }

  // 向下
  turnDown() {
    if (this.state.pageCurrent == this.state.maxPage) {
      return;
    }
    this.setState({
      pageCurrent: this.state.pageCurrent + 1
    });
  }

  render() {
    return (
      <div className="cl_coupon">
        <div className="cl_coupon_detail" onMouseOver={()=>this.setState({show: true})}>
          {
            this.state.dataSource.length > 0 ?
            <CouponSmall data={this.state.dataSource[0]} handlerBtnClick={this.props.handlerBtnClick}/> : null
          }
        </div>
        { 
          this.state.show && this.state.dataSource.length > 1 ? 
          <div className="cl_coupon_list" onMouseLeave={()=>this.setState({show: false})}>
            <i className="zjb zjb-jiantou-copy cl_coupon_list_top_icon" style={this.state.pageCurrent == 1?{color: '#e0e0e0'}: {color: '#666'}} onClick={()=>this.turnUp()}/>
            <i className="zjb zjb-jiantou cl_coupon_list_bottom_icon" style={this.state.pageCurrent == this.state.maxPage?{color: '#e0e0e0'}: {color: '#666'}} onClick={()=>this.turnDown()}/>
            <div className="cl_coupon_list_div">
              {this.state.dataSource.map((data, index)=> {
                return (
                  <div key={index} className="cl_coupon_item" style={{top: `${(this.state.pageCurrent - 1)*this.state.top+(115*index)}`}}>
                     <CouponSmall  data={data} handlerBtnClick={this.props.handlerBtnClick}/>
                  </div>
                );
              })}
            </div>
          </div> : null
        }
      </div>
    );
  }
}