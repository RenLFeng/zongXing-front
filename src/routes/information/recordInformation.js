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
        <div className="a">
          <h4 className="center">网站基本情况</h4>
             <table className="table">
               <tbody>
               <tr>
                 <td className="title">网站名称</td>
                 <td className="title-content">众借帮保理平台</td>
               </tr>
               <tr>
                 <td className="title">网站域名</td>
                 <td className="title-content">****</td>
               </tr>
               <tr>
                 <td className="title">开办主体</td>
                 <td className="title-content">企业</td>
               </tr>
               <tr>
                 <td className="title">网站类别</td>
                 <td className="title-content">交互式</td>
               </tr>
               </tbody>
             </table>
          <br/>
          <h4 className="center">网站所有者基本情况</h4>
          <table className="table">
            <tr>
              <td className="title">开办者名称</td>
              <td className="title-content">***</td>
            </tr>
            <tr>
              <td className="title">公安备案号</td>
              <td className="title-content">****</td>
            </tr>
            <tr>
              <td className="title">备案地公安机关</td>
              <td className="title-content">****</td>
            </tr>
            <tr>
              <td className="title">公安机关备案时间</td>
              <td className="title-content">2018-3-22</td>
            </tr>
          </table>
        </div>
        <p className="q">5.风险管理情况<i className="dl"/></p>
        <p className="a">实名认证，风控审核</p>
      </div>
		);
	}
}
