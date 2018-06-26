import { stringify } from 'qs';
import request from '../utils/request';
import { build } from '../common/systemParam';

let BASE_URL = 'http://test.5izjb.com:8001'; // 测试服务器
if (build === 'production') {
  // 远端
  BASE_URL = 'http://test.5izjb.com:8001';
  document.title ="众借帮--客户测试环境";
} else if (build === 'test') {
  //  测试
  BASE_URL = 'http://dev3api.zjb188.com:7956';
  document.title ="众借帮--本地测试环境";
} else if (build === 'local') {
  /*开发配置*/
  BASE_URL = 'http://192.168.1.173:8001';
  document.title ="众借帮--开发环境";

}

export const POSITION_KEY = 'd5bf6909751ae65e4406e1bf656ecb59'; // 高德地图key

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
export async function getPersonalMoney(params) {
  return request(`${BASE_URL}/zjb-website/account/getOne`, {
    method: 'POST',
    body: params,
  })
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

// //获取提现的银行卡的接口
// export async function getBankCard(param) {
//   return request(`${BASE_URL}/zjb-website/userBankCard/account/info?accountId=${param}`);
// }

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
    body: params
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
  return request(`${BASE_URL}/zjb-website/login/sendMessage?mobile=${param}`);
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


//修改密码，获取手机号
export async function changePW(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/forgetPwd?loginName=${param}`)
}

//校验修改密码时的验证码
export async function checkCode(param, params) {
  return request(`${BASE_URL}/zjb-website/userInfo/checkAuthCode?mobile=${param}&authCode=${params}`)
}

//修改密码
export async function changePassword(params){
  return request(`${BASE_URL}/zjb-website/userInfo/updatePwd`,{
    method:'POST',
    body:{
      ...params
    }
  })
}

//站内消息获取按钮类型
export async function getButtonType() {
  return request(`${BASE_URL}/zjb-website/msg/types`);
}
//根据按钮类型查数据
export async function getMessageType(params){
  return request(`${BASE_URL}/zjb-website/msg/getMsgByType`,{
    method:'POST',
    body: {
      ...params
    }

  })
}
//查询单个信息
export async function getOneMessage(param) {
  return request(`${BASE_URL}/zjb-website/msg/getOneMsg?fid=${param}`);
}
//设置已读消息
export async function setRead(params){
  return request(`${BASE_URL}/zjb-website/msg/setRead`,{
    method:'POST',
    body: {...params}

  })
}
//设置已读全部
export async function setAllRead() {
  return request(`${BASE_URL}/zjb-website/msg/setAllRead`);
}
//删除消息
export async function setDelete(params){
  return request(`${BASE_URL}/zjb-website/msg/delete`,{
    method:'POST',
    body: params
  })
}

//查询站内公告
export async function getPlantNotice(param, params) {
  return request(`${BASE_URL}/zjb-manage/notice/getSiteNotice?pageIndex=${param}&pageSize=${params}`);
}

//查询单个站内公告
export async function getOPlantNotice(param) {
  return request(`${BASE_URL}/zjb-manage/notice/getOneNotice?fid=${param}`);
}

//查询平台公告
export async function getSiteNotice(param, params) {
  return request(`${BASE_URL}/zjb-manage/notice/getPlatNotice?pageIndex=${param}&pageSize=${params}`);
}

//查询我的投资列表
export async function getMyInvestment(params) {
  return request(`${BASE_URL}/zjb-website/invRecord/MyInvRecord`, {
    method:'POST',
    body: {...params}
  });
}

//二次分配接口
export async function distribution(param, params, returnUrl) {
  return request(`${BASE_URL}/zjb-dc/author/open?willStr=${param}&companyNo=${params}&notifyPageUrl=${returnUrl}`);
}

//查询授权状态
export async function authorizationState(param) {
  return request(`${BASE_URL}/zjb-dc/author/authorized?companyNo=${param}`);
}

//取消授权
export async function closeAuthorization(num, companyNo, returnUrl) {
  return request(`${BASE_URL}/zjb-dc/author/close?willStr=${num}&companyNo=${companyNo}&notifyPageUrl=${returnUrl}`);
}

// 通过金额和项目ID收益计划
export async function getIncomePlan(projectId, money) {
  return request(`${BASE_URL}/zjb-website/invRecord/getEarPlan?projectId=${projectId}&money=${money}`)
}
 
//修改或删除企业列表信息
export async function UpdataOrDele(params) {
  return request(`${BASE_URL}/zjb-website/company/deleteOrUpdate`,{
      method:'POST',
      body: {
        ...params
      }
    })
}

// 订单去付款接口
export async function toPayment(param, returnUrl) {
  return request(`${BASE_URL}/zjb-dc/investment/payment?invRecordId=${param}&notifyPageUrl=${returnUrl}`)
}

// 删除订单
export async function delOrder(param) {
  return request(`${BASE_URL}/zjb-website/invRecord/delInvRecord?invId=${param}`)
}

// 投资总览年度
export async function selectYearInvest(param) {
  return request(`${BASE_URL}/zjb-website/invRecord/getInvReview?year=${param}`)
}

//所在城市结构
export async function getCityInvest(param) {
  return request(`${BASE_URL}/zjb-website/invRecord/getCityNum?projectId=${param}`)
}

//男女所占比例
export async function getGender(param) {
  return request(`${BASE_URL}/zjb-website/invRecord/getGenderNum?projectId=${param}`)
}

//获取年龄
export async function getAge(param) {
  return request(`${BASE_URL}/zjb-website/invRecord/getAgeNum?projectId=${param}`)
}

//获取投资额度
export async function getInvest(param) {
  return request(`${BASE_URL}/zjb-website/invRecord/getInvNum?projectId=${param}`)
}

//回款计划
export async function repayPlan(params) {
  return request(`${BASE_URL}/zjb-website/account/getRepayPlan`,{
    method:'POST',
    body: {
      ...params
    }
  })
}

// 项目收藏接口
export async function setProjectCollection(params) {
  return request(`${BASE_URL}/zjb-website/projectCollection/save`,{
    method:'POST',
    body: {
      ...params
    }
  })
}

// 项目收藏列表
export async function getCollectionProject() {
  return request(`${BASE_URL}/zjb-website/projectCollection/list`)
}

// 项目收藏改变金额
export async function setCollectionMoney(params) {
  return request(`${BASE_URL}/zjb-website/projectCollection/update`, {
    method:'POST',
    body: {
      ...params
    }
  })
}

// 删除收藏项目中的项目
export async function delCollectionProject(param) {
  return request(`${BASE_URL}/zjb-website/projectCollection/delete?collectionIds=${param}`);
}

// 解锁锁定用户的接口
export async function relieveAccountAjax(mobile, authcode) {
  return request(`${BASE_URL}/zjb-website/login/relieve?mobile=${mobile}&authcode=${authcode}`)
}

// 查询平台报告
export async function selectPlatformReport() {
  return request(`${BASE_URL}/zjb-manage/report/show/platform`)
}

// 查询财务报表
export async function selectFinancialStatements() {
  return request(`${BASE_URL}/zjb-manage/report/show/financial`)
}

// 实名认证接口
export async function verifyIdcard(params) {
  return request(`${BASE_URL}/zjb-website/jh/idcard`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 银行卡信息校验——聚合数据校验
export async function verifyBankCard(param) {
  return request(`${BASE_URL}/zjb-website/jh/bankCardInfo?bankCard=${param}`);
}

// 银行卡绑定
export async function bindBankCard(params) {
  return request(`${BASE_URL}/zjb-website/bankcard/add`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取已绑定的银行卡列表
export async function getBankCardList(param) {
  return request(`${BASE_URL}/zjb-website/bankcard/list?accountId=${param}`);
}

// 获取用户基础信息与login相同
export async function getLoginData() {
  return request(`${BASE_URL}/zjb-website/login/getData`)
}

// 解除银行卡绑定接口
export async function unbindBankCard(params) {
  return request(`${BASE_URL}/zjb-website/bankcard/delete`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 测试开户
export async function testSocket() {
  return request(`${BASE_URL}/zjb-dc/test/socket`)

}

//忘记密码获取验证码及检验是否实名认证
export async function fp_getCode(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/forgetPwd?loginName=${param}`);
}

