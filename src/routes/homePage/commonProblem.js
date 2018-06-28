import React from 'react';
import LoginInfo from '../../components/UCenterComponent/loginInfo';
import { Link } from 'dva/router';
import  '../../assets/commonProblem/commonProblem.scss';
import {Input} from 'antd'

const Search = Input.Search;

export default class CommonProblem extends React.Component{
    constructor(props){
       super();
       this.state={
        list:[{
            id:1,
            name:'全部',
            num:126
        },{
            id:2,
            name:'账户类',
            num:13
        },{
            id:3,
            name:'投资类',
            num:80
        },{
            id:4,
            name:'借款类',
            num:6
        },{
            id:5,
            name:'费用类',
            num:126
        },{
            id:6,
            name:'标的类',
            num:16
        },{
            id:7,
            name:'提现类',
            num:38
        },{
            id:8,
            name:'存管类',
            num:15
        },{
            id:9,
            name:'商家优惠类',
            num:44
        }],
        show:false,
        detail:[{
            id:1,
            title:'全部',
            num:126,
            content:[{
                id:'01',
                question:'Q.如何设置新密码',
                answer:'A.登陆账户--个人中心--修改登陆密码'
            },{
                id:'02',
                question:'Q.如何提现',
                answer:'A.登陆账户--个人中心--账户提现'
            },{
                id:'03',
                question:'Q.如何充值',
                answer:'A.登陆账户--个人中心--账户充值'
            }]
        },{
            id:2,
            title:'账户类',
            num:13,
            content:[{
                id:'01',
                question:'Q.如何设置新密码',
                answer:'A.登陆账户--个人中心--修改登陆密码'
            },{
                id:'02',
                question:'Q.如何提现',
                answer:'A.登陆账户--个人中心--账户提现'
            },{
                id:'03',
                question:'Q.如何充值',
                answer:'A.登陆账户--个人中心--账户充值'
            }]
        },{
            id:3,
            title:'投资类',
            num:80,
            content:[{
                id:'01',
                question:'Q.如何设置新密码',
                answer:'A.登陆账户--个人中心--修改登陆密码'
            },{
                id:'02',
                question:'Q.如何提现',
                answer:'A.登陆账户--个人中心--账户提现'
            },{
                id:'03',
                question:'Q.如何充值',
                answer:'A.登陆账户--个人中心--账户充值'
            }]
        },{
            id:4,
            title:'借款类',
            num:6,
            content:[{
                id:'01',
                question:'Q.如何设置新密码',
                answer:'A.登陆账户--个人中心--修改登陆密码'
            },{
                id:'02',
                question:'Q.如何提现',
                answer:'A.登陆账户--个人中心--账户提现'
            },{
                id:'03',
                question:'Q.如何充值',
                answer:'A.登陆账户--个人中心--账户充值'
            }]
        },{
            id:5,
            title:'费用类',
            num:126,
            content:[{
                id:'01',
                question:'Q.如何设置新密码',
                answer:'A.登陆账户--个人中心--修改登陆密码'
            },{
                id:'02',
                question:'Q.如何提现',
                answer:'A.登陆账户--个人中心--账户提现'
            },{
                id:'03',
                question:'Q.如何充值',
                answer:'A.登陆账户--个人中心--账户充值'
            }]
        },{
            id:6,
            title:'费用类',
            num:126,
            content:[{
                id:'01',
                question:'Q.如何设置新密码',
                answer:'A.登陆账户--个人中心--修改登陆密码'
            },{
                id:'02',
                question:'Q.如何提现',
                answer:'A.登陆账户--个人中心--账户提现'
            },{
                id:'03',
                question:'Q.如何充值',
                answer:'A.登陆账户--个人中心--账户充值'
            }]
        },{
            id:7,
            title:'费用类',
            num:126,
            content:[{
                id:'01',
                question:'Q.如何设置新密码',
                answer:'A.登陆账户--个人中心--修改登陆密码'
            },{
                id:'02',
                question:'Q.如何提现',
                answer:'A.登陆账户--个人中心--账户提现'
            },{
                id:'03',
                question:'Q.如何充值',
                answer:'A.登陆账户--个人中心--账户充值'
            }]
        },{
            id:8,
            title:'费用类',
            num:126,
            content:[{
                id:'01',
                question:'Q.如何设置新密码',
                answer:'A.登陆账户--个人中心--修改登陆密码'
            },{
                id:'02',
                question:'Q.如何提现',
                answer:'A.登陆账户--个人中心--账户提现'
            },{
                id:'03',
                question:'Q.如何充值',
                answer:'A.登陆账户--个人中心--账户充值'
            }]
        },{
            id:9,
            title:'费用类',
            num:126,
            content:[{
                id:'01',
                question:'Q.如何设置新密码',
                answer:'A.登陆账户--个人中心--修改登陆密码'
            },{
                id:'02',
                question:'Q.如何提现',
                answer:'A.登陆账户--个人中心--账户提现'
            },{
                id:'03',
                question:'Q.如何充值',
                answer:'A.登陆账户--个人中心--账户充值'
            }]
        }],
        info:{},
        question:[],
        fontColor:false
       }
    }

    componentDidMount(){
        this.getDetail(1)
    }
    getDetail(id){
        for(let i=0;i<this.state.detail.length;i++){
            if(id === this.state.detail[i].id){
              this.setState({
                  info:this.state.detail[i],
                  question:this.state.detail[i].content,
                  [`fontColor${id}`]: true
              })
            } else {
                this.setState({
                    [`fontColor${this.state.detail[i].id}`]: false
                })
               
            }
        }
    }

    show(flag, id){
        this.setState({
            [`show${id}`]: !this.state[`show${id}`]
        })
    }
    render(){
        return(
            <div className="problem">
               <div style={{height: '148px'}}>  
                </div>
                <LoginInfo />
                <div className="w clearfix" style={{paddingBottom:80}}>
                    <div className="uc-left-menu">
                      <ul className="type">
                      {
                          this.state.list.map((data,id)=>{
                              return(
                                  <li className="problem_type" key={data.id} onClick={()=>{this.getDetail(data.id)}} style={this.state[`fontColor${data.id}`] ? {color:'#ff9900'} :{}}>{data.name}({data.num})</li>
                              )
                          })
                      }       
                      </ul>
                    </div>
                    <div className="fr uc-rbody" style={{padding:30}}>  
                        <div className="hang">
                           <p>常见问题 <span> &gt; {this.state.info.title}({this.state.info.num})</span></p>
                           <div className="search">
                             <Search placeholder="请输入搜索内容" onSearch={value => console.log(value)} className="search" />
                           </div>       
                        </div>
                        <div className="contents">
                          {
                              this.state.question.map((data,index)=>{
                                return(
                                        this.state[`show${data.id}`] ? 
                                           <div className="question" key={index}>
                                               <p onClick={()=>{this.show('show',data.id)}} style={{color:'#ff9900'}}><span>{data.question}</span></p>
                                               <div className="answer">{data.answer}</div>
                                           </div>:
                                            <div className="question" key={index}>
                                                <p onClick={()=>{this.show('hide',data.id)}} ><span>{data.question}</span></p>
                                                <div className="answer" style={{display:'none'}}>{data.answer}</div>
                                            </div>
                                )
                              })
                          }   
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}