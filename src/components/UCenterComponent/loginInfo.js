import React from 'react';
import {connect} from 'dva';
import {Button, Divider} from 'antd';
import '../../assets/login/login.scss';
import {ACCOUNT_RECHARGE, ACCOUNT_WITHDRAWALS} from '../../common/pagePath';
import {getSiteNotice} from '../../services/api';
import Path from '../../common/pagePath';
import moment from 'moment';
import { setInterval, setTimeout } from 'timers';

@connect((state) => ({
    nickName: state.login.nickName,
    baseData: state.login.baseData,
    status: state.login.status,
}))
class LoginInfo extends React.Component {
    constructor(props) {
        super(props); 
        this.state = {
          pageCurrent:1,
          pageSize:10,
          dataInfo:[]
        }
    }  

 
    componentDidMount(){
        this.getNotice();
    }

    componentDidUpdate() {
       
        // $.fn.kxbdMarquee=function(options){
        //     var opts=$.extend({},$.fn.kxbdMarquee.defaults, options);
        //     return this.each(function(){
        //         var $marquee=$(this);				//滚动元素容器
        //         var _scrollObj=$marquee.get(0);		//滚动元素容器DOM
        //         var scrollW=$marquee.width();		//滚动元素容器的宽度
        //         var scrollH=$marquee.height();		//滚动元素容器的高度
        //         var $element=$marquee.children();	//滚动元素
        //         var $kids=$element.children();		//滚动子元素
        //         var scrollSize=0;					//滚动元素尺寸
     
        //         //滚动类型，1左右，0上下
        //         var _type=(opts.direction=="left"||opts.direction=="right") ? 1:0;
    
        //         //防止滚动子元素比滚动元素宽而取不到实际滚动子元素宽度
        //         $element.css(_type?"width":"height",10000);
    
        //         //获取滚动元素的尺寸
        //         if(opts.isEqual){
        //             scrollSize=$kids[_type?"outerWidth":"outerHeight"]()*$kids.length;
        //         }else{
        //             $kids.each(function(){
        //                 scrollSize+=$(this)[_type?"outerWidth":"outerHeight"]();
        //             });
        //         };
    
        //         //滚动元素总尺寸小于容器尺寸，不滚动
        //         if(scrollSize<(_type?scrollW:scrollH)){return;}; 
    
        //         //克隆滚动子元素将其插入到滚动元素后，并设定滚动元素宽度
        //         $element.append($kids.clone()).css(_type?"width":"height",scrollSize*2);
    
        //         var numMoved=0;
        //         function scrollFunc(){
        //             var _dir=(opts.direction=="left"||opts.direction=="right") ? "scrollLeft":"scrollTop";
        //             if (opts.loop>0) {
        //                 numMoved+=opts.scrollAmount;
        //                 if(numMoved>scrollSize*opts.loop){
        //                     _scrollObj[_dir]=0;
        //                     return clearInterval(moveId);
        //                 };
        //             };
    
        //             if(opts.direction=="left"||opts.direction=="up"){
        //                 var newPos=_scrollObj[_dir]+opts.scrollAmount;
        //                 if(newPos>=scrollSize){
        //                     newPos-=scrollSize;
        //                 }
        //                 _scrollObj[_dir]=newPos;
        //             }else{
        //                 var newPos=_scrollObj[_dir]-opts.scrollAmount;
        //                 if(newPos<=0){
        //                     newPos += scrollSize;
        //                 };
        //                 _scrollObj[_dir]=newPos;
        //             };
        //         };
    
        //         //滚动开始
        //         var moveId=setInterval(scrollFunc, opts.scrollDelay);
    
        //         //鼠标划过停止滚动
        //         $marquee.hover(function(){
        //             console.log('hover了',moveId)
        //             clearInterval(moveId);
        //         },function(){
        //             clearInterval(moveId);
        //             moveId=setInterval(scrollFunc, opts.scrollDelay);
        //         });
        //     });
        // };
    
        // $.fn.kxbdMarquee.defaults={
        //     isEqual:false,		//所有滚动的元素长宽是否相等,true,false
        //     loop: 0,			//循环滚动次数，0时无限
        //     direction: "up",	//滚动方向，"left","right","up","down"
        //     scrollAmount:1,		//步长
        //     scrollDelay:100		//时长
    
        // };
    
        // $.fn.kxbdMarquee.setDefaults=function(settings) {
        //     $.extend( $.fn.kxbdMarquee.defaults, settings );
        // };

        // $("#marquee4").kxbdMarquee();
    

    }

     init(arr) {
        let ul = $('.news_li');
        for (let i in arr) {
          let str = '<li>' + arr[i] + '</li>'
          ul.append(str)
        }
      }
    
    b() {
        let x = $('.news_li');
        let y = $('.swap');
        let h = $('.news_li li').length * 20; //20为每个li的高度    
        let t = parseInt(x.css('top'));
            y.css('top', '20px');
            x.animate({
            top: t - 20 + 'px'
            }, 'slow'); //20为每个li的高度
            if (Math.abs(t) == h - 20) { //20为每个li的高度
            y.animate({
                top: '0px'
            }, 'slow');
            z = x;
            x = y;
            y = z;
            }
            setTimeout(this.b, 2000); //滚动间隔时间
       }
    
