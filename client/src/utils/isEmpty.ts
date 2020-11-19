/**
 * @description 判断一个对象是否为空
 * @author ronffy
 * @Date 2019-12-18 20:08:44
 * @LastEditTime 2019-12-18 20:34:28
 * @LastEditors ronffy
 */
import getTag from "./getTag";

export default function isEmpty(value: any): boolean {
  if (value == null) {
    return true;
  }
  if (Array.isArray(value) || typeof value === 'string') {
    return !value.length
  }
  const tag = getTag(value);
  if (tag === '[object Map]' || tag === '[object Set]') {
    return !value.size
  }
  if (tag === '[object Object]') {
    return !Object.keys(value).length
  }

  return true;
}