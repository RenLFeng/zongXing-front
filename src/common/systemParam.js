// 手机号验证正则
export const VER_PHONE = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[4-9]{1})|(18[0-9]{1})|(199))+\d{8})$/;

// 身份证号正则
export const ID_CORD = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

// 用户名正则
export const USER_REG = /^[a-zA-Z0-9_-]{4,16}$/;

// 座机电话正则
export const TEL_PHONE = /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/;

// 万象优图
export const IMG_BASE_URL = 'http://zjb01-1255741041.picsh.myqcloud.com/';

//一天多少秒
const DATE_SECONDS = 86400;
//一小时多少秒
const HOURS_SECONDS = 3600;
//一分钟多少秒
const MIN_SECONDS = 60;

//已完成项目的一页显示个数
export const COMPLETE_PAGE_SIZE = 8;
// 正在筹款项目一页显示个数
export const ING_PAGE_SIZE = 6;
// 已完成项目 flag3
export const COMPLETE_PROJECT_FLAG = 3;
export const ING_PROJECT_FLAG = 3;
//搜索项目时的默认值 分别是 信用等级 年华收益率 借款周期 项目名称
export const PROJECT_LEAVE_CODE = '';
export const PROJECT_RATE = -1;
export const PROJECT_PERIOD = -1;
export const PROJECT_NAME = '';

//秒换算倒计时 天/小时/分钟/秒
export function conversionTime(initialTime) {
  if (Math.floor(initialTime/DATE_SECONDS) !== 0) {
    return `${Math.floor(initialTime/DATE_SECONDS)}天`;
  }
  if (Math.floor(initialTime/HOURS_SECONDS) !== 0) {
    return `${Math.floor(initialTime/HOURS_SECONDS)}小时`;
  }
  if (Math.floor(initialTime/MIN_SECONDS) !== 0) {
    return `${Math.floor(initialTime/MIN_SECONDS)}分钟`;
  }
  return `${initialTime}秒`;
}

//页数显示的转换 {}
export function pageShow(currentPage, maxPage) {
  const data = {
    lastPage: false,
    leftEllipsis: false,
    page: [],
    rightEllipsis: false,
    nextPage: false,
    firstPage: false,
    finalPage: false
  };
  // 获取显示的页数
  let str = currentPage + '';
  for (let i = 1; i <= 2; i++) {
    if (currentPage - i >= 1) {
      str = `${currentPage - i},${str}`;
    }
    if (currentPage + i <= maxPage) {
      str = `${str},${currentPage + i}`;
    }
  }
  if (currentPage - 4 > 1) {
    data.leftEllipsis = true
  }
  if (currentPage > 1) {
    data.lastPage = true;
  }
  if (currentPage + 4 < maxPage) {
    data.rightEllipsis = true;
  }
  if (currentPage < maxPage) {
    data.nextPage = true;
  }
  if (str.indexOf(',') !== -1) {
    data.page = str.split(',');
  } else {
    data.page = [currentPage];
  }
  return data;
}

//页数显示的转换 {} 前后带第一页 最后一页
export function pageShows(currentPages, maxPages) {
  const currentPage = currentPages *1 ;
  const maxPage = maxPages * 1;
  const data = {
    lastPage: false,
    leftEllipsis: false,
    page: [],
    rightEllipsis: false,
    nextPage: false,
    firstPage: false,
    finalPage: false
  };
  // 获取显示的页数
  let str = currentPage + '';
  for (let i = 1; i <= 2; i++) {
    if (currentPage - i > 1) {
      str = `${currentPage - i},${str}`;
    }
    if (currentPage + i < maxPage) {
      str = `${str},${currentPage + i}`;
    }
  }
  if (currentPage - 3 > 1) {
    data.leftEllipsis = true
  }
  if (currentPage > 1) {
    data.lastPage = true;
    data.firstPage = true;
  }
  if (currentPage + 3 < maxPage) {
    data.rightEllipsis = true;
  }
  if (currentPage < maxPage) {
    data.nextPage = true;
    data.finalPage = true;
  }
  if (str.indexOf(',') !== -1) {
    data.page = str.split(',');
  } else {
    data.page = [currentPage];
  }
  return data;
}

//跳转锚点
export function scrollToAnchor(anchorName) {
  console.log(12345678);
  if (anchorName) {
    let anchorElement = document.getElementById(anchorName);
    if(anchorElement) { anchorElement.scrollIntoView(); }
  }
}
