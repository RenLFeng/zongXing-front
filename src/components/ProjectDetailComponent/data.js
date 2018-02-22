import React from 'react';
import '../../assets/data/data.scss';
import {pageShows} from '../../common/systemParam';
import moment from 'moment';

export default class Data extends React.Component {
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     pageParam:{
  //       pageCurrent: 1, //当前页，初始值为第一页
  //       pageSize: 20,    //每页可显示的消息条数
  //     },
  //     projectId:'',
  //     maxPage: 0,     //最大页
  //   }
  // }
  render() {
    const page_num = pageShows(this.props.pageCurrent, this.props.maxPage);
    return (
      <div className="pd-data shadow none">
        <a className="close"/>
        <p className="tit">投资人统计{this.props.userCount?<i>（<em className="cf60">{this.props.userCount}</em>人）</i>: null}</p>
        <div className="clearfix">
          <div className="fl">
            {/*列表数据*/}
            <div className="list">
              <div className="row hd">
                <i className="col1">投资人</i>
                <i className="col2">投资资金</i>
                <i className="col3">投资时间</i>
              </div>
              {
                this.props.arr.map((data, index)=>{
                  return(
                    <div className="row" key={index}>
                      <i className="col1">{data.userName}</i>
                      <i className="col2">{data.money}</i>
                      <i className="col3">{moment(data.fTime).format("YYYY-MM-DD HH:mm:ss")}</i>
                    </div>
                    )
                })
              }

              <div className="box_1">
                <dxiv className="pagination_">
                  {page_num.lastPage ?
                    <a className="" onClick={() => this.props.fetchData(this.props.pageCurrent - 1)}>&lt;</a> :
                    <a className="" style={{backgroundColor: '#eee'}}>&lt;</a>}
                  {page_num.firstPage ?
                    <a className={`${1 == this.props.pageCurrent ? 'hover_1' : ''}`} onClick={() => this.props.fetchData(1)}>1</a> :
                    null}
                  {page_num.leftEllipsis ?
                    <a>...</a> :
                    null}
                  {page_num.page.map((pageNum) => {
                    return (
                      <a key={pageNum} className={`${pageNum * 1 == this.props.pageCurrent ? 'hover_1' : ''}`}
                         onClick={() => this.props.fetchData(pageNum)}>{pageNum}</a>
                    );
                  })}
                  {page_num.rightEllipsis ?
                    <a>...</a> :
                    null}
                  {page_num.finalPage ?
                    <a
                      className={`${this.props.maxPage == this.props.pageCurrent ? 'hover_1' : ''}`}
                      onClick={() => this.props.fetchData(this.props.maxPage)}
                    >{this.props.maxPage}</a> :
                    null}
                  {page_num.nextPage ?
                    <a
                      className=""
                      onClick={() => this.props.fetchData(this.props.pageCurrent + 1)}
                    >&gt;</a> :
                    <a className="" style={{backgroundColor: '#eee'}}>&gt;</a>}
                </dxiv>
              </div>

            </div>
            <div className="bot">
              <i>累计已投金额</i>
              <i className="cf90">{this.props.allMoney}</i>
            </div>
          </div>
          <div className="fr">
            <p className="pictit">所在城市结构</p>
            <div>
              <img src={require('../../assets/img/project-detail/pic13.jpg')} />
            </div>
            <p className="pictit">男女比例</p>
            <div className="center">
              <img src={require('../../assets/img/project-detail/pic14.jpg')} />
            </div>
            <p className="pictit">年龄结构</p>
            <div>
              <img src={require('../../assets/img/project-detail/pic15.jpg')} />
            </div>
            <p className="pictit">投资额度结构</p>
            <div>
              <img src={require('../../assets/img/project-detail/pic16.jpg')} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
