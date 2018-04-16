import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { IMG_BASE_URL } from '../../common/systemParam';
import moment from 'moment';
import { conversionTime } from '../../common/systemParam';
import Path from '../../common/pagePath';
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

  jumpProjectDetail(fId) {
    $(window).scrollTop(0);
    this.props.history.push(Path.PROJECT_DETAIL+`/${fId}`);
  }

  render() {
    const {path}  = this.props.param;
    return (
      <div className="section sec-proj">
        <div className="w center">
          <h1>最新发布众借项目</h1>
          <p className="tit-line"><i>LATEST BUSSINESS LOANS</i></p>
          <p className="f18 c6">点击进入项目详情，可以收藏和分享</p>
        </div>
        <div className="w box6 clearfix">
          {
            this.props.homeProject.map((data) => {
              let dateCode = moment(data.fCreateTime).format('YYYY') + moment(data.fCreateTime).format('MM');
              return (
                <div style={{ cursor:'pointer' }} key={data.fId} onClick={()=>this.jumpProjectDetail(data.fId)}>
                  <div className="pic_box"><img className="pic" src={`${IMG_BASE_URL}${data.fCardPicPath}`} /></div>
                  <p className="name">{data.fName}</p>
                  <div className="circle" data-value={data.fPercent}/>
                  <i className="price">￥{data.fCreditMoney.fmm()}</i>
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
            <Link className="btnmore c" to={`${path}ProjectLoan`} onClick={()=>$(window).scrollTop(0)} />
          </p>
        </div>
      </div>
    );
  }
}
