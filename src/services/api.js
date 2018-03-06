import { stringify } from 'qs';
import request from '../utils/request';

export const BASE_URL = 'http://192.168.1.4:8001';
// const BASE_URL = 'http://139.199.14.60:8001'; // 远端
// const BASE_URL = 'http://zjbapi.ikingtech.club:8080'; // 远端

export const POSITION_KEY = 'd5bf6909751ae65e4406e1bf656ecb59';

// 获取图片签名token
export async function getAuth({method, pathname}) {
  return request(`${BASE_URL}/zjb-website/common/sign?method=${method}&pathname=${pathname}`);
}

export async function userLogin(param) {
  return request(`${BASE_URL}/zjb-website/login/login`, {
    method: 'POST',
    body: {
      ...param
    }
  });
}

export async function getLocation() {
	return request(`http://restapi.amap.com/v3/ip?&key=${POSITION_KEY}`);
}

export async function getHomeSwiperImg(param) {
  return request(`${BASE_URL}/zjb-website/webpage/banner?ftype=${param}`);
}

export async function getHomeProjectList(param) {
  return request(`${BASE_URL}/zjb-website/project/homecard?cityCode=${param ? param : ''}`);
}

export async function getProjectList(params) {
  return request(`${BASE_URL}/zjb-website/project/list`,{
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取账户信息的接口 ftype 0: 个人账户 1: 企业账户
export async function getPersonAccount(param) {
  return request(`${BASE_URL}/zjb-website/account/info?ftype=${param}`)
}

// 获取个人账户.企业账户信息的接口
export async function getPersonAccountNew(params) {
  return request(`${BASE_URL}/zjb-website/account/show/info`,{
    method: 'POST',
    body: {
      ...params
    }
  });
}

//获取有账户的企业信息列表的接口
export async function getCompanylist() {
  return request(`${BASE_URL}/zjb-website/account/company/list`)
}


// 提交开户资料的接口
export async function commitOpenAccount(params) {
  return request(`${BASE_URL}/zjb-dc/account/add`,{
    method: 'POST',
    body: {
      ...params,
    },
  })
}

export async function getProjectDetail(param) {
  return request(`${BASE_URL}/zjb-website/projectInfo/getOne?projectId=${param}`);
}

// 存储用户基础信息的接口
export async function saveUserBase(params) {
  return request(`${BASE_URL}/zjb-website/userInfo/saveUserInfo`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}



// 获取用户基础信息的接口
export async function getUserBaseData() {
  return request(`${BASE_URL}/zjb-website/userInfo/findOne`);
}

// 获取安全中心 首页数据接口
export async function getSafeData() {
  return request(`${BASE_URL}/zjb-website/securityCenter/findByuserId`)
  // return request(`http://192.168.1.75:8001/zjb-website/securityCenter/findByuserId`)
}

// 校验手机号是否存在的接口
export async function phoneExist(param) {
  return request(`${BASE_URL}/zjb-website/login/check?mobile=${param}`)
}

// 获取注册验证码的接口
export async function getAuthCode(param) {
  return request(`${BASE_URL}/zjb-website/login/sendMessage?mobile=${param}`)
}

// 注册用户 接口
export async function regUser(params) {
  return request(`${BASE_URL}/zjb-website/login/register`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 测试充值 接口
export async function rechargeTest() {
  return request(`http://zjb2.ngrok.xiaomiqiu.cn/loan/recharge`);
}

//获取消息列表
export async function messageList(params) {
  return request(`${BASE_URL}/zjb-website/notice/record/show/self`,{
    method: 'POST',
    body: {
      ...params,
    }
  });
}

//查看详情
export async function isOrNot(params){
  return request(`${BASE_URL}/zjb-website/notice/specify/read?noticeId=${params}`);
}

// 获取一个问题下所有问题
export async function getAnswerbyQaId(QaId) {
  return request(`${BASE_URL}/zjb-website/answer/getOne?questionId=${QaId}`);
}

// 添加问题回复
export async function addAnswer(params) {
  return request(`${BASE_URL}/zjb-website/answer/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 获取一个项目下所有问题
export async function getProQuestion(projectId) {
  return request(`${BASE_URL}/zjb-website/projectQuestion/getOne?projectId=${projectId}`);
}

// 添加问题
export async function addQuestion(params) {
  return request(`${BASE_URL}/zjb-website/projectQuestion/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 一个项目下的所有话题
export async function getProTopic(projectId) {
  return request(`${BASE_URL}/zjb-website/projectTopic/getOne?projectId=${projectId}`);
}

// 添加话题问题
export async function addQuestionTopic(params) {
  return request(`${BASE_URL}/zjb-website/projectTopic/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 获取我的话题
export async function getMyTopic(projectId) {
  return request(`${BASE_URL}/zjb-website/projectTopic/myTopic?projectId=${projectId}`)
}

// 获取一个话题下的所有回复
export async function getReplyByTopic(topicId) {
  return request(`${BASE_URL}/zjb-website/projectTopicReply/getOne?topicId=${topicId}`)
}

// 添加回复
export async function addReply(params) {
  return request(`${BASE_URL}/zjb-website/projectTopicReply/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 查询项目历程
export async function selectProJourney(projectId) {
  return request(`${BASE_URL}/zjb-website/projectJourney/getOne?projectId=${projectId}`)
}

// 添加项目历程
export async function addProJourney(params) {
  return request(`${BASE_URL}/zjb-website/projectJourney/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 获取项目行业编码类别接口
export async function getProjectType() {
  return request(`${BASE_URL}/zjb-website/apply/getProjectCode`)
}

// 提交充值信息 获取充值所需数据
export async function getRecharge(params) {
  return request(`${BASE_URL}/zjb-dc/account/getRechargeInfo`, {
    method: 'POST',
    body: {
      ...params,
    }
  })
}

// 获取项目详情公告接口
export async function getProjectDetailNotice(param) {
  return request(`${BASE_URL}/zjb-website/projectNotice/getOne?projectId=${param}`);
}

// 获取个人账户余额接口
export async function getPersonalMoney() {
  return request(`${BASE_URL}/zjb-website/account/getOne`)
}

//获取已投资人信息接口
export async function alreadyInvested(params) {
  return request(`${BASE_URL}/zjb-website/invRecord/getOne`, {
    method: 'POST',
    body: {
      ...params,
    }
  })
}

// 点赞接口
export async function clickPraise(param) {
  return request(`${BASE_URL}/zjb-website/projectJourney/praise?journeyId=${param}`);
}

//获取提现的银行卡的接口
export async function getBankCard(param) {
  return request(`${BASE_URL}/zjb-website/userBankCard/account/info?accountId=${param}`);
}

//获取省份对应的城市
export async function getCity(param) {
  return request(`${BASE_URL}/zjb-website/common/cities?provinceId=${param}`);
}

//提交提现表单信息接口
export async function putInformation(params) {
  return request(`${BASE_URL}/zjb-dc/withdrawals/param`, {
    method: 'POST',
    body: {
      ...params,
    }
  })
}
// 提交 借款信息接口
export async function applySave(params) {
  return request(`${BASE_URL}/zjb-website/apply/save`, {
    method: 'POST',
    body: {
      ...params,
    }
  })
}

// 投资接口
export async function Investment(params) {
  return request(`${BASE_URL}/zjb-dc/investment/personal`, {
    method: 'POST',
    body: {
      ...params,
    }
  })
}

// 借款完成
export async function applyCommit(params) {
  return request(`${BASE_URL}/zjb-website/apply/submit`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 获取之前的 借款信息接口
export async function getLoanInfo() {
  return request(`${BASE_URL}/zjb-website/apply/getOne`);
}

// 邮箱验证
export async function getEmailAuth(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/sendEmailVerify?sendTo=${param}`);
}

// 项目城市获取
export async function getCityCode(param) {
  return request(`${BASE_URL}/zjb-website/apply/getCity`);
}

// 安全中心 发送旧手机号接口
export async function getOldPhoneCode(param) {
  return request(`${BASE_URL}/zjb-website/securityCenter/sendMsgOldMobile`);
}

// 通过地址获取 坐标接口
export async function getAddressCoordinate(params) {
  return request(`http://restapi.amap.com/v3/geocode/geo?key=${params.key}&address=${params.address}&batch=${params.batch}`);
}
//旧手机号获取验证码
export async function getOldCode(param) {
  return request(`${BASE_URL}/zjb-website/securityCenter/checkAuthcode?authcode=${param}`)
}
//更新手机号码
export async function changePhoneNum(params) {
  return request(`${BASE_URL}/zjb-website/securityCenter/updataMobile`, {
    method: 'POST',
    body: {
      ...params,
    }
  })
}

//获取新手机号验证码
export async function getNewCode(param) {
  return request(`${BASE_URL}/zjb-website/sendMessage/${param}`);
}

// 判断用户名是否重复
export async function getJudgeUserName(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/checkLoginName?loginName=${param}`);
}

// 用户没开户的公司列表
export async function getNoAccountCompany() {
  return request(`${BASE_URL}/zjb-website/company/self/noaccount`);
}

// 获取投弃前咨询投后跟踪数字
export async function getInvestmentNum(param) {
  return request(`${BASE_URL}/zjb-website/projectInfo/getCount?projectId=${param}`);
}

// 获取个人账户下公司信息
export async function getCompanyByAccount(params) {
  return request(`${BASE_URL}/zjb-website/company/self/list`, {
    method: 'POST',
    body: {
      ...params,
    }
  });
}

// 获取个人借款项目列表
export async function getPersonalProjectList(params) {
  return request(`${BASE_URL}/zjb-website/project/myProject`,{
    method: 'POST',
    body: {
      ...params,
    }
  })
}

// 新建企业
export async function saveCompany(params) {
  return request(`${BASE_URL}/zjb-website/company/save`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}

// 公司登陆接口
export async function loginCompany(param) {
  return request(`${BASE_URL}/zjb-website/company/login?companyId=${param}`)
}

