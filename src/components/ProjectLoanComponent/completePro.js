/**
 * Created by Administrator on 2018/1/8 0008.
 */
import React from 'react';
import Login from '../LoginComponent/login';
import { Link } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';
import {conversionTime, IMG_BASE_URL} from '../../common/systemParam';

@connect((state) => ({
  projectList: state.project.completeProjectList.list
}))
export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {projectList} = this.props;
    return (
      <div className="section sec2" id="completeAnchor">
        <div className="w center">
          <h1>已经完成的项目</h1>
          <p className="tit-line"><i>FUNDED PROJECTS</i></p>
          <p className="f18 c6">点击已完成的项目，查看他的项目进度及还款情况</p>
        </div>
        <div className="w box6 clearfix">
          {
            projectList.map((data) => {
              let dateCode = moment(data.fCreateDate).format('YYYY') + moment(data.fCreateDate).format('MM');
              return (
                <div key={data.fId}>
                  <img className="pic"
                       src={`${IMG_BASE_URL}project/${dateCode}/${data.fProjectNo}/${data.fCardPicPath}`}/>
                  <p className="name">{data.fName}</p>
                  <div className="circle" data-value="100"/>
                  <i className="price">￥{data.fCreditMoney}</i>
                  <i className="city"><span className="high">6<i>借款期限</i></span>个月 | {data.fCityName.replace('|',' - ')}</i>
                  <div className="line"/>
                  <i className="botic botic1">年化利率<em>{data.fRateLast}%</em></i>
                  <i className="botic botic2">筹款用时<em>{conversionTime(data.fRemainingSecond)}</em></i>
                  <i className="level">{data.fLeveName}</i>
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}
