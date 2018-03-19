import React from 'react';
import Data from './data';
import FormProject from './form-project';
import moment from 'moment';
import {getPersonalMoney, alreadyInvested, messageList} from '../../services/api';
import {message, Button, Modal} from 'antd';
import Path from '../../common/pagePath';


export default class Right extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      personalMoney: '0',
      accountId: '',
      pageParam:{
        pageCurrent: 1, //当前页，初始值为第一页
        pageSize: 1,    //每页可显示的消息条数
      },
      projectId:'',
      arr:[],
      maxPage: 0,     //最大页
      showForm: false,
      loading: false
    };
    this.rate = 1;
  }

  componentDidMount() {
    console.log(this.props);
  }

  async getPersonalMoney() {
    try {
      this.setState({loading: true});
      const response = await getPersonalMoney();
      this.setState({loading: false});
      if (response.code === 0) {
        this.setState({
          personalMoney: response.data.fcapital+'',
          accountId: response.data.fid,
        });
        $('.pd-form').before('<div class="_masker"></div>');
        $('.pd-form').removeClass('none').css('top', av.top() + 50 + 'px');
      } else if (response.code === -2) {
        Modal.confirm({
          title: '提示',
          content: '您的账号未开户，请前往开户',
          okText: '前往',
          cancelText: '取消',
          onOk: () => {
            $(window).scrollTop(0);
            this.props.history.push(Path.OPEN_ACCOUNT+'/0');
          }
        });
      } else {
        message.error(response.msg);
      }
    } catch(e) {
      this.setState({loading: false});
      console.log(e);
      if (typeof e === 'object' && e.name === 288) {
        message.error('未登录或登录超时');
        this.props.history.push('/index/login');
        throw e;
      }
      message.error('服务器繁忙，请稍后重试');
    }
  }

  async getData(page) {
    const response = await alreadyInvested({pageParam:this.state.pageParam, projectId:this.props.projectDetail.fpeoject_id});
    //判断请求状态
    if (response.code === 0) {
      const maxPage = Math.ceil(this.props.projectDetail.userCount*1 / this.state.pageParam.pageSize *1 );
      this.setState({
        pageParam:{
          pageCurrent:page, //当前页，初始值为第一页
          pageSize: 20,    //每页可显示的消息条数
        },
        projectId: this.props.projectDetail.fpeoject_id,
        arr: response.data,
        maxPage: maxPage
      });
    } else {
      message.error(response.msg);
    }
  }



  render(){
    const {countDay, countDown} = this.props.time;
    const project = this.props.projectDetail;
    const allMoney = project.allMoney?project.allMoney:0;
    const userCount = project.userCount ? project.userCount: 0;
    return (
      <div>
        <div className="box1 shadow">
          <div className="trow clearfix" data-end={moment(project.fcollet_over_time).format('YYYY-MM-DD HH:mm:ss')}>
            <i className="tit">还剩</i>
            <div className="day">
              <p className="t1">{countDay}</p>
              <p className="t2">天</p>
            </div>
            <div className="time">
              <p className="t1">{countDown}</p>
              <p className="t2">小时<i/>分<i/>秒</p>
            </div>
          </div>
          <div className="data clearfix">
            <div className="circle" data-value={allMoney/project.fcredit_money*100}/>
            <i className="ctext">已筹款比例</i>
            <div className="fr">
              <p className="t1">已经筹款</p>
              <p className="t2">{allMoney}<em>元</em></p>
            </div>
          </div>
          <div className="bot">
            <a className="btn" onClick={() => this.getData(1)}><i>已投资人数</i><b>{userCount}</b>人</a>
          </div>
        </div>
        <div className="box2 shadow">
          <p className="tit">投资提醒</p>
          <div className="text">
            <p><b>小额：</b>建议单个项目的最大投资金额不要超过整个项目借款总金额的1%。</p>
            <p><b>分散：</b>投资项目尽量分散不同行业、不同地区、不同利率、不同借款周期。</p>
          </div>
          <p className="tit">投资风险提示</p>
          <div className="text">
            <p>投资具有一定风险，参与计划的人士应为风险识别、评估、承受能力较强的合格投资者。请确认您或您所代表的机构是一名“合格投资者”，并将遵守适用的有关法规。</p>
            <p>本网站所载的各种信息和数据等仅供参考，并不构成销售要约，或买入项目或其它投资工具的建议。投资者应仔细审阅相关金融产品的合同文件等以了解其风险因素，或寻求专业的投资顾问的建议。不承诺保本和最低收益，具有一定的投资风险。投资者的本金可能会因市场变动而蒙受损失，请投资者充分认识投资风险，谨慎投资。</p>
          </div>
          <div className="center bot1">
            <p>
              <Button loading={this.state.loading} type="primary" style={{width: 150, height: 40}}  onClick={()=>this.getPersonalMoney()}>我要投资</Button>
            </p>
          </div>
          <p className="center bot2">
            <a className="like">23</a>
            <i className="share">
              <span>32</span>
              <span className="border shadow">
                <a className="qq"/>
                <a className="sina"/>
                <a className="weixin"/>
            </span>
            </i>
          </p>
        </div>
        <Data arr={this.state.arr} fetchData={this.getData.bind(this)} userCount={this.props.projectDetail.userCount} allMoney={this.props.projectDetail.allMoney} maxPage={this.state.maxPage} pageCurrent={this.state.pageParam.pageCurrent} />
        <FormProject project={this.props.projectDetail} personalMoney={this.state.personalMoney}
                       accountId={this.state.accountId}/>

      </div>
    );
  }
}
