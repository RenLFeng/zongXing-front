import React from 'react';

export default class OrganizationInformation extends React.Component {
	render() {
		return (
        <div className="fr shadow">
          <p className="c6">工商信息披露</p>
          <p className="q">1.商户基本信息<i className="dl"/></p>
          <p className="a">
            <table className="table">
              <tr>
                <th>公司注册名称</th>
                <td colSpan={"3"}></td>
              </tr>
              <tr>
                <th>公司经营名称</th>
                <td colSpan={"3"}></td>
              </tr>
              <tr>
                <th>成立时间</th>
                <td></td>
                <th>经营期限</th>
                <td></td>
              </tr>
              <tr>
                <th>统一社会信用代码<br/>（三证合一）</th>
                <td  colSpan={"3"}></td>
              </tr>
              <tr>
                <th>注册地址</th>
                <td></td>
                <th>经营地址</th>
                <td></td>
              </tr>
              <tr>
                <th>经营范围</th>
                <td></td>
              </tr>
              <tr>
                <th>法人代表</th>
                <td></td>
                <th>实际控制人</th>
                <td></td>
              </tr>
              <tr>
                <th>注册资本</th>
                <td></td>
                <th>实缴资本</th>
                <td></td>
              </tr>
              <tr>
                <th>经营状态</th>
                <td>在营</td>
                <th>分支机构</th>
                <td>无</td>
              </tr>
              <tr>
                <th>主要出资人及持股比例</th>
                <td colSpan={"3"}></td>
              </tr>
              <tr>
                <th>官方网站名称</th>
                <td></td>
                <th>官方网址</th>
                <td></td>
              </tr>
              <tr>
                <th>网页版网址</th>
                <td></td>
                <th>微信公众号</th>
                <td></td>
              </tr>
              <tr>
                <th>法人签名</th>
                <td colSpan={"3"} rowSpan={"2"}></td>
              </tr>
            </table>
          </p>
          <p className="q">2.股东信息<i className="dl"/></p>
          <p className="a">...</p>
          <p className="q">3.组织架构及从业人员概况<i className="dl"/></p>
          <p className="a">...</p>
          <p className="q">4.分支机构：无<i className="dl"/></p>
          <p className="a">...</p>
          <p className="q">5.渠道信息<i className="dl"/></p>
          <p className="a">
            <table className="table">
              <tr>
                <th>电脑端官方网站</th>
                <td colSpan={"3"}></td>
              </tr>
              <tr>
                <th>移动端官方网站</th>
                <td colSpan={"3"}></td>
              </tr>
              <tr>
                <th>微信服务号</th>
                <td colSpan={"3"}></td>
              </tr>
              <tr>
                <th>微博</th>
                <td colSpan={"3"}></td>
              </tr>
              <tr>
                <th>客服电话</th>
                <td >***—***（工作时间：周一至周五9:00-21:00）</td>
                <td >***—***</td>
                <td >***—***</td>
              </tr>
              <tr>
                <th>客服QQ</th>
                <td>*****（工作时间：周一至周五9:00-21:00）</td>
                <td>*****</td>
                <td>*****</td>
              </tr>
              <tr>
                <th>客服邮箱</th>
                <td colSpan={"3"}>**********</td>
              </tr>
              <tr>
                <th>办公地址</th>
                <td colSpan={"3"}>**********</td>
              </tr>

            </table>
          </p>
         </div>

		);
	}
}
