import React from 'react';

export default class Images extends React.Component {
  render() {
    return (
      <div className="imgsdiv clearfix">
        <div className="fl">
          <div className="bigpic" id="bigpic" style={{}}/>
        </div>
        <div className="fr">
          <a className="btn prev">PREV</a>
          <div className="box">
            <a data-big={require('../../assets/img/project-detail/pic5.png')}>
              <img src={require('../../assets/img/project-detail/pic5.png')} />
            </a>
            <a data-big={require('../../assets/img/project-detail/pic6.png')}>
              <img src={require('../../assets/img/project-detail/pic6.png')} />
            </a>
            <a data-big={require('../../assets/img/project-detail/pic7.png')}>
              <img src={require('../../assets/img/project-detail/pic7.png')} />
            </a>
            <a data-big={require('../../assets/img/project-detail/pic5.png')}>
              <img src={require('../../assets/img/project-detail/pic5.png')} />
            </a>
            <a data-big={require('../../assets/img/project-detail/pic6.png')}>
              <img src={require('../../assets/img/project-detail/pic6.png')} />
            </a>
          </div>
          <a className="btn next">NEXT</a>
        </div>
      </div>
    );
  }
}
