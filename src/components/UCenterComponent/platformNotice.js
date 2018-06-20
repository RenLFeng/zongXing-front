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
          detail:'', 
          showMask:false,
      }
    }
    componentDidMount(){
        this.getSiteNotice(this.state.pageSize,this.state.pageCurrent);
    }

    async getSiteNotice(current,size){
        const response = await getSiteNotice(size,current);
        if(response.code === 0){
            this.setState({
                dataInfo:response.data.notices,
                total:response.data.itemCount
            })
        } else{
            response.msg && message.error( response.msg)
        }
    }

      //获取单个公告
  async getOPlantNotices(id) {
    this.setState({showMask:true});
    const response = await getOPlantNotice(id);
    if(response.code ===0){
       this.setState({
         detail:response.data,
       })
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
      const {detail} = this.state
      return(
          
          <div>
              <LeftMenu param={this.props} />
              <div className="fr uc-rbody"  >
                <div style={{fontSize:18,borderBottom:'1px dashed #f0f0f0',marginBottom:40,paddingBottom:7}}>平台通知</div>       
                  {
                      this.state.dataInfo.map((item,index) => {
                         return  <Platform key={index} data={item} getOPlantNotice={()=>this.getOPlantNotices(item.fid)}/>
                      })
                  }
                  {
                       Math.ceil(this.state.total/this.state.pageSize) > 1 ?  
                       <Pagination 
                        total={this.state.total} 
                        current={this.state.pageCurrent}
                        pageSize={this.state.pageSize}
                        onChange={this.onchange}
                        onShowSizeChange={this.onShowSizeChange}
                        style={{marginTop:30,textAlign:'center'}}
                        /> : null
                  }
                
              </div>

              {
                this.state.showMask?
                <div className="mask" onClick={()=>{this.setState({showMask:false})}}>
                    <div className="mask_content">
                    <div className="mask_title">
                        <p className="p1">{detail.ftitle}<p className="p2">{moment(detail.fpublishTime).format('YYYY-MM-DD HH:mm:ss')}</p></p >
                    </div>
                    <div className="mask_word">
                        <p className="mask_word1">尊敬的众借帮客户，您好！</p>
                        <p className="mask_word2">{detail.article ? detail.article.fcontent : null }</p>
                    </div>
                    <div className="logo">
                        <div className="logo_img"><img src={require('../../assets/img/logo2.png')} alt=""/></div>
                        <div className="time">{moment(detail.fpublishTime).format('YYYY-MM-DD')}</div>
                    </div>
                    </div>
                </div> : null
                }
          </div>
      )
  }
}