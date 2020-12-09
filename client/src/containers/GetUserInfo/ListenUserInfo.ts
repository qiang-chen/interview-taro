/**
 * @description 监听 userInfo 的变化，构建一个监听函数
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-12-09 15:55:07
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

  status: ListenStatus = 'INIT';  //初始状态

  /**
   * @author cq
   * @param {Function} callback 要监听的函数，当用户信息不存在时，则等待授权用户信息后，再执行该 callback
   * @param {UserInfo} userInfo 用户信息
   * @return {Function} 重新生成一个函数代替 callback
   */
  createListener(callback: Function, userInfo: UserInfo) {
    return (...args) => {
      // 用户信息存在
      if (!isEmpty(userInfo)) {
        callback(...args);
        return;
      }
      this
        .wait()
        .then((status) => {  
          // 执行完等待函数看是否授权成功
          if (status !== 'DONE') {   
            return;
          }
          // 成功执行
          callback(...args);
        })
    }
  }

  async wait(): Promise<ListenStatus> {
    const { waitTime, oneceTime } = this.config;
    const waitBout = waitTime / oneceTime;   //尝试次数
    let i = 0;
    this.status = 'WAITING';  //等待

    // 在等待的过程  如果用户点击了授权 将不再进入此循坏
    while (this.status === 'WAITING' && ++i < waitBout) {
      await delay(oneceTime);   //延迟函数  每次等待100ms
    }
    const status = (this.status as ListenStatus);
    if (status !== 'INIT') {
      this.status = 'INIT';  //20ms还不授权当授权失败处理 恢复到初始值
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