//忘记密码检验信息
export async function fp_checkInfo(params) {
  return request(`${BASE_URL}/zjb-website/userInfo/checkAuthCode`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

//查询ip记录
export async function getIPRecord(params) {
  return request(`${BASE_URL}/zjb-website/login/rcord`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


//查询券额明细
export async function getVoucher(params) {
  return request(`${BASE_URL}/zjb-website/coupon/convert/record`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

// 获取收藏项目列表（新）
export async function getCollectionProjectNew(param) {
  return request(`${BASE_URL}/zjb-website/projectCollection/list`, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

// 获取收藏项目个数
export async function getCollectionCount(param) {
  return request(`${BASE_URL}/zjb-website/projectCollection/flagCount`);
}

// 基础资料获取兴趣接口
export async function getHobbyList() {
  return request(`${BASE_URL}/zjb-website/userInfo/hobbyList`);
}

// 获取回款计划按时间查数据
export async function receivePlanByTime(param) {
  return request(`${BASE_URL}/zjb-website/account/repayPlan/bottom/byTime`, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

// 获取回款计划页面上半部分数据
export async function receivePlanByTop() {
  return request(`${BASE_URL}/zjb-website/account/repayPlan/top`)
}

//校验邮箱是否存在
export async function checkEmail(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/checkEmail?email=${param}`);
}
//邮箱绑定
export async function bindEmail(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/bindEmail?email=${param}`);
}

//更改邮箱
export async function UpdateEmail(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/updateEmail`, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

//更改绑定邮箱
export async function UpdateEmail_(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/bindingNewEmail`, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

//修改登陆密码1
export async function UpdatePass(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/updatePassword`, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}

//
export async function changePass(param) {
  return request(`${BASE_URL}/zjb-website/userInfo/verifyForPassword`, {
    method: 'POST',
    body: {
      ...param,
    },
  });
}
