import React from 'react';
import LeftMenu from '../../components/UCenterComponent/leftMenu';

export default class Voucher extends React.Component{
  render(){
      return(
          <div>
              <LeftMenu param={this.props} />

              余风
          </div>
      )
  }
}