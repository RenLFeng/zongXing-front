import React from 'react';

export default class OrganizationInformation extends React.Component {
	render() {
		return (
        <div className="fr shadow">
          <p className="c6">工商信息披露</p>
          <p className="q">1.商户基本信息<i className="dl"/></p>
          <div className="a">
            <table className="table">
              <tr>
                <td  className="title2">公司注册名称</td>
                <td  className="title-content2" colSpan={"3"} ></td>
              </tr>
              <tr>
                <td  className="title2">公司经营名称</td>
                <td  className="title-content2" colSpan={"3"} ></td>
              </tr>
              <tr>
                <td  className="title2">成立时间</td>
                <td  className="title-content2" ></td>
                <td  className="title2">成立时间</td>
                <td  className="title-content2" ></td>
              </tr>
              <tr>
                <td  className="title2">统一社会信用代码（三证合一）</td>
                <td  className="title-content2" colSpan={"3"} ></td>
              </tr>
              <tr>
                <td  className="title2">注册地址</td>
                <td  className="title-content2" ></td>
                <td  className="title2" rowSpan={"2"} >经营地址</td>
                <td  className="title-content2" rowSpan={"2"} ></td>
              </tr>
              <tr>
                <td  className="title2">经营范围</td>
                <td  className="title-content2" ></td>
              </tr>
              <tr>
                <td  className="title2">法人代表</td>
                <td  className="title-content2" ></td>
                <td  className="title2" >实际控制人</td>
                <td  className="title-content2" ></td>
              </tr>
              <tr>
                <td  className="title2">注册资本</td>
                <td  className="title-content2" ></td>
                <td  className="title2" >实缴资本</td>
                <td  className="title-content2" ></td>
              </tr>
              <tr>
                <td  className="title2">经营状态</td>
                <td  className="title-content2" ></td>
                <td  className="title2" >分支结构</td>
                <td  className="title-content2" ></td>
              </tr>
              <tr>
                <td  className="title2">主要出资人及持股比例</td>
                <td  className="title-content2" colSpan={"3"} ></td>
              </tr>
              <tr>
                <td  className="title2">官方网站名称</td>
                <td  className="title-content2" ></td>
                <td  className="title2" >官方地址</td>
                <td  className="title-content2" ></td>
              </tr>
              <tr>
                <td  className="title2">网页版网址</td>
                <td  className="title-content2" ></td>
                <td  className="title2" >微信公众号</td>
                <td  className="title-content2" ></td>
              </tr>
              <tr>
                <td  className="title2">法人签名</td>
                <td  className="title-content2" colSpan={"3"} ></td>
              </tr>
            </table>
          </div>
          <p className="q">2.股东信息<i className="dl"/></p>
          <p className="a">...</p>
          <p className="q">3.组织架构及从业人员概况<i className="dl"/></p>
          <p className="a">...</p>
          <p className="q">4.分支机构：无<i className="dl"/></p>
          <p className="a">...</p>
          <p className="q">5.渠道信息<i className="dl"/></p>
          <div className="a">
            <table className="table">
              <tr>
                <td className="title2">电脑端官方网站</td>
                <td colSpan={"3"} className="title-content2" ></td>
              </tr>
              <tr>
                <td className="title2">移动端官方网站</td>
                <td colSpan={"3"} className="title-content2" ></td>
              </tr>
              <tr>
                <td className="title2">微信服务号</td>
                <td colSpan={"3"} className="title-content2" ></td>
              </tr>
              <tr>
                <td className="title2">微博</td>
                <td colSpan={"3"} className="title-content2" ></td>
              </tr>
              <tr>
                <td className="title2">客服电话</td>
                <td className="title-content2" >***—***（工作时间：周一至周五9:00-21:00）</td>
                <td className="title-content2" >***—***</td>
                <td className="title-content2" >***—***</td>
              </tr>
              <tr>
                <td className="title2">客服QQ</td>
                <td className="title-content2" >*****（工作时间：周一至周五9:00-21:00）</td>
                <td className="title-content2" >*****</td>
                <td className="title-content2" >*****</td>
              </tr>
              <tr>
                <td className="title2">客服邮箱</td>
                <td colSpan={"3"} className="title-content2" >**********</td>
              </tr>
              <tr>
                <td className="title2">办公地址</td>
                <td colSpan={"3"} className="title-content2" >**********</td>
              </tr>

            </table>
          </div>
         </div>
		);
	}
}
