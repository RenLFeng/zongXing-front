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
      totalData:{},
      current: 1, //当前页码
      pageSize:5, //每页显示的条数5条
      goValue:'',
      totalPage:''//总页数
    }
  };
  componentWillMount(){

    var _this = this;//如果不定义就会出现作用域的问题this.setState不是一个函数
      _this.setState({totalData:lists});
      _this.setState({totalNum:lists.length});
      //计算总页数= 总记录数 / 每页显示的条数
      let totalPage =Math.ceil( _this.state.totalNum / _this.state.pageSize);
      _this.setState({totalPage:totalPage});
      _this.pageClick(1);
  };
  componentDidMount(){
      console.log(this.state.indexList);
  }
  onChange(pageNumber) {
    this.pageClick(pageNumber);
    console.log(pageNumber);
  };
  //点击翻页
  pageClick(pageNum){
    let _this = this;
    if(pageNum != _this.state.current){
      _this.state.current = pageNum
    }
    _this.state.indexList=[];//清空之前的数据
    for(var i=(pageNum - 1) * _this.state.pageSize;i<_this.state.pageSize * pageNum;i++){
      _this.state.indexList.push(lists[i]);
      console.log(i);
    }
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
                <li key={id}>{data.title}<i>{data.time}</i></li>
                )
              })
            }
          </ul>
        </div>
        <Pagination showQuickJumper defaultCurrent={1} total={50} onChange={this.onChange}/>,
      </div>
    );
  }
}
