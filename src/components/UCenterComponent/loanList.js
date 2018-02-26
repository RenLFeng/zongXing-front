import React from 'react';
import {Icon, message, Table, Badge} from 'antd';

import '../../assets/MessageList/messageList.scss';
import {messageList} from '../../services/api.js';
import moment from 'moment';
import Path from '../../common/pagePath';
import {pageShows} from '../../common/systemParam';
import { getPersonalProjectList } from '../../services/api';

export default class LoanList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      current: 1,
      total: 0,
      pageSize: 20,
      dataSource: []
    };
    const statusMap = ['default', 'processing', 'processing', 'processing', 'processing', 'success', 'success', 'success', 'error', 'error'];
    const status = ['待提交', '待大数据风控', '待背调', '待委员会审核', '待运营人员发布', '筹款中', '待放款', '还款中', '完成', '流标', '风控打回'];
    this.colums = [
      {
        title: '项目编号',
        dataIndex: 'fProjectNo',
        key: 'fProjectNo'
      },
      {
        title: '项目名称',
        dataIndex: 'fName',
        key: 'fName'
      },
      {
        title: '借款金额',
        dataIndex: 'fCreditMoney',
        key: 'fCreditMoney',
        align: 'right',
        sorter: (a,b)=>a.fCreditMoney-b.fCreditMoney,
        render: val => `${(val+'').fm()} 元`,
      },
      {
        title: '借款期数',
        dataIndex: 'fCreditMonth',
        key: 'fCreditMonth',
        align: 'right',
        sorter: (a,b)=>a.fCreditMonth-b.fCreditMonth,
        render: val => `${val} 月`,
      },
      {
        title: '创建时间',
        dataIndex: 'fCreateTime',
        key: 'fCreateTime',
        sorter: (a,b)=>a.fCreateTime-b.fCreateTime,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '状态',
        dataIndex: 'fFlag',
        key: 'fFlag',
        render:val => {
          let map = statusMap[val];
          let flag = status[val];
          if (val<0) {
            if (val===-1) {
              map = statusMap[9];
              flag = status[9];
            } else if (val===-2) {
              map = statusMap[10];
              flag = status[10];
            }
          }
          return(
            <Badge status={map} text={flag} />
          )
        },
      },
      {
        title: '操作',
        render: (val) => (
          <div>
            { val.fFlag<1|| val.fFlag>4 ?
              <a onClick={() => {
                if (val.fFlag===0 || val.fFlag === -2) {
                  this.props.history.push(`/index/applyLoan`)
                } else if (val.fFlage>=5 && val.fFlag<=8) {
                  this.props.history.push(Path.PROJECT_DETAIL+`/${val.fid}`);
                }
                this.props.history.push()
              }} style={{color: 'blue'}}>查看</a> : null
            }
          </div>
        ),
      },
    ];
  }

  componentDidMount() {
    this.fetchData(1);
  }

  async fetchData(page) {
    this.setState({
      loading: true,
      current: page
    });
    try {
      const response = await getPersonalProjectList({pageCurrent:page,pageSize: this.state.pageSize});
      this.setState({loading: false});
      if (response.code === 0) {
        this.setState({
          total: response.data.count,
          dataSource: response.data.list
        });
      } else {
        this.setState({dataSource: []});
        message.error(response.msg);
      }
    } catch(e) {
      this.setState({
        loading: false,
        dataSource: []
      });
      if (typeof e === 'object' && e.name === 288) {
        throw e;
      }
      console.log(e);
    }
  }

  render() {
    return (
      <div className="fr uc-rbody">
        <Table
          rowKey={record=>record.fid}
          columns={this.colums}
          dataSource={this.state.dataSource}
          pagination={{
            current: this.state.current,
            pageSize: this.state.pageSize,
            total: this.state.total,
            onChange: (page)=>this.fetchData(page)
          }}
          locale={{
            filterConfirm: '确定',
            filterReset: '重置',
            emptyText: '暂无数据'
          }}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
