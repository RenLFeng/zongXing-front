import React from 'react';
import '../../assets/publish/_table.scss';
import LineReact from '../../../src/components/Echarts/LineReact'
export default class BusinessInformation extends React.Component {
  render() {
    return (
      <div className="fr shadow">
        <p className="c6">经营信息披露</p>
        <p className="q">累计交易信息<i className="dl"/></p>
        <p className="a">
          <table className="table">
            <p className="right">（单位：万元）</p>
            <tr>
              <th>累计交易金额</th>
              <td className="">66666</td>
              <th>累计交易笔数</th>
              <td>1000</td>
            </tr>
            <tr>
              <th>累计借款人数量</th>
              <td>66666</td>
              <th>累计借款人数量</th>
              <td>66</td>
            </tr>
            <tr>
              <th>借贷余额</th>
              <td>88888</td>
            </tr>
          </table>
        </p>
        <p className="q">月经营信息<i className="dl"/></p>
          <p className="a">
          <LineReact />
            6，当期出借人数量；7，当前借款人数量；
          8，当前出借人数量；</p>
<p className="q">当月经营信息<i className="dl"/></p>
          <p className="a">1，累计交易金额；2，累计交易笔数；3，借贷余额；4，累计借款人数量；5，累计借款人数量；6，当期出借人数量；7，当前借款人数量；
          8，当前出借人数量；9，前十大借款人待还金额占比；10，最大单一借款人待还金额占比；11，关联关系借款余额；
          12，逾期金额；13，笔数；14，逾期90天以上金额；15，逾期90天以上笔数；16，代偿金额；17，代偿笔数；
          18，收费标准。</p>

      </div>
    );
  }
}
