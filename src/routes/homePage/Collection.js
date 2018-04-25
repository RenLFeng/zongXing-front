import React from 'react';
import '../../assets/collection/collection.scss';
import { Table, Icon, Modal, Checkbox } from 'antd';
import { IMG_BASE_URL } from "../../common/systemParam";
import { getCollectionProject } from '../../services/api';
import { connect } from 'dva'; 

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
    // this.sum();
  }

  // 获取收藏列表
  async getCollectionProjectAjax() {
    const response = await getCollectionProject();
    console.log(response);
    if (response.code === 0) {
      if (response.data) {
        this.setState({
          list: response.data
        })
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

  //数量加
  add(data) {
    if (data.num || data.num === 1) {
      data.num++;
    } else {
      data.num = 2;
    }
    data.sum = data.num * 100;
    this.setState({ list: this.state.list }
      , () => {
        this.sum();
      }
    );
  }

  //数量减
  del(data) {
    if (data.num || data.num >= 1) {
      data.num--;
    } else {
      data.num = 0;
      data.checkboxValue = false;
    }
    data.sum = data.num * 100;
    this.setState({
      list: this.state.list,
      // num:this.state.list.length,
    });
    this.sum(data);
  }

  //删除
  dele(id) {
    Modal.confirm({
      title: '提示',
      content: '确定要删除吗?',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => this.del_shopping(id)
    });
  }
  del_shopping(id) {
    let list = this.state.list;
    const arr = list.filter((item) => item.id !== id);
    const arr1 = arr.filter((item) => item.checkboxValue === true);
    console.log(arr);
    this.setState({
      list: arr,
      num: arr1.length,
    }, () => {
      this.sum();
    });
  }


  //全选删除
  delete() {
    let list = this.state.list;
    const arr = list.filter((item) => item.checkboxValue === true);
    console.log(arr);
    if (list.length === arr.length) {
      Modal.confirm({
        title: '提示',
        content: '确定要删除指定项吗?',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk: () => this.del_all()
      });
    } else {
      Modal.warning({
        title: '提示信息',
        content: '请选择要删除的项目',
      });
    }
  }

  del_all() {
    let list = this.state.list;
    const arr = list.filter((item) => item.checkboxValue !== true);
    console.log(arr);
    this.setState({
      list: arr,
      allChecked: false,
      num: arr.length,
    }, () => {
      this.sum();
    });
  }

  //总金额
  sum(data) {
    let list = this.state.list;
    let sum_ = 0;
    let arr = list.filter((item) => (item.checkboxValue) === true);
    for (let i = 0; i < arr.length; i++) {
      sum_ += arr[i].sum ? arr[i].sum : 100;
    }
    this.setState({
      sums: sum_
    });
  }

  onChange(e, data, index) {
    console.log(data);
    let list = this.state.list;
    list[index].checkboxValue = e.target.checked;
    this.setState({
      list: list
    }, () => {
      let arr = this.state.list.filter((item) => item.checkboxValue === true);
      this.setState({
        num: arr.length,
        sums: arr.sum,
      }, () => {
        this.sum(data);
      });
      if (arr.length === list.length) {
        this.setState({
          allChecked: true,
        });
      } else {
        this.setState({
          allChecked: false,
        });
      }
    });

  }

  handleCheckAll(e) {
    let list = this.state.list;
    for (let obj of list) {
      obj.checkboxValue = e.target.checked
    }
    this.setState({
      allChecked: e.target.checked,
      list: list
    }, () => {
      let arr = list.filter((item) => (item.checkboxValue === true));
      this.setState({
        num: arr.length
      }, () => {
        this.sum()
      });
    });
    this.forceUpdate();
  }

  render() {
    const infoColumns = [{
      title: '项目信息',
      dataIndex: 'info',
      key: 'info',
    }, {
      title: '数量',
      dataIndex: 'amount',
      key: 'amount',
    }, {
      title: '金额',
      dataIndex: 'add',
      key: 'add',
    }, {
      title: '操作',
      dataIndex: 'delete',
      key: 'delete',
    }];

    const plainOptions = this.state.list;

    return (
      <div className="wrap">
        <div className="page">
          <div className="title_1">
            <span>全部项目</span>
          </div>

          <div className="project">
            <div className="tab">
              <span className="project_info_">项目信息</span>
              <span className="money_">投资单价</span>
              <span className="amount_">数量</span>
              <span className="add_">投资金额</span>
              <span className="delete_">操作</span>
            </div>

            {
              this.state.list.map((data, index) => {
                return (
                  <div className="project_" key={data.fid}>
                    <div className="project_info">
                      <Checkbox onChange={(val, data) => this.onChange(val, data, index)} checked={data.checkboxValue ? data.checkboxValue : false} style={{ zIndex: 99 }} />
                      <div className="img">
                        <i className="level">{data.level}</i>
                        <img src={`${data.pic_url}`} className="pic" alt="" />
                      </div>
                      <div className="titles_">{data.desc}</div>
                      <div className="info">
                        <p className="t1">
                          <i>年利率<em className="cf60">{data.rate}%</em></i>
                          <i>期限<em className="cf60">{data.day}</em>天</i>
                        </p>
                      </div>
                      <div className="bar"><div style={{ width: `${data.allMoney * 1 / data.credit_money}%` }} /></div>
                    </div>
                    <div className="money">100</div>
                    <div className="add">
                      <Icon type="minus" className="del" onClick={() => this.del(data)} />
                      <span className="number">{data.num ? data.num : 1}</span>
                      <Icon type="plus" className="adds" onClick={() => this.add(data)} />
                    </div>
                    <div className="amount">{data.num * 100 ? data.num * 100 : 100}</div>
                    <div className="delete" onClick={() => this.dele(data.id)} >删除</div>
                  </div>
                )
              }) 
            }

          </div>
        </div>

        <div className="bottom">
          <div className="left">
            <span><Checkbox onChange={(val) => this.handleCheckAll(val)} checked={this.state.allChecked}>全选</Checkbox></span>
            <a onClick={() => this.delete()} >删除</a>
          </div>
          <div className="right">
            <span>已选项目：<i className="num">{this.state.num}</i>个</span>
            <span>合计：<i className="num_">￥{this.state.sums ? this.state.sums : 0}</i></span>
            <span className="add" onClick={() => { }}>投资</span>

          </div>
        </div>

      </div>
    );
  }
}

