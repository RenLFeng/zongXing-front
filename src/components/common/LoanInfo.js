// 长条借款项目 
import React from 'react';
import '../../assets/component/common/loaninfo.scss';
import {Button,Steps,Table,message} from 'antd';
import moment from 'moment'; 
import {accountService}  from '../../services/api2';
import {goPay,deleteInvestRecord} from '../../services/api';
import {NOTIFY_PAGE,fileDownLoad} from '../../common/systemParam';


class LoanInfo extends React.Component {
  constructor(props) {
	super(props); 
	this.setStateData(props);
  }
  componentWillReceiveProps(props){
	  this.setStateData(props);
  }
  setStateData(props){
	let data = this.props.data; 
	if(!data.stateData){
		data.stateData = [];
	}
	let len = data.stateData.length;
	if(data.projectFlag===5){
		len=0;
	}
    this.state = {
		fstate:{
			ckz:13,//筹款中
			dfk:14,//待放款
			hkz:15,//回款中
			yjq:16,//已结清
			ylb:-1,//已流标
			hkyc:-4,//还款异常
			wfk:0,//未付款
			clz:4,//处理中
		}, 
		data:data,
		visableTable:false,
		tableData:[],
		loading:false,
		projectId:'',
		payloading:false,
		deleLoading:false,
		paymentObj:{},
		loanUrl:'',
		chujieUrl:'',
	}
  }
 //查看回款明细
  handllerHKClick(projectId){ 
	this.setState({
		visableTable:!this.state.visableTable,
		projectId:projectId,
	},()=>{
		if(this.state.visableTable &&(this.state.tableData || this.state.tableData.length==0)){
			this.searchDetail();
		}
	}); 
 }
 //查询回款明细
  searchDetail(){
	this.setState({
		loading:true,
	},async ()=>{
		let param = {
			projectId:this.state.projectId
		};  
		const rest =  await accountService.getInvestmentPlan(param); 
		this.setState({ 
			loading:false,
		});
		if(rest.code===0){
			this.setState({
				tableData:rest.data, 
			});
		}else{
			message.error(rest.msg);
		}
	}) 
 }

 //查看合同
 handllerHTClick = async (type)=>{
	const res = await accountService.getDownload(this.state.data.projectId,type)
	console.log('下载',res)
	if(res.code === 0){
     if(type === 2){
				this.setState({
					loanUrl:res.data
				},()=>{
					fileDownLoad(this.state.loanUrl);
					// message.info('下载成功')
					// window.open(this.state.loanUrl)
				})	
		 } else if(type === 4){
			  this.setState({
					chujieUrl:res.data
				},()=>{
					fileDownLoad(this.state.loanUrl);
					message.info('下载成功')
				})
		 }
		} else {
			res.msg && message.error(res.msg)
		}

 }

 //去付款
 async goToPayment(){
	 console.log('this')
	 let id = this.state.data.invId;
	 let url = `${NOTIFY_PAGE}/index/uCenter/InvestMent`;
	 this.setState({payloading:true})
	 const res = await goPay(id,url);
	 this.setState({payloading:false})
	 console.log('res',res);
	 if(res.code === 0){
      this.setState({
				paymentObj:res.data
			},()=>{
				this.formId.submit();
        this.props.history.push('/index/uCenter/InvestMent');
			})
	 } else {
		 res.msg && message.error(res.msg)
	 }
 }

 //删除订单
 async deleRecord(){
	 this.setState({deleLoading:true})
	 const res = await deleteInvestRecord(this.state.data.invId);
	 console.log('delete',res)
	 this.setState({deleLoading:false})
	 if(res.code === 0){
		message.info('删除成功');
		this.props.getMyinvest();
	 } else {
    res.msg && message.error(res.msg)
	 }

 }

