import React from 'react';

import Search from '../../components/ProjectLoanComponent/search';
import NewPro from '../../components/ProjectLoanComponent/newPro';
import CompletePro from '../../components/ProjectLoanComponent/completePro';
import ProjectComList from './ProjectComList';
import ProjectList from './ProjectList';
import { startAnimate } from '../../assets/project/index';
import { pageShow, scrollToAnchor, pageShows } from '../../common/systemParam';
import { getProjectList } from '../../services/api';
import { connect } from 'dva';
import { Switch, Route, withRouter} from 'dva/router';

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
    this.state = {
      newProList: [],
      projectList: [],
      leaveCode: PROJECT_LEAVE_CODE,
      rate: PROJECT_RATE,
      period: PROJECT_PERIOD,
      projectName: PROJECT_NAME
    };
    this.fetchNewPro = this.fetchNewPro.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch({
      type: 'project/initCompletePage'
    })
  }

  fetchNewPro(leaveCode = PROJECT_LEAVE_CODE, rate = PROJECT_RATE, period = PROJECT_PERIOD, projectName = PROJECT_NAME) {
    // 1 是代表始终第一页
    this.setState({
      leaveCode: leaveCode,
      rate: rate,
      period: period,
      projectName: projectName
    });
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
      });
  }

  render() {
    const {currentPage, maxPage, match} = this.props;
    const  ProjectListComponent = withRouter(({history,location,match})=>{
      return <ProjectList
        leaveCode={this.state.leaveCode}
        rate={this.state.rate}
        period={this.state.period}
        projectName={this.state.projectName}
        match={match}
      />
    });
    return (
      <div className="body1">
        <Search fetchProject={this.fetchNewPro} />
        <Switch>
          <Route path={`${match.path}`} exact render={()=>{
            return (<ProjectComList newProjectList={this.state.newProList} fetchProject={this.fetchNewPro} match={match}/>)
          }} />
          <Route path={`${match.path}/page/:page`} component={ProjectListComponent} />
        </Switch>
      </div>
    );
  }
}
