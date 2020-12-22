/**
 * @description 延时方法
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-22 14:24:37
 * @LastEditors cq
 */


export default function delay(timeout: number) {
  return new Promise<void>(res => {
    setTimeout(() => {
      res();
    }, timeout);
  })
}
