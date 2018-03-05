import React from 'react';
import '../../assets/collection/collection.scss';
import {Table, Icon} from 'antd';
import {IMG_BASE_URL} from "../../common/systemParam";

export default class Collection extends React.Component {



  render() {

    const infoColumns = [{
      title: '项目信息',
      dataIndex: 'info',
      key: 'info',
    }, {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '金额',
      dataIndex: 'add',
      key: 'add',
    }, {
      title: '操作',
      dataIndex: 'delete',
      key: 'delete',
    }];

    return (
      <div className="wrap">
        <div className="page">
           <div className="title">
             <span>全部项目</span>
           </div>

          <div className="project">
            <div className="tab">
              <span className="project_info">项目信息</span>
              <span className="money">投资单价</span>
              <span className="amount">数量</span>
              <span className="add">投资金额</span>
              <span className="delete">操作</span>
            </div>
            <div className="project_">
              <div className="project_info">
                <i className="level">B+</i>
                <img src={'https://gd1.alicdn.com/imgextra/i4/2103587316/TB24P8ZbKuSBuNjSsziXXbq8pXa_!!2103587316.jpg'} className="pic" alt=""/>
              </div>
              <div className="money">￥100</div>
              <div className="add">
                <Icon type="minus" className="del"/><span>2</span><Icon type="plus" className="add"/>
              </div>
              <div className="amount">￥200</div>
              <div className="delete">删除</div>
            </div>

            <div className="project_">
              <div className="project_info">
                <img src={'https://gd1.alicdn.com/imgextra/i4/2103587316/TB24P8ZbKuSBuNjSsziXXbq8pXa_!!2103587316.jpg'} alt=""/>
              </div>
              <div className="money">￥100</div>
              <div className="add">
                <Icon type="minus" className="del"/><span>2</span><Icon type="plus" className="add"/>
              </div>
              <div className="amount">￥200</div>
              <div className="delete">删除</div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
