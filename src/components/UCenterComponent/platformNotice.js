import React from 'react';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import {Steps,Pagination} from 'antd';
import Platform from '../common/platform';
import { getSiteNotice,getOPlantNotice } from '../../services/api';
import moment from 'moment';


const Step = Steps.Step;


export default class Voucher extends React.Component{
    constructor(props){
      super();
      this.state = {
          pageCurrent:1,
          pageSize:6,
          total:0,
          dataInfo:[],
          detail:''
      }
    }
    componentDidMount(){
        this.getSiteNotice();
        // console.log('id为',this.state.data.fid)
    }

    async getSiteNotice(){
        const response = await getSiteNotice(this.state.pageSize,this.state.pageCurrent);
        console.log('公告',response)
        if(response.code === 0){
            this.setState({
                dataInfo:response.data.notices,
                total:response.data.itemCount
            })
        } else{
            response.msg && message.error( response.msg)
        }
    }


   

//翻页触发的事件
onchange = (page) => {
    this.setState({
        pageCurrent: page,
    },()=>{
    this.getSiteNotice(this.state.pageCurrent,this.state.pageSize);
    });
  }

//页码数改变触发的事件
onShowSizeChange = (current, pageSize) => {
    this.setState({
        pageSize: pageSize,
        pageCurrent: current,
    },()=>{
        this.getSiteNotice(this.state.pageCurrent,this.state.pageSize)
    });
  }

  render(){
      return(
          <div>
              <LeftMenu param={this.props} />
              <div className="fr uc-rbody"  >
                <div style={{fontSize:18,borderBottom:'1px dashed #f0f0f0',marginBottom:65,paddingBottom:7}}>平台通知</div>
                
                  {
                      this.state.dataInfo.map((item,index) => {
                          console.log(item)
                         return  <Platform key={index} data={item} />
                      })
                  }
                <Pagination 
                     total={this.state.total} 
                     current={this.state.pageCurrent}
                     pageSize={this.state.pageSize}
                     onChange={this.onchange}
                     onShowSizeChange={this.onShowSizeChange}
                     style={{marginTop:30,textAlign:'center'}}
                     />
              </div>
          </div>
      )
  }
}