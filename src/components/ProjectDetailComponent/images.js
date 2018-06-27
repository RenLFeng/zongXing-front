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
    const {pics,id} = this.props;
    let $d = $('.imgsdiv'),
        $box = $d.find(`.box${id}`),
        $imgLen=$box.find("a").length,
        $imgIndex=0;
    //$d.find(`.${id}`).on('click', function () {
    //  let $t = $(this);
    //  let height = $box.find('a')[0].offsetHeight;
    //  let tmp = height * ($t.hasClass('prev') ? -1 : 1);
    //  $box[0].scrollTop += tmp;
    //});

    $d.find(`.${id}`).on('click', function () {
      let $t = $(this);
      let width=$box.find("a").eq(0).outerWidth();
      if($t.is(".next")){
        if($imgIndex>=$imgLen-5) return;
        $imgIndex++;
        $box.stop().animate({"left":-(width*$imgIndex)+"px"},500);
      }else{
        if($imgIndex==0) return;
        $imgIndex--;
        $box.stop().animate({"left":-(width*$imgIndex)+"px"},500);
      }
    });
  }

  render() {
    const {pics, id} = this.props;
    return (
      <div className="imgsdiv clearfix g">
        <div className="fl">
          <div className="bigpic" style={{backgroundImage:`url(${IMG_BASE_URL}${this.state.realUrl})`}}/>
        </div>
        <a className={`btn prev ${id}`}>PREV</a>
        <div className="fr">
          <div className={`box box${id}`}>
            {pics.map((data, index) => {
              return (
                <a key={index} data-big={`${IMG_BASE_URL}/${data.realUrl}`} style={{zIndex: 10}}>
                  <img src={`${IMG_BASE_URL}/${data.realUrl}`} onClick={()=>this.setState({realUrl: data.realUrl})}/>
                </a>
              );
            })}
            {pics.map((data, index) => {
              return (
                <a key={index} data-big={`${IMG_BASE_URL}/${data.realUrl}`} style={{zIndex: 10}}>
                  <img src={`${IMG_BASE_URL}/${data.realUrl}`} onClick={()=>this.setState({realUrl: data.realUrl})}/>
                </a>
              );
            })}

          </div>
        </div>
        <a className={`btn next ${id}`}>NEXT</a>
      </div>
    );
  }
}