    async getNotice(){
        const response = await getSiteNotice(this.state.pageCurrent,this.state.pageSize);
        if(response.code === 0){
            this.setState({
                dataInfo:response.data.notices,
            },()=>{
                // let arr = ['北京', '上海', '厦门'];
                //     this.init(arr);
                //     $('.swap').html($('.news_li').html());
                //     let hh = $('.news_li li').length;
                //     if (hh > 1) this.b();
                //     this.b();
            })
        } else{
            response.msg && message.error( response.msg)
        }
    }

    render() { 
        const {baseData} = this.props
        return ( 
            <div className='lg-login'>
                    {
                    this.props.status ? 
                    <div className="w" >
                    <div className="uc-tbody clearfix" style={{height:90, boxShadow: '1px 1px 16px rgba(0, 0, 0, 0.2)',padding:'20px 15px'}}> 
                        {/* 用户头像 */}
                        <a className="fl">
                            <img className="av" src={require('../../assets/img/ucenter/av1.png')} />
                        </a>
                        {/* 用户信息 */}
                        <div className="fl">
                            {/* 用户名 */}
                            <p className="t1">
                                {/* <span>{this.props.nickName}</span> */}
                                {/* <span className="split">|</span> */}
                                {this.props.baseData.mobile}  
                                <a onClick={()=>this.props.dispatch({type: 'login/logout'})}>退出登录</a> 
                            </p> 
                            <p className="uinfo" style={{position: 'relative'}}>
                                <span className="nickname">{this.props.nickName}</span>
                                <span className="split">|</span> 
                                
                                <i title="绑定手机号" className={`zjb zjb-shouji-copy ${baseData.userSecurityCenter.fMobileBinding?'active':''}`}></i>
                                <i title="身份证认证" className={`zjb zjb-moban ${baseData.userSecurityCenter.fCertification?'active':''}`}></i> 
                                <i title="银行卡绑定" className={`zjb zjb-icon ${baseData.userSecurityCenter.fBankCardBinding?'active':''}`}></i> 
                            </p>
                        </div>
                        <div className="fr">  
                            <div className="account-content">
                                <p>待领取代金券</p>
                                <p className="account-money">{baseData.countCoupon||'0'}张</p>
                            </div >  
                            <i></i>
                           <div className="account-content">
                                <p>券额</p>
                                <p className="account-money">￥{`${baseData.sumCoupon||0}`.fm()}</p>
                            </div>
                            <i></i>
                             <div className="account-content" style={{borderRight:'0px'}}>
                                <p>可用资金余额</p>
                                <p className="account-money">￥{`${baseData.balance||0}`.fm()}</p>
                            </div> 
                        </div>  
                    </div>
                    <div className="uc-message" style={{marginTop:10,marginBottom:25,height:34}}>       
                            {/* <span className="text1" style={this.state.dataInfo.length > 1 ?{verticalAlign: 'middle',height:20,lineHeight:'20px',display:'inline-block',marginTop:'5px'} :{verticalAlign: 'middle',height:20,lineHeight:'20px',display:'inline-block',marginTop:'0px'}}>系统消息：</span>   */}
                           
                            <div id="box">
                                <div id="t_news">
                                    <b>最新播报：</b>
                                    <ul id="news_li">
                                        {/* <li><a href="#" >水果忍者：穿靴子的猫</a></li>
                                        <li><a href="#" >乐动魔方 Plus</a></li>
                                        <li><a href="#" >亡灵杀手 汉化版</a></li>
                                        <li><a href="#" >jq22 搜集整理</a></li>
                                        <li><a href="#" >你疯啦 iphone壁纸</a></li> */}
                                    </ul>
                                    <ul id="swap"></ul>
                                </div>
                            </div>

                            {/* {
                                this.state.dataInfo.length > 1 ? 
                                <div id="marquee4" style={{width:400,height:20,overflow:'hidden',display:'inline-block',marginTop:5,verticalAlign: 'middle'}}>
                                    <ul>
                                    {
                                        this.state.dataInfo.map((data,index)=>{
                                            return(
                                                <li key={index} style={{float:'left', width:380, padding:' 3px 10px',color:'#7D7D7D'}}>【{moment(data.fpublishTime).format('M-D')}】<a onClick={()=>this.props.history.push(Path.SITE_NOTICE)} style={{color:'#7D7D7D'}}>{data.ftitle} &gt; </a></li>
                                            )
                                        })
                                    }
                                    </ul>
                                </div> : <span className="text2" style={{height:25}}>【{moment(this.state.dataInfo.fpublishTime).format('M-D')}】{this.state.dataInfo.ftitle}</span> 
                            }
                        */}

                            { baseData.userSecurityCenter.fThirdAccount ?

                                <Button className="buttonl" style={{width: '64px',height:'34px'}} onClick={()=>this.props.history.push(ACCOUNT_WITHDRAWALS)}>提现</Button> : null
                             }
                            { baseData.userSecurityCenter.fThirdAccount ? 

                                <Button type="primary" className="buttonl" style={{width: '64px',height:'34px'}} onClick={()=>this.props.history.push(ACCOUNT_RECHARGE)}>充值</Button> : null 
                            }
                    </div> 
                </div>:''
                }
            </div>
            
         )
    }
}
 
export default LoginInfo;