import React from 'react';
import '../../assets/collection/collection.scss';
import { Table, Icon, Modal, Checkbox, Progress, Card, Row, Col, Button, Input, message, Alert } from 'antd';
import { IMG_BASE_URL, COL_URL , NOTIFY_PAGE} from "../../common/systemParam";
import { getCollectionProject, setCollectionMoney, delCollectionProject, Investment } from '../../services/api';
import { connect } from 'dva'; 
import Path from '../../common/pagePath';
import './collection.scss';

export default class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      num: 0,  //项目数量
      sum: 0,  //单个项目的总价
      sums: 0,   //所选项目的总价
      data: {},
      allChecked: false,   //全选框默认状态
      show: false,  //删除按钮的初始状态
    }
  }

  componentDidMount() {
    if (!this.props.location.arr) {
      this.props.history.push('/index/collection');
      return;
    }
    let allMoney = 0;
    for (let obj of this.props.location.arr) {
      allMoney = allMoney.add(obj.amount);
    }
    this.setState({
      allMoney,
      list: this.props.location.arr,
      num: this.props.location.arr.length,
    });
  }

  async investment() {
    if (this.state.loading) {
      return;
    }
    let arr = [];
    for (let obj of this.state.list) {
      arr.push({
        projectId: obj.fid,
        amount: obj.amount * 1,
        remark: '',
        notifyPageUrl: `${NOTIFY_PAGE}/index/collection`,
      });
    }
    this.setState({loading: true});
    const response = await Investment(arr);
    this.setState({loading: false});
    if (response.code === 0) {
      this.setState({
        data: response.data,
      }, () => {
        this.formId.submit();
        this.props.history.push('/index/collection');
      });
    } else if (response.code === 0) {
      // 处理未授权二次分配
      this.setState({
        authError: true
      });
    } else {
      message.error(response.msg);
    }
  }

  render() {
    const {data} = this.state;
    return (
      <div style={{marginTop: '150px',width: '100%'}}>
        <form ref={ref => this.formId = ref} id="form1" name="form1" action={data.submitURL} method="post" target="_blank">
            <input id="Action" name="Action" value={data.action?data.action: ''} type="hidden" />
            <input id="ArrivalTime" name="ArrivalTime" value={data.arrivalTime?data.arrivalTime: ''} type="hidden" />
            <input id="LoanJsonList" name="LoanJsonList" value={data.loanJsonList} type="hidden" />
            <input id="NeedAudit" name="NeedAudit" value={data.needAudit} type="hidden" />
            <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={data.platformMoneymoremore} type="hidden" />
            <input id="RandomTimeStamp" name="RandomTimeStamp" value={data.randomTimeStamp} type="hidden" />
            <input id="TransferAction" name="TransferAction" value={data.transferAction} type="hidden" />
            <input id="TransferType" name="TransferType" value={data.transferType} type="hidden" />
            <input id="RandomTimeStamp" name="RandomTimeStamp" value={data.randomTimeStamp} type="hidden" />
            <input id="Remark1" name="Remark1" value={data.remark1} type="hidden" />
            <input id="Remark2" name="Remark2" value={data.remark2} type="hidden" />
            <input id="Remark3" name="Remark3" value={data.remark3} type="hidden" />
            <input id="ReturnURL" name="ReturnURL" value={data.returnURL} type="hidden" />
            <input id="NotifyURL" name="NotifyURL" value={data.notifyURL} type="hidden"  />
            <input id="SignInfo" name="SignInfo" value={data.signInfo} type="hidden" />
        </form>
        <Card style={{width: '80%',paddingBottom: 30,margin: '0 auto'}} title="所选项目">
          { this.state.authError?
            <Alert
              message={<span>您尚未授权二次分配,暂无法投资,<Link to={Path.SAFE_CENTER} style={{color: 'blue'}}>请前往</Link>授权</span>}
              type="warning" showIcon/>: null
          }
          <Row style={{width: '100%', backgroundColor: '#F0F2F5',height: '40px',}}>
            <Col span={12} style={{textAlign: 'center'}}>
              <b style={{lineHeight:'40px',fontSize: 18}}>项目信息</b>
            </Col>
            <Col span={4} style={{textAlign: 'center'}}>
              <b style={{lineHeight:'40px',fontSize: 18}}>单价</b>
            </Col>
            <Col span={4} style={{textAlign: 'center'}}>
              <b style={{lineHeight:'40px',fontSize: 18}}>数量</b>
            </Col>
            <Col span={4} style={{textAlign: 'center'}}>
              <b style={{lineHeight:'40px',fontSize: 18}}>投资金额</b>
            </Col>
          </Row>
          { this.state.list.map((data) => {
            return (
              <Row key={data.collectionId} style={{width: '100%', height: 150,padding: '20px 0', borderBottom: '1px solid #c9c9c9',position: 'relative'}}>
                <Col span={12} style={{textAlign: 'center', height: '100%'}}>
                  <div style={{display: 'flex', width: '100%',height: '100%',paddingLeft: 20,flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                    <div style={{marginLeft: 10, width: 100, height: 110,position: 'relative'}}>
                      <img src={`${IMG_BASE_URL}${data.cardPicPath}`} style={{width: '100%', height: '100%'}}/>
                      <div style={{width: 30, height: 30, borderRadius: 50,backgroundColor: 'rgba(0, 0, 0, 0.4)',position: 'absolute', top: '-15px', right: '-15px'}}>
                        <b style={{color: '#FFCC00', fontSize: 18}}>{data.levelName}</b>
                      </div>
                    </div>
                    <div style={{height: '100%',display: 'flex',flexDirection: 'column',marginLeft: 50, justifyContent:'space-between', alignItems: 'flex-start'}}>
                      <span style={{fontSize: 16}}>{data.fname}</span>
                      <div style={{width: 400,display: 'flex',flexDirection: 'column',alignItems:'flex-start'}}>
                        <span style={{fontSize: 14, marginRight: 20}}>￥<span style={{fontSize: 16,padding: '0 6px',color: '#f60'}}>{`${data.fcreditMoney}`.fm()}</span></span>
                        <Progress percent={Math.floor((data.fpracticalLoanMoney?data.fpracticalLoanMoney:0)/data.fcreditMoney*100)} showInfo={false} style={{width: '80%'}}/>
                        <div style={{marginTop: 10}}>
                          <span style={{fontSize: 14, marginRight: 20}}>年化率<span style={{fontSize: 16,padding: '0 6px',color: '#f60'}}>{data.frateLast}%</span></span>
                          <span style={{fontSize: 14, marginRight: 20}}>期限<span style={{fontSize: 16,padding: '0 6px',color: '#f60'}}>{data.deadline}</span>天</span>
                          <span style={{fontSize: 14}}>剩余可投<span style={{fontSize: 16,padding: '0 6px',color: '#f60'}}>{`${data.fcreditMoney.sub(data.fpracticalLoanMoney?data.fpracticalLoanMoney:0)}`.fm()}</span>元</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={4} style={{textAlign: 'center'}}>
                  <span style={{lineHeight:'110px',fontSize: 18}}>100</span>
                </Col>
                <Col span={4} style={{textAlign: 'center', height: '100%'}}>
                  <div style={{display: 'flex', width: '100%',height: '100%',flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                    <Input 
                      style={{width: '70px',textAlign:"center"}}
                      maxLength={'6'} value={data.amount/100}
                      readOnly
                    />
                  </div>  
                </Col>
                <Col span={4} style={{textAlign: 'center'}}>
                  <span style={{lineHeight:'110px',fontSize: 18}}>{data.amount}</span>
                </Col>
              </Row>)
          })}
        </Card>
        <div style={{backgroundColor: '#CBCECE',width: '80%',margin: '30px auto',padding:'10px 1px'}}>
          <Row type="flex" justify="space-between" style={{padding: '0 10px'}}>
            <Col span={12}>
            </Col>
            <Col span={12} style={{display: 'flex', justifyContent: 'flex-end',position: 'relative',paddingRight: '150px'}}>
              <span style={{padding: '0 6px',fontSize: 16,verticalAlign: 'bottom'}}>
              已选<span style={{padding: '0 6px',color: '#f60',fontSize: 18,verticalAlign: 'middle'}}>{this.state.num}</span>件商品</span>
              <span style={{padding: '0 6px',fontSize: 16,verticalAlign: 'bottom'}}>
              合计:<span style={{padding: '0 6px',color: '#f60',fontSize: 18,verticalAlign: 'middle'}}>{`${this.state.allMoney}`.fm()}</span>元</span>
              <div className='collection_btn' onClick={()=>this.investment()}>
                <b style={{fontSize: 20, color: '#fff', }}>投&nbsp;资</b>
              </div>
            </Col>
          </Row>
        </div>

      </div>
    );
  }
}

