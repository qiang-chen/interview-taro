/**
 * @description 中间的 bar
 * @author cq
 * @Date 2019-12-01 15:10:00
 * @LastEditTime 2021-01-02 23:05:01
 * @LastEditors cq
 */
import { View, Image } from '@tarojs/components'
import classNames from 'classnames';
import React from 'react';
import './MiddleBar.scss';

type MiddleBarProps = {
  className?: string
  image: string
  onClick?(): void
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const MiddleBar: React.FC<MiddleBarProps> = ({
  className,
  image,
  onClick = () => {},
}: MiddleBarProps) => {
  return (
    <View className={classNames('comp-MiddleBar', className)} onClick={onClick}>
      <View className='img-box'>
        <Image mode='widthFix' src={image}></Image>
      </View>
    </View>
  )
}

export default MiddleBar
