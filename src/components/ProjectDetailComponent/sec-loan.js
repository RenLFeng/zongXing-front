import React from 'react';
import Images from './images';
import {IMG_BASE_URL} from '../../common/systemParam';
import moment from 'moment';
import Editor from '../../components/editor';

export default class SecLoan extends React.Component {
  state = {
    first: false
  };
  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.projectDetail !== nextProps.projectDetail) {
      if (!this.state.first) {
        this.createClickTurn();
        this.setState({first: true});
      }
    }
  }

  componentWillUnmount() {
    let nav = $('.pd-body>.lbody .lnav');
    nav.off('click');
    $(window).off('scroll');
  }

  createClickTurn() {
    let nav = $('.pd-body>.lbody .lnav');
    nav.on('click', 'a', function () {
      let $t = $(this);
      //$t.addClass('hover').siblings().removeClass('hover');
      let $d = $('.pd-body>.lbody .textbox').eq($t.index());
      av.top($d.offset().top - 20);
    });
    let t0 = parseInt(nav.css('top'), 10);
    $(window).on('scroll', function () {
      let top = av.top();
      let t1 = top - $('.pd-body').offset().top;
      if (t1 > t0) {
        nav.addClass('fixed');
      } else {
        nav.removeClass('fixed');
      }
      $('.pd-body>.lbody .textbox').each(function (i, e) {
        if ($(e).offset().top - 30 < top) {
          nav.find('a').eq(i).addClass('hover').siblings().removeClass('hover');
        }
      });
    });
  }

  checkedName(title) {
    switch(title) {
      case '我的自述':
        return 'a1';
      case '我的项目':
        return 'a2';
      case '为何众借':
        return 'a3';
      case '还款计划':
        return 'a4';
      default:
        return 'a7';
    }
  }

  render() {
    const project = this.props.projectDetail;
    const dateCode = moment(project.fcreate_time).format('YYYY') + moment(project.fcreate_time).format('MM');
    // this.markMap();
    return (
      <div>
        <div className="lnav">
          { project.riskItems && project.riskItems.length > 0?
            <a className="a6">平台认证</a> : null
          }
          {project.projectModules ? project.projectModules.map((item)=>{
            let title = '';
            if (item.ftitle && item.ftitle.length > 4) {
              title = item.ftitle.substring(0,4);
            } else {
              title = item.ftitle;
            }
            return (
              <a className={this.checkedName(item.ftitle)} key={item.fid}>{title}</a>
            )
          }): null}
          <a className="a5">我的位置</a>
        </div>
        <div className="rbody">
          {project.fread_me_pic ? project.fread_me_pic.split(',').map((data, index)=>{
            if (data.length > 0) {
              return (
                <p key={data + index} style={{marginBottom: 10}}>
                  <img src={`${IMG_BASE_URL}project/${dateCode}/${project.fproject_no}/${data}`}/>
                </p>
              );
            }
          }): null}
          {project.riskItems && project.riskItems.length > 0?
            <div className="textbox border">
              <i className="tit">平台认证</i>
              <div className="tagbox" style={{marginTop: -10}}>
                {project.riskItems ? project.riskItems.map((item) => {
                  return (
                    <i className="chk" key={item}>{item}</i>
                  );
                }) : null}
              </div>
            </div> : null
          }
          {project.projectModules ? project.projectModules.map((item, index)=>{
            let pics = [];
            if (item.fpictures) {
              pics = JSON.parse(item.fpictures);
            }
            return (
              <div key={item.fid} className="textbox border">
                <i className="tit">{item.ftitle}</i>
                <div>
                  <Editor value={item.fcontent}/>
                  {pics.length > 2 ?
                    <Images pics={pics} id={item.fid}/>
                    :
                    pics.map((item) => (
                      <img style={{width: '100%', marginTop: 20}} key={item.uid} src={`${IMG_BASE_URL}/${item.realUrl}`}/>
                    ))
                  }
                </div>
              </div>
            )
          }): null}
          <div className="textbox border">
            <i className="tit">我的位置</i>
            <div>
              <div id="container">

              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
