import React from 'react';
import {message, Button} from 'antd';
import {getProTopic, getMyTopic, addQuestionTopic, addReply, getReplyByTopic} from '../../services/api';
import {connect} from 'dva';


@connect((state) => (({
  loginStatus: state.login.status
})))
export default class SecConsultation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTopic: 0, //0:全部话题 1:我的话题
      allTopic: [], //全部话题数据
      myTopic: [], //我的话题数据
      projectId: '',
      anonymous: false, // 是否匿名
    }
  }

  componentDidMount() {
    this.setState({projectId: this.props.projectId});
    this.fetchAllTopic(this.props.projectId);
    console.log(this.checkbox);
  }

  // 当话题类型切换时发生的请求
  componentDidUpdate(nextProp, nextState) {
    if (this.state.showTopic === 0 && nextState.showTopic === 1) {
      this.fetchMyTopic();
    }
    if (this.state.showTopic === 1 && nextState.showTopic === 0) {
      this.fetchAllTopic();
    }
  }

  // 获取项目下所有话题的接口
  async fetchAllTopic(projectId = this.state.projectId) {
    const response = await getProTopic(projectId);
    if (response.code === 0) {
      this.setState({allTopic: response.data});
    } else {
      message.error(response.msg);
    }
  }

  // 获取项目下我的话题接口
  async fetchMyTopic(projectId = this.state.projectId) {
    const response = await getMyTopic(projectId);
    if (response.code === 0) {
      this.setState({myTopic: response.data});
    } else {
      message.error(response.msg)
    }
  }

  checkoutMyTopic() {
    if (this.judgeLogin()) {
      this.setState({showTopic: 1});
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

  // 发布话题
  async sendTopic() {
    const { topicText } = this.state;
    if (!this.judgeLogin())
      return;
    if (!topicText) {
      message.warning('话题内容不能为空');
      return;
    }
    this.setState({sendLoading: true});

    try {
      // TODO: 话题对象生成

      const response = await addQuestionTopic();
      this.setState({sendLoading: false});
      if (response.code === 0) {
        // 发布话题成功之后 清空话题框 刷新全部话题列表
        this.setState({topicText: ''});
        message.info(response.msg);
        this.fetchAllTopic();
      } else {
        message.error(response.msg);
      }
    } catch(e) {
      message.error('网络异常，请重试');
      this.setState({sendLoading: false});
    }
  }

  // 添加话题回复
  async saveTopic(topicId) {
    if (!this.judgeLogin())
      return;
    if (!this.state[topicId]) {
      message.warning('回复内容不能为空');
      return;
    }
    try {
      this.setState({[`loading${topicId}`]: true});
      const response = await addReply();
      this.setState({[`loading${topicId}`]: false});
      if (response.code === 0) {
        this.setState({topicText: ''});
        message.info(response.msg);
        this.getAllTopicReply(topicId);
      } else {
        message.error(response.msg);
      }
    } catch(e) {
      message.error('网络异常，请重试');
      this.setState({[`loading${topicId}`]: false});
    }
  }

  // 获得一个话题下的所有回复
  async getAllTopicReply(topicId) {
    const response = await getReplyByTopic(topicId);
    if (response.code === 0) {
      this.setState({
        [`reply${topicId}`]: response.data
      });
    } else {
      message.error(response.msg);
    }
  }

  render() {

    const { showTopic, anonymous, topicText, sendLoading } = this.state;
    return (
      <div>
        <div className="cmt-box1">
          <p className="f18">有什么想跟大家交流的？</p>
            <textarea className="put" rows="5" placeholder="输入您想跟大家交流的内容" value={topicText} onChange={(e)=>this.setState({topicText: e.target.value})}/>
            <p className="tright">
              <i className="fl c6">还可以输入<em>240</em>字</i>
              <label><input checked={anonymous} type="checkbox" onChange={()=>this.setState({anonymous: !anonymous})} />匿名提问</label>
              <Button type="primary" loading={!!sendLoading} style={{marginLeft: 10, borderRadius: 3}} onClick={()=>this.sendTopic()}>发布话题</Button>
            </p>
        </div>
        <div className="cmt-tab">
          <a onClick={()=>this.setState({showTopic: 0})} className={`${showTopic === 0 ? 'hover' : ''}`} >全部</a>
          <a onClick={()=>this.checkoutMyTopic()} className={`${showTopic === 1 ? 'hover' : ''}`}>我的话题</a>
        </div>
        <div className="cmt-list">
          <div className="item">
            <img className="av" src={require('../../assets/img/project-detail/av2.png')} />
            <p className="t1">
              <i className="c6">胡哥：</i>
              关于合伙工程的分钱机制如何做？
            </p>
            <p className="t2 c6">
              <i>1分钟前</i>
              <a>回复（0）</a>
            </p>
          </div>
          <div className="item">
            <img className="av" src={require('../../assets/img/project-detail/av3.png')} />
            <p className="t1">
              <i className="c6">米祁连：</i>
              在众借帮融资成功后，融得的资金是直接打入公司的账户还是由第三方进行托管？
            </p>
            <p className="t2 c6">
              <i>3分钟前</i>
              <a>回复（3）</a>
            </p>
          </div>
          <div className="item">
            <img className="av" src={require('../../assets/img/project-detail/av2.png')} />
            <p className="t1">
              <i className="c6">自信哥：</i>
              香港人能投嗎? 本人已在國內投了 P2P 一 年多。
            </p>
            <p className="t2 c6">
              <i>4分钟前</i>
              <a>回复（3）</a>
            </p>
            <div className="rediv">
              <div className="list">
                <div className="item">
                  <img className="av" src={require('../../assets/img/project-detail/av3.png')} />
                  <p className="t1">
                    <i className="c6">贵***业 回复 自信哥：</i>
                    能投不限制地区
                  </p>
                  <p className="t2 c6">
                    <i>3分钟前</i>
                    <a>回复（0）</a>
                  </p>
                </div>
                <div className="item">
                  <img className="av" src={require('../../assets/img/project-detail/av1.png')} />
                  <p className="t1">
                    <i className="c6">贵***业 回复 自信哥：</i>
                    能投不限制地区
                  </p>
                  <p className="t2 c6">
                    <i>3分钟前</i>
                    <a>回复（0）</a>
                  </p>
                </div>
                <div className="item">
                  <img className="av" src={require('../../assets/img/project-detail/av3.png')} />
                  <p className="t1">
                    <i className="c6">贵***业 回复 自信哥：</i>
                    能投不限制地区
                  </p>
                  <p className="t2 c6">
                    <i>3分钟前</i>
                    <a>回复（0）</a>
                  </p>
                </div>
              </div>
              <div className="rebox">
                <textarea className="put" rows="5" value={this.state[`123`]} onChange={(e)=>this.setState({[`123`]: e.target.value})}/>
                <p className="tright">
                  <i className="fl c6">还可以输入<em>240</em>字</i>
                  <Button type="primary" loading={this.state[`loading${123}`]} style={{borderRadius: 3}} onClick={()=>this.saveTopic()}>回复</Button>
                </p>
              </div>
            </div>
          </div>
          <div className="item">
            <img className="av" src={require('../../assets/img/project-detail/av3.png')} />
            <p className="t1">
              <i className="c6">张月：</i>
              股权众筹监管细则，重点监管的方向可能有哪些？
            </p>
            <p className="t2 c6">
              <i>1小时前</i>
              <a>回复（1）</a>
            </p>
            <div className="rediv">
              <div className="list">
                <div className="item">
                  <img className="av" src={require('../../assets/img/project-detail/av3.png')} />
                  <p className="t1">
                    <i className="c6">罗斯 回复 张月：</i>
                    会明确股权众筹的定义，对众筹平台进行规范，对投资可能存在限制，比如说大额投资要通过平台认证等。对众筹平台的信息披露做出要求，平台注册用户能得到详细的披露信息，同时，成为注册用户，必须实名认证等。
                  </p>
                  <p className="t2 c6">
                    <i>3分钟前</i>
                    <a>回复（0）</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <img className="av" src={require('../../assets/img/project-detail/av2.png')} />
            <p className="t1">
              <i className="c6">陈明：</i>
              如何甄别股权众投平台好坏？
            </p>
            <p className="t2 c6">
              <i>2小时前</i>
              <a>回复（0）</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
