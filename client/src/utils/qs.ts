/**
 * @description 参数序列化
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-22 14:26:35
 * @LastEditors cq
 * @example
 * stringify({ b: 2, a: 1 }) => 'b=2&a=1'
 * stringify({ b: 2, a: 1 }, true) => 'a=1&b=2'
 * parse('a=1&b=2') => { a: 1, b: 2 }
 */

interface Obj {
  [propName: string]: any
}
function stringify(obj: Obj, sort = false): string {
  if (!obj || typeof obj !== 'object') {
    return '';
  }
  let keys = Object.keys(obj);
  if (!keys.length) {
    return '';
  }
  if (sort) {
    keys = keys.sort();
  }
  return keys.reduce((pre, curr, index) => {
    return pre + (
      typeof obj[curr] === 'undefined'
        ? ''
        : `${curr}=${obj[curr]}${index === keys.length - 1 ? '' : '&'}`
    )
  }, '');
}

function parse(str: string): Obj {
  const result = {};
  if (!str || typeof str !== 'string') {
    return result
  }
  for (const item of str.split('&')) {
    if (!item) {
      continue;
    }
    const [key, value] = item.split('=');
    result[key] = value;
  }
  return result;
}

export default {
  stringify,
  parse,
}
