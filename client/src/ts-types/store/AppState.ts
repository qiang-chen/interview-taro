import { getUserInfo } from "@tarojs/taro"

/**
 * @description 全局 state
 * @author ronffy
 * @Date 2019-12-01 11:56:10
 * @LastEditTime 2020-11-17 16:06:55
 * @LastEditors cq
 */
export type UserInfo = getUserInfo.PromisedPropUserInfo

type AppState = {
	userInfo: UserInfo
}

export default AppState
