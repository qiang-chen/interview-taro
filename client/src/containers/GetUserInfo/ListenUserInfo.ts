/**
 * @description 监听 userInfo 的变化，构建一个监听函数
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-17 15:57:56
 * @LastEditors cq
 */

import delay from "@/utils/delay";
import { UserInfo } from '@/ts-types/store/AppState';
import isEmpty from "@/utils/isEmpty";

type ListenStatus = 'INIT' | 'WAITING' | 'DONE' | 'FAIL'

interface Config {
  waitTime: number // 最多等待时长 默认20s 单位:ms
  oneceTime: number // 单次等待时长 默认 100ms 单位:ms
}

export default class ListenUserInfo {
  private config: Config

  constructor(config?: Config) {
    this.config = {
      waitTime: 200000, // 最多等待时长 默认20s
      oneceTime: 100, // 单次等待时长 默认 100ms
      ...config,
    }
  }

  status: ListenStatus = 'INIT';

  /**
   * @author ronffy
   * @param {Function} callback 要监听的函数，当用户信息不存在时，则等待授权用户信息后，再执行该 callback
   * @param {UserInfo} userInfo 用户信息
   * @return {Function} 重新生成一个函数代替 callback。如果
   */
  createListener(callback: Function, userInfo: UserInfo) {
    return (...args) => {
      if (!isEmpty(userInfo)) {
        callback(...args);
        return;
      }
      this
        .wait()
        .then((status) => {
          if (status !== 'DONE') {
            return;
          }
          callback(...args);
        })
    }
  }

  async wait(): Promise<ListenStatus> {
    const { waitTime, oneceTime } = this.config;
    const waitBout = waitTime / oneceTime;
    let i = 0;
    this.status = 'WAITING';

    while (this.status === 'WAITING' && ++i < waitBout) {
      await delay(oneceTime);
    }
    const status = (this.status as ListenStatus);
    if (status !== 'INIT') {
      this.status = 'INIT';
    }
    return status;
  }
  done() {
    if (this.status === 'WAITING') {
      this.status = 'DONE';
    }
  }
  fail() {
    if (this.status === 'WAITING') {
      this.status = 'FAIL';
    }
  }
}
