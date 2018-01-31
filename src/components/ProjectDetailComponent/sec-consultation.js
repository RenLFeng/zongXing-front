import React from 'react';
import {message, Button} from 'antd';
import {getProTopic, getMyTopic, addQuestionTopic, addReply, getReplyByTopic} from '../../services/api';
import {connect} from 'dva';
import moment from 'moment';

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
      this.fetchAllTopic();
    }
    if (this.state.showTopic === 1 && nextState.showTopic === 0) {

      this.fetchMyTopic();
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
    console.log(response);
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
      const data = {
        fIsAnonymity: this.state.anonymous,
        fContent: topicText,
        fProjectId: this.props.projectId
      };
      const response = await addQuestionTopic(data);
      this.setState({sendLoading: false});
      if (response.code === 0) {
        // 发布话题成功之后 清空话题框 刷新全部话题列表
        this.setState({topicText: ''});
        message.info(response.msg);
        this.fetchAllTopic();
        this.fetchMyTopic()
      } else {
        message.error(response.msg);
      }
    } catch(e) {
      message.error('网络异常，请重试');
      this.setState({sendLoading: false});
    }
  }

  // 添加话题回复
  async saveTopic(topicId, type) {
    if (!this.judgeLogin())
      return;
    // type 0: 是全部话题的回复 1: 是我的话题的回复
    if (type === 0) {
      if (!this.state[`replayText${topicId}`]) {
        message.warning('回复内容不能为空');
        return;
      }
      const data = {
        fTopicId: topicId,
        fContent: this.state[`replayText${topicId}`],
        fIsAnonymity: false
      };
      try {
        this.setState({[`loading${topicId}`]: true});
        const response = await addReply(data);
        this.setState({[`loading${topicId}`]: false});
        if (response.code === 0) {
          this.setState({[`replayText${topicId}`]: ''});
          message.info(response.msg);
          this.getAllTopicReply(topicId);
        } else {
          message.error(response.msg);
        }
      } catch(e) {
        message.error('网络异常，请重试');
        this.setState({[`loading${topicId}`]: false});
      }
    } else {
      if (!this.state[`my${topicId}Text`]) {
        message.warning('回复内容不能为空');
        return;
      }
      const data = {
        fTopicId: topicId,
        fContent: this.state[`my${topicId}Text`],
        fIsAnonymity: false
      };
      try {
        this.setState({[`myLoading${topicId}`]: true});
        const response = await addReply(data);
        this.setState({[`myLoading${topicId}`]: false});
        if (response.code === 0) {
          this.setState({[`my${topicId}Text`]: ''});
          message.info(response.msg);
          this.getMyAllTopicReply(topicId);
        } else {
          message.error(response.msg);
        }
      } catch(e) {
        message.error('网络异常，请重试');
        this.setState({[`myLoading${topicId}`]: false});
      }
    }
  }

  // 获得一个话题下的所有回复
  async getAllTopicReply(topicId) {
    this.setState({
      [`replyStatus${topicId}`]: true
    });
    const response = await getReplyByTopic(topicId);
    if (response.code === 0) {
      this.setState({
        [`reply${topicId}`]: response.data
      });
    } else {
      message.error(response.msg);
    }
  }

  async getMyAllTopicReply(topicId) {
    this.setState({
      [`myReplyStatus${topicId}`]: true
    });
    const response = await getReplyByTopic(topicId);
    if (response.code === 0) {
      this.setState({
        [`myReply${topicId}`]: response.data
      });
    } else {
      message.error(response.msg);
    }
  }

  render() {
    const { showTopic, anonymous, topicText, sendLoading } = this.state;
    console.log(this.state.myTopic);
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
        {this.state.showTopic === 0 ? <div className="cmt-list">
          {
            this.state.allTopic.map((data, index) => {
              return (
                <div className="item" key={data.fid+'1'+index}>
                  <img className="av" src={require('../../assets/img/project-detail/av2.png')} />
                  <p className="t1">
                    <i className="c6">{data.fis_anonymity? '匿名用户': data.fnickname}：</i>
                    {data.fcontent}
                  </p>
                  <p className="t2 c6">
                    <i>{moment(data.ftime).format('YYYY-MM-DD HH:mm')}</i>
                    <a onClick={()=>this.getAllTopicReply(data.fid)}>回复（{data.count}）</a>
                  </p>
                  {this.state[`replyStatus${data.fid}`] ?
                    <div className="rediv">
                      <div className="list">
                        {
                          this.state[`reply${data.fid}`] ? this.state[`reply${data.fid}`].map((value, index)=>{
                            return (
                              <div className="item" key={value.fid+index}>
                                <img className="av" src={require('../../assets/img/project-detail/av3.png')}/>
                                <p className="t1">
                                  <i className="c6">{value.fis_anonymity? '匿名用户': value.fnickname} 回复 {data.fis_anonymity? '匿名用户': data.fnickname}：</i>
                                  {value.fcontent}
                                </p>
                                <p className="t2 c6">
                                  <i>{moment(value.ftime).format('YYYY-MM-DD HH:mm')}</i>
                                </p>
                              </div>
                            );
                          }): null
                        }
                      </div>
                      <div className="rebox">
                        <textarea className="put" rows="5" value={this.state[`replayText${data.fid}`]}
                                  onChange={(e) => this.setState({[`replayText${data.fid}`]: e.target.value})}/>
                        <p className="tright">
                          <i className="fl c6">还可以输入<em>240</em>字</i>
                          <Button type="primary" loading={this.state[`loading${data.fid}`]} style={{borderRadius: 3}}
                                  onClick={() => this.saveTopic(data.fid, 0)}>回复</Button>
                        </p>
                      </div>
                    </div> : null
                  }
                </div >
              );
            })
          }
        </div> : null}
        {this.state.showTopic === 1 ? <div className="cmt-list">
          {
            this.state.myTopic.map((data, index) => {
              return (
                <div className="item" key={data.fid+'111'}>
                  <img className="av" src={require('../../assets/img/project-detail/av2.png')} />
                  <p className="t1">
                    <i className="c6">{data.fis_anonymity? '匿名用户': data.fnickname}：</i>
                    {data.fcontent}
                  </p>
                  <p className="t2 c6">
                    <i>{moment(data.ftime).format('YYYY-MM-DD HH:mm')}</i>
                    <a onClick={()=>this.getMyAllTopicReply(data.fid)}>回复（{data.count}）</a>
                  </p>
                  {this.state[`myReplyStatus${data.fid}`] ?
                    <div className="rediv">
                      <div className="list">
                        {
                          this.state[`myReply${data.fid}`] ? this.state[`myReply${data.fid}`].map((value, index)=>{
                            return (
                              <div className="item" key={value.fid+index+'1'}>
                                <img className="av" src={require('../../assets/img/project-detail/av3.png')}/>
                                <p className="t1">
                                  <i className="c6">{value.fis_anonymity? '匿名用户': value.fnickname} 回复 {data.fis_anonymity? '匿名用户': data.fnickname}：</i>
                                  {value.fcontent}
                                </p>
                                <p className="t2 c6">
                                  <i>{moment(value.ftime).format('YYYY-MM-DD HH:mm')}</i>
                                </p>
                              </div>
                            );
                          }): null
                        }
                      </div>
                      <div className="rebox">
                        <textarea className="put" rows="5" value={this.state[`my${data.fid}Text`]}
                                  onChange={(e) => this.setState({[`my${data.fid}Text`]: e.target.value})}/>
                        <p className="tright">
                          <i className="fl c6">还可以输入<em>240</em>字</i>
                          <Button type="primary" loading={this.state[`myLoading${data.fid}`]} style={{borderRadius: 3}}
                                  onClick={() => this.saveTopic(data.fid, 1)}>回复</Button>
                        </p>
                      </div>
                    </div> : null
                  }
                </div >
              );
            })
          }

        </div> : null}
      </div>
    );
  }
}
