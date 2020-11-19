/**
 * @description 获取一个数据的类型 tag
 * @author ronffy
 * @Date 2019-12-18 20:08:44
 * @LastEditTime 2019-12-18 20:38:44
 * @LastEditors ronffy
 */
const toString = Object.prototype.toString;

type Tag = '[object Undefined]' | '[object Null]' | '[object Number]' | '[object String]'
  | '[object Set]' | '[object Object]' | '[object Array]' | '[object Boolean]'
  | '[object Map]' | '[object Function]' | '[object Symbol]' | '[object Arguments]'

export default function getTag(value: any): Tag {
  if (value == null) {
    return value === undefined ? '[object Undefined]' : '[object Null]'
  }
  return toString.call(value);
}