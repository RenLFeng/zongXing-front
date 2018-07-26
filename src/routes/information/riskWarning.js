import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/common/textInfo.scss'
export default class RiskWarning extends React.Component{
  render(){
    return(
          <div className="fr riskW">
            <h2><span>风险提醒告知书</span><i></i><span className="last"></span></h2>
            <div className="container" style={{height:'1000px'}}>
              <div className="content-box">
                <div className="content">
                  <p className="tit">风险提醒告知书</p>
                  <p className="textInfo">

                  </p>
                </div>
                <div className="right-info">
                  <p className="ltd">深圳众鑫互联网金融服务有限公司</p>
                  <p className="name">法定代表人：</p>
                  <p className="day">2108年5月1日</p>
                </div>
              </div>
            </div>
      </div>
    )
  }
}
