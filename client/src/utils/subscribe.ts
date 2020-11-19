/**
 * @description 订阅方法
 * @author ronffy
 * @Date 2019-12-06 14:05:40
 * @LastEditTime 2019-12-06 14:08:10
 * @LastEditors ronffy
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
