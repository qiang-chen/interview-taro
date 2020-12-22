/**
 * @description  截断指定长度字符串，以指定标识结尾
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-22 14:24:48
 * @LastEditors cq
 */


import sliceString from './sliceString';

export default function cutStr(str, max, endSign = '...') {
  try {
    if (!str || typeof str !== 'string') {
      return '';
    }

    if (str.length <= max) {
      return str;
    }
    return sliceString(str, 0, max) + endSign
  } catch (error) {
    return ''
  }
}
