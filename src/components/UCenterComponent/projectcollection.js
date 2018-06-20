
//个人中心--项目收藏页


import React from 'react';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import '../../assets/ucenter/projectcollection.scss';
import {Input,Button} from 'antd';

class projectcollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <LeftMenu  param={this.props} />
                <div className='fr pc-project-collection'> 
                    <div className='search-area'>
                        <p className='top-title'>项目收藏 </p>
                        <ul className='search-tag'>
                            <li className='active'>全部(1)</li>
                            <li>筹款中(2)</li>
                            <li>待放款(3)</li>
                            <li>回款中(4)</li>
                            <li>已结清(5)</li>
                            <li>已流标(5)</li>
                            <li className='error'>回款异常(5)</li>
                        </ul> 
                        {/* 搜索文本区域 */}
                        <div className='search-text'>
                            <span>项目名称</span>
                            <Input className='sarch-input'/>
                            <Button>查询</Button>
                        </div>
                    </div> 
                    <p>共8条记录</p>
                    <div className='project-list box99'>
                        <div style={{ cursor:'pointer' }}>
                            <div className="pic_box"><img className="pic" src={``} /></div>
                            <p className="name">{123}</p>
                            <div className="circle" data-value={20}/>
                            <i className="price">￥{100.00}</i>
                            <i className="city"><span className="high">{1}<i>借款期限</i></span>个月 | {2}</i>
                            <div className="line"/>
                            <i className="level">{12}</i>
                        </div>
                    </div>
                </div> 
            </div>
         )
    }
}
 
export default projectcollection;