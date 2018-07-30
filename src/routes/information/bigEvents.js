import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/contactUs/big_events.scss'
export default class BigEvents extends React.Component {
  render() {
    return (
      <div className="fr bigEvents">
        <h2><span>大事记</span></h2>
        <div className="wrap">
          <ul className="y_line clearfix">
            <li className="act"><span>2018</span><span></span></li>
            <li><span>2017</span><span></span></li>
            <li><span>2016</span><span></span></li>
            <li><span>2015</span><span></span></li>
            <li><span>2014</span><span></span></li>
          </ul>
          <ul className="events-box">
            <li className="event clearfix">
              <a className="pic"><img src={require('../../assets/img/infor/big_event1.jpg')} alt=""/></a>
              <a className="info">
                <p className="tit">标题标题标题标题标题标题标题标题标题标题标题标<i className="time">2018-04-18</i></p>
                <p className="cont">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容<i>(全文)</i></p>
              </a>
            </li>
            <li className="event clearfix">
              <a className="pic"><img src={require('../../assets/img/infor/big_event1.jpg')} alt=""/></a>
              <a className="info">
                <p className="tit">标题标题标题标题标题标题标题标题标题标题标题标<i className="time">2018-04-18</i></p>
                <p className="cont">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容<i>(全文)</i></p>
              </a>
            </li>
            <li className="event clearfix">
              <a className="pic"><img src={require('../../assets/img/infor/big_event1.jpg')} alt=""/></a>
              <a className="info">
                <p className="tit">标题标题标题标题标题标题标题标题标题标题标题标<i className="time">2018-04-18</i></p>
                <p className="cont">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容<i>(全文)</i></p>
              </a>
            </li>
            <li className="event clearfix">
              <a className="pic"><img src={require('../../assets/img/infor/big_event1.jpg')} alt=""/></a>
              <a className="info">
                <p className="tit">标题标题标题标题标题标题标题标题标题标题标题标<i className="time">2018-04-18</i></p>
                <p className="cont">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容<i>(全文)</i></p>
              </a>
            </li>
            <li className="event clearfix">
              <a className="pic"><img src={require('../../assets/img/infor/big_event1.jpg')} alt=""/></a>
              <a className="info">
                <p className="tit">标题标题标题标题标题标题标题标题标题标题标题标<i className="time">2018-04-18</i></p>
                <p className="cont">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容<i>(全文)</i></p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
