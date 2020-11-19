/* eslint-disable import/first */
/**
 * @description tabBar tab菜单
 * @author cq
 * @Date 2020-11-18 13:54:52
 * @LastEditTime 2020-11-18 20:14:59
 * @LastEditors cq
 * 文档见: https://taro-ui.aotu.io/#/docs/tabbar
 */

import { View, Image } from '@tarojs/components'
import classNames from 'classnames';
import { AtTabBarProps } from 'taro-ui/@types/tab-bar';
import { AtBadge } from 'taro-ui';
import MiddleBar from './MiddleBar';
import Taro from '@tarojs/taro';
import React from 'react';
import './index.scss';


type CusTabBarProps = AtTabBarProps & {
  cusClassName?: string
  middleBarImg?: string
  onClickMiddle?(): void
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const CusTabBar: React.FC<CusTabBarProps> = ({
  color,
  iconSize,
  fontSize,
  selectedColor,
  fixed = false,
  current = 1,
  tabList = [],
  onClick = () => { },
  onClickMiddle = () => { },
  middleBarImg,
}: CusTabBarProps) => {

  // const { isIPhoneX } = this.state
  const defaultStyle = {
    color: color || ''
  }
  const selectedStyle = {
    color: selectedColor || ''
  }
  const titleStyle = {
    fontSize: fontSize ? `${fontSize}px` : ''
  }
  const imgStyle = {
    width: `${iconSize}px`,
    height: `${iconSize}px`
  }
  const res = Taro.getSystemInfoSync();
  //console.log(res.screenHeight - res.windowHeight - res.statusBarHeight);

  //const styleBottom = res.model.search("iPhone X") != -1 ? { marginBottom: "32px" } : { marginBottom: "0px" };
  const styleBottom = (res.screenHeight - res.windowHeight - res.statusBarHeight === -44) ? { marginBottom: "22px"} : { marginBottom: "0px" };
  return (
      <View
        className={classNames('comp-cusTabBar', {
          'comp-cusTabBar--fixed': fixed
        }, 'cusClassName')}
        style={styleBottom}
      >
        <View className='comp-cusTabBar-container'>
          {
            tabList.map((item, i) => {
              return (
                <View
                  className={classNames('comp-cusTabBar__item', {
                    'comp-cusTabBar__item--active': current === i
                  })}
                  style={current === i ? selectedStyle : defaultStyle}
                  key={item.title}
                  onClick={onClick.bind(null, i)}
                >
                  {item.image ? (
                    <AtBadge dot={!!item.dot} value={item.text} maxValue={item.max}>
                      <View className='comp-cusTabBar__icon'>
                        <Image
                          className={classNames(
                            'comp-cusTabBar__inner-img', {
                            'comp-cusTabBar__inner-img--inactive': current !== i
                          })}
                          mode='widthFix'
                          src={item.selectedImage || item.image}
                          style={imgStyle}
                        ></Image>
                        <Image
                          className={classNames(
                            'comp-cusTabBar__inner-img', {
                            'comp-cusTabBar__inner-img--inactive': current === i
                          })}
                          mode='widthFix'
                          src={item.image}
                          style={imgStyle}
                        ></Image>
                      </View>
                    </AtBadge>
                  ) : <MiddleBar image={middleBarImg} onClick={onClickMiddle} />}

                  <View>
                    <AtBadge
                      dot={item.image ? false : !!item.dot}
                      value={item.image ? null : item.text}
                      maxValue={item.image ? null : item.max}
                    >
                      <View className='comp-cusTabBar__title' style={titleStyle}>
                        {item.title}
                      </View>
                    </AtBadge>
                  </View>
                </View>
              )
            })
          }
        </View>
      </View>
  )
}

(CusTabBar as any).externalClasses = ['cusClassName'];

export default CusTabBar
