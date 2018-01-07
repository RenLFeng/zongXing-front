import React from 'react';


export default class ProjectLoan extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="body">
        <div className="sec0">
          <div className="w">
            <div className="searchbox">
              <p className="tit"><i>查询您所需要的众借项目</i></p>
              <div className="box clearfix">
                <dl className="select">
                  <dt>信用等级</dt>
                  <dd>
                    <i data-value="">不限</i>
                    <i>A+</i>
                    <i>A</i>
                    <i>B+</i>
                    <i>B</i>
                    <i>C+</i>
                    <i>C</i>
                    <i>D</i>
                  </dd>
                </dl>
                <dl className="select">
                  <dt>年化利率</dt>
                  <dd>
                    <i data-value="">不限</i>
                    <i>8%</i>
                    <i>9%</i>
                    <i>10%</i>
                    <i>11%</i>
                    <i>12%</i>
                    <i>13%</i>
                    <i>15%</i>
                  </dd>
                </dl>
                <dl className="select">
                  <dt>借款周期</dt>
                  <dd>
                    <i data-value="">不限</i>
                    <i>3个月</i>
                    <i>4个月</i>
                    <i>5个月</i>
                    <i>6个月</i>
                    <i>7个月</i>
                    <i>8个月</i>
                    <i>9个月</i>
                    <i>10个月</i>
                    <i>11个月</i>
                    <i>12个月</i>
                  </dd>
                </dl>
                <a className="fr q"></a>
                <input type="text" className="key put1 fr"/>
              </div>
            </div>
          </div>
        </div>

        <div className="section sec1">
          <div className="w center">
            <h1>最新推荐众借项目</h1>
            <p className="tit-line"><i>NEW PROJECTS</i></p>
            <p className="f18 c6">完善您的项目信息，提高您的信用评级，将有机会进入推荐项目</p>
          </div>
          <div className="w box6 clearfix">
            <div>
              <img className="pic" src="../assets/img/home/img-programe_03.png"/>
              <p className="name">川味四家大厨<br />火锅店</p>
              <div className="circle" data-value="50"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">B+</i>
            </div>
            <div>
              <img className="pic" src="/assets/img/home/img-programe_05.png"/>
              <p className="name">MABOCAKE<br />麦波月饼</p>
              <div className="circle" data-value="20"></div>
              <i className="price">￥200,000</i>
              <i className="city">北京</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">C+</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_07.png"/>
              <p className="name">尚工坊手工<br />活动中心</p>
              <div className="circle" data-value="50"></div>
              <i className="price">￥200,000</i>
              <i className="city">广东，深圳</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">A</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_12.png"/>
              <p className="name">川味四家大厨<br />火锅店</p>
              <div className="circle" data-value="60"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">D</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_13.png"/>
              <p className="name">快乐嘟嘟面包房</p>
              <div className="circle" data-value="70"></div>
              <i className="price">￥200,000</i>
              <i className="city">上海</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">B</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_14.png"/>
              <p className="name">WOKEUP<br />身姿曼妙健康饮料</p>
              <div className="circle" data-value="85"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">D</i>
            </div>
          </div>
          <div className="w">
            <p className="relative">
              <a className="btnmore c" href=""></a>
            </p>
          </div>
        </div>

        <div className="section sec2">
          <div className="w center">
            <h1>已经完成的项目</h1>
            <p className="tit-line"><i>FUNDED PROJECTS</i></p>
            <p className="f18 c6">点击已完成的项目，查看他的项目进度及还款情况</p>
          </div>
          <div className="w box6 clearfix">

            <div>
              <img className="pic" src="../assets/img/home/img-programe_03.png"/>
              <p className="name">川味四家大厨<br />火锅店</p>
              <div className="circle" data-value="50"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">B+</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_05.png"/>
              <p className="name">MABOCAKE<br />麦波月饼</p>
              <div className="circle" data-value="20"></div>
              <i className="price">￥200,000</i>
              <i className="city">北京</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">C+</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_07.png"/>
              <p className="name">尚工坊手工<br />活动中心</p>
              <div className="circle" data-value="50"></div>
              <i className="price">￥200,000</i>
              <i className="city">广东，深圳</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">A</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_12.png"/>
              <p className="name">川味四家大厨<br />火锅店</p>
              <div className="circle" data-value="60"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">D</i>
            </div>

            <div>
              <img className="pic" src="../assets/img/home/img-programe_03.png"/>
              <p className="name">川味四家大厨<br />火锅店</p>
              <div className="circle" data-value="50"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">B+</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_05.png"/>
              <p className="name">MABOCAKE<br />麦波月饼</p>
              <div className="circle" data-value="20"></div>
              <i className="price">￥200,000</i>
              <i className="city">北京</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">C+</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_07.png"/>
              <p className="name">尚工坊手工<br />活动中心</p>
              <div className="circle" data-value="50"></div>
              <i className="price">￥200,000</i>
              <i className="city">广东，深圳</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">A</i>
            </div>
            <div>
              <img className="pic" src="../assets/img/home/img-programe_12.png"/>
              <p className="name">川味四家大厨<br />火锅店</p>
              <div className="circle" data-value="60"></div>
              <i className="price">￥200,000</i>
              <i className="city">四川，成都</i>
              <div className="line"></div>
              <i className="botic botic1">年化利率<em>9.5%</em></i>
              <i className="botic botic2">剩余时间<em>12天</em></i>
              <i className="level">D</i>
            </div>
          </div>
        </div>
        <div className="bgw">
          <div className="w tright">
            <div className="pager">
              <a className="first">&lt;</a>
              <a className="hover">1</a><a>2</a><a>3</a><a>4</a><a>5</a><a>...</a>
              <a className="last">&gt;</a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
