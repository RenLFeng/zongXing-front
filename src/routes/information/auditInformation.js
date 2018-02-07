import React from 'react';
export default class AuditInformation extends React.Component {
  render() {
    return (
      <div className="fr shadow">
        <p className="c6">审核信息披露</p>
        <p className="q">1.上一年度的财务审计报告<i className="dl"/></p>
        <p className="a">...</p>
        <p className="q">2.经营合规重点环节的审计报告<i className="dl"/></p>
        <p className="a">...</p>
        <p className="q">3.上一年度的合规性审查报告<i className="dl"/></p>
        <p className="a">...</p>
        <p className="q">4.专项IT审计报告<i className="dl"/></p>
      </div>
    );
  }
}
