import React from 'react';
import Data from './data';
import FormProject from './form-project';
import Coupon from '../common/Coupon';
import { connect } from 'dva';
import moment from 'moment';
import {getPersonalMoney, alreadyInvested, setProjectCollection} from '../../services/api';
import {message, Button, Modal} from 'antd';
import Path from '../../common/pagePath';

@connect(()=>{

})
export default class Right extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      personalMoney: '0',
      accountId: '',
      pageParam:{
        pageCurrent: 1, //当前页，初始值为第一页
        pageSize: 20,    //每页可显示的消息条数
      },
      projectId:'',
      arr:[],
      maxPage: 0,     //最大页
      showForm: false,
      loading: false,  //我要投资loading
      Loading: false,  //已投资人数loading
      canPay: false,
      coupons:[1,2,3]
    };
    this.rate = 1;
    this.countDown = null;
  }

  componentDidMount() {
    console.log(123);
  }

  componentWillReceiveProps(props) {
    if (this.props.projectDetail !== props.projectDetail) {
      if (!this.countDown && this.props.projectDetail.fcollet_over_time) {
        this.countDown = setInterval(()=>this.countDownTime(), 1000);
      }
    }
  }

  componentWillUnmount() {
    console.log(123);
    clearInterval(this.countDown);
  }

  countDownTime() {
    if (this.props.projectDetail.fcollet_over_time) {
      let overTime = this.props.projectDetail.fcollet_over_time - new Date().getTime();
      if (overTime <= 0) {
        this.setState({countDown: '00 : 00 : 00', countDay: 0});
        clearInterval(this.countDown);
      } else {
        if (Math.floor(overTime/86400000) !== 0) {
          this.setState({
            countDay: Math.floor(overTime/86400000)
          });
        } else {
          this.setState({
            countDay: 0
          });
        }
        overTime = overTime - Math.floor(overTime/86400000) * 86400000;
        let time = '';
        if (Math.floor(overTime/3600000) !== 0) {
          if (Math.floor(overTime/3600000) >= 10) {
            time = `${Math.floor(overTime/3600000)} :`;
          } else {
            time = `0${Math.floor(overTime/3600000)} :`;
          }
        } else {
          time = `00 :`;
        }
        overTime = overTime - Math.floor(overTime/3600000) * 3600000;
        if (Math.floor(overTime/60000) !== 0) {
          if (Math.floor(overTime/60000) >= 10) {
            time = `${time} ${Math.floor(overTime/60000)} :`;
          } else {
            time = `${time} 0${Math.floor(overTime/60000)} :`;
          }
        } else {
          time = `${time} 00 :`;
        }
        overTime = overTime - Math.floor(overTime/60000) * 60000;
        if (overTime !== 0) {
          if (overTime/1000 >= 10) {
            time = `${time} ${Math.floor(overTime/1000)}`;
          } else {
            time = `${time} 0${Math.floor(overTime/1000)}`;
          }
        } else {
          time = `${time} 00`;
        }
        this.setState({countDown: time});
      }
    } else {
      this.setState({countDown: '00 : 00 : 00', countDay: 0});
    }
  }


  async getPersonalMoney(fid) {
    try {
      this.setState({loading: true});
      const response = await getPersonalMoney([fid]);
      this.setState({loading: false});
      if (response.code === 0) {
        this.setState({
          personalMoney: response.data.accountInfo.fcapital+'',
          accountId: response.data.accountInfo.fid,
          canPay: response.data.hasWaitPayInv
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
    }
  }

  async getData(page) {
    //调用子级方法
    this.dataModal.getCityInvest(this.props.projectDetail.fpeoject_id);
    this.dataModal.getGender(this.props.projectDetail.fpeoject_id);
    this.dataModal.getAge(this.props.projectDetail.fpeoject_id);
    this.dataModal.getInvest(this.props.projectDetail.fpeoject_id);
    console.log(page);
    this.setState({Loading:true})
    const response = await alreadyInvested({pageParam:{...this.state.pageParam,pageCurrent: page }, projectId:this.props.projectDetail.fpeoject_id});
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
        maxPage: maxPage,
        Loading:false
      });
      $('.pd-data').before('<div class="_masker"></div>');
      $('.pd-data').removeClass('none').css('top', av.top() + 50 + 'px');
    } else {
      this.setState({Loading:false})
      message.error(response.msg);
    }
  }

  // 收藏项目
  async projectCollection() {
    if (this.props.projectDetail.isCollected) {
      return;
    }
    const response = await setProjectCollection({fprojectId: this.props.projectDetail.fpeoject_id,famount: 0});
    console.log(response);
    if (response.code === 0) {
      this.props.projectDetail.collectionNumber += 1;
      this.props.projectDetail.isCollected = true;
      this.forceUpdate();
    } else {
      if (response.msg === '用户未做权限验证') {
        localStorage.removeItem('accessToken');
        this.props.history.push('/index/login');
        this.props.dispatch({
          type: 'login/logoutData'
        });
      }
    }
  }

  render(){
    const project = this.props.projectDetail;
    const allMoney = project.allMoney?project.allMoney:0;
    const userCount = project.userCount ? project.userCount: 0;
    let rate = Math.floor(allMoney/project.fcredit_money*100);
    if (allMoney/project.fcredit_money !== 0 && allMoney/project.fcredit_money<0.01) {
      rate = 1;
    }

    return (
      <div>
        <div className="box1 shadow" style={{display:'none'}}>
          <div className="trow clearfix" data-end={moment(project.fcollet_over_time).format('YYYY-MM-DD HH:mm:ss')}>
            <i className="tit">还剩</i>
            <div className="day">
              <p className="t1">{this.state.countDay?this.state.countDay:0}</p>
              <p className="t2">天</p>
            </div>
            <div className="time">
              <p className="t1">{this.state.countDown?this.state.countDown:'00 : 00 : 00'}</p>
              <p className="t2">小时<i/>分<i/>秒</p>
            </div>
          </div>
          <div className="data clearfix">
            <div className="circle" data-value={rate}/>
            <i className="ctext">已筹款比例</i>
            <div className="fr">
              <p className="t1">已经筹款</p>
              <p className="t2">{allMoney}<em>元</em></p>
            </div>
          </div>
          <div className="bot">
            {
              userCount ?
                <a className="btn" onClick={() => this.getData(1)}><i>已投资人数</i><b>{userCount}</b>人</a> :
                <a style={{backgroundColor: '#ccc', width: '200',lineHeight: '50px',textAlign: 'center',position: 'absolute',top:'26',left: '50%',marginLeft: '-100',color: '#fff',fontSize: '18',borderRadius:'3px'}}><i>已投资人数</i><b>{userCount}</b>人</a>
            }

          </div>
        </div>
        <div className="box2 shadow">
          <p className="tit">投资提醒</p>
          <div className="text">
            <p><b>小额：</b>建议单个项目的最大投资金额不要超过整个项目借款总金额的1%。</p>
            <p><b>分散：</b>投资项目尽量分散不同行业、不同地区、不同利率、不同借款周期。</p>
          </div>
          <div className="center bot1">
            {this.props.projectDetail.fflag !== 10 ?
              <p className="clearfix">
                <Button className="btn2" loading={this.state.loading} type="primary" style={{width: 130, height: 50}}
                      onClick={() => this.getPersonalMoney(this.props.projectDetail.fpeoject_id)} >我要投资
                </Button>
                <Button className="y btn" loading={this.state.Loading} type="primary" style={{width: 130, height: 50}}
                       onClick={() => this.getData(1)} >已投资人数
                </Button>
              </p> : null
            }
          </div>
          <p className="center bot2">
            <a className={`${this.props.projectDetail.isCollected?'like1':'like'}`} onClick={()=>this.projectCollection()}>{this.props.projectDetail.collectionNumber}</a>
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
        <div className="box3 shadow" style={{padding:'0 10px'}}>
          <p className="tit">商家优惠券</p>
          <div className="coupon">
          <ul style={{marginTop:'30px'}}>
            <li style={{marginTop:'20px'}}>  <img style={{width:'100%'}} className="big" src={require('../../assets/img/coupon/ys3.png')} /></li>
            <li style={{marginTop:'20px'}}>  <img style={{width:'100%'}} className="big" src={require('../../assets/img/coupon/ys1.png')} /></li>
            <li style={{marginTop:'20px'}}>  <img style={{width:'100%'}} className="big" src={require('../../assets/img/coupon/ys2.png')} /></li>
          </ul>
          <p className="center bot2">
            <Button className="btn2" loading={this.state.loading} type="primary" style={{width: 130, height: 50}}
                        onClick={() => this.getPersonalMoney(this.props.projectDetail.fpeoject_id)} >我要投资
            </Button>
            <a className={`${this.props.projectDetail.isCollected?'like1':'like'}`} onClick={()=>this.projectCollection()}>{this.props.projectDetail.collectionNumber}</a>
            <i className="share">
              <span>32</span>
              <span className="border shadow" style={{display:'none'}}>
                <a className="qq"/>
                <a className="sina"/>
                <a className="weixin"/>
            </span>
            </i>
          </p>
            {/* {this.state.coupons.map((item) => (
              <Coupon />
            ))} */}
          </div>
        </div>
        <Data ref={ref => this.dataModal = ref} arr={this.state.arr} fetchData={this.getData.bind(this)} userCount={this.props.projectDetail.userCount} allMoney={this.props.projectDetail.allMoney} maxPage={this.state.maxPage} pageCurrent={this.state.pageParam.pageCurrent} projectId={this.props.projectDetail.fpeoject_id}/>
        <FormProject
          project={this.props.projectDetail}
          personalMoney={this.state.personalMoney}
          accountId={this.state.accountId}
          canPay={this.state.canPay}
          history={this.props.history}
        />
      </div>
    );
  }
}
