import React from 'react';
import { Icon,Button } from 'antd';
import '../../assets/Risk/rick.scss';

export default class Risk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '合规运营',
    };
  }

  a(x) {
    this.setState({
      text: x,
    });
  }

  render() {
    return (
        <div className="body1" style={{minWidth: '1248px', margin: 'auto'}}>
          {/* 导航栏 */}
          <div className="nav1">
            <div className="nav_">
              <a onClick={() => this.a('合规运营')}>合规运营</a>
              <span>|</span>
              <a onClick={() => this.a('资金存管')}>资金存管</a>
              <span>|</span>
              <a onClick={() => this.a('风险控制')}>风险控制</a>
              <span>|</span>
              <a onClick={() => this.a('信息安全')}>信息安全</a>
            </div>
          </div>

          {/* 页面1 */}
          { this.state.text === '合规运营' ?
            <div className="page3">

              {/* 第一部分 */}
              <div className="operation1">
                <div className="title">
                  <h1>合规运营</h1>
                  <div className="hover" />
                </div>
                <p
                  className="word1">积木盒子一直秉承合规发展的原则，严格遵守各项法律、法规、政策及集团的各项内控制度，为借贷双方提供专业的居间撮合服务，借贷交易真实合法，项目披露尽职合规，让投资者安心。同时，积木盒子也积极参与行业监管政策、规则的讨论与交流，努力推动整个行业的健康发展。</p>
                <div className="num3">
                  <div className="num_1">
                    <span className="big_w">135456</span>
                    <span className="small_w">天</span>
                    <p>平台运营天数</p>
                  </div>

                  <div className="num_1 center1">
                    <span className="big_w">135456</span>
                    <span className="small_w">亿元</span>
                    <p>累计交易量</p>
                  </div>
                  <div className="num_1">
                    <span className="big_w">135456</span>
                    <span className="small_w">万人</span>
                    <p>累计注册用户</p>
                  </div>
                </div>
              </div>
              {/* 第二部分 */}
              <div className="content1">
                <div className="img_1">
                  <h2>法律地位和 <br />
                    服务内容合法性</h2>
                  <p>合法机构 合法服务</p>
                </div>
                <div className="text">
                  <div className="text_" >根据《网络借贷信息中介机构业务活动管理暂行办法》第2条规定，网络借贷信息中介机构是指依法设立，专门从事网络借贷信息中介业务活动的金融信息中介公司。该类机构以互联网为主要渠道，为借款人与出借人（即贷款人）实现直接借贷提供信息搜集、信息公布、资信评估、信息交互、借贷撮合等服务。
                  </div>
                </div>
              </div>
              {/* 第三部分 */}
              <div className="content1">
                <div className="img_2">
                  <h2>出借人取得<br />
                    收益的合法性</h2>
                  <p>收益合法，受法律保护</p>
                </div>
                <div className="text">
                  <div className="text_" >《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》第一条明确指出，“本规定所称的民间借贷，是指自然人、法人、其他组织之间及其相互之间进行资金融通的行为”，《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》第二十六条：“借贷双方约定的利率未超过年利率24%，出借人请求借款人按照约定的利率支付利息的，人民法院应予支持。”积木盒子平台上资金借出方向资金借入方出借资金并按照约定利率收取利息，且该等利率未超过年利率24%，为合法利息收益，受到法律保护。
                  </div>
                </div>
              </div>
              {/* 第四部分 */}
              <div className="content1">
                <div className="img_3">
                  <h2>积木盒子网站<br />
                    生成电子合同合法性</h2>
                  <p>电子合同合法有效可执行</p>
                </div>
                <div className="text">
                  <div className="text_">根据《中华人民共和国电子签名法》第十四条的规定“可靠的电子签名与手写签名或者盖章具有同等的法律效力。”，明确认定符合条件的电子签名与手写签名或盖章具有同等的效力。积木盒子网站生成的电子合同属于《合同法》第11条规定的书面合同形式，且符合条件的电子签名具有法律效力，故而该电子合同具备合法性和可执行性。
                  </div>
                </div>
              </div>
            </div> : null
          }
          {/* 页面 2*/}
          {this.state.text === '资金存管' ?
            <Money /> : null
          }

          {/* 页面 3*/}
          {this.state.text === '风险控制' ?
            <div className="control1">
              <div className="control_">
                <div className="title">
                  <h1>风险控制</h1>
                  <div className="hover"></div>
                </div>
                <p className="word1">积木盒子建立了完善的风险架构，同时针对不同类型的产品特点和风险特征分别建立了相对应的产品管理制度和项目贷前、贷中、贷后的管理制度和风险评估流程，防范欺诈风险和信用风险。</p>
                <div className="part_1">
                  <div className="part_1_l">
                    <div className="img"><img src={require('../../assets/img/rick/3-1.png')} alt=""/></div>
                    <div className="text_3">
                      <span>小微信贷分散风险</span>
                      <p>专注于个人消费和小微经营需求的小额信贷交易撮合，笔均借款金额为万元以下，融资需求覆盖超过400个城市，通过小额分散降低违约关联性，控制集中度风险。</p>
                    </div>
                  </div>
                  <div className="part_1_r">
                    <div className="img"><img src={require('../../assets/img/rick/3-2.png')} alt=""/></div>
                    <div className="text_3">
                      <span>实地尽调保障信息真实</span>
                      <p>专业信贷团队对融资项目进行360度实地尽职调查，对融资项目及参与主体实现立体化多层级的数据采集，以确保项目及融资需求真实、合法和融资项目参与主体有稳定、可信的还款能力，最终为风险把控提供可信依据。</p>
                    </div>
                  </div>
                </div>
                <div className="part_1">
                  <div className="part_1_l">
                    <div className="img"><img src={require('../../assets/img/rick/3-3.png')} alt="" /></div>
                    <div className="text_3">
                      <span>大数据风控甄别风险</span>
                      <p>通过新一代智能大数据风控引擎，经由借款人授权从数十个数据源调取并验证借款人个人信息、消费行为信息、社交信息、第三方征信信息、以及交易环境设备信息等近千个信息维度，对借款人的信用风险、欺诈风险以及产品风险进行全面评估。
                      </p>
                    </div>
                  </div>
                  <div className="part_1_r">
                    <div className="img"><img src={require('../../assets/img/rick/3-4.png')} alt="" /></div>
                    <div className="text_3">
                      <span>交易结构设计打造资金闭环</span>
                      <p>融资需求基于特定的消费情景，在传统风险控制技术之外，通过将借款和还款资金内嵌于交易流程的结构设计，确保融资需求的真实、合法，锁定还款来源，降低融资人道德风险和操作风险。</p>
                    </div>
                  </div>
                </div>

              </div>
              <div className="warning-system">
                <p className="word">积木盒子建立了一套风险预警系统，针对不同的风险，制定预警监控指标，并根据预警信号进行风险预警处理。</p>
                <div className="system">
                  <div className="system_1">
                    <div className="img"><img src={require('../../assets/img/rick/3-5.png')} alt="" /></div>
                    <p className="title">日常风险预警管理</p>
                    <p className="text">监控平台各类资金的流入、流出，跟踪穹顶保证金变化，每日对外披露，定时对各类资产质量进行分析，及时掌握各类资产质量变化情况，采取相关应对措施。</p>
                  </div>
                  <div className="system_1">
                    <div className="img"><img src={require('../../assets/img/rick/3-6.png')} alt="" /></div>
                    <p className="title">项目约定还款日前</p>
                    <p className="text">通过短信、电话等方式提醒客户及时还款。</p>
                  </div>
                  <div className="system_1">
                    <div className="img"><img src={require('../../assets/img/rick/3-7.png')} alt="" /></div>
                    <p className="title">项目逾期-早期</p>
                    <p className="text">积极配合合作渠道进行电话、短信、信函等催收，并做好相应的逾期管理。</p>
                  </div>
                  <div className="system_1">
                    <div className="img"><img src={require('../../assets/img/rick/3-8.png')} alt="" /></div>
                    <p className="title">项目逾期-后期</p>
                    <p className="text">准备逾期项目证明、资金流向等资料，协助相关方面进行法律诉讼追偿逾期款项或委托第三方专业机构进行实地外访与属地催收。</p>
                  </div>
                </div>
                <p className="word">经平台撮合成交的项目一旦逾期，平台将协助相关方面通过提供逾期证明、融资服务协议 (电子合同)、资金流转记录等必须的信息和资金链证据，协助相关方面实现短信、电话、诉讼、外包等合规催收手段。</p>
              </div>
              <div className="Dome-project">
                <div className="title_">
                  <h1>穹顶计划</h1>
                  <div className="hover"></div>
                </div>
                <p className="word_">穹顶计划是积木盒子平台为广大投资人推出的更加合理的贷后保障制度。积木盒子通过该保障机制，纳入第三方资金，形成逾期债权收购储备资金。这笔资金将被用来收购穹顶计划保障机制覆盖范围内，未来所有发生逾期或违约的项目资产。本着信息如实披露原则，以实现投资人做出有效风险决策为目的，积木盒子将公示该项资金的金额。
                </p>
              </div>
              <div className="plan1">
                {/* 数据 */}
                <div className="data">
                  <div className="data_1">
                    <span className="text">穹顶储备资金：</span>
                    <span className="num_">121,441,182.73</span>
                  </div>
                  <div className="data_1">
                    <span className="text">累计动用金额：</span>
                    <span className="num_2">786,151,187.42</span>
                  </div>
                  <div className="data_1">
                    <span className="text_3">累计追加和追回金额：</span>
                    <span className="num_3">807,592,370.15</span>
                  </div>
                </div>
                {/* 问题 */}
                <div className="question1">
                  <span>穹顶计划是如何运作的？</span>
                  <p className="word2_">如果发生项目违约，穹顶计划最迟将在该项目到期日之后的第30个自然日当日收购该项目债权。在收购债权动作发生之前占用时间为操作准备期，期间的利息按照该项目原定利率支付投资人。穹顶计划的资金具体数额，会定期以银行资信证明的方式进行披露，以供投资人监督。</p>
                  <span>穹顶计划的推出，对平台的风控标准有什么影响？</span>
                  <p className="word2_">穹顶计划只是为投资人提供了一种更可控的贷后风险处理方式，对积木盒子的风险控制标准无任何影响。</p>
                  <span>穹顶计划是不是担保？</span>
                  <p className="word2_1">穹顶计划并非通常意义的担保，而是以平台历史违约率为基础，设置有合理厚度的资金以收购违约项目资产，达到切实有效的保障投资人权益的目的。这也符合监管层一直以来的态度：禁止平台自担保，但鼓励平台采取措施保证投资者的利益。</p>
                </div>
              </div>
              <div className="law">
                <div className="title">
                  <h1>法律援助</h1>
                  <div className="hover"></div>
                </div>
                  <p className="word1">积木盒子从公司自有资金中划拨300万元人民币作为法律援助基金，法律援助基金专户存储，专项用于为积木盒子平台上非自担风险融资项目提供法律支持，如非自担风险项目中的任一融资项目发生争议事项需提起诉讼或仲裁程序解决争议的，积木盒子将启用法律援助基金为投资人聘请专业律师代表投资人处理相关法律争议，协助投资人追讨违约债权，以保护相关投资人的权益。积木盒子承诺维持法律援助基金数额不低于300万元人民币，如因支付法律援助费用导致法律援助基金不足的，积木盒子将及时补足。</p>
              </div>
            </div> : null
          }

          {/* 页面 4*/}
          {this.state.text === '信息安全' ?
            <Information /> : null
          }

          {/* 充值界面 */}
          {this.state.text === '合规运营' ?
            <Recharge /> : null
          }

        </div>
    );
  }
}

