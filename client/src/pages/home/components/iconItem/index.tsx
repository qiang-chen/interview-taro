/**
 * @description 首页icon列表
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-23 14:04:47
 * @LastEditors cq
 */

import Taro from '@tarojs/taro'
import React from 'react'
import { View, Image } from '@tarojs/components'
import pagePath from '@/config/pagePath'
import GetUserInfo from '@/containers/GetUserInfo'
import { UserInfo } from '@/ts-types/store/AppState'
import ListenUserInfo from '@/containers/GetUserInfo/ListenUserInfo'
import "./index.scss"
import isEmpty from '@/utils/isEmpty'


type Iprops = {
  names: string;
  content: string;
  icon: string;
  onChangeItem: () => void
  userInfo: UserInfo
}

const listenUserInfo = new ListenUserInfo();
function IconItem(props: Iprops) {
  const skip = listenUserInfo.createListener((names) => {
    switch (names) {
      case "bs1":
        Taro.navigateTo({ url: pagePath.questionInput })
        break;
      case "bs2":
        Taro.navigateTo({ url: pagePath.questionList })
        break;
      case "bs3":
        Taro.navigateTo({ url: pagePath.forum })
        break;
      default:
        break;
    }
  }, props.userInfo)
  const { icon, content, names } = props;
  const handleGetUserInfo = (info?) => {
    if (!isEmpty(props.userInfo)) {
      // 授权过停止
      return;
    }
    // 授权失败
    if (typeof info === 'undefined') {
      listenUserInfo.fail();
      return;
    }
    listenUserInfo.done();
  }

  return (
    <GetUserInfo userInfo={props.userInfo} onGetUserInfo={handleGetUserInfo}>
      <View className='icon_item' onClick={() => skip(names)}>
        <View className={"icon" + " " + names}><Image src={icon} className='img' /></View>
        <View className='content'>{content}</View>
      </View>
    </GetUserInfo>
  )
}

export default IconItem
