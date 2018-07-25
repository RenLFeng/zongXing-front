import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {getPersonalMoney, alreadyInvested, setProjectCollection} from '../../services/api';
import {message, Button, Modal} from 'antd';
import Path from '../../common/pagePath';
import DataModal from './data';

export default class Ctext extends React.Component {
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
      loading: false,
      canPay: false
    };
    this.rate = 1;
    this.countDown = null;
  }

  componentDidMount() {
  }

  componentWillReceiveProps(props) {
    if (this.props.projectDetail !== props.projectDetail) {
      if (!this.countDown && this.props.projectDetail.fcollet_over_time) {
        this.countDown = setInterval(()=>this.countDownTime(), 1000);
      }
    }
  }

  componentWillUnmount() {
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
        this.props.dispatch({
          type: 'account/saveBalance',
          payload:  response.data.accountInfo.fcapital+'',
        })
        $('.pd-form').before('<div class="_masker"></div>');
        $('.pd-form').removeClass('none').css('top', av.top() + 50 + 'px');
      } else if (response.code === -2) {

        this.props.history.push(Path.PERSONAL_ACCOUNT);
      } else {
        message.error(response.msg);
      }
    } catch(e) {
      this.setState({loading: false});
      if (typeof e === 'object' && e.name === 288) {
        this.props.history.push('/index/login');
        throw e;
      }
    }
  }

  
  getData() {
    this.props.dispatch({
      type: 'account/updateCount',
    })
    $('.pd-data').before('<div class="_masker"></div>');
    $('.pd-data').removeClass('none').css('top', av.top() + 50 + 'px');
  }

// 收藏项目
async projectCollection() {
  if (this.props.projectDetail.isCollected) {
    return;
  }
  const response = await setProjectCollection({fprojectId: this.props.projectDetail.fpeoject_id,famount: 0});
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
      <div className="box1 shadow" >
        
        <div className="data clearfix">
          <div className="circle" data-value={rate}/>
          <i className="ctext">已筹款比例</i>

          <div className="fr tz">
            <p className="t1">已投资人数</p>

            <p className="t2" style={{cursor: 'pointer'}} onClick={()=>{if (!userCount) {return} this.getData();}}>{userCount}<em>人</em></p>
          </div>
            <div className="fr">
              <p className="t1">已经筹款</p>
              <p className="t2">{allMoney}<em>元</em></p>
            </div>
              <div className="bot">
                {/* <a onClick={() => {
                  if (this.props.projectDetail.fflag != 10) {
                    return;
                  }
                  this.getPersonalMoney(this.props.projectDetail.fpeoject_id);
                }}
                 style={{backgroundColor: `${this.props.projectDetail.fflag != 10?'#ccc': '#f90'}`, width: '127',lineHeight: '40px',textAlign: 'center',color: '#fff',fontSize: '18',borderRadius:'3px'}}><i>我要投资</i></a> */}
              </div>
        </div>
        {/* <DataModal ref={ref=>this.dataModal = ref} arr={this.state.arr} fetchData={this.getData.bind(this)} userCount={this.props.projectDetail.userCount} allMoney={this.props.projectDetail.allMoney} maxPage={this.state.maxPage} pageCurrent={this.state.pageParam.pageCurrent} /> */}
      </div>
  );
}
}
