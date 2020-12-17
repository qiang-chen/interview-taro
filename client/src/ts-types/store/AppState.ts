import { getUserInfo } from "@tarojs/taro"

/**
 * @description 全局 state
 * @author ronffy
 * @Date 2019-12-01 11:56:10
 * @LastEditTime 2020-12-17 16:10:32
 * @LastEditors cq
 */
export type UserInfo = getUserInfo.PromisedPropUserInfo

type AppState = {
	userInfo: UserInfo
	openid:string
}

export default AppState
