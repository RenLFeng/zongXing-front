import React from 'react';

export default class SecConsultation extends React.Component {
  render() {
    return (
      <div>
        <div className="cmt-box1">
          <p className="f18">有什么想跟大家交流的？</p>
          <textarea className="put" rows="5" placeholder="输入您想跟大家交流的内容"/>
          <p className="tright">
            <i className="fl c6">还可以输入<em>240</em>字</i>
            <label><input type="checkbox" />匿名提问</label>
            <a className="btn f18">发布话题</a>
          </p>
        </div>
        <div className="cmt-tab">
          <a className="hover">全部</a>
          <a>我的话题</a>
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
                <textarea className="put" rows="5"/>
                <p className="tright">
                  <i className="fl c6">还可以输入<em>240</em>字</i>
                  <a className="btn f14">回复</a>
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
