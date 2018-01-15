import React from 'react';

import Search from '../../components/ProjectLoanComponent/search';
import NewPro from '../../components/ProjectLoanComponent/newPro';
import CompletePro from '../../components/ProjectLoanComponent/completePro';
import { startAnimate } from '../../assets/project/index';
import { pageShow, scrollToAnchor, pageShows } from '../../common/systemParam';
import { getProjectList } from '../../services/api';
import { connect } from 'dva';
import { Switch, Route } from 'dva/router';
import {
  COMPLETE_PAGE_SIZE,
  COMPLETE_PROJECT_FLAG,
  PROJECT_LEAVE_CODE,
  PROJECT_RATE,
  PROJECT_PERIOD,
  PROJECT_NAME,
  ING_PAGE_SIZE,
  ING_PROJECT_FLAG
} from '../../common/systemParam';

@connect((state) => ({
  currentPage: state.project.completeProjectList.currentPage,
  maxPage: state.project.completeProjectList.maxPage
}))
export default class ProjectLoan extends React.Component {
  constructor(props) {
    super(props);

    this.fetchNewPro = this.fetchNewPro.bind(this);
  }

  componentDidMount() {
    startAnimate();
    this.fetchComplete(1, true);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'project/initCompletePage'
    })
  }

  fetchComplete(pageNum, type) {
    //如果是第一次进页面则不跳转至锚点
    if (!type) {
      scrollToAnchor("completeAnchor");
    }
    //获取已完成筹款的 项目
    this.props.dispatch({
      type: 'project/fetchCompleteProjectList',
      payload: {
        pageSize: COMPLETE_PAGE_SIZE,
        pageNow: pageNum,
        flag: COMPLETE_PROJECT_FLAG,
        leaveCode: PROJECT_LEAVE_CODE,
        rate: PROJECT_RATE,
        period: PROJECT_PERIOD,
        projectName: PROJECT_NAME
      }
    })
  }

  fetchNewPro(leaveCode = PROJECT_LEAVE_CODE, rate = PROJECT_RATE, period = PROJECT_PERIOD, projectName = PROJECT_NAME) {
    // 1 是代表始终第一页
    getProjectList({
      pageSize: ING_PAGE_SIZE,
      pageNow: 1,
      flag: ING_PROJECT_FLAG,
      leaveCode: leaveCode,
      rate: rate,
      period: period,
      projectName: projectName
    })
      .then((data) => {
        if (data.code === 0) {
          this.setState({
            newProList: data.data.projectCardVos
          });
          startAnimate();
        } else {
          console.log(data.msg);
        }
      })
  }

  render() {
    const {currentPage, maxPage, match, newProjectList, fetchProject} = this.props;
    const pageData = pageShows(currentPage, maxPage);
    return (
      <div>
        <NewPro proNewList={newProjectList} fetchProject={fetchProject} match={this.props.match}/>
        <CompletePro />
        {/*翻译页脚实现*/}
        <div className="bgw">
          <div className="w tright">
            <div className="pager">
              {pageData.lastPage ?
                <a className="first" onClick={this.fetchComplete.bind(this, currentPage * 1 - 1)}>&lt;</a> :
                <a className="first" style={{backgroundColor:'#eee'}}>&lt;</a>}
              {pageData.firstPage ?
                <a className={`${1 == currentPage  ? 'hover' : ''}`}
                   onClick={this.fetchComplete.bind(this, 1)}>1</a> :
                null}
              {pageData.leftEllipsis ?
                <a>...</a> :
                null}
              {pageData.page.map((pageNum) => {
                return (
                  <a key={pageNum} className={`${pageNum * 1 == currentPage ? 'hover' : ''}`}
                     onClick={this.fetchComplete.bind(this, pageNum)}>{pageNum}</a>
                );
              })}
              {pageData.rightEllipsis ?
                <a>...</a> :
                null}
              {pageData.finalPage ?
                <a className={`${maxPage == currentPage  ? 'hover' : ''}`}
                   onClick={this.fetchComplete.bind(this, maxPage)}>{maxPage}</a> :
                null}
              {pageData.nextPage ?
                <a className="last" onClick={this.fetchComplete.bind(this, currentPage * 1 + 1)}>&gt;</a> :
                <a className="last" style={{backgroundColor:'#eee'}}>&gt;</a>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
