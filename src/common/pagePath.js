//页面地址常量配置

export default {
  PERSONAL_ACCOUNT: '/index/uCenter/personAccount',  //个人账户页面地址

  USER_BASIC: '/index/uCenter/userBasic', //个人基础资料页面地址
  CHANGE_LPWD: '/index/uCenter/changeLPwd', //修改登陆密码页面地址
  CHANGE_BINDEMAIL: '/index/uCenter/changeBindEmail', //邮箱绑定页面地址
  BIND_EMAIL: '/index/uCenter/bindEmail', //邮箱绑定页面地址
  OPEN_ACCOUNT: '/index/uCenter/openAccount',  //开户页面地址
  SAFE_CENTER: '/index/uCenter/safeCenter', //安全中心页面地址
  REALNAME_AUTHENTICATION: '/index/uCenter/realName', //实名认证页面地址
  AUTHENTICATION: '/index/uCenter/authentication', //实名认证页面
  OPENQACCOUNT: '/index/uCenter/openQAccount', //开通乾多多认证
  IPRECORD: '/index/uCenter/IPRecord', //IP记录页面
  VOUCHER: '/index/uCenter/voucher', //券额明细页面
  PLATFORM_NOTICE: '/index/uCenter/platformNotice', //平台通知页面
  SITE_NOTICE: '/index/uCenter/siteNotice', //站内通知页面

  BINDCARD: '/index/uCenter/bindCard', //绑定银行卡
  COMPANY_ACCOUNT: '/index/uCenter/companyAccount',  //企业账户页面地址
  BANK_CARD: '/index/uCenter/bankCard',  //银行卡管理页面
  BANK_CARD_UPDATE: '/index/uCenter/bankCardUpdate',  //银行卡修改
  BANK_CARD_CREATE: '/index/uCenter/bankCardCreate',  //银行卡绑定
  ACCOUNT_RECHARGE: '/index/uCenter/recharge',  // 充值
  ACCOUNT_WITHDRAWALS: '/index/uCenter/withdrawals',  // 提现  type: 0 个人, 1 企业
  PROJECT_LIST: '/index/projectLoan',  // 项目列表页面
  PROJECT_DETAIL: '/index/projectDetail',  // 项目列表页面
  STATION_MESSAGE: '/index/uCenter/message',  // 站内消息页面
  LOAN_LIST: '/index/uCenter/loanList', //借款项目列表
  COMPANY_LIST: '/index/uCenter/companyList', //借款项目列表
  NOTICE_LIST: '/index/uCenter/noticeList', //站内公告列表
  BIND_SUCCESS: '/index/uCenter/bindSuccess',
  INCOME_PLAN: '/index/uCenter/myInvest/incomePlan', //平台公告列表

  ALL_INVEST:'/index/uCenter/allInvest',  //投资总览

  HOW_INVEST: '/index/howInvest',  // 如何投资页面
  HOW_LOAN: '/index/howLoan',  // 如何投资页面


  Project_Collection:'/index/uCenter/projectcollection',
  INVEST_MENT: '/index/uCenter/InvestMent', //投资记录
  RECEIVE_PLAN: '/index/uCenter/receivePlan',  // 回款计划
  ACCOUNT_STATEMENT:'/index/uCenter/accountstatement',  //资金动态
  MY_COUPON:'/index/uCenter/mycoupon',//我的优惠券
  COUPON_CENTER:'/index/couponCenter',//优惠券交易中心
  My_INVITATION_CODE:'/index/uCenter/myinvitationcode',

//信息披露
  Letter_Statement:'/index/infor/letterstatement',//信披声明
  Compliance_Letter:'/index/infor/complianceLetter',//合规经营承诺书
  Compliance_Report:'/index/infor/complianceReport',//合规经营报告

  OPERATION_INFORMATION: '/index/infor/operationInformation',   //运营信息
  OPEATE_DATA: '/index/infor/operateData', //运营数据
  OPERATIONAL_REPORT: '/index/infor/operationalReport', //运营报告

  AUDIT_INFORMATION: '/index/infor/auditInformation',   //审核信息
  RECORD_INFORMATION: '/index/infor/recordinformation',     //备案信息页面
  Fee_Scale:'/index/infor/feeScale',//收费标准

  ORGANIZATIONAL_INFORMATION: '/index/infor/organizationInformation',  //组织信息页面
  BUSINESS_INFORMATION: '/index/infor/businessInformation',//工商信息
  SHAREHOLDER_INFORMATION: '/index/infor/shareholderInformation',//股东信息
  ORGANIZATIONAL_STRUCTURE: '/index/infor/organizationalStructure',//组织架构
  AFFILIATED_AGENCY: '/index/infor/affiliatedAgency',//分支机构
  OFFICIAL_CHANNEL: '/index/infor/officialChannel',//官方渠道
  IMPORTANT_MATTERS: '/index/infor/importantMatters',//重大事项

  PROJECT_INFORMATION: '/index/infor/projectInformation',   //项目信息
  Audit_Information:'/index/infor/auditInformation',//审计信息
  Risk_Warning:'/index/infor/riskwarning',//风险提醒告知书
  EDUCATION: '/index/infor/education', //投资者教育
  FINANCIAL_STATEMENTS: '/index/infor/financialStatements', //财务报表
// 关于我们
  COMPANY_INTRODUCTION: '/index/infor/companyIntroduction',  //公司介绍
  NOTICE_DETAIL: '/index/infor/plantNotice', //平台公告页面
  MANAGEMENT_TEAM: '/index/infor/managementTeam', //管理团队
  TEAM_PROFILE: '/index/infor/teamProfile', //团队简介
  PROFILE: '/index/infor/profile', //人员概况
  ENTERPRISE_WILL: '/index/infor/enterpriseWill', //企业文化
  JOIN_US: '/index/infor/joinUs', //加入我们
  PLATFORM_ANNOUNCEMENT:'/index/infor/platformAnnouncement', //平台公告
  BIG_EVENTS:'/index/infor/bigEvents', //大事记
  CONTACT_US: '/index/infor/contactUs', //联系我们
  SERVICE_IDEA:'/index/infor/serviceIdea', //服务理念
// 法律法务
  LAWS_REGULATION: '/index/infor/lawsRegulations', //法律法规
  LEGAL_SUPPORT: '/index/infor/legalSupport',//法务支持
  RISK_MANAGEMENT: '/index/infor/riskManagement',//风险控制
  LEGAL_DECLARATION: '/index/infor/legalDeclaration',//法律声明
  SAFE_GUARANTEE: '/index/infor/safeGuarantee',//安全保障
  TERM_SERVICE: '/index/infor/termService',//服务条款
// 合作伙伴
  COOPERATION_PARTNE: '/index/infor/cooperationPartne',//合作伙伴
  TECHNICAL_COOPERATION: '/index/infor/technicalCooperation',//技术合作
  WIND_COOPERATION: '/index/infor/windCooperation', //风控合作
  LEGAL_COOPERATION: '/index/infor/legalCooperation', //法务合作
  SECURITY_COOPERATION: '/index/infor/securityCooperation', //安全合作
  MEDIA_COOPERATION: '/index/infor/mediaCooperation', //媒体合作
// 平台公告
  PLATFORM_REPORT: '/index/infor/platformReport', //平台报告
  ICON_TEST: '/index/infor/iconTest', //图标测试
}
