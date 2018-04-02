/**
 * Created by Administrator on 2018/1/8 0008.
 */
import React from 'react';
import Login from '../LoginComponent/login';
import { Link } from 'dva/router';
import { connect } from 'dva';
import moment from 'moment';
import {conversionTime, IMG_BASE_URL} from '../../common/systemParam';
import Path from '../../common/pagePath';
@connect((state) => ({
  projectList: state.project.completeProjectList.list
}))
export default class CompletePro extends React.Component {
  constructor(props) {
    super(props);
  }

  jumpDetail(fId) {
    $(window).scrollTop(0);
    this.props.history.push(Path.PROJECT_DETAIL+`/${fId}`);
  }

  render() {
    const {projectList, history} = this.props;
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
              return (
                <div style={{ cursor:'pointer' }} key={data.fId} onClick={()=>this.jumpDetail(data.fId)}>
                  <i className="pic_box1"><img className="pic" src={`${IMG_BASE_URL}/${data.fCardPicPath}`}/></i>
                  <p className="name">{data.fName}</p>
                  <div className="done"></div>
                  <i className="price">￥{`${data.fCreditMoney}`.fm()}</i>
                  <i className="city">{data.fCityName}</i>
                  <div className="line"></div>
                  <i className="botic botic1">年化利率<em>{data.fRateLast}%</em></i>
                  <i className="botic botic2">筹款时间<em>{conversionTime(data.fRemainingSecond)}</em></i>
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
