/**
 * @description 自定义 navBar 组件 
 * @author ronffy
 * @Date 2019-12-01 15:10:00
 * @LastEditTime 2020-11-18 19:41:05
 * @LastEditors cq
 * 文档见: https://taro-ui.aotu.io/#/docs/navbar
 */
import React,{ FC, ReactNode, CSSProperties } from 'react';
import { AtNavBar } from 'taro-ui';
import getStatusBarHeight from '@/utils/getStatusBarHeight';
import { AtNavBarProps } from 'taro-ui/@types/nav-bar';

type CusNavBarProps = AtNavBarProps & {
  title?: string
  children?: ReactNode
}



// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const CusNavBar: FC<CusNavBarProps> = ({ 
  title, 
  children, 
  color = '#000', 
  leftIconType,
  onClickLeftIcon,
  customStyle,
}: CusNavBarProps) => {
  return (
    <AtNavBar
      color={color}
      fixed
      title={title}
      leftIconType={leftIconType}
      onClickLeftIcon={onClickLeftIcon}
      customStyle={{
        paddingTop: `${getStatusBarHeight()}px`,
        ...(customStyle as CSSProperties),
      }}
    >
      {children}
    </AtNavBar>
  )
}

export default CusNavBar
