/**
 * @description 订阅方法
 * @author cq
 * @Date 2020-12-22 14:24:01
 * @LastEditTime 2020-12-22 14:27:35
 * @LastEditors cq
 * @param {*} listener 
 * @param {*} listeners 
 */


export default function subscribe<L>(listener: L, listeners: L[]) {
  if (typeof listener !== 'function') {
    throw new Error('Expected listener to be a function.');
  }

  let isSubscribed = true;
  listeners.push(listener);

  return function unsubscribe() {
    if (!isSubscribed) {
      return;
    }
    isSubscribed = false;

    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);
  }
}
