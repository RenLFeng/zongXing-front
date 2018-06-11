// 长条借款项目

import React from 'react';
import '../../assets/component/common/loaninfo.scss';
import {Button,Steps} from 'antd';


class LoanInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
			data:{
					fprojectNo:'P1800001',
					fprojectName:'深圳众鑫众借帮网络借贷平台',
					fstate:1, 


			}
		 }
  }
  render() { 
	const Step = Steps.Step;
    return (  
      <div className='li-content'>
         {/* 顶部标题 */}
         <p>
           <span>项目编号：</span>
           <span>{this.state.data.fprojectNo}</span>
           <span>{this.state.data.fprojectName}</span> 
         </p>
		{/* 中间内容 */}
		<div className='li-middle'>
		{/* 上   */} 
		<div className='li-top'>
				{/* 左  logo*/}
			<div className='li-left'>
				<img  src={this.state.data.logo||'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/defut-head.jpg'} />
			</div>
				{/* 中 */}
			<div className='li-center'>  
				<div className='li-title'>
					<Button type='primary'>筹款中</Button>  
					<span>重庆串串王火锅</span> 
				</div>
				<div className='text li-nh'>
					<span>年化收益率</span>
					<p>9%</p>
					<span className='tip'>北京/新餐饮</span>
				</div>
				<div className='text li-qx'>
					<span>投资期限</span>
					<p>6个月</p>
				</div>
				<div className='text li-je'>
					<span>借款金额</span>
					<p>15.00万</p>
					<span className='tip'>按月等额本息还款</span>
				</div> 
			</div>
			{/* 右 */}
			<div className='li-right'>
				<Steps size="small" current={1} progressDot direction="vertical">
					<Step   title="项目上线：2018/06/01 12:09" />
					<Step   title="项目满标：2018/06/05 12:09" />
					<Step   title="项目计息：2018/06/07 12:09" /> 
					<Step   title="项目结清：2018/06/11 12:09" />
					<Step   title="项目流标：2018/06/11 12:09" /> 
				</Steps>
			</div>
		</div>
		{/* 下 */}
		<div className='li-down'>
			{/* 左  */}
			<span>已投资金额：100万元</span> 
			<span>&ensp;&ensp;|&ensp;&ensp;</span>
			<span>可用代金券：8张</span>  
			{ 
				/* 右侧按钮 */
				this.state.data.fstate===2 ?<a className='btns'> 继续投资 </a>:null 
			}
			
		</div>
		</div> 
		<a>《查看投资合同》</a>
				
				 
      </div>
    );
  }
}
 
export default LoanInfo;


