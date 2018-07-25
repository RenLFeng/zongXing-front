import React from 'react';
import '../../assets/infor/information/recor.scss';
import {Collapse,Icon} from 'antd';
import LeftMenu from './leftMenu';

const Panel = Collapse.Panel;

export default class RecordInformation extends React.Component {
	render() {
		return (
      <div className="infor">
        <div  className="w clearfix">
          {/* <LeftMenu param={this.props}/> */}
          <div className="fr recor">
            <h2><span>备案信息</span></h2>
            {/*登记情况*/}
            <div className="top1 cont item">
              <p className="tit">在地方金融监管部门的备案登记情况</p>
              <p></p>
              <ul>
                <li className="act"><span></span><span>备案材料准备</span></li>
                <li><span><i></i></span><span>备案材料提交</span></li>
                <li><span><i></i></span><span>备案材料审核</span></li>
                <li><span><i></i></span><span>备案通过</span></li>
                <li><span><i></i></span><span>备案登记核发</span></li>
              </ul>
            </div>
            {/*许可情况*/}
            <div className="top2 cont">
              <p className="tit">取得的电信业务经营许可信息情况</p>
              <p>我司己做好各项网贷机构备案的准备工作，通过备案后，会按流程向电信管理部门提交ICP电</p>
              <ul className="info_nav clearfix">
                <li className="act act_f">
                  <a>ICP材料准备</a>
                  <i></i>
                  <i></i>
                </li>
                <li className="">
                  <a>ICP材料提交</a>
                  <i></i>
                  <i></i>
                </li>
                <li className="">
                  <a>ICP材料受理</a>
                  <i></i>
                  <i></i>
                </li>
                <li className="">
                  <a>ICP材料审核</a>
                  <i></i>
                  <i></i>
                </li>
                <li className="">
                  <a>ICP申请通过</a>
                  <i></i>
                  <i></i>
                </li>
                <li className=" act_l">
                  <a>ICP证件核发</a>
                  <i></i>
                  <i></i>
                </li>
              </ul>
            </div>
            {/*经营情况*/}
            <div className="top3 cont ">
              <p className="tit">资金存管情况</p>
              <p>我司己与第三方支付<span style={{color:'#f90'}}>乾多多</span>公司签订资金存管协议，目前系统己上线，与银行存管合作正在申请中。</p>
              <ul className="clearfix">
                <li className="text act">中国互金协会银行存管系统测评</li>
                <li className="line"></li>
                <li className="text">银行存管系统通过测评</li>
                <li className="line"></li>
                <li className="text">XXX银行存管系统升级</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
		);
	}
}
