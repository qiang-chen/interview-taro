/**
 * @description 获取状态栏高度
 * @author ronffy
 * @Date 2019-12-10 11:29:31
 * @LastEditTime 2019-12-10 11:41:37
 * @LastEditors ronffy
 */
import globalApp from "./globalApp";

const systemInfo = globalApp.get('systemInfo');
const statusBarHeight = systemInfo.statusBarHeight;

export default function getStatusBarHeight() {
  return statusBarHeight;
}
