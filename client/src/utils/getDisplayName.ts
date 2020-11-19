/**
 * @description 给高阶函数添加displayName
 * @author ronffy
 * @Date 2019-12-01 14:08:53
 * @LastEditTime 2019-12-01 14:11:57
 * @LastEditors ronffy
 */

export default function getDisplayName(WarpedComponent) {
  return WarpedComponent.displayName || WarpedComponent.name || 'Component';
}
