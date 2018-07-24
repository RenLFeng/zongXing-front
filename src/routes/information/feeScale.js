import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/common/textInfo.scss'
import '../../assets/infor/common/feeScale.scss'
export default class feeScale extends React.Component {
  render() {
    return(
      <div className="infor">
        <div  className="w clearfix ">
          {/* <LeftMenu param={this.props}/> */}
          <div className="fr feeScale">
            <h2><span>收费标准</span><i></i><span className="last"></span></h2>
            <div className="container">
              <div className="content-box">
                <div className="content">
                  <p className="tit">收费标准</p>
                  <ul className="top1">
                    <li className="head"><span>业务类型</span><span>资费标准</span></li>
                    <li><span>用户注册</span><span>免费</span></li>
                  </ul>
                  <ul className="top2">

                  </ul>
                  <ul className="top3">

                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
