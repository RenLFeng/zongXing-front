import React from 'react';
import {Form, Input, Button, Select, Modal, message, Icon } from 'antd';
import '../../assets/ucenter/withdrawals.scss';
import {getBankCardList, getCity, putInformation} from '../../services/api';
import {MONEY_REG, MONEY1_REG_, BANK_CARD, PERSONAL_PAGE, NOTIFY_PAGE } from '../../common/systemParam';
import Path from "../../common/pagePath";
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import '../../assets/ucenter/recharge.scss';
import BankCard from './Card';
import {connect} from 'dva';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 16},
  },
};
const btnLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
@connect((state)=>({
  accountId: state.login.baseData.accountId,
  baseData: state.login.baseData,
  safeData: state.safeCenter.safeData,
}))

export default class EnterprisePresentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // accountId:this.props.location.state ? this.props.location.state.account: '',
      accountId: '',
      bankCodes: [],   //银行列表
      bankcardInfos: [],   //银行信息
      provinces: [],   //省份列表
      withdrawals: {},  //提交表单后返回的数据
      loading: false,
      id: '',
      cardNo: '',
      bankName: '',
      cityName: '',
      provinceName: '',
      citys: [],         //城市接口返回的城市列表
      //  提交表单参数
      amount: '', //提現金額
      cardType: 0,
      province: '',
      city: '',
      remark: '',
      num: 0,
      value:'',   
      selectedCard: {}, //选中的提现银行卡号
      moneyError: false, //提现金额是否错误
      moneyErrorMsg:'', //金额错误提示语
    }
  }

  componentDidMount() {
    this.getCardInformation(); 
  }

  //获取银行卡
  async getCardInformation() {
    const response = await getBankCardList();
    if (response.code === 0) {
      this.setState({
        bankcardInfos: response.data
      });
    } else {
      message.error(response.msg);
    }
  }

  submit_() {
    this.formId.submit();
    Modal.confirm({
      title: '提示',
      content: '请在新页面完成操作',
      okText: '确定',
      cancelText: '取消',
      onOk: () => this.props.history.push(Path.PERSONAL_ACCOUNT)
    });
  }

  async getCity_(data) {
    const response = await getCity(data);
    if (response.code === 0) {
      this.setState({
        id: response.fcode,
        citys: response.data,
        cityName: this.state.num < 2 ? this.state.cityName : (response.data)[0].fcode
      });
    } else {
      message.error(response.msg);
    }
  }

  async getInformation(data) {
    try {
      data.notifyPageUrl = `${NOTIFY_PAGE}/index/uCenter/personAccount`;
      this.setState({loading: true});
      const response = await putInformation(data);
      this.setState({loading: false});
      if (response.code === 0) {
        Modal.confirm({
          title: '提示',
          content: '确认提现吗？',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk: () => this.submit_()
        });
        this.setState({
          withdrawals: response.data
        })
      } else {
        message.error(response.msg);
      }
    } catch (e) {
      this.setState({loading: false});
      if (typeof e === 'object' && e.name === 288) {
        throw e;
      }
      message.error('服务器繁忙，请稍后重试');
    }
  }

  handleSubmit = () => {
        this.state.selectedCard ? this.setState({selectedCardError: false}) : this.setState({selectedCardError: true});
        if(this.moneyError || this.state.loading){
          return;
        }
        if(Number(this.state.amount) < 2){
          this.setState({moneyError:true, moneyErrorMsg: '金不能小于1'})
        }
        if (!this.state.selectedCard.fbankcard) {
          message.error('请选择银行卡');
          return; 
        }
        let param = {
          notifyPageUrl: PERSONAL_PAGE,
          amount: this.state.amount,
          accountId: this.props.accountId,
          cardNo: this.state.selectedCard.fbankcard,
          bankCode: this.state.selectedCard.fbankCode,
          province: this.state.selectedCard.fprovinceCode,
          city: this.state.selectedCard.fcityCode
        }
        this.getInformation(param);
      
  };


  changeBank(val) {
    for (let data of this.state.bankcardInfos) {
      if (data.userBankId === val) {
        this.props.form.resetFields();
        this.setState({
          cardNo: data.cardNo,
          bankName: data.bankCode,
          provinceName: data.province,
          cityName: data.city,
          num: 0
        }, ()=>{
          this.changeCity(data.province);
        });
        
        return;
      }
    }
  }

  changeCity(val) {
    this.setState({
      num: this.state.num+1,
    }, ()=> {
      this.getCity_(val);
    })
  }

  validateNumber = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    if (MONEY_REG.test(value) && value * 1 <= 1) {
      callback('金额不能小于1');
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  };

  validateBankCard = (rule, value, callback) => {
    const {getFieldValue} = this.props.form;
    if (!BANK_CARD.test(value)) {
      callback('请输入有效的银行卡号');
    }
    // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
    callback()
  };

  handleChange(value) {
  }

  handleBlur() {
  }
  handleFocus() {
  }

  changeMoney = (event) => {
    if(isNaN(Number(event.target.value))){
      this.setState({ moneyError: true, moneyErrorMsg: '只能输入数字' })
      this.setState({})
    }else{
      this.setState({ moneyError: false })
      this.setState({amount:event.target.value})
    }
  }

  render() {
    const {withdrawals} = this.state;
    const {baseData, safeData} = this.props;
    const Option = Select.Option;
    return (
        <div className="fr uc-rbody" style={{width: 1248,padding: '30px 20px'}}>
          <div className="rech_div">
            <span className="rech_title">提现</span><span className="rech_title" style={{marginLeft: 10, marginRight: 10}}>></span><span className="rech_title" style={{fontSize: '16px'}}>发起提现</span>
          </div>
          <span className="withdrawals_title">请选择到账银行卡</span>
          <div style={{padding: '0 0 30px 52px', borderBottom: '1px dashed #e6e6e6'}}>
            <div style={{display:'inline-block'}}>
            {
              this.state.bankcardInfos.map((data)=>{
                 return(
                     <div style={{cursor:"pointer",display: 'inline-block'}} key={data.fid} onClick={()=>{this.setState({selectedCard: data,selectedCardError: false})}} >
                          <BankCard  style={{margin: '32px 32px 0 0',width:343,height:189}} cardName={data.fbank} cardId={data.fbankcard.substr(0,4) +' **** '+data.fbankcard.substr(data.fbankcard.length -4,data.fbankcard.length)}  /> 
                     </div>
                     
                 )
              })
            }

                <div className="card_add" onClick={() => this.props.history.push(Path.BINDCARD)}>
                  <Icon type="plus" className="pluc"/>
                  <p className="add">绑定新银行卡</p>
                  <p className="card_type">（只支持储蓄卡）</p>
                </div>
            </div> 
            
          </div>
          <div className="rech_center" style={{position: 'relative', paddingTop: 0 }}>
            <div className="label_div" style={{width: '116px'}}>
              <span className="label_text" style={{position: 'absolute', top: 32}}>到账银行卡</span>
              <span className="label_text" style={{position: 'absolute', top: 105}}>提现金额</span>
            </div>
            <div className="label_div" style={{paddingTop: '32px'}}>
              <span className="money_tip" style={{color: '#007aff', borderBottom: '0px',fontSize: '18px',marginLeft: -2}}>
                {this.state.selectedCard?this.state.selectedCard.fbank:''} 尾号  &nbsp;{this.state.selectedCard.fbankcard ? this.state.selectedCard.fbankcard.substring(this.state.selectedCard.fbankcard.length-4) : ''}
              </span>
              <div className="input-view" style={{marginTop: 36}}>
                <span className="money_tip">￥</span>
                <input type="text" className="input_money" onChange={this.changeMoney} value={this.state.amount}/>
                <span className="rate_text_position" style={{display: 'inline-block'}}>账户可提现金额￥{baseData ? baseData.balance : 0}</span>
              </div>
              {/* <span className="rate_text">提现手续费￥<span>{this.state.amount * 0.01}</span>（费率1%）</span> */}
            </div>
            {this.state.selectedCardError ? <div><span style={{ color:'red', fontSize:'10px' }}>请选择到账银行卡</span></div> : null}
            {this.state.moneyError ? <div><span style={{ color:'red', fontSize:'10px' }}>{this.state.moneyErrorMsg}</span></div> : null}
            <Button type="primary" loading={this.state.loading} style={{width: 279, marginTop: 30,height:35,fontSize: 18, marginBottom:30,marginLeft: 56}} onClick={this.handleSubmit}>发起提现</Button>
          </div>
          <form ref={ref => this.formId = ref} action={withdrawals.submitURL} method="post" style={{display:'none'}} target="_blank">
            <input id="WithdrawMoneymoremore" name="WithdrawMoneymoremore" value={withdrawals.withdrawMoneymoremore} />
            <input id="OrderNo" name="OrderNo" value={withdrawals.orderNo} />
            <input id="Amount" name="Amount" value={withdrawals.amount} />
            <input id="FeeQuota" name="FeeQuota" value={withdrawals.feeQuota?withdrawals.feeQuota: ''} />
            <input id="CardNo" name="CardNo" value={withdrawals.cardNo} />
            <input id="CardType" name="CardType" value={withdrawals.cardType} />
            <input id="BankCode" name="BankCode" value={withdrawals.bankCode} />
            <input id="BranchBankName" name="BranchBankName" value={withdrawals.branchBankName ? withdrawals.branchBankName : ''} />
            <input id="Province" name="Province" value={withdrawals.province} />
            <input id="City" name="City" value={withdrawals.city} />
            <input id="PlatformMoneymoremore" name="PlatformMoneymoremore" value={withdrawals.platformMoneymoremore} />
            <input id="SignInfo" name="SignInfo" value={withdrawals.signInfo} />
            <input id="ReturnURL" name="ReturnURL" value={withdrawals.returnURL} />
            <input id="NotifyURL" name="NotifyURL" value={withdrawals.notifyURL} />
            <input id="Remark1" name="Remark1" value={withdrawals.remark1} />
            <input id="Remark2" name="Remark2" value={withdrawals.remark2 ? withdrawals.remark2 : ''}/>
            <input id="Remark3" name="Remark3" value={withdrawals.remark3 ? withdrawals.remark3 : ''} />
          </form>
        </div>
    );
  }
}


