/**
 * @description 截断指定长度字符串，以指定标识结尾
 * @author ronffy
 * @Date 2019-12-01 14:08:53
 * @LastEditTime 2019-12-01 14:11:30
 * @LastEditors ronffy
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
