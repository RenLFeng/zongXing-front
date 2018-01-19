import React from 'react';

import { Switch, Route, withRouter} from 'dva/router';

import '../../assets/ucenter/index';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import PersonAccount from '../../components/UCenterComponent/personAccount';
import UserBasic from '../../components/UCenterComponent/userBasic';

export default class UCenter extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    setTimeout(()=>{
      this.initPage();
    }, 200);
  }

  initPage() {
    $('.uc-lbody>.navbox').on('click', '.hd>a,.folder>a', function(){
      $(this).parent().toggleClass('hover');
    });
  };

  render() {
    const { match } = this.props;
    return (
      <div className="body2">
        <div className="w">
          <div className="uc-tbody clearfix">
            <a className="fl"><img className="av" src={require('../../assets/img/ucenter/av1.png')} /></a>
            <div className="fl">
              <p className="t1">zj******56</p>
              <p className="t2">
                <i><b>0</b>封未读信息</i>
              </p>
            </div>
            <div className="fr">
              <p>
                <i>上次登录时间：<b>2018-01-12</b></i>
                <i>IP：<b>140.22.33.101</b></i>
                <i>地点：<b>北京</b></i>
              </p>
            </div>
          </div>
        </div>
        <div className="w clearfix">
          <LeftMenu />
          <Switch>
            <Route path={`${match.path}/personAccount`} component={PersonAccount} />
            <Route path={`${match.path}/userBasic`} component={UserBasic} />
          </Switch>
        </div>
      </div>
    );
  }
}
