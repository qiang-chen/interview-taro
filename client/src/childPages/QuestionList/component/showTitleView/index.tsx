/**
 * @description 容器组件  展示每个题的标题
 * @author cq
 * @Date 2020-11-24 21:10:03
 * @LastEditTime 2020-11-24 21:12:00
 * @LastEditors cq
 */


import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import React from 'react';


type ShowTitleViewProps = {
  title: string
}

type Iprops = ShowTitleViewProps

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------



const ShowTitleView: React.FC<Iprops> = ({
  title
}) => {


  return <View>
    {title}
  </View>
}

export default ShowTitleView
