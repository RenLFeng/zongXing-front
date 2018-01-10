/**
 * Created by Administrator on 2018/1/8 0008.
 */
import React from 'react';
import Login from '../Login/login';
import { Link } from 'dva/router';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="section sec2">
        <div className="w center">
          <h1>已经完成的项目</h1>
          <p className="tit-line"><i>FUNDED PROJECTS</i></p>
          <p className="f18 c6">点击已完成的项目，查看他的项目进度及还款情况</p>
        </div>
        <div className="w box6 clearfix">
          <div>
            <img className="pic" src={require('../../assets/img/home/img-programe_03.png')} />
            <p className="name">川味四家大厨<br />火锅店</p>
            <div className="circle" data-value="50"/>
            <i className="price">￥200,000</i>
            <i className="city">四川，成都</i>
            <div className="line"/>
            <i className="botic botic1">年化利率<em>9.5%</em></i>
            <i className="botic botic2">剩余时间<em>12天</em></i>
            <i className="level">B+</i>
          </div>
          <div>
            <img className="pic" src={require('../../assets/img/home/img-programe_03.png')} />
            <p className="name">MABOCAKE<br />麦波月饼</p>
            <div className="circle" data-value="20"/>
            <i className="price">￥200,000</i>
            <i className="city">北京</i>
            <div className="line"/>
            <i className="botic botic1">年化利率<em>9.5%</em></i>
            <i className="botic botic2">剩余时间<em>12天</em></i>
            <i className="level">C+</i>
          </div>
          <div>
            <img className="pic" src={require('../../assets/img/home/img-programe_03.png')} />
            <p className="name">尚工坊手工<br />活动中心</p>
            <div className="circle" data-value="50"/>
            <i className="price">￥200,000</i>
            <i className="city">广东，深圳</i>
            <div className="line"/>
            <i className="botic botic1">年化利率<em>9.5%</em></i>
            <i className="botic botic2">剩余时间<em>12天</em></i>
            <i className="level">A</i>
          </div>
          <div>
            <img className="pic" src={require('../../assets/img/home/img-programe_03.png')} />
            <p className="name">川味四家大厨<br />火锅店</p>
            <div className="circle" data-value="60"/>
            <i className="price">￥200,000</i>
            <i className="city">四川，成都</i>
            <div className="line"/>
            <i className="botic botic1">年化利率<em>9.5%</em></i>
            <i className="botic botic2">剩余时间<em>12天</em></i>
            <i className="level">D</i>
          </div>
          <div>
            <img className="pic" src={require('../../assets/img/home/img-programe_03.png')} />
            <p className="name">尚工坊手工<br />活动中心</p>
            <div className="circle" data-value="50"/>
            <i className="price">￥200,000</i>
            <i className="city">广东，深圳</i>
            <div className="line"/>
            <i className="botic botic1">年化利率<em>9.5%</em></i>
            <i className="botic botic2">剩余时间<em>12天</em></i>
            <i className="level">A</i>
          </div>
          <div>
            <img className="pic" src={require('../../assets/img/home/img-programe_03.png')} />
            <p className="name">川味四家大厨<br />火锅店</p>
            <div className="circle" data-value="60"/>
            <i className="price">￥200,000</i>
            <i className="city">四川，成都</i>
            <div className="line"/>
            <i className="botic botic1">年化利率<em>9.5%</em></i>
            <i className="botic botic2">剩余时间<em>12天</em></i>
            <i className="level">D</i>
          </div>
        </div>
      </div>
    );
  }
}
