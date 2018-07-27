import React from 'react';
import LeftMenu from './leftMenu';
//import '../../assets/infor/information/busin.scss'
export default class BusinessInformation extends React.Component {
  render() {
    return (
      <div className="fr busin">
        <h2><span>组织信息</span><i>></i><span>工商信息</span></h2>
          <div className="warp">
            <table>
              <tr><td>公司全称</td><td colspan="4">深圳众鑫互联网金融服务有限公司</td></tr>
              <tr><td>公司全称</td><td>深圳众鑫</td><td>深圳众鑫</td><td>深圳众鑫</td></tr>
              <tr><td>公司全称</td><td>深圳众鑫</td><td>深圳众鑫</td><td>深圳众鑫</td></tr>
            </table>
          </div>
      </div>

    );
  }
}
