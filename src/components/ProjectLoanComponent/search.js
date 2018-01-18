/**
 * Created by Administrator on 2018/1/8 0008.
 */
import React from 'react';
import Login from '../LoginComponent/login';
import { Link } from 'dva/router';

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaveCode: '',   //信用等级
      rate: -1,        //年化利率
      period: -1,      //借款周期
      projectName: '', //项目名称
    };
    this.searchProject = this.searchProject.bind(this);
  }

  componentDidMount() {
    this.operationSelect();
  }

  operationSelect() {
    const _this  = this;
    $('body').on('click', 'dl.select>dt', function(){
      let active = $(this).next().hasClass('show');
      $('dl.select>dd.show').removeClass('show');
      if(!active){
        $(this).next().addClass('show');
      }
    });
    $('body').on('click', 'dl.select>dd>i', function(){
      let $t = $(this),
        sel = $t.parent().parent();
      _this.dlChange.call(sel, $t.index(), _this);
    });
    $('body').on('click touchend', function(event){
      let el = event.target || window.event.srcElement;
      if($(el).closest('dl.select').length==0){
        $('dl.select>dd.show').removeClass('show');
      }
    });
  }

  dlChange(idx, _this) {
    let sel = this;
    let dt = sel.find('dt');
    let op = sel.find('dd>i').eq(idx);
    dt.next().removeClass('show');
    if(sel.data('index')==idx){
      return;
    }
    _this.changeSelectValue(dt.attr('type'), op.attr('value'), idx);
    dt.html(op.html());
    sel.data('value', op.data('value')||op.html());
    sel.data('index', idx);
    sel.trigger('change');
  }

  // 拿到获取的值给对应state赋值
  changeSelectValue(type, value, idx) {
    if (type === 'leaveCode' || type === 'rate') {
      switch (idx) {
        case 0 :
          this.changeRatePeriod({leaveCode: '', rate: '-1'});
          break;
        case 1 :
          this.changeRatePeriod({leaveCode: 'L1001', rate: '8'});
          break;
        case 2 :
          this.changeRatePeriod({leaveCode: 'L1002', rate: '9'});
          break;
        case 3 :
          this.changeRatePeriod({leaveCode: 'L2001', rate: '10'});
          break;
        case 4 :
          this.changeRatePeriod({leaveCode: 'L2002', rate: '11'});
          break;
        case 5 :
          this.changeRatePeriod({leaveCode: 'L3001', rate: '12'});
          break;
        case 6 :
          this.changeRatePeriod({leaveCode: 'L3002', rate: '13'});
          break;
        case 7 :
          this.changeRatePeriod({leaveCode: 'L4001', rate: '15'});
          break;
        default:
          this.changeRatePeriod({leaveCode: '', rate: '-1'});
      }
    } else {
      this.setState({
        [type]: value
      });
    }
  }

  changeRatePeriod({leaveCode, rate}) {
    this.setState({
      leaveCode: leaveCode,
      rate: rate
    })
  }

  searchProject(){
    const {leaveCode, rate, period, projectName} = this.state;
    this.props.fetchProject(leaveCode, rate, period, projectName);

  }

  render() {
    const url = window.location.href;
    return (
      <div className="sec0">
        <div className="w">
          <div className="searchbox">
            <p className="tit"><i>查询您所需要的众借项目</i></p>
            <div className="box clearfix">
              <dl className="select">
                <dt type="leaveCode">信用等级</dt>
                <dd>
                  <i value="" data-value="">不限</i>
                  <i value="L1001">A+</i>
                  <i value="L1002">A</i>
                  <i value="L2001">B+</i>
                  <i value="L2002">B</i>
                  <i value="L3001">C+</i>
                  <i value="L3002">C</i>
                  <i value="L4001">D</i>
                </dd>
              </dl>
              <dl className="select">
                <dt type="rate">年化利率</dt>
                <dd>
                  <i value="-1" data-value="">不限</i>
                  <i value="8">8%</i>
                  <i value="9">9%</i>
                  <i value="10">10%</i>
                  <i value="11">11%</i>
                  <i value="12">12%</i>
                  <i value="13">13%</i>
                  <i value="15">15%</i>
                </dd>
              </dl>
              <dl className="select">
                <dt type="period">借款周期</dt>
                <dd>
                  <i value="-1" data-value="">不限</i>
                  <i value="3">3个月</i>
                  <i value="4">4个月</i>
                  <i value="5">5个月</i>
                  <i value="6">6个月</i>
                  <i value="7">7个月</i>
                  <i value="8">8个月</i>
                  <i value="9">9个月</i>
                  <i value="10">10个月</i>
                  <i value="11">11个月</i>
                  <i value="12">12个月</i>
                </dd>
              </dl>
              {url.indexOf('/index/projectLoan/page/') !== -1 ?
                <Link
                  className="fr q"
                  onClick={this.searchProject}
                  to={'/index/projectLoan/page/1'}
                /> :
                <a
                  className="fr q"
                  onClick={this.searchProject}
                />
              }

              <input
                type="text"
                name="projectName"
                className="key put1 fr"
                onChange={(e)=>{ console.log('修改了搜索内容');this.setState({ [e.target.name]: e.target.value })}}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
