/**
 * @description 延时方法
 * @author ronffy
 * @Date 2019-12-06 14:42:55
 * @LastEditTime 2020-11-20 15:02:50
 * @LastEditors cq
 */

export default function delay(timeout: number) {
  return new Promise(res => {
    setTimeout(() => {
      res();
    }, timeout);
  })
}
