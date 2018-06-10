import React from 'react';

import '../../assets/companydiscount/company-card.scss'; 
class CompanyCard extends React.Component {
    constructor(props) {
        super(props);

        let data = this.props.data;
        if(data==null){
            data = {};
        } 
        let company_type =''; 
        if(data.bustype==='xcy'){
            company_type ='新餐饮';
        }else if(data.bustype==='xfw'){
            company_type ='新服务';
        }else if(data.bustype==='xls'){
            company_type ='新零售';
        }else if(data.bustype==='xny'){
            company_type ='新农业';
        }else if(data.bustype==='xyl'){
            company_type ='新娱乐';
        }else{
            company_type ='其他';
            data.bustype = 'other';
        } 
        this.state = {
            data: data,
            company_type:company_type, 
         }
    }
    render() { 
        return (  
            <div className="company-card shadow clearfix">
                <div className="logo">
                    <img  src={this.state.data.logo||'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/defut-head.jpg'} />
                </div>
                <div className="card-content">
                    <p className="tit">
                        <span className={`tag ${this.state.data.bustype||'other'}-color`}>{this.state.company_type}</span>
                        <span className="name">{this.state.data.fname||'企业名称'}</span>
                    </p>
                    <p className="tit2">{this.state.data.ftitle||'一级标题'}</p>
                    <p className="desc">{this.state.data.fsub_title||'二级标题'}</p>
                    <p className="tags">
                        <a>活动集</a> 
                    </p>
                    <div className='ics'>
                        <a className="ic ic_like" onClick={this.props.handlerLikeClick?this.props.handlerLikeClick.bind(this,this.state.data.fid,this.state.data):()=>{}}>{this.state.data.flike||0}</a>
                        <a className="ic ic_share" onClick={this.props.handlerShareClick?this.props.handlerShareClick.bind(this,this.state.data.fid,this.state.data):()=>{}}>{this.state.data.fshare||0}</a>
                    </div>    
                </div> 
               <div className='coupon-items' >
                   <div className='coupon-item'>这里是小优惠券</div> 
                   <div className='coupon-item'>这里是小优惠券</div>
               </div>
            </div> 
         )
    }
}
 
export default CompanyCard;