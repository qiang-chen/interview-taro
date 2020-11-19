/**
 * @description 截取指定长度字符串（正则为处理emoji）
 * @author ronffy
 * @Date 2019-12-01 14:08:53
 * @LastEditTime 2019-12-01 14:11:17
 * @LastEditors ronffy
 */

export default function sliceString(str, start, end) {
  const arr = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g);
  if (!arr) {
    return '';
  }
  return arr.slice(start, end).join('');
}