
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
                        <p className='top-title'>我的优惠券 </p>
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
                    <div className='project-list'>
                        <h1>这个地方  放收藏项目列表</h1>
                    </div>
                </div> 
            </div>
         )
    }
}
 
export default projectcollection;