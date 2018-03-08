import React from 'react';
import moment from 'moment';
import {IMG_BASE_URL} from '../../common/systemParam';

export default class Images extends React.Component {
  render() {
    const {pics} = this.props;
    return (
      <div className="imgsdiv clearfix">
        <div className="fl">
          <div className="bigpic" style={{backgroundImage:`url(${IMG_BASE_URL}${pics[0].realUrl})`}}/>
        </div>
        <div className="fr">
          <a className="btn prev">PREV</a>
          <div className="box">
            {pics.map((data, index)=>{
              return (
                <a key={index} data-big={`${IMG_BASE_URL}/${data.realUrl}`}>
                  <img src={`${IMG_BASE_URL}/${data.realUrl}`} />
                </a>
              );
            })}
          </div>
          <a className="btn next">NEXT</a>
        </div>
      </div>
    );
  }
}
