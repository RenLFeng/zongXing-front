import React from 'react';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import {Table,Pagination  } from 'antd';
import { getIPRecord } from '../../services/api';




export default class IpRecord extends React.Component{
  constructor(props){
    super();
    this.state = {
        dataSource:[],
        pageCurrent:1,
        pageSize:10,
        pagination:0,
    }
  }
  componentDidMount(){
      this.getIPRecord();
  }
   
  async getIPRecord(){
      let param = {
        pageCurrent:this.state.pageCurrent,
        pageSize:this.state.pageSize
      }
      const response = await getIPRecord(param);
      console.log('444',response)
      if(response.code === 0){
         this.setState({
            dataSource:response.data.infoList,
            pagination:response.data.totalNumber
         })
      }
  }

//翻页触发的事件
onchange = (page) => {
    this.setState({
        pageCurrent: page,
    },()=>{
    this.getIPRecord({pageCurrent:this.state.pageCurrent,pageSize:this.state.pageSize});
    });
  }

//页码数改变触发的事件
onShowSizeChange = (current, pageSize) => {
    this.setState({
        pageSize: pageSize,
        pageCurrent: current,
    },()=>{
        this.getIPRecord({pageCurrent:this.state.pageCurrent,pageSize:this.state.pageSize})
    });
  }
    
    render(){
        const columns = [{
            title: '序号',
            dataIndex: 'fsort',
            key: 'name',
          }, {
            title: 'IP地址',
            dataIndex: 'flogin_ip',
            key: 'age',
          }, {
            title: '登录时间',
            dataIndex: 'flogin_time',
            key: 'flogin_time',
          }, {
            title: '登录结果',
            dataIndex: 'flogin_result',
            key: 'address',
          }, {
            title: '登录城市',
            dataIndex: 'flogin_city',
            key: 'flogin_city',
          }];
        return(
            <div>
                <LeftMenu param={this.props} />
                <div className="fr uc-rbody">
                    <div>IP记录</div>
                    <Table 
                     
                    dataSource={this.state.dataSource}
                    columns={columns}
                    pagination={false}
                    />
                    <Pagination 
                     total={this.state.pagination} 
                     current={this.state.pageCurrent}
                     pageSize={this.state.pageSize}
                    //  showSizeChanger
                    //  showQuickJumper
                    //  showTotal={(total)=>(<span>共{total}条</span>)}
                     onChange={this.onchange}
                     onShowSizeChange={this.onShowSizeChange}
                     style={{float:'right',marginTop:30}}
                     />
                </div>
            </div>
        )
    }
}