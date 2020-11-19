/**
 * @description 首页model
 * @author cq
 * @Date 2020-11-17 20:28:46
 * @LastEditTime 2020-11-18 18:21:52
 * @LastEditors cq
 */

import { HomeState } from '@/ts-types/store';
import { modelExtend } from './_common';
// import { fetchNum } from '@services/home';
import { ReduxSagaEffects, ReduxAction } from '@/ts-types/dva';

const namespace = 'home';
export default modelExtend<HomeState>({
  namespace,
  state: {
    
  },
  effects: {
    // *requestNum(_action: ReduxAction, { call, put }: ReduxSagaEffects) {
    //   const { success, data } = yield call(fetchNum);
    //   if (!success || !data) {
    //     return;
    //   }
    //   const { num } = data;
    //   yield put({
    //     type: 'updateState',
    //     payload: {
    //       num
    //     }
    //   })
    // },
  }
});
