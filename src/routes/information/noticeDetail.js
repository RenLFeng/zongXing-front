import React from 'react';
import {getOPlantNotice} from "../../services/api";
import {message} from "antd/lib/index";
import '../../assets/MessageList/messageList.scss';
import moment from 'moment';
import {NOTICE_DETAIL} from "../../common/pagePath";
import Path from '../../common/pagePath';


export default class NoticeDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      arr:[],  //单个公告内容
    }
}

  componentDidMount() {
    const id = this.props.match.params.projectId;
    this.getOneNotice(id);
  }

async getOneNotice(id) {
  const response = await getOPlantNotice(id);
  if(response.code ===0){
    this.setState({
      arr:response.data,
    })

  } else {
    message.error(response.msg);
  }
}
  render(){
    const {arr} = this.state;
    return(
      <div className="fr shadow page">
        <div className="wrap_">
          <p className="back" onClick = {()=>this.props.history.push(NOTICE_DETAIL)}>&lt;返回列表</p>
          <div className="title_">
            <h2>{arr.ftitle}</h2>
            <p>{moment(arr.fpublishTime).format('YYYY-MM-DD')}</p>
          </div>
          <div className="contents_">
            <p>亲爱的众借帮用户：</p>
            <p >{arr.article ? arr.article.fcontent : null}</p>
            <div className="time">
              <p>{moment(arr.fpublishTime).format('YYYY年MM月DD日')}</p>
              <p>众借帮</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
