import React from 'react';
import '../../assets/publish/_table.scss';
export default class RecordInformation extends React.Component {
	render() {
		return (
      <div className="fr shadow">
        <p className="c6">备案信息披露</p>
        <p className="q">1.备案登记信息<i className="dl"/></p>
        <p className="a">...</p>
        <p className="q">2.电信业务经营许可信息<i className="dl"/></p>
        <p className="a">...</p>
        <p className="q">3.资金存管信息<i className="dl"/></p>
        <p className="a">...</p>
        <p className="q">4.网站备案图标及编号<i className="dl"/></p>
        <p className="a">
          <h2 className="center">网站基本情况</h2>
          <table className="table">
            <tr>
              <th>网站名称</th>
              <td>众借帮保理平台</td>
            </tr>
            <tr>
              <th>网站域名</th>
              <td>****</td>
            </tr>
            <tr>
              <th>开办主体</th>
              <td>企业</td>
            </tr>
            <tr>
              <th>网站类别</th>
              <td>交互式</td>
            </tr>
          </table>
          <br/>
          <h2 className="center">网站所有者基本情况</h2>
          <table className="table">
            <tr>
              <th>开办者名称</th>
              <td>***</td>
            </tr>
            <tr>
              <th>公安备案号</th>
              <td>***</td>
            </tr>
            <tr>
              <th>备案地公安机关</th>
              <td>*****</td>
            </tr>
            <tr>
              <th>公安机关备案时间</th>
              <td>2018-**-**</td>
            </tr>
          </table>
        </p>
        <p className="q">5.风险管理情况<i className="dl"/></p>
        <p className="a">实名认证，风控审核</p>
      </div>
		);
	}
}