class Money extends React.Component {
  render() {
    return (
      <div className="money2">
        {/*资金安全*/}
        <div className="safe1">
          <div className="title">
            <h1>资产安全</h1>
            <div className="hover"></div>
          </div>
          <p className="word1">积木盒子一直秉承合规发展的原则，严格遵守各项法律、法规、政策及集团的各项内控制度，为借贷双方提供专业的居间撮合服务，借贷交易真实合法，项目披露尽职合规，让投资者安心。同时，积木盒子也积极参与行业监管政策、规则的讨论与交流，努力推动整个行业的健康发展。</p>
          <div className="img_"></div>
        </div>
        {/*民生银行*/}
        <div className="minsheng">
          <div className="title_">
            <h1>民生银行资金存管介绍</h1>
            <div className="hover"></div>
          </div>
          <p className="word_">民生银行资金存管是指民生银行对积木盒子平台出借人与借款人开立和使用的资金存管账户进行管理和监督，依照出借人与借款人的授权指令，对两者资金进行存管、划付、核算和监督。所有用户资金均保存在民生银行存管系统的账户体系内，由民生银行对资金进行管理与监督，资金流转均在民生银行账户体系内进行，平台仅作为纯粹的信息中介参与交易撮合，全程与用户资金隔离。积木盒子对接民生银行资金存管系统符合《网络借贷信息中介机构业务活动管理暂行办法》的相关规定，为真正合规、有效的存管模式。</p>
        </div>
        {/**/}
        <div className="QA">
          <div className="title">
            <h1>民生银行存管Q&A</h1>
            <div className="hover_"></div>
          </div>
          <span>如何开立民生银行存管账户？</span>
          <p className="word2_">用户注册积木盒子账户成功后，通过页面引导前往民生银行页面开通存管账户，存管账户开通需用户提供真实姓名、身份证号、手机号码及短信验证码，并设置民生银行存管账户交易密码。开通成功后会自动跳转回到积木盒子网站或客户端页面。</p>
          <span>民生银行为客户开立的资金存管账户由谁操作，信息安全是否有保障？</span>
          <p className="word2_1">客户的资金存管账户由客户本人管理，充值、投资、提现时要由客户输入交易密码进行授权，平台或者民生银行都不能自行动用客户账户资金。请客户保护好自己的交易密码、手机验证码等信息，勿向他人泄露。</p>
        </div>
      </div>
    );
  }
}

