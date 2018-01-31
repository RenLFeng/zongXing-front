import React from 'react';
import { getProQuestion, addQuestion,getAnswerbyQaId, getProjectDetailNotice} from '../../services/api';
import {message, Button} from 'antd';
import {connect} from 'dva';
import moment from 'moment';
import { genzong } from '../../assets/project-detail/index';
import {IMG_BASE_URL} from '../../common/systemParam';

@connect((state) => (({
  loginStatus: state.login.status
})))
export default class SecTrack extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectId: '',
      allQuestion: [], // 所有问题的集合
      anonymous: false, // 匿名回复
      noticeImg: []
    };
  }

  componentDidMount() {
    this.fetchQuestion();
    this.fetchBannerPic();
  }

  async fetchBannerPic() {
    const response = await getProjectDetailNotice(this.props.projectId);
    if (response.code === 0) {
      this.setState({noticeImg: response.data});
      setTimeout(()=>this.controlBanner(), 200);
    } else {
      message.error(response.msg);
    }
  }

  controlBanner() {
    let count = $('.lich-box1 .swiper-slide').length;
    $('.lich-box1 .bot>i').html(count);
    const swiper = new Swiper('.lich-box1 .swiper-container', {
      speed: 1000,
      loop: true,
      onSlideChangeEnd: this.resetCon
    });
    $('.lich-box1 .prev').on('click', function () {
      swiper.swipePrev();
    });
    $('.lich-box1 .next').on('click', function () {
      swiper.swipeNext();
    });
  }

  resetCon(swiper) {
    let d = swiper.getSlide(swiper.activeIndex);
    let tit = $(d).find('.t0').html();
    $('.lich-box1 .hd .tit').html(tit);
    let idx = swiper.activeIndex || count;
    if (idx > count) idx = 1;
    $('.lich-box1 .bot>b').html(idx);
  }

  async fetchQuestion() {
    const response = await getProQuestion(this.props.projectId);
    if (response.code === 0) {
      this.setState({ allQuestion: response.data});
    } else {
      message.error(response.msg);
    }
  }

  // 发布问题
  async sendQuestion() {
    const { topicText, anonymous } = this.state;
    if (!this.judgeLogin())
      return;
    if (!topicText) {
      message.warning('问题内容不能为空');
      return;
    }
    this.setState({sendLoading: true});

    try {
      // TODO: 问题对象生成
      const data = {
        fProjectId: this.props.projectId,
        fQuestion: topicText,
        fIsAnonymity: anonymous
      };
      const response = await addQuestion(data);
      this.setState({sendLoading: false});
      if (response.code === 0) {
        // 发布话题成功之后 清空话题框 刷新全部话题列表
        this.setState({topicText: ''});
        message.info(response.msg);
        this.fetchQuestion();
      } else {
        message.error(response.msg);
      }
    } catch(e) {
      message.error('网络异常，请重试');
      this.setState({sendLoading: false});
    }
  }



  // 判断是否登录
  judgeLogin() {
    if (this.props.loginStatus) {
      return true;
    } else {
      message.warning('请先登录');
      return false;
    }
  }

  async getAnswerbyQaIds(questionId) {
    this.setState({[`status${questionId}`]: true});
    const response = await getAnswerbyQaId(questionId);
    if (response.code === 0) {
      this.setState({
        [`question${questionId}`]: response.data
      });
    } else {
      message.error(response.msg);
    }
  }

  render() {
    const { anonymous, topicText, sendLoading, allQuestion } = this.state;
    const {projectDetail} = this.props;
    const dateCode = moment(projectDetail.fcreate_time).format('YYYY') + moment(projectDetail.fcreate_time).format('MM');
    return (
      <div>
        <div className="lich-box1 border">
          <div className="hd">
            <i className="tag">公告</i>
            <i className="tit">{this.state.noticeImg.length>0?this.state.noticeImg[0].fTitle:''}</i>
          </div>
          <div className="swiper-container">
            <div className="swiper-wrapper">
              { this.state.noticeImg.map((data, index)=>{
                  return(
                    <div className="swiper-slide" key={index}>
                      <img src={`${IMG_BASE_URL}project/${dateCode}/${projectDetail.fproject_no}/${data.fCardPic}`}/>
                      <p className="t0 none">{data.fTitle}</p>
                      <p className="t1">{moment(data.fTime).format('YYYY-MM-DD HH:mm')} 阅读数：{data.fReadCount}</p>
                      <p className="t2">
                        {data.fContent}
                      </p>
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="bot">
            <b>1</b><em>/</em><i>1</i>
            <a className="btn prev">&lt;</a>
            <a className="btn next">&gt;</a>
          </div>
        </div>
        <div className="cmt-box1">
          <p className="f18">有什么疑问想告诉项目发起人的？</p>
          <textarea className="put" rows="5" placeholder="输入您遇到的问题内容..." value={topicText} onChange={(e)=>this.setState({topicText: e.target.value})}/>
          <p className="tright">
            <i className="fl c6">还可以输入<em>240</em>字</i>
            <label><input type="checkbox" checked={anonymous} onChange={()=>this.setState({anonymous: !anonymous})}/>匿名提问</label>
            <Button type="primary" loading={!!sendLoading} style={{marginLeft: 10, borderRadius: 3}} onClick={()=>this.sendQuestion()}>发布问题</Button>
          </p>
        </div>

        <div className="qa-list">
          {
            allQuestion.map((data, index) => (
              <div className="item" key={index}>
                <p className="q" >
                  <em>问</em>
                  <b className="t1">{data.fquestion}</b>
                  <b className="fr">{data.fis_anonymity?'匿名用户':data.fnickname} {moment(data.ftime).format('YYYY-MM-DD HH:mm')}</b>
                </p>
                {this.state[`status${data.fid}`] ?
                  <div className="aa">
                  {this.state[`question${data.fid}`] ? this.state[`question${data.fid}`].map((value, index) => {
                    return (
                      <p className="a">
                        <i className="t1">{value.fanswer}</i>
                        <i className="fr">{value.fis_anonymity?'匿名用户':value.fnickname} {moment(value.ftime).format('YYYY-MM-DD HH:mm')}</i>
                      </p>
                    )
                  }) : null}
                  </div> : null
                }
                <p className="more">
                  {data.count !== 0 ?
                    this.state[`status${data.fid}`] ?
                      <a onClick={()=>this.setState({[`status${data.fid}`]: false})}>收起回答</a> :
                      <a onClick={()=>this.getAnswerbyQaIds(data.fid)}>查看{data.count}条回答</a>
                    : <span>暂无回答</span>
                  }
                </p>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
