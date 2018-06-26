
import React from 'react';
import './index.scss';

export default class Sideslip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      leave: false
    }
  }

  componentDidMount() {
    setTimeout(()=>{
      this.showModal();
    },2000);
  }

  hideModal() {
    this.setState({leave: true}, ()=> {
      setTimeout(()=>{
        this.setState({
          show: false,
          leave: false
        })
      },250);
    })
  }

  showModal() {
    this.setState({
      show: true,
      leave: false
    });
  }

  render() {
    return (
      <div className={`${this.state.show?'ss_modal':''} ${this.state.leave?'ss_modal_hide':''}`} style={this.state.show?null:{display:'none'}} onClick={()=>this.hideModal()}>
        <div className={`${!this.state.show? '':this.props.className || 'ss_modal_content'} ${this.state.leave?'ss_modal_content_hide':''}`}>
          {this.props.children}
        </div>
      </div>
    )
  }
}