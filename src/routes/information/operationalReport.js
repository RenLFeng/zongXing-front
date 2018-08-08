import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/information/ope_re.scss'
import {OPERATION_INFORMATION} from '../../common/pagePath'
export default class OperationalReport extends React.Component {
  render() {
    return (
      <div className="fr ope-re">
        <h2><span className="first" onClick={()=>{this.props.history.push(OPERATION_INFORMATION)}}>运营信息</span><i>></i><span className="last">运营报告</span></h2>
        <div className="wrap">
          <p>说明<br/>为进一步加强平台透明化建设与信息公示披露，将定期推出运营月报、半年报、年报，欢迎查看！</p>
          <ul className="y_line clearfix">
            <li className="act"><span>2018</span><span></span></li>
            <li><span style={{opacity:'0'}}>2017</span><span></span></li>
            <li><span style={{opacity:'0'}}>2016</span><span></span></li>
            <li><span style={{opacity:'0'}}>2015</span><span></span></li>
            <li><span style={{opacity:'0'}}>2014</span><span></span></li>
          </ul>
          <ul className="pic_items clearfix">
            <li>
              <p className="tit">众杰帮2018年度运营报表</p>
              <div className="bg_pic bg_pic1">
                <div className="bg_mk">
                  <div className="bg_border">
                    {/*<span className="y">2018</span><span className="y_text">年度</span>*/}
                    <div className="bg_text">运营报告</div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p className="tit">众杰帮2018年度运营报表</p>
              <div className="bg_pic bg_pic2">
                <div className="bg_mk">
                  <div className="bg_border">
                    {/*<span className="y">2018</span><span className="y_text"></span>*/}
                    <div className="bg_text">运营报告</div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p className="tit">众杰帮2018年度运营报表</p>
              <div className="bg_pic bg_pic2">
                <div className="bg_mk">
                  <div className="bg_border">
                    {/*<span className="y">2018</span><span className="y_text"></span>*/}
                    <div className="bg_text">运营报告</div>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <p className="tit">众杰帮2018年度运营报表</p>
              <div className="bg_pic bg_pic1">
                <div className="bg_mk">
                  <div className="bg_border">
                    {/*<span className="y">2018</span><span className="y_text"></span>*/}
                    <div className="bg_text">运营报告</div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
