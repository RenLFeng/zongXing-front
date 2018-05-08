import React from 'react';
import { Row, Col, Card, Button } from 'antd';
import { selectPlatformReport } from '../../services/api';
import { IMG_BASE_URL } from '../../common/systemParam';

const styles = {
  cardDiv: {
    width: 'cal(100%-15px)',
    padding: '10px',
    backgroundColor: '#fff',
    borderRadius: '5px 5px 0 0',
  },
  titleStyle: {
    display: 'inline-block',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: 16,
    lineHeight: '32px',
  },
  contentDiv: {
    width: '950px',
    fontSize: '14px',
    backgroundColor: '#f5f5f5',
    minHeight: '1000px',
    padding: '10px 30px',
    float: 'right'
  }
}
export default class PlatformReport extends React.Component {
  state = {
    dataSource: []
  }

  componentDidMount() {
    this.selectPlatformReportAjax();
  }

  // 查询平台报告
  async selectPlatformReportAjax() {
    const response = await selectPlatformReport();
    if (response.code === 0) {
      this.setState({
        dataSource: response.data
      })
    } else {
      message.error(response.msg);
    }
  }

  openLinkDown(content) {
    let obj = JSON.parse(content);
    window.open(obj.length> 0 ? obj[0].url : '');
  }

  render() {  
    return (
      <div className="shadow" style={styles.contentDiv}>
        <Row type="flex" justify="space-between">
          {
            this.state.dataSource.map((data) => {
              return (
                <Col key={data.fid} span={11} style={{marginTop: 5}}>
                  <div style={styles.cardDiv}>
                    <img src={`${IMG_BASE_URL}${data.fpic}`} style={{width: '100%', height: '250px'}}/>
                    <Row type="flex" justify="space-between" style={{marginTop: 10}}>
                      <Col span={16}>
                        <b style={styles.titleStyle} title={data.ftitle}>{data.ftitle}</b>
                      </Col>
                      <Col span={6} style={{textAlign: 'right'}}>
                        <Button type="primary" onClick={()=>this.openLinkDown(data.fcontent)}>查看</Button>
                      </Col>
                    </Row>
                  </div>
                </Col>
              );
            })
          }
          
        </Row>
      </div>
    );
  }
}
