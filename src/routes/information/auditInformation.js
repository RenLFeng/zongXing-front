import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/information/auditInfo.scss'
export default class AuditInformation extends React.Component{
  render(){
    return(
          <div className="fr auditInfo">
            <h2><span>审计信息</span><i></i><span className="last"></span></h2>
            <div className="container">
              <div className="btn-box">
                <button className="act">审计业务约定书</button>
                <button className="">年度财务审计报告</button>
                <button className="">专项审计报告</button>
              </div>
            </div>
      </div>
    )
  }
}
