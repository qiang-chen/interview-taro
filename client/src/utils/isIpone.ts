/**
 * @description 判断是否是 iPhone 手机
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-22 14:26:27
 * @LastEditors cq
 */

import globalApp from "./globalApp";

const systemInfo = globalApp.get('systemInfo');
const model = systemInfo.model;

export default function isIPhone(name?: string) {
  return name ? model.includes(`iPhone ${name}`) : model.includes('iPhone')
}
