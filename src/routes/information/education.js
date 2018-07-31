import React from 'react';
import LeftMenu from './leftMenu';
import '../../assets/infor/information/edu.scss'
export default class Education extends React.Component {
  constructor(props) {
    super();
    this.state = {

    }
  }
  componentDidMount(){

  }
  render() {
    return (
      <div className="fr edu">
        <h2><span>投资者教育</span></h2>
       <div className="wrap">
           <img src={require("../../assets/img/infor/edu.jpg")} alt=""/>
         <ul className="questions">
           <li className="">
             <p className="question">1: 什么是网络借贷？</p>
             <p className="answer"> 网络借贷是指个体和个体之间通过互联网平台实现的直接借贷。个体包含自然人、法人及其他组织。</p>
           </li>
           <li className="">
             <p className="question">2: 什么是网络借贷信息中介机构？</p>
             <p className="answer">网络借贷信息中介机构是指依法设立，专门从事网络借贷信息中介业务活动的金融信息中介公司。该类机构以互联网为主要渠道，为借款人与出借人（即贷款人）实现直接借贷提供信息搜集、信息公布、资信评估、信息交互、借贷撮合等服务。</p>
           </li>
           <li className="">
             <p className="question">3: 网络借贷通常可能面临哪些风险？</p>
             <p className="answer">可能面临的风险有：市场风险、政策风险、信用风险、借款项目不成立风险、不可抗力风险等。出借人应当理性面对并承担相应的借款客户违约等风险。</p>
           </li>
           <li className="">
             <p className="question">4：出借人的出借收益如何界定？</p>
             <p className="answer">出借人要承担借款客户的违约风险，故预期收益率不等于实际收益率，预期回报不等于实际收益。</p>
           </li>
           <li className="">
             <p className="question">5: 哪类人群适合在网络借贷平台投资？</p>
             <p className="answer">出借人应当具备投资风险意识、风险识别能力、拥有非保本类金融产品投资的经历并熟悉互联网。出借人还应当按照平台要求完成风险评估测试，并选择与自身风险承受能力相当的借款项目进行出借。</p>
           </li>
           <li className="">
             <p className="question">6: 出借人应当履行哪些义务？</p>
             <p className="answer">参与网络借贷的出借人应当履行下列义务：</p>
             <p className="answer">（一）应当具备投资风险意识、风险识别能力、拥有非保本类金融产品投资的经历并熟悉互联网；</p>
             <p className="answer">（二）向网络借贷信息中介机构提供真实、准确、完整的身份等信息；</p>
             <p className="answer">（三）出借资金为来源合法的自有资金；</p>
             <p className="answer">（四）了解融资项目信贷风险，确认具有相应的风险认知和承受能力；</p>
             <p className="answer">（五）自行承担借贷产生的本息损失；</p>
             <p className="answer">（六）借贷合同及有关协议约定的其他义务。</p>
           </li>
           <li className="">
             <p className="question">7: 借款人应当履行哪些义务？</p>
             <p className="answer">借款人应当履行下列义务：</p>
             <p className="answer">（一）提供真实、准确、完整的用户信息及融资信息；</p>
             <p className="answer">（二）提供在所有网络借贷信息中介机构未偿还借款信息；</p>
             <p className="answer">（三）保证融资项目真实、合法，并按照约定用途使用借贷资金，不得用于出借等其他目的；</p>
             <p className="answer">（四）按照约定向出借人如实报告影响或可能影响出借人权益的重大信息；</p>
             <p className="answer">（五）确保自身具有与借款金额相匹配的还款能力并按照合同约定还款；</p>
             <p className="answer">（六）借贷合同及有关协议约定的其他义务。</p>
           </li>
           <li className="">
             <p className="question">8：借款人不得从事哪些行为？</p>
             <p className="answer">（一）通过故意变换身份、虚构融资项目、夸大融资项目收益前景等形式的欺诈借款；</p>
             <p className="answer">（二）同时通过多个网络借贷信息中介机构，或者通过变换项目名称、对项目内容进行非实质性变更等方式，就同一融资项目进行重复融资；</p>
             <p className="answer">（三）在网络借贷信息中介机构以外的公开场所发布同一融资项目的信息；</p>
             <p className="answer">（四) 已发现网络借贷信息中介机构提供的服务中含有本办法第十条所列内容，仍进行交易；</p>
             <p className="answer">(五）法律法规和网络借贷有关监管规定禁止从事的其他活动。</p>
           </li>
           <li className="">
             <p className="question">9: 网络借贷中介机构应当履行哪些义务？</p>
             <p className="answer">网络借贷信息中介机构应当履行下列义务：</p>
             <p className="answer">（一）依据法律法规及合同约定为出借人与借款人提供直接借贷信息的采集整理、甄别筛选、网上发布，以及资信评估、借贷撮合、融资咨询、在线争议解决等相关服务；</p>
             <p className="answer">（二）对出借人与借款人的资格条件、信息的真实性、融资项目的真实性、合法性进行必要审核；</p>
             <p className="answer">（三）采取措施防范欺诈行为，发现欺诈行为或其他损害出借人利益的情形，及时公告并终止相关网络借贷活动；</p>
             <p className="answer">（四）持续开展网络借贷知识普及和风险教育活动，加强信息披露工作，引导出借人以小额分散的方式参与网络借贷，确保出借人充分知悉借贷风险；</p>
             <p className="answer">（五）按照法律法规和网络借贷有关监管规定要求报送相关信息，其中网络借贷有关债权债务信息要及时向有关数据统计部门报送并登记；</p>
             <p className="answer">（六）妥善保管出借人与借款人的资料和交易信息，不得删除、篡改，不得非法买卖、泄露出借人与借款人的基本信息和交易信息；</p>
             <p className="answer">（七）依法履行客户身份识别、可疑交易报告、客户身份资料和交易记录保存等反洗钱和反恐怖融资义务；</p>
           </li>
           <li className="">
             <p className="question">10：网络借贷中介机构的十三项禁止性行为？</p>
             <p className="answer">（一）为自身或变相为自身融资；</p>
             <p className="answer">（二）直接或间接接受、归集出借人的资金；</p>
             <p className="answer">（三）向出借人提供担保或者承诺保本保息；</p>
             <p className="answer">（四）自行或委托、授权第三方在互联网、固定电话、移动电话等电子渠道以外的物理场所进行宣传或推介融资项目；</p>
             <p className="answer">（五）发放贷款，但法律法规另有规定的除外；</p>
             <p className="answer">（六）将融资项目的期限进行拆分；</p>
             <p className="answer">（七）发售银行理财、券商资管、基金、保险或信托产品等金融产品；</p>
             <p className="answer">（八）开展资产证券化业务或实现以打包资产、证券化资产、信托资产、基金份额等形式的债权转让行为；</p>
             <p className="answer">（九）除法律法规和网络借贷有关监管规定允许外，与其他机构投资、代理销售、经纪等业务进行任何形式的混合、捆绑、代理；</p>
             <p className="answer">（十）故意虚构、夸大融资项目的真实性、收益前景，隐瞒融资项目的瑕疵及风险，以歧义性语言或其他欺骗性手段进行虚假片面宣传或促销等，捏造、散布虚假信息或不完整信息损害他人商业信誉，误导出借人或借款人；</p>
             <p className="answer">（十一）向借款用途为股票投资、场外配资、期货合约、结构化产品及其他衍生品等高风险的融资提供信息中介服务；</p>
             <p className="answer">（十二）从事股权众筹、实物众筹等业务；</p>
             <p className="answer">（十三）法律法规、网络借贷有关监管规定禁止的其他活动。</p>
           </li>
           <li className="">
             <p className="question">11：信用中介和信息中介的区别？</p>
             <p className="answer">信息中介,平台仅仅公布相关借款信息,由借款人自行判断是否出借资金。 </p>
             <p  className="answer">信用中介,则是平台需要对于借款人借款目的和借款还款担保。</p>
           </li>
           <li className="">
             <p className="question">12：如何保护自己，远离洗钱？</p>
             <p className="answer">（一）选择安全可靠的金融机构；</p>
             <p className="answer">（二）主动配合金融机构进行身份识别；</p>
             <p className="answer">（三）不要出租或出借自己的身份证件；</p>
             <p className="answer">（四）不要出租提现或出借自己的账户、银行卡和U盾；</p>
             <p className="answer">（五）不要用自己的账户替他人借款。</p>
           </li>
         </ul>
       </div>
      </div>
    );
  }
}
