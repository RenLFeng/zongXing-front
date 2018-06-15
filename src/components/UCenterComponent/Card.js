import React from 'react';
import { Link } from 'dva/router';
import { Icon, Input, Button, message, Spin } from 'antd';
import { verifyIdcard } from '../../services/api';
import Path from '../../common/pagePath';
import '../../assets/ucenter/recharge.scss';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  render() {
    return (
     <div className={`card_bank_component ${this.props.className||''}`} style={this.props.style}>

     </div>
    );
  }
}
