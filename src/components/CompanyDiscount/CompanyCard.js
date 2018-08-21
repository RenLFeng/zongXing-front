import React from 'react';

import '../../assets/companydiscount/company-card.scss'; 
import CouponList from '../../components/couponList/couponList';
import { IMG_BASE_URL } from '../../common/systemParam';
import Editor from '../../components/editor';
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
    
    componentWillReceiveProps(nextProps) {
        if ('data' in nextProps) {
            let data = nextProps.data;
            if(data==null){
                data = {};
            } 
            let company_type =''; 
            if(data.busType==='xcy'){
                company_type ='新餐饮';
            }else if(data.busType==='xfw'){
                company_type ='新服务';
            }else if(data.busType==='xls'){
                company_type ='新零售';
            }else if(data.busType==='xny'){
                company_type ='新农业';
            }else if(data.busType==='xyl'){
                company_type ='新娱乐';
            }else{
                company_type ='其他';
                data.busType = 'other';
            } 
            this.setState({
                data: nextProps.data,
                company_type:company_type, 
            });
        }
    }

    render() { 
        return (  
            <div className="company-card shadow">
                <div className="logo">
                    <img  src={this.state.data.companyPicture?`${IMG_BASE_URL}${this.state.data.companyPicture}`:'https://zjb-test-1255741041.cos.ap-guangzhou.myqcloud.com/base/defut-head.jpg'} />
                </div>
                <div className="card-content">
                    <p className="tit">
                        <span className={`tag ${this.state.data.bustype||'other'}-color`}>{this.state.company_type}</span>
                        <span className="name">{this.state.data.companyName||''}</span>
                    </p>
                    <p className="tit2">{this.state.data.projectName||''}</p>
                    <Editor limtHeight={true} value={this.state.data.projectContent||'<p></p>'}/>
                </div> 
               <div className='coupon-items' >
                   <CouponList list={this.state.data.couponList} handlerBtnClick={this.props.handlerBtnClick}/>
               </div>
            </div> 
         )
    }
}
 
export default CompanyCard;