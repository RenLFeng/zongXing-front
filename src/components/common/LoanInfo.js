// 长条借款项目

import React from 'react';
import '../../assets/component/common/loaninfo.scss';
import {Button,Steps} from 'antd';


class LoanInfo extends React.Component {
  constructor(props) {
	super(props); 
	let data = this.props.data; 
	if(!data.stateData){
		data.stateData = [];
	}
	let len = data.stateData.length;
	if(data.fstate===5){
		len=0;
	}
    this.state = {
		fstate:{
			ckz:1,//筹款中
			dfk:2,//待放款
			hkz:3,//回款中
			yjq:4,//已结清
			ylb:5,//已流标
		},
		current:len-1,
		data:data,
	}
  }
  render() { 
	const Step = Steps.Step;
    return (  
      <div className='li-content'>
         {/* 顶部标题 */}
         <p>
           <span>项目编号：</span>
           <span>{this.state.data.fprojectNo||''}</span>
           <span>{this.state.data.fCName||''}</span> 
         </p>
		{/* 中间内容 */}
		<div className='li-middle'>
		{/* 上   */} 
		<div className='li-top'>
				{/* 左  logo*/}
			<div className='li-left'>
				<img  src={this.state.data.logo||'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/defut-head.jpg'} />
				<span> B+ </span>
			</div>
				{/* 中 */}
			<div className='li-center'>  
				<div className='li-title'>
					{
						this.state.data.fstate===this.state.fstate.ckz?
						<spna className='state ckz'>筹款中</spna> :null
					}
					{
						this.state.data.fstate===this.state.fstate.dfk?
						<spna className='state dfk'>待放款</spna> :null
					}
					{
						this.state.data.fstate===this.state.fstate.hkz?
						<spna className='state hkz'>回款中</spna> :null
					}
					{
						this.state.data.fstate===this.state.fstate.yjq?
						<spna className='state yjq'>已结清</spna> :null
					}
					{
						this.state.data.fstate===this.state.fstate.ylb?
						<spna className='state ylb'>已流标</spna> :null
					} 
					<a className='pname'  title='进入项目详情页面' onClick={this.props.handllerMXClick?this.props.handllerMXClick.bind(this,this.state.data.fid,this.state.data):()=>{alert('请绑定handllerMXClick事件，跳转到项目详细界面！');}}>{this.state.data.fPName||''} 
						{
							this.state.data.hasError?<i className='zjb zjb-jinggao'></i>:null
						} 
					</a>
				</div>
				<div className='text li-nh'>
					<span>年化收益率</span>
					<p>{this.state.data.nh}%</p>
					<span className='tip'>{this.state.data.area}/
						{
							this.state.data.type==='xcy'?'新餐饮':''
						}
						{
							this.state.data.type==='xfw'?'新服务':''
						}
						{
							this.state.data.type==='xls'?'新零售':''
						}
						{
							this.state.data.type==='xny'?'新农业':''
						}
						{
							this.state.data.type==='xyl'?'新娱乐':''
						}
						{
							this.state.data.type==='other'?'其他':''
						} 
					</span>
				</div>
				<div className='text li-qx'>
					<span>投资期限</span>
					<p>{this.state.data.qx}个月</p>
				</div>
				<div className='text li-je'>
					<span>借款金额</span>
					<p>{this.state.data.je}万</p>
					<span className='tip'>按月等额本息还款</span>
				</div> 
			</div>
			{/* 右 */}
			<div className='li-right'>
				<Steps size="small" current={this.state.current} progressDot direction="vertical"> 
					{
						this.state.data.stateData.map((item)=>{
							if(item.fstate===1){
								return <Step   title={"项目上线："+item.time} />
							}else if(item.fstate===2){ 
								return  <Step   title={"项目满标："+item.time} />
							}else if(item.fstate===3){ 
								return <Step   title={"项目计息："+item.time} />
							}else if(item.fstate===4){ 
								return <Step   title={"项目结清："+item.time} />
							}else if(item.fstate===5){ 
								return <Step title={"项目流标"+item.time} className='normary'/>
							}
						})
					} 
				</Steps>
			</div>
		</div>
		{/* 下 */}
		<div className='li-down'>
			 {/* 底部统计信息 */}
			 {
				this.state.data.fstate===this.state.fstate.ckz||this.state.data.fstate===this.state.fstate.dfk||this.state.data.fstate===this.state.fstate.hkz?
				<span>
					<span>已投资金额：</span> 
					<span className='money'>100元</span>
					<i className='split'>|</i>
					<span>可用代金券：</span>
					<span className='money'>8张</span>
				</span>:null 
			 }
			 {
				 this.state.data.fstate ===this.state.fstate.yjq?
				<span>
					<span>总投资金额：</span> 
					<span className='money'>{this.state.data.ztz}元</span>
					<i className='split'>|</i>
					<span>总投利息收益：</span> 
					<span className='money'>{this.state.data.zlx}元</span>
					<i className='split'>|</i> 
					<span>待收本金：</span> 
					<span className='money'>{this.state.data.dsbj}元</span>
					<i className='split'>|</i>
					<span>待收利息：</span> 
					<span className='money'>{this.state.data.dslx}元</span>
					<i className='split'>|</i>
					<span>可用代金券</span>
					<span className='money'>{this.state.data.djq}张</span>
				</span>:null
			 } 
			{ 
				/* 右侧按钮 */
				this.state.data.fstate===this.state.fstate.ckz ?<a className='btn'  onClick={this.props.handllerTZClick?this.props.handllerTZClick.bind(this,this.state.data.fid,this.state.data):()=>{alert('请绑定handllerTZClick事件！');}}> 继续投资 </a>:null 
			}
			{ 
				/* 右侧按钮 */
				this.state.data.fstate===this.state.fstate.hkz||this.state.data.fstate===this.state.fstate.yjq ?
				<a className='btn2' onClick={this.props.handllerHKClick?this.props.handllerHKClick.bind(this,this.state.data.fid,this.state.data):()=>{alert('请绑定handllerHKClick事件！');}}> 查看回款明细 </a>:null 
			}
			
		</div>
		</div> 
		<a  onClick={this.props.handllerHTClick?this.props.handllerHTClick.bind(this,this.state.data.fid,this.state.data):()=>{alert('请绑定handllerHTClick事件！');}}>《查看投资合同》</a>
				
				 
      </div>
    );
  }
}
 
export default LoanInfo;


