/**
 * @description 延时方法
 * @author ronffy
 * @Date 2019-12-06 14:42:55
 * @LastEditTime 2019-12-06 14:43:48
 * @LastEditors ronffy
 */

export default function delay(timeout: number) {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, timeout);
  })
}
