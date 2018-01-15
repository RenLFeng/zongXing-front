import React from 'react';

export default class ApplyProject extends React.Component {

  render() {
    const {changeProjectInfo} = this.props;
    const {projectName, loanVideo, loanShowImg, addProjectImg, desc, myImg1, myImg2, myImg3, myImg4, myImg5,
      myImg6, projectDesc, project1, project2, project3, project4, project5, project6, whyDesc, payment} = this.props.data;
    return (
      <div className="aform none" onChange={(e)=>changeProjectInfo(e)}>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>项目名称</i>
            </div>
            <input type="text" className="put" name="projectName" value={projectName}/>
          </div>
          <div className="row">
            <div className="tit">
              <i>借款视频</i>
            </div>
            <input type="text" className="put" name="loanVideo" value={loanVideo}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>借款项目展示图片</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${loanShowImg.length > 0 ? 'up' : ''}`}>
                {loanShowImg.length > 0 ? <img src={loanShowImg} />: null }
                <i>上传图片</i></a>
            </div>
          </div>
          <div className="row">
            <div className="tit">
              <i>添加项目展示背景大图</i>
            </div>
            <div className="imgbox border">
              <a className={`imgd ${addProjectImg.length > 0 ? 'up' : ''}`}>
                {addProjectImg.length > 0 ? <img src={addProjectImg} />: null }
                <i>上传图片</i></a>
            </div>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>我的自述</i>
            </div>
            <textarea className="put put2" rows="6" name="desc" value={desc}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="tit">
            <i></i>
          </div>
          <div className="imgbox border">
            <a className={`imgd ${myImg1.length > 0 ? 'up' : ''}`}>
              {myImg1.length > 0 ? <img src={myImg1} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${myImg2.length > 0 ? 'up' : ''}`}>
              {myImg2.length > 0 ? <img src={myImg2} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${myImg3.length > 0 ? 'up' : ''}`}>
              {myImg3.length > 0 ? <img src={myImg3} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${myImg4.length > 0 ? 'up' : ''}`}>
              {myImg4.length > 0 ? <img src={myImg4} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${myImg5.length > 0 ? 'up' : ''}`}>
              {myImg5.length > 0 ? <img src={myImg5} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${myImg6.length > 0 ? 'up' : ''}`}>
              {myImg6.length > 0 ? <img src={myImg6} />: null }
              <i>上传图片</i></a>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="row">
            <div className="tit">
              <i>我的项目</i>
            </div>
            <textarea className="put put2" rows="6" name="projectDesc" value={projectDesc}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="tit">
            <i></i>
          </div>
          <div className="imgbox border">
            <a className={`imgd ${project1.length > 0 ? 'up' : ''}`}>
              {project1.length > 0 ? <img src={project1} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${project2.length > 0 ? 'up' : ''}`}>
              {project2.length > 0 ? <img src={project2} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${project3.length > 0 ? 'up' : ''}`}>
              {project3.length > 0 ? <img src={project3} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${project4.length > 0 ? 'up' : ''}`}>
              {project4.length > 0 ? <img src={project4} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${project5.length > 0 ? 'up' : ''}`}>
              {project5.length > 0 ? <img src={project5} />: null }
              <i>上传图片</i></a>
            <a className={`imgd ${project6.length > 0 ? 'up' : ''}`}>
              {project6.length > 0 ? <img src={project6} />: null }
              <i>上传图片</i></a>
          </div>
        </div>
        <div className="row2 mt20 clearfix">
          <div className="row">
            <div className="tit">
              <i>为何众借</i>
            </div>
            <textarea className="put put2" rows="6" name="whyDesc" value={whyDesc}/>
          </div>
        </div>
        <div className="row2 clearfix">
          <div className="row">
            <div className="tit">
              <i>还款来源</i>
            </div>
            <textarea className="put put2" rows="6" name="payment" value={payment} />
          </div>
        </div>
      </div>
    );
  }
}
