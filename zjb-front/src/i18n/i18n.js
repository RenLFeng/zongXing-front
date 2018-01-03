//国际化方法的封装
import IntlMessageFormat from 'intl-messageformat';
import zh from './locale/zh';
import en from './locale/en';
const MESSAGES = { en, zh }; // -> 适用的语言
const LOCALE = 'zh'; // -> 这里写上你的决定语言的方法，例如可以从cookie判断语言


//国际化方法封装
//defaultMessage如果没有对应字段 默认的文字
function get(key, defaultMessage, options) {
  let msg = MESSAGES[LOCALE][key];
  if (msg == null) { //判断null 和 undefined
    if (defaultMessage != null) {
      return defaultMessage;
    }
    return key;
  }
  //一些时间转化格式等配置
  if (options) {
    msg = new IntlMessageFormat(msg, LOCALE);
    return msg.format(options);
  }
  return msg; 
}

export default get;