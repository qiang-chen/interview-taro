/**
 * @description 字符串模版引擎
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-22 14:27:15
 * @LastEditors cq
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
