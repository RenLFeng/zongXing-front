import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd';
import { IMG_BASE_URL } from '../../common/systemParam';
import { initPage } from '../../assets/home/index';
import Path from '../../common/pagePath';

@connect((state) => ({
  systemData: state.systemData,
  login: state.login.status
}))
export default class Banner extends React.Component {
  state = {
    show: false
  };

  componentDidMount() {
    setTimeout(()=>{
      this.setState({
        show: true
      });
    }, 100)

  }
  jumpPage() {
    if (this.props.login) {
      this.props.history.push('/index/projectLoan')
    } else {
      message.info('请先登录');
      this.props.history.push('/index/login')
    }

  }
  render() {
    const {systemData} = this.props;
    return (
      <div className="section home-banner g">
        <video autoPlay="autoplay" loop="loop" preload="metadata" >
          <source src="https://n1video.hjfile.cn/zhuanti/2018/02/05/5b543a2fc89d1f464e152dc4015eea50.webm" type="video/webm"/>
          <source src="https://n1video.hjfile.cn/zhuanti/2018/02/05/5f381bab717a30c3c91f9dfae6d8334e.mp4" type="video/mp4"/>
        </video>
        {/*<video*/}
          {/*preload="metadata" controls="controls"*/}
          {/*src='https://n1video.hjfile.cn/zhuanti/2018/02/05/5b543a2fc89d1f464e152dc4015eea50.mp4'*/}
        {/*/>*/}
        {/*<video className="hide"*/}
               {/*preload="metadata" controls="controls"*/}
               {/*poster={require('../../assets/img/home/1.jpg')}*/}
               {/*src="//n1video.hjfile.cn/zhuanti/2017/12/20/f5339abc403997a43fa9b9362b2a29cb.mp4">*/}
          {/*您的浏览器不支持视频播放，请升级浏览器*/}
        {/*</video>*/}
        <div className="masker"></div>
        <div className="w">
          <p className="item act" style={{display: `${this.state.show?'block':'none'}`}}>
            <span className="h act">小微企业</span>&nbsp;
            <span className="h"><i className="f">能</i>精准营销</span>&nbsp;
            <span className="h"><i className="f">的</i>借贷平台</span>
          </p>
          <p className="item" style={{display: `${this.state.show?'block':'none'}`}}>
            <span className="h"><i className="f">个人可以</i></span>&nbsp;
            <span className="h">直接投资</span>&nbsp;
            <span className="h"><i className="f">中国</i>实体经济</span>
          </p>
          <p className="item" style={{display: `${this.state.show?'block':'none'}`}}>
            <span className="h"><i className="f">通过</i>帮助小微企业</span>&nbsp;
            <span className="h"><i className="f">成功获得</i></span>&nbsp;
            <span className="h"><i className="f"></i>丰厚回报</span>
          </p>
          <p className="t2" style={{display: `${this.state.show?'block':'none'}`}}>
            <a className="btn finance" onClick={()=>this.jumpPage()}>我要借款</a>
            <a className="btn invest" onClick={()=>this.jumpPage()}>我要投资</a>
          </p>
        </div>
      </div>
    );
  }
}
