/**
 * @description 判断一个对象是否为空
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-22 14:26:17
 * @LastEditors cq
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