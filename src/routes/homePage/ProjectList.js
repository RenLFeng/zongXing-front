import React from 'react';

import { startAnimate } from '../../assets/project/index';
import { pageShows } from '../../common/systemParam';
import Path from '../../common/pagePath';
import { getProjectList } from '../../services/api';
import { connect } from 'dva';
import { Link } from 'dva/router';
import moment from 'moment';

import {
  PROJECT_LEAVE_CODE,
  PROJECT_RATE,
  PROJECT_PERIOD,
  PROJECT_NAME,
  ING_PROJECT_FLAG,
  IMG_BASE_URL,
  conversionTime
} from '../../common/systemParam';

@connect((state) => ({
  currentPage: state.project.completeProjectList.currentPage,
  maxPage: state.project.completeProjectList.maxPage
}))
export default class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newProList: [],
      maxPage: 0,
      currentPage: 0
    };
    this.fetchNewPro = this.fetchNewPro.bind(this);
  }

  componentDidMount() {
    const {leaveCode, rate, period, projectName} = this.props;
    this.fetchNewPro(leaveCode, rate, period, projectName);
  }

  fetchNewPro(leaveCode = PROJECT_LEAVE_CODE, rate = PROJECT_RATE, period = PROJECT_PERIOD, projectName = PROJECT_NAME) {
    getProjectList({
      pageSize: 24,
      pageNow: this.props.match.params.page,
      flag: ING_PROJECT_FLAG,
      leaveCode: leaveCode,
      rate: rate,
      period: period,
      projectName: projectName
    })
      .then((data) => {
        if (data.code === 0) {
          this.setState({
            newProList: data.data.projectCardVos,
            currentPage: this.props.match.params.page,
            maxPage: data.data.pageCount
          });
          startAnimate();
        } else {
          console.log(data.msg);
        }
      });
  }

  jumpProjectDetail(fId) {
    this.props.history.push(Path.PROJECT_DETAIL+`/${fId}`);
    $(window).scrollTop(0);
  }

  render() {
    const { currentPage, maxPage, newProList } = this.state;
    const pageData = pageShows(currentPage, maxPage);
    return (
      <div className="sec2" style={{paddingTop: '100px',backgroundColor:'#fff'}}>
        {/*翻译页脚实现*/}
        <div className="bgw">
          <div className="w box6 clearfix">
            {
              newProList.map((data) => {
                let dateCode = moment(data.fCreateTime).format('YYYY') + moment(data.fCreateTime).format('MM');
                return (
                  <div style={{ cursor: 'pointer' }} key={data.fId} onClick={()=>this.jumpProjectDetail(data.fId)}>
                    <div className="pic_box"><img className="pic" src={`${IMG_BASE_URL}/${data.fCardPicPath}`} /></div>
                    <p className="name">{data.fName}</p>
                    <div className="circle" data-value={data.fPercent}/>
                    <i className="price">￥{data.fCreditMoney}</i>
                    <i className="city">{data.fCityName}</i>
                    <div className="line" />
                    <i className="botic botic1">年化利率<em>{data.fRateLast}%</em></i>
                    <i className="botic botic2">剩余时间<em>{conversionTime(data.fRemainingSecond)}</em></i>
                    <i className="level">{data.fLeveName}</i>
                  </div>
                );
              })
            }
          </div>
          <div className="w tright">
            <div className="pager">
              {pageData.lastPage ?
                <Link
                  className="first"
                  to={`/index/projectLoan/page/${currentPage * 1 - 1}`}
                  onClick={()=>$(window).scrollTop(0)}
                >&lt;</Link> :
                <a className="first" style={{backgroundColor:'#eee'}}>&lt;</a>}
              {pageData.firstPage ?
                <Link
                  className={`${1 == currentPage  ? 'hover' : ''}`}
                  to={'/index/projectLoan/page/1'}
                  onClick={()=>$(window).scrollTop(0)}
                >1</Link> :
                null}
              {pageData.leftEllipsis ?
                <a>...</a> :
                null}
              {pageData.page.map((pageNum) => {
                return (
                  <Link
                    key={pageNum} className={`${pageNum * 1 == currentPage ? 'hover' : ''}`}
                    to={`/index/projectLoan/page/${pageNum}`}
                    onClick={()=>$(window).scrollTop(0)}
                  >{pageNum}</Link>
                );
              })}
              {pageData.rightEllipsis ?
                <a>...</a> :
                null}
              {pageData.finalPage ?
                <Link
                  className={`${maxPage == currentPage  ? 'hover' : ''}`}
                  to={`/index/projectLoan/page/${maxPage}`}
                  onClick={()=>$(window).scrollTop(0)}
                >{maxPage}</Link> :
                null}
              {pageData.nextPage ?
                <Link
                  className="last"
                  to={`/index/projectLoan/page/${currentPage * 1 + 1}`}
                  onClick={()=>$(window).scrollTop(0)}
                >&gt;</Link> :
                <a className="last" style={{backgroundColor:'#eee'}}>&gt;</a>}
            </div>
          </div>
        </div>

      </div>
    );
  }
}
