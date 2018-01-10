import React from 'react';

import Search from '../../components/ProjectLoanComponent/search';
import NewPro from '../../components/ProjectLoanComponent/newPro';
import CompletePro from '../../components/ProjectLoanComponent/completePro';
import { startAnimate } from '../../assets/project/index';

export default class ProjectLoan extends React.Component {
  componentDidMount() {
    startAnimate();
  }

  render() {
    return (
      <div className="body1">
        <Search />
        <NewPro />
        <CompletePro />
        {/*翻译页脚实现*/}
        <div className="bgw">
          <div className="w tright">
            <div className="pager">
              <a className="first">&lt;</a>
              <a className="hover">1</a><a>2</a><a>3</a><a>4</a><a>5</a><a>...</a>
              <a className="last">&gt;</a>
            </div>
          </div>
        </div>

      </div>
    );
  }
}
