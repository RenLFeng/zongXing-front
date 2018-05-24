import React from 'react';
import '../../assets/collection/collection.scss';
import { Table, Icon, Modal, Checkbox, Progress, Card, Row, Col, Button, Input, message } from 'antd';
import { IMG_BASE_URL } from "../../common/systemParam";
import { getCollectionProject, setCollectionMoney, delCollectionProject, getPersonalMoney } from '../../services/api';
import { connect } from 'dva'; 
import './collection.scss';

@connect(()=>{

})
export default class Collection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      num: 0,  //项目数量
      sum: 0,  //单个项目的总价
      sums: 0,   //所选项目的总价

      allChecked: false,   //全选框默认状态
      show: false,  //删除按钮的初始状态
    }
  }

  componentDidMount() {
    this.getCollectionProjectAjax();
  }

  // 获取收藏列表
  async getCollectionProjectAjax() {
    const response = await getCollectionProject();
    console.log(response);
    if (response.code === 0) {
      if (response.data) {
        this.setState({
          list: response.data,
        }, ()=> {
          this.setState({
            chooseProjectNum: this.state.list.filter((data)=>data.checkValue===true).length
          })
          this.changeAllMoney();
        });
       
      }
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

  // 修改数量对应单价等 value 是用户输入的值
  changeNum(e, collectionId) {
    this.setState({
      [`${collectionId}num`]: e.target.value.trim()  
    })
    // 满足正整数的校验
    if (/^[+]{0,1}(\d+)$/.test(e.target.value.trim())) {
      let sumMoney = (e.target.value.trim()?e.target.value.trim():0) * 100;
      // 计算总数 * 100
      this.changeAmount(collectionId, sumMoney);
    } else if (e.target.value.trim().length === 0) {
      this.changeAmount(collectionId, 0);
    }
  }

  changeAmount(collectionId, sumMoney) {
    for (let obj of this.state.list) {
      if (obj.collectionId === collectionId) {
        obj.amount =  sumMoney;
        break;
      } 
    }
    this.setState({list: this.state.list},()=>this.changeAllMoney());
    setCollectionMoney({fid: collectionId, famount: sumMoney});
  }

  // 点击按钮修改数量
  changeNumBtn(collectionId, type, amount) {
    console.log(this.state[`${collectionId}num`]);
    // 格式不对
    if (this.state[`${collectionId}num`] != null && this.state[`${collectionId}num`].length > 0 && !/^[+]{0,1}(\d+)$/.test(this.state[`${collectionId}num`])) {
      console.log(123);
      return;
    }
    // true 是加1 false是减1
    if (type) {
      // 如果是第一次 或者为0
      if (!this.state[`${collectionId}num`] || this.state[`${collectionId}num`] == 0) {
        console.log(amount);
        this.setState({[`${collectionId}num`]: Math.floor(amount/100)+1});
        this.changeAmount(collectionId, 100);
      } else {
        this.setState({[`${collectionId}num`]: this.state[`${collectionId}num`]*1+1});
        this.changeAmount(collectionId, this.state[`${collectionId}num`]*100+100);
      }
    } else {
      if (!this.state[`${collectionId}num`] || this.state[`${collectionId}num`] == 0) {
        if (Math.floor(amount/100) == 0) {
          return;
        }
        this.setState({[`${collectionId}num`]: Math.floor(amount/100)-1});
        this.changeAmount(collectionId, amount-100);
      } else {
        this.setState({[`${collectionId}num`]: this.state[`${collectionId}num`]*1-1});
        this.changeAmount(collectionId, this.state[`${collectionId}num`]*100-100);
      }
    }
    
  }


  // 删除收藏中的一项
  async deleteArr(collectionId) {
    this.setState({loading: true});
    const response = await delCollectionProject(collectionId);
    this.setState({loading: false});
    if (response.code === 0) {
      this.deleteProjectNum(collectionId);
    } else {
      message.error(response.msg);
    }
  }
  // 删除前端对应的收藏项目项
  deleteProjectNum(collectionIds) {
    for (let value of collectionIds.split(',')) {
      for (let i = 0; i < this.state.list.length; i++) {
        if (this.state.list[i].collectionId === value) {
          this.state.list.splice(i, 1);
          break;
        }
      }
    }
    this.setState({
      list:this.state.list
    }, ()=> {
      this.changeAllMoney();
      this.setState({
        chooseProjectNum: this.state.list.filter((data)=>data.checkValue===true).length
      });
    });
  }

  // 删除所有选中的
  async deleteAll() {
    let arr = this.state.list.filter((data)=>{if (data.checkValue === true) return data.collectionId;});
    let collectIds = arr.map((data)=> data.collectionId);
    console.log(collectIds);
    if (collectIds.length === 0) {
      message.warning('您未选择需要删除的项目');
      return;
    }
    this.setState({loading: true});
    const response = await delCollectionProject(collectIds.join());
    this.setState({loading: false});
    if (response.code === 0) {
      this.deleteProjectNum(collectIds.join());
      this.setState({checkAll: false});
    } else {
      message.error(response.msg);
    }
  }

  // 清空失效宝贝
  async deleteEmptyAll() {
    let arr = [];
    for (let obj of this.state.list) {
      if (obj.fflag !== 10) {
        arr.push(obj.collectionId);
      }
    }
    if (arr.length === 0) {
      message.warning('您没有失效的收藏项目');
      return;
    }
    this.setState({loading: true});
    const response = await delCollectionProject(arr.join());
    this.setState({loading: false});
    if (response.code === 0) {
      this.deleteProjectNum(arr.join());
    } else {
      message.error(response.msg);
    }
  }

  // 点击全选按钮事件
  checkAll(e) {
    let status = e.target.checked;
    for (let obj of this.state.list) {
      if (obj.fflag === 10) {
        obj.checkValue = status;
      }
    }
    this.setState({
      checkAll: status,
      list: this.state.list
    }, () => {
      // 计算选中项目数量
      this.setState({
        chooseProjectNum: this.state.list.filter((data)=>data.checkValue===true).length
      });
      this.changeAllMoney();
    });
  }

  // 单个项目点击选中
  changeValue(e, collectionId) {
    let status = e.target.checked;
    if (!status) {
      this.setState({checkAll: false});
    }
    for (let obj of this.state.list) {
      if (obj.collectionId === collectionId) {
        obj.checkValue = status;
        break;
      }
    }
    this.setState({
      list: this.state.list
    },()=>{
      // 计算选中项目数量
      this.setState({
        chooseProjectNum: this.state.list.filter((data)=>data.checkValue===true).length
      });
      this.changeAllMoney();
    })
  }

  // 选中了 修改全部金额
  changeAllMoney() {
    // 生成选中了的数组
    let chooseArr = this.state.list.filter((data)=>data.checkValue===true);
    let sumMoney = 0;
    for (let obj of chooseArr) {
      sumMoney = sumMoney.add(obj.amount);
    }
    this.setState({
      allMoney: sumMoney
    });
  }

  // 投资接口
  investment() {
    let chooseArr = this.state.list.filter((data)=>data.checkValue===true);
    if (chooseArr.length <= 0) {
      message.warning('您未选择投资项目');
      return;
    }
    let objNum = chooseArr.length;
    let num = 0;
    let arr = [];
    for (let obj of chooseArr) {
      // if (obj.amount > obj.fcreditMoney * 0.01) {
      //   message.warning('投资金额不能超过项目所需金额的1%');
      //   return;
      // }
      if (this.state[`${obj.collectionId}num`]) {
        if (!/^[+]{0,1}(\d+)$/.test(this.state[`${obj.collectionId}num`])) {
          message.warning('请输入合法的数量');
          return;
        }
        arr.push(obj);
        continue;
      } else if (this.state[`${obj.collectionId}num`] == 0) {
        message.warning('所选项目数量不能为0');
        return;
      }
      if (obj.amount) {
        arr.push(obj);
        continue;
      } else if (obj.amount == 0) {
        message.warning('所选项目金额不能为0');
        return;
      } else {
        num += 1;
      }
    }
    if (num === objNum) {
      message.warning('您的投资金额为0');
      return;
    }
    this.checkCondition(arr);
  }

  async checkCondition(arr) {
    let ids = [];
    for (let obj of arr) {
      ids.push(obj.fid);
    }
    this.setState({loading: true});
    const response = await getPersonalMoney(ids);
    this.setState({loading: false});
    if (response.code === 0) {
      if (response.data.hasWaitPayInv) {
        Modal.confirm({
          title: '提示',
          content: '您有未处理的订单请先前往处理',
          okText: '前往',
          cancelText: '取消',
          onOk: () => {
            this.props.history.push('/index/uCenter/myInvest');
          }
        });
      } else {
        this.props.history.push({pathname: '/index/collectionOrder', arr});
      }
    } else if (response.code === -2) {
      Modal.confirm({
        title: '提示',
        content: '您的账号未开户，请前往开户',
        okText: '前往',
        cancelText: '取消',
        onOk: () => {
          this.props.history.push(Path.OPEN_ACCOUNT+'/0');
        }
      });
    } else {
      message.error(response.msg);
    }
  }

  render() {
    console.log(this.state.list);
    return (
      <div style={{marginTop: '150px',width: '100%'}}>
        <Card style={{width: '80%',paddingBottom: 30,margin: '0 auto'}} title="收藏项目">
          <Row style={{width: '100%', backgroundColor: '#F0F2F5',height: '40px',}}>
            <Col span={12} style={{textAlign: 'center'}}>
              <b style={{lineHeight:'40px',fontSize: 18}}>项目信息</b>
            </Col>
            <Col span={3} style={{textAlign: 'center'}}>
              <b style={{lineHeight:'40px',fontSize: 18}}>单价</b>
            </Col>
            <Col span={3} style={{textAlign: 'center'}}>
              <b style={{lineHeight:'40px',fontSize: 18}}>数量</b>
            </Col>
            <Col span={3} style={{textAlign: 'center'}}>
              <b style={{lineHeight:'40px',fontSize: 18}}>投资金额</b>
            </Col>
            <Col span={3} style={{textAlign: 'center'}}>
              <b style={{lineHeight:'40px',fontSize: 18}}>操作</b>
            </Col>
          </Row>
          { this.state.list.map((data) => {
            return (
              <Row key={data.collectionId} style={{width: '100%', height: 150,padding: '20px 0', borderBottom: '1px solid #c9c9c9',position: 'relative'}}>
                { data.fflag == 10? null:
                <div style={{width: '100%',height: 150, backgroundColor: 'rgba(240,240,240, 0.4)', position: 'absolute', top: 0, left: 0, zIndex: 2}}></div>
                }
                <Col span={12} style={{textAlign: 'center', height: '100%'}}>
                  <div style={{display: 'flex', width: '100%',height: '100%',paddingLeft: 20,flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                   { data.fflag == 10? 
                    <Checkbox checked={data.checkValue} onChange={(e)=>this.changeValue(e, data.collectionId)} style={{marginRight: 20}}/> :
                    <div style={{backgroundColor: '#DADADA',padding: '0 5px',borderRadius: 5}}>失效</div>}
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
                        <Progress percent={Math.floor((data.borrowedAmount?data.borrowedAmount:0)/data.fcreditMoney*100)} showInfo={false} style={{width: '80%'}}/>
                        <div style={{marginTop: 10}}>
                          <span style={{fontSize: 14, marginRight: 20}}>年化率<span style={{fontSize: 16,padding: '0 6px',color: '#f60'}}>{data.frateLast}%</span></span>
                          <span style={{fontSize: 14, marginRight: 20}}>期限<span style={{fontSize: 16,padding: '0 6px',color: '#f60'}}>{data.deadline>0?data.deadline:0}</span>天</span>
                          <span style={{fontSize: 14}}>剩余可投<span style={{fontSize: 16,padding: '0 6px',color: '#f60'}}>{`${data.fcreditMoney.sub(data.borrowedAmount?data.borrowedAmount:0)}`.fm()}</span>元</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={3} style={{textAlign: 'center'}}>
                  <span style={{lineHeight:'110px',fontSize: 18}}>100</span>
                </Col>
                <Col span={3} style={{textAlign: 'center', height: '100%'}}>
                  <div style={{display: 'flex', width: '100%',height: '100%',flexDirection: 'row', justifyContent:'center', alignItems:'center'}}>
                    <Button icon="minus" onClick={()=>this.changeNumBtn(data.collectionId, false, data.amount)}/>
                    <Input 
                      style={{width: '70px',textAlign:"center"}}
                      maxLength={'6'} value={this.state[`${data.collectionId}num`]==null?(data.amount/100).toString():this.state[`${data.collectionId}num`]}
                      onChange={(e)=>this.changeNum(e, data.collectionId)}
                    />
                    <Button icon="plus" onClick={()=>this.changeNumBtn(data.collectionId, true, data.amount)}/>
                  </div>  
                </Col>
                <Col span={3} style={{textAlign: 'center'}}>
                  <span style={{lineHeight:'110px',fontSize: 18}}>{data.amount}</span>
                </Col>
                <Col span={3} style={{textAlign: 'center',zIndex: 4}}>
                  <a style={{lineHeight:'110px',fontSize: 16,color: 'blue'}} onClick={()=>this.deleteArr(data.collectionId)}>删除</a>
                </Col>
              </Row>)
          })}
        </Card>
        <div style={{backgroundColor: '#CBCECE',width: '80%',margin: '30px auto',padding:'10px 1px'}}>
          <Row type="flex" justify="space-between" style={{padding: '0 10px'}}>
            <Col span={12}>
              <Checkbox checked={this.state.checkAll} onChange={(e)=>this.checkAll(e)}/> <span style={{padding: '0 6px'}}>全选</span>
              <span style={{padding: '0 6px', color: 'blue', cursor: 'pointer'}} onClick={()=>this.deleteAll()}>删除</span>
              <span style={{padding: '0 6px', color: 'blue', cursor: 'pointer'}} onClick={()=>this.deleteEmptyAll()}>清空失效宝贝</span>
            </Col>
            <Col span={12} style={{display: 'flex', justifyContent: 'flex-end',position: 'relative',paddingRight: '150px'}}>
              <span style={{padding: '0 6px',fontSize: 16,verticalAlign: 'bottom'}}>
              已选<span style={{padding: '0 6px',color: '#f60',fontSize: 18,verticalAlign: 'middle'}}>{this.state.chooseProjectNum?this.state.chooseProjectNum:0}</span>件商品</span>
              <span style={{padding: '0 6px',fontSize: 16,verticalAlign: 'bottom'}}>
              合计:<span style={{padding: '0 6px',color: '#f60',fontSize: 18,verticalAlign: 'middle'}}>{`${this.state.allMoney?this.state.allMoney:0}`.fm()}</span>元</span>
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

