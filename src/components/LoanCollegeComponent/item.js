import React from 'react';

export default class Items extends React.Component {
  render(){
    return (
      <div>
        <div className="items">
          <img className="pic" src={require('../../assets/img/home/img-programe_05.png')} />
          <p className="t1">视频名称</p>
        </div>
        <div className="items">
          <img className="pic" src={require('../../assets/img/home/img-programe_05.png')} />
          <p className="t1">视频名称</p>
        </div>
        <div className="items">
          <img className="pic" src={require('../../assets/img/home/img-programe_05.png')} />
          <p className="t1">视频名称</p>
        </div>
        <div className="items">
          <img className="pic" src={require('../../assets/img/home/img-programe_05.png')} />
          <p className="t1">视频名称</p>
        </div>
      </div>

     )
  }
}
