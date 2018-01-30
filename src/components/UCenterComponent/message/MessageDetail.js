import React from 'react';
import { Switch, Route } from 'dva/router';
import '../../../assets/MessageDetail/messageDetail.scss';
import {isOrNot} from '../../../services/api.js';
import {STATION_MESSAGE} from '../../../common/pagePath';
import {message} from "antd/lib/index";
import moment from 'moment';


export default class MessageDetail extends React.Component {
 constructor(props){
   super(props);
   this.state = {
     messageData:{},
   }
 }

  componentDidMount() {
    console.log(this.props.match);
    const id = this.props.match.params.msgId;
    this.getDate(id);
  }

async getDate(x){
    const res = await isOrNot(x);
    console.log(res);
    if(res.code === 0){
      this.setState({
      messageData: res.data
      })
    }else{
      message.error(res.msg);
    }
}
  render() {
    return (
      <div className="fr uc-rbody" >
        <a onClick = {()=>this.props.history.push(STATION_MESSAGE)} className="back" style={{color:"#ff9900",fontWeight:"bold"}}> &lt; 返回列表</a><hr/>
        <div className="message">
           <h2>{this.state.messageData.title}</h2>
           <h5>{moment(this.state.messageData.datetime).format('YYYY-MM-DD HH:mm:ss')}</h5>
           <p>{this.state.messageData.article}</p>
        </div>
      </div>
    );
  }
}
