import React from 'react';
import LeftMenu from './leftMenu';
export default class EnterpriseWill extends React.Component {

  render() {
    return (
      <div className="infor">
        <div  className="w clearfix compay">
          {/* <LeftMenu param={this.props}/> */}
          <div className="fr">
            <h2><span>企业文化</span></h2>
            <div className="top1 clearfix">
              <div className="fl left-pic">
                <img src={require('../../assets/img/infor/cont_ent1.png')} alt=""/>
              </div>
              <div className="fr Enter-W">
                <div className="right-tx">
                  <ul>
                    <li className="tit">●使命</li>
                    <li className="t2">助力小微企业成长，促进实体经济发展 </li>
                    <li className="tit">●愿景</li>
                    <li className="t2">通过众杰帮事业的成功，让大家能直接参与中国实体经济，利用现代科技手段，让小微企业可持续发展，实现多方共赢的共享金融平台。</li>
                    <li className="tit">●口号</li>
                    <li className="t2">我帮人人，人人帮我。  </li>
                    <li className="tit">●经营理念</li>
                    <li className="t2">合法合规，合情合理，众杰互帮，利人惠己 </li>
                    <li className="tit">●核心价值观</li>
                    <li className="t2">互惠、互利、互助、互信、互享     </li>
                    <li className="tit">●企业精神</li>
                    <li className="t2">诚信为本，创新为魂;善用科技，追求卓越"  </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
