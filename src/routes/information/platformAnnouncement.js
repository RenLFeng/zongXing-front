import React from 'react';
import { Pagination } from 'antd';
import LeftMenu from './leftMenu';
import '../../assets/infor/contactUs/platform.scss'
const lists=[
  {"title":"1大事记","time":"2018年8月8日"},
  {"title":"2大事记","time":"2018年8月8日"},
  {"title":"3大事记","time":"2018年8月8日"},
  {"title":"4大事记","time":"2018年8月8日"},
  {"title":"5大事记","time":"2018年8月8日"},
  {"title":"6大事记","time":"2018年8月8日"},
  {"title":"7大事记","time":"2018年8月8日"},
  {"title":"8大事记","time":"2018年8月8日"},
  {"title":"9大事记","time":"2018年8月8日"},
  {"title":"10大事记","time":"2018年8月8日"},
  {"title":"11大事记","time":"2018年8月8日"},
  {"title":"12大事记","time":"2018年8月8日"},
  {"title":"13大事记","time":"2018年8月8日"},
  {"title":"14大事记","time":"2018年8月8日"},
  {"title":"15大事记","time":"2018年8月8日"},
  {"title":"16大事记","time":"2018年8月8日"},
  {"title":"17大事记","time":"2018年8月8日"},
  {"title":"18大事记","time":"2018年8月8日"},
  {"title":"19大事记","time":"2018年8月8日"},
  {"title":"20大事记","time":"2018年8月8日"}
]
export default class platformAnnouncement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indexList : [], //获取数据的存放数组
      totalNum:'',//总条数
      current: 1, //当前页码
      pageSize:5, //每页显示的条数5条
      totalPage:''//总页数
    }
  };
  componentWillMount(){
    this.setState({totalData:lists});
    this.setState({totalNum:lists.length});
    let totalPage =Math.ceil( this.state.totalNum / this.state.pageSize);
    this.setState({totalPage:totalPage});
    this.pageClick(1);

  };
  componentDidMount(){

  }
  handlerPageChange = (page) => {
    this.setState({
      current: page
    },()=>{
      this.pageClick(page)
    });
  };
  //点击翻页
  pageClick(pageNum){
    this.state.indexList=[];
    for(var i=(pageNum - 1) * this.state.pageSize;i<this.state.pageSize * pageNum;i++){
      this.state.indexList.push(lists[i]);
    }
    this.setState({indexList:this.state.indexList})
  }
  render() {
    return (
      <div className="fr platform_A">
        <h2><span>平台公告</span></h2>
        <div className="wrap">
          <ul>
            {
              this.state.indexList.map(function(data,id){
                return(
                <li key={id} onClick={()=>{alert(id)}}>{data.title}<i>{data.time}</i></li>
                )
              })
            }
          </ul>
        </div>
        <Pagination  pageSize={this.state.pageSize} current={this.state.current} total={this.state.totalNum} onChange={this.handlerPageChange}/>
      </div>
    );
  }
}
