/**
 * @description 截取指定长度字符串（正则为处理emoji）
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-22 14:27:05
 * @LastEditors cq
 */


export default function sliceString(str, start, end) {
  const arr = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g);
  if (!arr) {
    return '';
  }
  return arr.slice(start, end).join('');
}