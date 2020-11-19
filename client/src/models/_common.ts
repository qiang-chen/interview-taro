/**
 * @description 公共 model
 * @author cq
 * @Date 2019-12-01 11:55:45
 * @LastEditTime 2020-11-17 15:59:35
 * @LastEditors cq
 */
import _modelExtend from 'dva-model-extend'
import { DvaModel } from '@/ts-types/dva';

const commonModel = {
  reducers: {
    updateState (state: any, { payload }: any) {
      return {
        ...state,
        ...payload,
      }
    },
    error(state: any, { payload }: any) {
      return {
        ...state,
        error: payload,
      }
    },
    updateParams(state: any, { payload }: any) {
      const { params } = state;
      return {
        ...state,
        params: {
          ...params,
          ...payload
        }
      }
    },
    updatePagination(state: any, { payload }: any) {
      const { pagination } = state;
      return {
        ...state,
        pagination: {
          ...pagination,
          ...payload
        }
      }
    }
  },
}

const modelExtend = <T>(model: DvaModel<T>): DvaModel<T> => _modelExtend(commonModel, model);

export {
  modelExtend,
  commonModel,
}