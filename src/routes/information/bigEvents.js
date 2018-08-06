import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/contactUs/big_events.scss'
export default class BigEvents extends React.Component {
  componentDidMount(){

  }
  render() {
    return (
      <div className="fr bigEvents">
        <h2><span>大事记</span></h2>
        <div className="wrap">
          <ul className="year_box">
            <li className="year_item">2018<e></e>
              <p>2018.09 <e></e> <span>大事记大事记大事记</span></p>
              <p>2018.08 <e></e><span>大事记大事记大事记</span></p>
            </li>
            <li className="year_item">2017 <e></e>
              <p>2017.09 <e></e><span>大事记大事记大事记</span></p>
              <p>2017.08 <e></e><span>大事记大事记大事记</span></p>
            </li>
            <li className="line"><e></e></li>
          </ul>
        </div>
      </div>
    );
  }
}
