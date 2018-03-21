import React from 'react';
import Images from './images';
import {IMG_BASE_URL} from '../../common/systemParam';
import moment from 'moment';

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
          { project.riskItems?
            <a className="a6">平台认证</a> : null
          }
          {project.projectModules ? project.projectModules.map((item)=>{
            return (
              <a className={this.checkedName(item.ftitle)} key={item.fid}>{item.ftitle}</a>
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
          {project.riskItems?
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
          {project.projectModules ? project.projectModules.map((item)=>{
            if (!item.ftitle) {
              return null;
            }
            let pics = [];
            if (item.fpictures) {
              pics = JSON.parse(item.fpictures);
            }
            return (
              <div key={item.fid} className="textbox border">
                <i className="tit">{item.ftitle}</i>
                <div>
                  <p>{item.fcontent?item.fcontent: `暂无${item.ftitle}`}</p>
                  {pics.length > 2 ?
                    <Images pics={pics} id={item.fid}/>
                    :
                    pics.map((item) => (
                      <img style={{width: '90%', marginTop: 20}} key={item.uid} src={`${IMG_BASE_URL}/${item.realUrl}`}/>
                    ))
                  }
                </div>
              </div>
            )
          }): null}


          {/*<div className="textbox border">*/}
            {/*<i className="tit">我的自述</i>*/}
            {/*<p>{item.fcontent?project.fcontent: '暂无我的自述'}</p>*/}
          {/*</div>*/}
          {/*{project.fmy_project_pic ? project.fmy_project_pic.split(',').map((data, index)=>{*/}
            {/*if (data.length > 0) {*/}
              {/*return (*/}
                {/*<p key={data+index} style={{marginBottom: 10}}>*/}
                  {/*<img src={`${IMG_BASE_URL}project/${dateCode}/${project.fproject_no}/${data}`}/>*/}
                {/*</p>*/}
              {/*);*/}
            {/*}*/}

          {/*}): null}*/}

          {/*<div className="textbox border">*/}
            {/*<i className="tit">我的项目</i>*/}
            {/*<p>{project.myproject?project.myproject: '暂无我的项目'}</p>*/}
          {/*</div>*/}
          {/*/!*<Images project={project}/>*!/*/}
          {/*<div className="textbox border">*/}
            {/*<i className="tit">为何众借</i>*/}
            {/*<p>{project.fwhy_loan?project.fwhy_loan: '暂无为何众借'}</p>*/}
          {/*</div>*/}
          {/*<div className="textbox border">*/}
            {/*<i className="tit">还款计划</i>*/}
            {/*<p>{project.fpay_from?project.fpay_from: '暂无还款计划'}</p>*/}
          {/*</div>*/}
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
