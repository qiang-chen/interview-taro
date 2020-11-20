/* eslint-disable import/first */
/**
 * @description app model，公共 state 在这里面定义、处理
 * @author cq
 * @Date 2020-11-17 20:28:36
 * @LastEditTime 2020-11-20 15:33:13
 * @LastEditors cq
 */

import { AppState } from '@/ts-types/store';
import { modelExtend } from './_common';
import { ReduxAction, ReduxSagaEffects } from '@/ts-types/dva';
import { UserInfo } from '@/ts-types/store/AppState';
import Taro from '@tarojs/taro'

const namespace = 'app';

export default modelExtend<AppState>({
  namespace,
  state: {
    userInfo: ({} as UserInfo),
  },
  effects: {
    *updateUserInfo({ payload }: ReduxAction, { put }: ReduxSagaEffects) {
      const userInfo = payload;
      yield put({
        type: 'updateState',
        payload: {
          userInfo
        }
      })

      yield Taro.cloud.callFunction({
        // 要调用的云函数名称
        name: 'login',
        data: { userInfo }
      })
    }
  }
});
