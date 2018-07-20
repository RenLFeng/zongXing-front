import React from 'react';
import LeftMenu from './leftMenu';
export default class DegalDeclaration extends React.Component {
  render() {
    return (
      <div className="infor" style={{marginTop:"150px"}}>
        <div  className="w clearfix">
          <LeftMenu param={this.props}/>
          <div className="fr">
            <h2><span>法律法务</span><i>></i><span className="last">法律法规</span></h2>
            <p className="c6">法律法规</p>
            <p className="q">1.法规1<i className="dl"/></p>
            <p className="a">...</p>
            <p className="q">2.法规2<i className="dl"/></p>
            <p className="a">...</p>
            <p className="q">3.法规3<i className="dl"/></p>
            <p className="a">...</p>
            <p className="q">4.法规4<i className="dl"/></p>
            <p className="a">...</p>

          </div>
        </div>
      </div>
    );
  }
}
