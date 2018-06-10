// 长条借款项目

import React from 'react';
import '../../assets/component/common/loaninfo.scss';
import {Button} from 'antd';


class LoanInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
			data:{}
		 }
  }
  render() { 
    return (  
      <div className='li-content'>
         {/* 顶部标题 */}
         <p>
           <span>项目编号：</span>
           <span>P10888823</span>
           <span>企业名称企业名称</span> 
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

						</div>
					</div>
					{/* 下 */}
					<div className='li-down'>
						{/* 左  */}
						<span>已投资金额：100万元</span> 
						<span>&ensp;&ensp;|&ensp;&ensp;</span>
						<span>可用代金券：8张</span> 
						{/* 右 */}
						<a> 继续投资 </a>
					</div>
				 </div> 
         {/* 底部合同 */} 
				 <a>《查看投资合同》</a>
      </div>
    );
  }
}
 
export default LoanInfo;


