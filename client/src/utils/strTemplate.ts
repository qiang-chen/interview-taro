/**
 * @description 字符串模版引擎
 * @author ronffy
 * @Date 2019-12-01 14:08:53
 * @LastEditTime 2019-12-01 14:11:09
 * @LastEditors ronffy
 */

/**
 * @param tpl 模版字符串
 * @param data 注入模版中的数据
 * @param {type} 
 * @return 
 */
export default function strTemplate(tpl, data) {
  if (!data) {
    return tpl;
  }
  return tpl.replace(/{(.*?)}/g, (_match, key) => data[key.trim()]);
}
