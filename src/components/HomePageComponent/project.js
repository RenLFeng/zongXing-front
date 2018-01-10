import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { IMG_BASE_URL } from '../../common/systemParam';
import moment from 'moment';

@connect((state) => ({
  homeProject: state.project.homeProjectList
}))
export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'project/getHomeProject',
      payload: localStorage.getItem('addressCode')
    });
  }

  render() {
    return (
      <div className="section sec-proj">
        <div className="w center">
          <h1>最新推荐众借项目</h1>
          <p className="tit-line"><i>NEW PROJECTS</i></p>
          <p className="f18 c6">完善您的项目信息，提高您的信用评级，将有机会进入推荐项目</p>
        </div>
        <div className="w box6 clearfix">
          {
            this.props.homeProject.map((data) => {
              let dateCode = moment(data.fCreateDate).format('YYYY');
              dateCode = dateCode.substring(2, 4) + moment(data.fCreateDate).format('MM');
              return (
                <div>
                  <img className="pic" src={`${IMG_BASE_URL}project/${dateCode}/${data.fNumber}/${data.fCardPicPath}`} />
                  <p className="name">{data.fName}</p>
                  <div className="circle" data-value={data.fPercent}/>
                  <i className="price">￥{data.fCreditMoney}</i>
                  <i className="city">{data.fCityName}</i>
                  <div className="line"/>
                  <i className="botic botic1">年化利率<em>{data.fRateLast}%</em></i>
                  <i className="botic botic2">剩余时间<em>{data.fRemainingTime}</em></i>
                  <i className="level">{data.fLeveName}</i>
                </div>
              );
            })
          }
          {/*<div>*/}
            {/*<img className="pic" src={require('../../assets/img/home/img-programe_03.png')} />*/}
            {/*<p className="name">川味四家大厨<br />火锅店</p>*/}
            {/*<div className="circle" data-value="50"/>*/}
            {/*<i className="price">￥200,000</i>*/}
            {/*<i className="city">四川，成都</i>*/}
            {/*<div className="line"/>*/}
            {/*<i className="botic botic1">年化利率<em>9.5%</em></i>*/}
            {/*<i className="botic botic2">剩余时间<em>12天</em></i>*/}
            {/*<i className="level">B+</i>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<img className="pic" src={require('../../assets/img/home/img-programe_05.png')} />*/}
            {/*<p className="name">MABOCAKE<br />麦波月饼</p>*/}
            {/*<div className="circle" data-value="20"/>*/}
            {/*<i className="price">￥200,000</i>*/}
            {/*<i className="city">北京</i>*/}
            {/*<div className="line"/>*/}
            {/*<i className="botic botic1">年化利率<em>9.5%</em></i>*/}
            {/*<i className="botic botic2">剩余时间<em>12天</em></i>*/}
            {/*<i className="level">C+</i>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<img className="pic" src={require('../../assets/img/home/img-programe_07.png')} />*/}
            {/*<p className="name">尚工坊手工<br />活动中心</p>*/}
            {/*<div className="circle" data-value="50"/>*/}
            {/*<i className="price">￥200,000</i>*/}
            {/*<i className="city">广东，深圳</i>*/}
            {/*<div className="line"/>*/}
            {/*<i className="botic botic1">年化利率<em>9.5%</em></i>*/}
            {/*<i className="botic botic2">剩余时间<em>12天</em></i>*/}
            {/*<i className="level">A</i>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<img className="pic" src={require('../../assets/img/home/img-programe_12.png')} />*/}
            {/*<p className="name">川味四家大厨<br />火锅店</p>*/}
            {/*<div className="circle" data-value="60"/>*/}
            {/*<i className="price">￥200,000</i>*/}
            {/*<i className="city">四川，成都</i>*/}
            {/*<div className="line"/>*/}
            {/*<i className="botic botic1">年化利率<em>9.5%</em></i>*/}
            {/*<i className="botic botic2">剩余时间<em>12天</em></i>*/}
            {/*<i className="level">D</i>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<img className="pic" src={require('../../assets/img/home/img-programe_13.png')} />*/}
            {/*<p className="name">快乐嘟嘟面包房</p>*/}
            {/*<div className="circle" data-value="70"/>*/}
            {/*<i className="price">￥200,000</i>*/}
            {/*<i className="city">上海</i>*/}
            {/*<div className="line"/>*/}
            {/*<i className="botic botic1">年化利率<em>9.5%</em></i>*/}
            {/*<i className="botic botic2">剩余时间<em>12天</em></i>*/}
            {/*<i className="level">B</i>*/}
          {/*</div>*/}
          {/*<div>*/}
            {/*<img className="pic" src={require('../../assets/img/home/img-programe_14.png')} />*/}
            {/*<p className="name">WOKEUP<br />身姿曼妙健康饮料</p>*/}
            {/*<div className="circle" data-value="85"/>*/}
            {/*<i className="price">￥200,000</i>*/}
            {/*<i className="city">四川，成都</i>*/}
            {/*<div className="line"/>*/}
            {/*<i className="botic botic1">年化利率<em>9.5%</em></i>*/}
            {/*<i className="botic botic2">剩余时间<em>12天</em></i>*/}
            {/*<i className="level">D</i>*/}
          {/*</div>*/}
        </div>
        <div className="w">
          <p className="relative">
            <a className="btnmore c" href=""/>
          </p>
        </div>
      </div>
    );
  }
}
