import React from 'react';
import moment from 'moment';
import {IMG_BASE_URL} from '../../common/systemParam';

export default class Images extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      realUrl: props.pics[0].realUrl
    };
  }

  componentDidMount() {
    const {id} = this.props;
    let $d = $('.imgsdiv'),
      $box = $d.find(`.box${id}`);
    $d.find(`.${id}`).on('click', function () {
      let $t = $(this);
      let height = $box.find('a')[0].offsetHeight;
      let tmp = height * ($t.hasClass('prev') ? -1 : 1);
      $box[0].scrollTop += tmp;
    });
  }

  render() {
    const {pics, id} = this.props;
    return (
      <div className="imgsdiv clearfix"  style={{position: 'relative',marginTop: 20}}>
        <div className="fl">
          <div className="bigpic" style={{backgroundImage:`url(${IMG_BASE_URL}${this.state.realUrl})`,position: 'absolute', top: 0}}/>
        </div>
        <div className="fr">
          <a className={`btn prev ${id}`} onClick={()=>console.log(1234)}>PREV</a>
          <div className={`box box${id}`}>
            {pics.map((data, index) => {
              return (
                <a key={index} data-big={`${IMG_BASE_URL}/${data.realUrl}`} style={{zIndex: 10}}>
                  <img src={`${IMG_BASE_URL}/${data.realUrl}`} onClick={()=>this.setState({realUrl: data.realUrl})}/>
                </a>
              );
            })}
          </div>
          <a className={`btn next ${id}`}>NEXT</a>
        </div>
      </div>
    );
  }
}
