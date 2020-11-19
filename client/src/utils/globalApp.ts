/**
 * @description 全局变量
 * @author ronffy
 * @Date 2019-12-06 14:05:26
 * @LastEditTime 2019-12-11 15:18:03
 * @LastEditors ronffy
 */

import subscribe from './subscribe';
import Taro, { getSystemInfoSync } from '@tarojs/taro';

export interface GlobalAppData {
  openId: string
  Authorization: string
  scene: number
  systemInfo: getSystemInfoSync.Return
}

type Listener = (data: GlobalAppData, preData: GlobalAppData) => void

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

class GlobalApp {
  private _data: GlobalAppData = {
    openId: '',
    Authorization: Taro.getStorageSync('Authorization'),
    scene: 0,                // 场景值
    systemInfo: Taro.getSystemInfoSync(),
  }

  get<K extends keyof GlobalAppData>(key: K): GlobalAppData[K] {
    return this._data[key];
  }

  getAll(): GlobalAppData {
    return this._data
  }

  set<T extends GlobalAppData, K extends keyof GlobalAppData>(key: K, value: T[K]): void {
    const preData = { ...this._data };
    this._data[key] = value;
    for (const listener of this._listeners) {
      listener(this._data, preData);
    }
  }

  update(obj: Partial<GlobalAppData>): void {
    const preData = { ...this._data };
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        this._data[key] = value;
      }
    }
    for (const listener of this._listeners) {
      listener(this._data, preData);
    }
  }

  private _listeners: Listener[] = []
  subscribe(listener: Listener) {
    return subscribe<Listener>(listener, this._listeners);
  }

}

const globalApp = new GlobalApp();

(global as any).globalApp = globalApp;

export default globalApp
