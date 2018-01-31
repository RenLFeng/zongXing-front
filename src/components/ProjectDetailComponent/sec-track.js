import React from 'react';
import { getProQuestion, addQuestion,getAnswerbyQaId, } from '../../services/api';
import {message, Button} from 'antd';
import {connect} from 'dva';
import moment from 'moment';


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
    };
  }

  componentDidMount() {
    this.fetchQuestion();
    this.fetchBannerPic();
  }

  async fetchBannerPic() {
    const response = await getAnswerbyQaId();
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
    return (
      <div>
        <div className="lich-box1 border">
          <div className="hd">
            <i className="tag">公告</i>
            <i className="tit">未来十年这样投资才算中产</i>
          </div>
          <div className="swiper-container">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img src={require('../../assets/img/project-detail/pic2.png')} />
                <p className="t0 none">未来十年这样投资才算中产</p>
                <p className="t1">2017-10-10 14:24 阅读数：2322</p>
                <p className="t2">最近这段时间，有很多50后、60后的朋友都问我一个问题，为什么突然有一种不安全感，有一种陌生感。过去的两三年里，中国的很多产业在发展，互联网对制造业、服务业形成了冲击，中国金融市场出现一定波动。</p>
              </div>
              <div className="swiper-slide">
                <img src={require('../../assets/img/project-detail/pic3.png')} />
                <p className="t0 none">中国的很多产业在发展</p>
                <p className="t1">2017-10-10 14:24 阅读数：2322</p>
                <p className="t2">最近这段时间，有很多50后、60后的朋友都问我一个问题，为什么突然有一种不安全感，有一种陌生感。过去的两三年里，中国的很多产业在发展，互联网对制造业、服务业形成了冲击，中国金融市场出现一定波动。</p>
              </div>
              <div className="swiper-slide">
                <img src={require('../../assets/img/project-detail/pic4.png')} />
                <p className="t0 none">未来十年这样投资才算中产</p>
                <p className="t1">2017-10-10 14:24 阅读数：2322</p>
                <p className="t2">最近这段时间，有很多50后、60后的朋友都问我一个问题，为什么突然有一种不安全感，有一种陌生感。过去的两三年里，中国的很多产业在发展，互联网对制造业、服务业形成了冲击，中国金融市场出现一定波动。</p>
              </div>
              <div className="swiper-slide">
                <img src={require('../../assets/img/project-detail/pic5.png')} />
                <p className="t0 none">中国的很多产业在发展</p>
                <p className="t1">2017-10-10 14:24 阅读数：2322</p>
                <p className="t2">最近这段时间，有很多50后、60后的朋友都问我一个问题，为什么突然有一种不安全感，有一种陌生感。过去的两三年里，中国的很多产业在发展，互联网对制造业、服务业形成了冲击，中国金融市场出现一定波动。</p>
              </div>
              <div className="swiper-slide">
                <img src={require('../../assets/img/project-detail/pic5.png')} />
                <p className="t0 none">未来十年这样投资才算中产</p>
                <p className="t1">2017-10-10 14:24 阅读数：2322</p>
                <p className="t2">最近这段时间，有很多50后、60后的朋友都问我一个问题，为什么突然有一种不安全感，有一种陌生感。过去的两三年里，中国的很多产业在发展，互联网对制造业、服务业形成了冲击，中国金融市场出现一定波动。</p>
              </div>
            </div>
          </div>
          <div className="bot">
            <b>1</b><em>/</em><i>5</i>
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
