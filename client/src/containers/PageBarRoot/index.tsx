/**
 * @description 带 bar 的页面根组件
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-18 18:04:37
 * @LastEditors cq
 */

import Taro from '@tarojs/taro';
import React,{ ReactNode, CSSProperties } from 'react';
import getStatusBarHeight from '@/utils/getStatusBarHeight';
import { View } from '@tarojs/components';
import './index.scss';

export interface PageBarRootProps {
  children?: ReactNode
  style?: CSSProperties
  hasNavBar?: boolean // 是否有顶部导航
  hasTabBar?: boolean // 是否有底部tabBar
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const PageBarRoot: React.FC<PageBarRootProps> = ({ children, hasNavBar = true, hasTabBar = false, style = {} }) => {
  if (hasNavBar && typeof style.paddingTop === 'undefined') {
    style.paddingTop = `${getStatusBarHeight() + 43}px`;
  }
  if (hasTabBar && typeof style.paddingBottom === 'undefined') {
    style.paddingBottom = Taro.pxTransform(130);
  }
  return (
    <View
      className='page-barBase'
      style={style}
    >
      {children}
    </View>
  );
}

export default PageBarRoot
