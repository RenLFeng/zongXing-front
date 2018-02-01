import React from 'react';
import {message} from 'antd';
import {selectProJourney, praise} from '../../services/api';
import moment from 'moment';
import {IMG_BASE_URL} from '../../common/systemParam';

export default class SecCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseArr: []
    };
  }

  componentDidMount() {
    this.fetchJourney();
  }

  async fetchJourney() {
    const response = await selectProJourney(this.props.projectId);
    if (response.code === 0) {
      this.setState({
        courseArr: response.data
      });
    } else {
      message.error(response.msg);
    }
  }

  async clickHeard(id) {
    this.setState({
      [`heard${id}`]: true
    });
    praise(id);
  }

  render() {
    const {projectDetail} = this.props;
    const dateCode = moment(projectDetail.fcreate_time).format('YYYY') + moment(projectDetail.fcreate_time).format('MM');
    return (
      <div>
        <div className="center pd-lich">
          <i className="tit">这里记录了项目发起人更新的项目进展</i>
        </div>
        <div className="timetree">
          <div className="end"/>
          <div className="list">
            {this.state.courseArr.map((data, index)=>{
              const realData = data.projectJourney;
              const imgArr = realData.fPicJson.split(',');
              return (
                <div className="item">
                  <p className="date">
                    <i className="y">{moment(realData.fTime).format('YYYY')}</i><br /><i className="d">{moment(realData.fTime).format('MM-DD')}</i>
                  </p>
                  <i className="cc"/>
                  <p className="text">{realData.fContent}<em className="em1" onClick={()=>this.clickHeard()}>{data.praiseCount}</em></p>
                  <p className="img">
                    {imgArr.map((data) => {
                      return (
                        <img src={`${IMG_BASE_URL}project/${dateCode}/${projectDetail.fproject_no}/${data}/procourse`} />
                      );
                    })}
                  </p>
                </div>
              );
            })}

            {/*<div className="item">*/}
              {/*<p className="date">*/}
                {/*<i className="y">2018</i><br /><i className="d">3-25</i>*/}
              {/*</p>*/}
              {/*<i className="cc"/>*/}

            {/*</div>*/}
            {/*<div className="item">*/}
              {/*<p className="date">*/}
                {/*<i className="y">2018</i><br /><i className="d">3-20</i>*/}
              {/*</p>*/}
              {/*<i className="cc"/>*/}
              {/*<p className="text">筹款成功，给投资人发放5万元代金券的额外回报<em className="em2">2310</em></p>*/}
            {/*</div>*/}
            {/*<div className="item">*/}
              {/*<p className="date">*/}
                {/*<i className="y">2018</i><br /><i className="d">3-15</i>*/}
              {/*</p>*/}
              {/*<i className="cc"/>*/}
              {/*<p className="text">第五期还款<em>3402</em></p>*/}
            {/*</div>*/}
            {/*<div className="item hover">*/}
              {/*<p className="date">*/}
                {/*<i className="y">2018</i><br /><i className="d">3-13</i>*/}
              {/*</p>*/}
              {/*<i className="cc"/>*/}
              {/*<p className="text">新店开业，给投资人发放免费体验券<em>2311</em></p>*/}
              {/*<p className="img">*/}
                {/*<img src={require('../../assets/img/project-detail/pic10.png')} />*/}
              {/*</p>*/}
            {/*</div>*/}
            {/*<div className="item">*/}
              {/*<p className="date">*/}
                {/*<i className="y">2018</i><br /><i className="d">3-11</i>*/}
              {/*</p>*/}
              {/*<i className="cc"/>*/}
              {/*<p className="text">第四期还款<em>2322</em></p>*/}
            {/*</div>*/}
            {/*<div className="item">*/}
              {/*<p className="date">*/}
                {/*<i className="y">2018</i><br /><i className="d">3-5</i>*/}
              {/*</p>*/}
              {/*<i className="cc"/>*/}
              {/*<p className="text">第三期还款，给投资人发放5万元代金券的额外回报<em>2322</em></p>*/}
            {/*</div>*/}
            {/*<div className="item">*/}
              {/*<p className="date">*/}
                {/*<i className="y">2018</i><br /><i className="d">2-6</i>*/}
              {/*</p>*/}
              {/*<i className="cc"/>*/}
              {/*<p className="text">第二期还款<em>2322</em></p>*/}
            {/*</div>*/}
            {/*<div className="item hover">*/}
              {/*<p className="date">*/}
                {/*<i className="y">2018</i><br /><i className="d">1-16</i>*/}
              {/*</p>*/}
              {/*<i className="cc"/>*/}
              {/*<p className="text">给投资人发放国庆期间八折优惠券<em>2322</em></p>*/}
              {/*<p className="img">*/}
                {/*<img src={require('../../assets/img/project-detail/pic8.png')} />*/}
              {/*</p>*/}
            {/*</div>*/}
            {/*<div className="item hover">*/}
              {/*<p className="date">*/}
                {/*<i className="y">2017</i><br /><i className="d">12-17</i>*/}
              {/*</p>*/}
              {/*<i className="cc"/>*/}
              {/*<p className="text">第一期还款，项目结束，答谢投资人5万元代金券<em>2322</em></p>*/}
              {/*<p className="img">*/}
                {/*<img src={require('../../assets/img/project-detail/pic8.png')} />*/}
              {/*</p>*/}
            {/*</div>*/}
          </div>
          <div className="start"/>
        </div>

      </div>
    );
  }
}
