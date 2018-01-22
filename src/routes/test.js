import React from 'react';
export default class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }
  a(){
    this.setState({
      text:'合规运营'
    });
  }
  b(){
    this.setState({
      text:'资金安全'
    })
  }
  c(){
    this.setState({
      text:'风险控制'
    })
  }
  d(){
    this.setState({
      text:'信息安全'
    })
  }
  render(){
    return(
      <div>
        <div className="nav_">
          <a onClick={() => this.a()}>合规运营</a>
          <a onClick={() => this.b()}>资金安全</a>
          <a onClick={() => this.c()}>风险控制</a>
          <a onClick={() => this.d()}>信息安全</a>
        </div>
        {this.state.text}
      </div>
    )
  }
}
