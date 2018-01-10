/**
 * Created by Administrator on 2018/1/8 0008.
 */
import React from 'react';
import Login from '../Login/login';
import { Link } from 'dva/router';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="sec0">
        <div className="w">
          <div className="searchbox">
            <p className="tit"><i>查询您所需要的众借项目</i></p>
            <div className="box clearfix">
              <dl className="select">
                <dt>信用等级</dt>
                <dd>
                  <i data-value="">不限</i>
                  <i>A+</i>
                  <i>A</i>
                  <i>B+</i>
                  <i>B</i>
                  <i>C+</i>
                  <i>C</i>
                  <i>D</i>
                </dd>
              </dl>
              <dl className="select">
                <dt>年化利率</dt>
                <dd>
                  <i data-value="">不限</i>
                  <i>8%</i>
                  <i>9%</i>
                  <i>10%</i>
                  <i>11%</i>
                  <i>12%</i>
                  <i>13%</i>
                  <i>15%</i>
                </dd>
              </dl>
              <dl className="select">
                <dt>借款周期</dt>
                <dd>
                  <i data-value="">不限</i>
                  <i>3个月</i>
                  <i>4个月</i>
                  <i>5个月</i>
                  <i>6个月</i>
                  <i>7个月</i>
                  <i>8个月</i>
                  <i>9个月</i>
                  <i>10个月</i>
                  <i>11个月</i>
                  <i>12个月</i>
                </dd>
              </dl>
              <a className="fr q"></a>
              <input type="text" className="key put1 fr" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
