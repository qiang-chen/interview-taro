/**
 * @description 生成 dva store
 * @author cq
 * @Date 2020-11-17 20:20:34
 * @LastEditTime 2020-11-17 20:20:44
 * @LastEditors cq
 */

import dva from './dva';
import models from '../models';

export default function createStore(options?) {
  const dvaApp = dva({
    initialState: {},
    models,
    ...options
  })
  return dvaApp.getStore();
}
