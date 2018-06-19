import React from 'react';
import '../../assets/component/common/statement.scss';

class Statement extends React.Component {
    constructor(props) {
        super(props); 
        this.setPageData(props);
    }
    componentWillReceiveProps(props){
        this.setPageData(props);
    }
    setPageData(props){

    }

    render() { 
        return ( 

            <div className='cp-sm'>
               <div className='sm-left'> 
                    {
                        this.props.showTitle?<p>可用余额</p>:<p>&nbsp;</p>
                    } 
                    <p>￥13636.00</p>
               </div>
                
               <div className='sm-right'> 
                    <p>2018/05/24 16:01</p>
                    <p>充值</p>
                    <div className='text1'>
                       <span>￥500</span>
                       <span>招商银行  尾号0632</span>
                       <span>正在处理中...</span>
                    </div>
                    <div className='text2'>
                       <span>￥500</span>
                       <span>本金：￥500</span> 
                       <span>利息：￥500</span> 
                       <span>佣金：￥500</span> 
                    </div>
                    <div className='sm-tx'>
                        <p>手续费：￥5.00</p>
                        <p>到账金额：￥5.00</p>
                    </div>
                    <div className='sm-tz'>
                        <p>6/12期回款</p> 
                        <p>项目编号：P2321231</p>
                        <p>项目名称：2311212</p>
                    </div> 
                    <i></i>
               </div>
            </div>

         )
    }
}
 
export default Statement;