  render() { 
	const Step = Steps.Step;
	//投资
  const tableColumn = [{
        title: '期数', 
        align:'center',
			width:50,
			dataIndex: 'fsort',
      }, {
        title: '回款日期',
        dataIndex: 'ffor_pay_time',
        align:'center',
        render:function(text,record,index){
          return text?moment(text).format('YYYY/MM/DD HH:mm'):'';
        }
      }, {
        title: '本金',
        dataIndex: 'fprincipal',
        align:'right',
        render:function(text,record,index){
          return String(text).fm();
        }
      }, {
        title: '利息',
        dataIndex: 'finterest',
        align:'right',
        render:function(text,record,index){
          return String(text).fm();
        }
      }, {
        title: '佣金',
        dataIndex: 'fkick_back',
        align:'right',
        render:function(text,record,index){
          return String(text).fm();
        }
      }, {
        title: '当期回款总额',
        dataIndex: 'allMoney',
        align:'right',
        render:function(text,record,index){
          return String(text).fm();
        }
      }, {
        title: '回款状态',
        dataIndex: 'fispay',
        align:'center',
        render:function(text,record,index){
          if(text){
			  return '已回款';
		  }else{
			  return '待回款';
		  }
        }
      }, {
        title: '到账日期',
        dataIndex: 'fpay_time',
        align:'center',
				render:function(text,record,index){
					return text?moment(text).format('YYYY/MM/DD HH:mm'):'';
				}
      }]; 
	const locale = {
		filterTitle: '筛选',
		filterConfirm: '确定',
		filterReset: '重置',
		emptyText: '暂无数据',
	};
	  const {paymentObj} = this.state;
    return (  
      <div className='li-content'>
         {/* 顶部标题 */}
         <p>
           <span>项目编号：</span>
           <span style={{color:'#999'}}>{this.state.data.projectNo||''}</span>
           <span>{this.state.data.companyName||''}</span> 
         </p>
		{/* 中间内容 */}
		<div className='li-middle'>
		{/* 上   */} 
		<div className='li-top'>
				{/* 左  logo*/}
			<div className='li-left'>
				<img  src={'http://zjb01-1255741041.picsh.myqcloud.com/'+this.state.data.cardPicPath||'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/defut-head.jpg'} />
				{/* <span>筹款中</span> */}
				<span> {this.state.data.leveName} </span>
			</div>
				{/* 中 */}
			<div className='li-center'>  
				<div className='li-title'>
					{
						this.state.data.projectFlag===this.state.fstate.ckz && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
						<span className='state ckz'>筹款中</span> :null
					}
					{
						this.state.data.projectFlag===this.state.fstate.dfk && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
						<span className='state dfk'>待放款</span> :null
					}
					{
						(this.state.data.projectFlag===this.state.fstate.hkz||
						this.state.data.projectFlag===this.state.fstate.hkyc) && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
						<span className='state hkz'>回款中</span> :null
					}
					{
						this.state.data.projectFlag===this.state.fstate.yjq && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
						<span className='state yjq'>已结清</span> :null
					}
					{
						this.state.data.projectFlag===this.state.fstate.ylb && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
						<span className='state ylb'>已流标</span> :null
					} 
					{
						this.state.data.invflag===this.state.fstate.wfk?
						<span className='state wfk'>未付款</span> :null
					} 
					{
						this.state.data.invflag===this.state.fstate.clz?
						<span className='state clz'>处理中</span> :null
					} 
					<a className='pname'  title='进入项目详情页面' onClick={this.props.handllerMXClick?this.props.handllerMXClick.bind(this,this.state.data.projectId,this.state.data):()=>{alert('请绑定handllerMXClick事件，跳转到项目详细界面！');}}>{this.state.data.projectName||''} 
						{
							this.state.data.projectFlag===this.state.fstate.hkyc?<i className='zjb zjb-jinggao'></i>:null
						} 
					</a>
				</div>
				<div className='text li-nh'>
					<span>年化收益率</span>
					<p>{this.state.data.rate}<span>%</span></p> 
					<span className='tip' style={{color:'#333'}}>{this.state.data.cityName}<span style={{display:'inline-block',margin:'0px 8px'}}>|</span>
						{
							this.state.data.busType==='xcy'?'新餐饮':''
						}
						{
							this.state.data.busType==='xfw'?'新服务':''
						}
						{
							this.state.data.busType==='xls'?'新零售':''
						}
						{
							this.state.data.busType==='xny'?'新农业':''
						}
						{
							this.state.data.busType==='xyl'?'新娱乐':''
						}
						{
							this.state.data.busType==='other'?'其他':''
						} 
					</span>
				</div>
				<div className='text li-qx'>
					<span>投资期限</span>
					<p>{this.state.data.month}<span>个月</span></p>
					
				</div>
				<div className='text li-je' style={{width:190}}>
					<span>借款金额</span>
					<p>{String(this.state.data.practicalLoanMoney).fm()}<span>元</span></p> 
					<span className='tip' style={{color:'#FF9900'}}>按月等额本息还款</span>
				</div> 
			</div>
			{/* 右 */}
			<div className='li-right'>
				<div className='line'>&ensp;</div> 
				{
					this.state.data.projectFlag ===this.state.fstate.ckz?
					<Steps size="small" current={0} progressDot direction="vertical"> 
						<Step   title={`项目上线：${this.state.data.upLineDate?moment(this.state.data.upLineDate).format('YYYY/MM/DD HH:mm'):''}`} />
					</Steps>:null
				} 
				{
					this.state.data.projectFlag ===this.state.fstate.dfk?
					<Steps size="small" current={1} progressDot direction="vertical"> 
						<Step   title={`项目上线：${this.state.data.upLineDate?moment(this.state.data.upLineDate).format('YYYY/MM/DD HH:mm'):''}`} />
						<Step   title={`项目满标：${this.state.data.fullDate?moment(this.state.data.fullDate).format('YYYY/MM/DD HH:mm'):''}`} /> 
					</Steps>:null
				}  
				{
					this.state.data.projectFlag ===this.state.fstate.hkz?
					<Steps size="small" current={2} progressDot direction="vertical"> 
						<Step   title={`项目上线：${this.state.data.upLineDate?moment(this.state.data.upLineDate).format('YYYY/MM/DD HH:mm'):''}`} />
						<Step   title={`项目满标：${this.state.data.fullDate?moment(this.state.data.fullDate).format('YYYY/MM/DD HH:mm'):''}`} /> 
						<Step   title={`项目计息：${this.state.data.loanDate?moment(this.state.data.loanDate).format('YYYY/MM/DD HH:mm'):''}`} /> 
					</Steps>:null
				} 
				{
					this.state.data.projectFlag ===this.state.fstate.yjq?
					<Steps size="small" current={3} progressDot direction="vertical"> 
						<Step   title={`项目上线：${this.state.data.upLineDate?moment(this.state.data.upLineDate).format('YYYY/MM/DD HH:mm'):''}`} />
						<Step   title={`项目满标：${this.state.data.fullDate?moment(this.state.data.fullDate).format('YYYY/MM/DD HH:mm'):''}`} /> 
						<Step   title={`项目计息：${this.state.data.loanDate?moment(this.state.data.loanDate).format('YYYY/MM/DD HH:mm'):''}`} /> 
						<Step   title={`项目结清：${this.state.data.finishDate?moment(this.state.data.finishDate).format('YYYY/MM/DD HH:mm'):''}`} />  
					</Steps>:null
				} 
				{
					this.state.data.projectFlag ===this.state.fstate.ylb?
					<Steps size="small" current={0} progressDot direction="vertical"> 
						<Step className='normary' title={`项目流标${this.state.data.deadLineDate?moment(this.state.data.deadLineDate).format('YYYY/MM/DD HH:mm'):''}`} />  
					</Steps>:null
				} 
			
			</div> 
		</div> 
		{/* 下 */}
		<div className='li-down'>
			{/* 底部统计信息 */} 
				<span>
					{
						this.state.data.projectFlag===this.state.fstate.ckz && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
						<span>
							<span className="span">已投资金额：</span> 
							<span className='money span'>{String(this.state.data.invMoney||0).fm()}元</span>
							<i className='split span'>|</i>
							<span className="span">可用代金券：</span>
							<span className='money span'>{this.state.data.couponCount}张</span>
						</span>:null 
					}
					{
						(this.state.data.projectFlag===this.state.fstate.dfk||
						this.state.data.projectFlag===this.state.fstate.ylb) && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
						<span>
							<span className="span">总投资金额：</span> 
							<span className='money span'>{String(this.state.data.allMoney||0).fm()}元</span>
							<i className='split span'>|</i>
							<span className="span">可用代金券：</span>
							<span className='money span'>{this.state.data.couponCount}张</span>
						</span>:null
					}
					{
						(this.state.data.projectFlag===this.state.fstate.hkz||
						this.state.data.projectFlag===this.state.fstate.hkyc||
						this.state.data.projectFlag===this.state.fstate.yjq) && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
						<span>
							<span className="span">总投资金额：</span> 
							<span className='money span'>{String(this.state.data.allMoney||0).fm()}元</span>
							<i className='split span'>|</i>
							<span className="span">总投利息收益：</span> 
							<span className='money span'>{ String(this.state.data.allInterest||0).fm()}元</span>
							<i className='split span'>|</i> 
							<span className="span">待收本金：</span> 
							<span className='money span'>{String(this.state.data.principal||0).fm()}元</span>
							<i className='split span'>|</i>
							<span className="span">待收利息：</span> 
							<span className='money span'>{String(this.state.data.interest||0).fm()}元</span>
							<i className='split span'>|</i>
							<span className="span">可用代金券</span>
							<span className='money span'>{this.state.data.couponCount}张</span>
						</span>:null
					} 
					{
						this.state.data.invflag===this.state.fstate.wfk || this.state.data.invflag===this.state.fstate.clz ?
						<span>
							<span className="span">投资金额：</span> 
							<span className='money span'>{String(this.state.data.waitPayMoney||0).fm()}元</span>	
						</span>:null
					}
				
				</span> 
			{ 
				/* 右侧按钮 */
				this.state.data.projectFlag===this.state.fstate.ckz && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
				<a className='btn'  onClick={this.props.handllerTZClick?this.props.handllerTZClick.bind(this,this.state.data.fid,this.state.data):()=>{alert('请绑定handllerTZClick事件！');}}> 继续投资 </a>
				:null 
			}

			{ 
				/* 右侧按钮 */
				(this.state.data.projectFlag===this.state.fstate.hkz||
				this.state.data.projectFlag===this.state.fstate.hkyc||
				this.state.data.projectFlag===this.state.fstate.yjq ) && this.state.data.invflag !== 0 && this.state.data.invflag !== 4?
				<a className='btn2' onClick={this.handllerHKClick.bind(this,this.state.data.projectId)}> 查看回款明细 </a>:null 
			}
			{ 
				/* 右侧按钮 */
				this.state.data.invflag===this.state.fstate.wfk || this.state.data.invflag===this.state.fstate.clz ?
				<div>
					<Button className='btn'  style={{color:'#fff'}} onClick={this.goToPayment.bind(this)} loading={this.state.payloading}> 去付款</Button>
					<Button className='btn' style={{marginLeft:15,color:'#fff'}} loading={this.state.deleLoading} onClick={()=>{this.deleRecord()}}> 删除订单</Button>
				</div>
				
				:null 
			}
			</div>
		</div>
		<div className={`detail ${this.state.visableTable?'':'hide'}`}>
			<Table columns={tableColumn} locale={locale} dataSource={this.state.tableData} loading={this.state.loading} pagination={false} bordered size="small" /> 
		</div>
		<p>
		  <a onClick={this.handllerHTClick.bind(this)}>《出借人承诺函》</a>
			<a onClick={this.handllerHTClick.bind(this,4)}>《出借服务协议》</a>
			<a onClick={this.handllerHTClick.bind(this,2)}>《借款协议》</a>
		</p>
		


		   <form ref={ref => this.formId = ref} id="form1" name="form1" action={paymentObj.submitURL} method="post" >
            <input id="Action" name="Action" value={paymentObj.action?paymentObj.action: ''} type="hidden" />
            <input id="ArrivalTime" name="ArrivalTime" value={paymentObj.arrivalTime?paymentObj.arrivalTime: ''} type="hidden" />
            <input id="LoanJsonList" name="LoanJsonList" value={paymentObj.loanJsonList} type="hidden" />
            <input id="NeedAudit" name="NeedAudit" value={paymentObj.needAudit} type="hidden" />
            <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={paymentObj.platformMoneymoremore} type="hidden" />
            <input id="RandomTimeStamp" name="RandomTimeStamp" value={paymentObj.randomTimeStamp} type="hidden" />
            <input id="TransferAction" name="TransferAction" value={paymentObj.transferAction} type="hidden" />
            <input id="TransferType" name="TransferType" value={paymentObj.transferType} type="hidden" />
            <input id="RandomTimeStamp" name="RandomTimeStamp" value={paymentObj.randomTimeStamp} type="hidden" />
            <input id="Remark1" name="Remark1" value={paymentObj.remark1} type="hidden" />
            <input id="Remark2" name="Remark2" value={paymentObj.remark2} type="hidden" />
            <input id="Remark3" name="Remark3" value={paymentObj.remark3} type="hidden" />
            <input id="ReturnURL" name="ReturnURL" value={paymentObj.returnURL} type="hidden" />
            <input id="NotifyURL" name="NotifyURL" value={paymentObj.notifyURL} type="hidden"  />
            <input id="SignInfo" name="SignInfo" value={paymentObj.signInfo} type="hidden" />
        </form>
				 
      </div>
    );
  }
}
 
export default LoanInfo;


