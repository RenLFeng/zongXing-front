
//个人中心--项目收藏页


import React from 'react';
import LeftMenu from '../../components/UCenterComponent/leftMenu';
import '../../assets/ucenter/projectcollection.scss';

class projectcollection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <div>
                <LeftMenu  param={this.props} />
                <div className='fr projectcollection'>
                     
                </div> 
            </div>
         )
    }
}
 
export default projectcollection;