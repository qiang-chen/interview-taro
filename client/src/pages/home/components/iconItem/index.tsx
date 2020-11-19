/**
 * @description 首页icon列表
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-18 17:57:53
 * @LastEditors cq
 */

import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import pagePath from '@/config/pagePath'
import GetUserInfo from '@/containers/GetUserInfo'
import isEmpty from "@/utils/isEmpty"
import React from 'react'
import "./index.scss"


type Iprops = {
  names: string;
  content: string;
  icon: string;
  onChangeItem: () => void
}


function IconItem(props: Iprops) {
  const skip = (names) => {
    switch (names) {
      case "bs1":
        Taro.navigateTo({ url: pagePath.questionList })
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
  }
  const { icon, content, names } = props;
  return (
    <GetUserInfo>
      <View className='icon_item' onClick={() => skip(names)}>
        <View className={"icon" + " " + names}><Image src={icon} className='img' /></View>
        <View className='content'>{content}</View>
      </View>
    </GetUserInfo>
  )
}

export default IconItem