class Information extends React.Component {
  render() {
    return (
      <div className="information1">
        <div className="title">
          <h1>信息安全</h1>
          <div className="hover"></div>
        </div>
        <p className="word1">积木盒子一直将保护用户的隐私信息和数据的安全视为我们重要的责任，平台运用业界先进的技术手段，采用银行级安全防护架构和多维度的隐私保护机制，全方位保护用户的信息安全，平台现已通过ISO27001信息安全管理体系认证和公安部信息系统安全等级保护三级备案认证。</p>
       <div className="information-safe">
        <div className="part1">
          <span className="title">数据全程加密</span>
          <p className="text">平台数据交互全程采用https加密传输，敏感信息在数据库中全部加密存储，通过多层防火墙隔离内部网络和外部网络，采用电子认证电子签名技术，确保交易完整可追溯，为您的数据提供7×24小时不间断的安全保障。</p>
        </div>
        <div className="part2">
          <span className="title">权威安全认证</span>
          <p className="text">积木盒子技术团队核心成员均来自国内外知名IT企业，在信息安全和数据安全方面拥有非常丰富的经验，为平台提供银行级系统安全保障，平台现已通过ISO27001信息安全管理体系认证和公安部信息系统安全等级保护三级备案认证。</p>
        </div>
      </div>
        <div className="prove">
          <p>信息系统安全等级保护备案证明</p>
          <div className="img"></div>
        </div>
      </div>
    );
  }
}



class Recharge extends React.Component {
  render() {
    return (
      <div className="recharge">
        <div className="page">
          <img src={require('../../assets/img/login/ic_close.png')} className="cancle" alt="" />
          <div className="content">
            <div className="check"><Icon type="check-circle" style={{ fontSize: '40px', color: 'orange' }} /></div>
            <p className="prompt">请在新页面完成充值</p>
            <Button>充值成功</Button>
            <a href=""> 充值遇到的问题> </a>
          </div>
        </div>
        <div className="line"></div>
      </div>
    );
  }
}
