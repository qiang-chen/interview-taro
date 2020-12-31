/**
 * @description 评论列表
 * @author cq
 * @Date 2020-12-21 19:54:00
 * @LastEditTime 2020-12-21 20:26:47
 * @LastEditors cq
 */



import Taro from '@tarojs/taro'
import { View, Text, Image, Editor, Button, Input } from '@tarojs/components'
import React, { useEffect } from 'react';
import { UserInfo } from '@/ts-types/store/AppState';
import './index.scss'



type CommentListProps = {
  dispatch?: any
}

type Iprops = CommentListProps & Partial<UserInfo>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------



const CommentList: React.FC<Iprops> = ({ }) => {



  return <View className='page-CommentList'>
    <View className='page-CommentList'>
      评论列表
    </View>
    </View>
}



export default CommentList