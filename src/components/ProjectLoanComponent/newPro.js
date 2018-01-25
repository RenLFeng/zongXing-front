/**
 * Created by Administrator on 2018/1/8 0008.
 */
import React from 'react';
import Login from '../LoginComponent/login';
import { Link } from 'dva/router';
import { IMG_BASE_URL, conversionTime } from '../../common/systemParam';
import Path from '../../common/pagePath';
import moment from 'moment';

export default class NewPro extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProject();
  }

  jumpProjectDetail(fId) {
    this.props.history.push(Path.PROJECT_DETAIL+`/${fId}`);
    $(window).scrollTop(0);
  }
  render() {
    const { proNewList } = this.props;
    return (
      <div className="section sec1">
        <div className="w center">
          <h1>最新推荐众借项目</h1>
          <p className="tit-line"><i>NEW PROJECTS</i></p>
          <p className="f18 c6">完善您的项目信息，提高您的信用评级，将有机会进入推荐项目</p>
        </div>
        <div className="w box6 clearfix">
          {
            proNewList.map((data) => {
              let dateCode = moment(data.fCreateDate).format('YYYY') + moment(data.fCreateDate).format('MM');
              return (
                <div style={{ cursor: 'pointer' }} key={data.fId} onClick={()=>this.jumpProjectDetail(data.fId)}>
                  <img className="pic" src={`${IMG_BASE_URL}project/${dateCode}/${data.fProjectNo}/${data.fCardPicPath}`} />
                  <p className="name">{data.fName}</p>
                  <div className="circle" data-value={data.fPercent}/>
                  <i className="price">￥{data.fCreditMoney}</i>
                  <i className="city"><span className="high">{data.fcreditMonth}<i>借款期限</i></span>个月 | {data.fCityName}</i>
                  <div className="line"/>
                  <i className="botic botic1">年化利率<em>{data.fRateLast}%</em></i>
                  <i className="botic botic2">剩余时间<em>{conversionTime(data.fRemainingSecond)}</em></i>
                  <i className="level">{data.fLeveName}</i>
                </div>
              );
            })
          }
        </div>
        <div className="w">
          <p className="relative">
            <Link className="btnmore c" to={`${this.props.match.path}/page/1`} onClick={()=>$(window).scrollTop(0)}/>
          </p>
        </div>
      </div>
    );
  }
}
