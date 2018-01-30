import React from 'react';
import moment from 'moment';
import {IMG_BASE_URL} from '../../common/systemParam';

export default class Images extends React.Component {
  render() {
    const {project} = this.props;
    const dateCode = moment(project.fcreate_time).format('YYYY') + moment(project.fcreate_time).format('MM');
    return (
      <div className="imgsdiv clearfix">
        <div className="fl">
          <div className="bigpic" style={{backgroundImage:`url(${project.fpicture_json ? project.fpicture_json.split(',')[0]: '1'})`}}/>
        </div>
        <div className="fr">
          <a className="btn prev">PREV</a>
          <div className="box">
            {project.fpicture_json ? project.fpicture_json.split(',').map((data, index)=>{
              return (
                <a key={index} data-big={`${IMG_BASE_URL}project/${dateCode}/${project.fproject_no}/${data}`}>
                  <img src={`${IMG_BASE_URL}project/${dateCode}/${project.fproject_no}/${data}`} />
                </a>
              );
            }): null}
          </div>
          <a className="btn next">NEXT</a>
        </div>
      </div>
    );
  }
}
