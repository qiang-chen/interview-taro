/**
 * @description 判断是否是 iPhone 手机
 * @author ronffy
 * @Date 2019-12-10 11:29:31
 * @LastEditTime 2019-12-10 11:39:26
 * @LastEditors ronffy
 */
import globalApp from "./globalApp";

const systemInfo = globalApp.get('systemInfo');
const model = systemInfo.model;

export default function isIPhone(name?: string) {
  return name ? model.includes(`iPhone ${name}`) : model.includes('iPhone')
}
