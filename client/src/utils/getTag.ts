/**
 * @description 获取一个数据的类型 tag
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-22 14:25:46
 * @LastEditors cq
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