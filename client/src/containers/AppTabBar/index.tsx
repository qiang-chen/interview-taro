/**
 * @description 全局的 tabBar
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-19 14:56:12
 * @LastEditors cq
 */

import Taro, { ComponentClass } from '@tarojs/taro';
import CusTabBar from '@/components/CusTabBar';
import config from '@/config';
import pagePath from '@/config/pagePath';
import { connect, MapStateToProps } from 'react-redux';

import GetUserInfo from '@/containers/GetUserInfo';
import ListenUserInfo from '@/containers/GetUserInfo/ListenUserInfo';
import React from 'react';

const { ossOriginAddSalt } = config;
const listenUserInfo = new ListenUserInfo();

interface AppTabBarStateProps {
  
}

interface AppTabBarDispatchProps {
}

interface AppTabBarOwnProps {
  current?: number
  onClick?(index: number): void
  onClickMiddle?(): void
}

export interface AppTabBarProps extends AppTabBarStateProps, AppTabBarDispatchProps, AppTabBarOwnProps {

}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const AppTabBar: React.FC<AppTabBarProps> = ({ current, onClick, onClickMiddle }) => {


  const handleGetUserInfo = (info?) => {
    if (typeof info === 'undefined') {
      listenUserInfo.fail();
      return;
    }
    listenUserInfo.done();
  }

  const handleClick=(e)=>{
    console.log(e)
    // 02
    switch (e) {
      case 0:
        Taro.navigateTo({ url: pagePath.home })
        break;
      case 2:
        Taro.navigateTo({ url: pagePath.mine })
        break;
      default:
        break;
    }
  }

  const handleClickMiddle=()=>{
    console.log("zhongjian")
    Taro.navigateTo({ url: pagePath.questionList })
  }

  return (
    <GetUserInfo onGetUserInfo={handleGetUserInfo}>
      <CusTabBar
        fixed
        tabList={[
          {
            title: '学习',
            // dot: true,
            image: `${ossOriginAddSalt}/1.0/public/tab-bar-study.png`,
            selectedImage: `${ossOriginAddSalt}/1.0/public/tab-bar-study-active.png`,
          },
          {
            title: '',
          },
          {
            title: '我的',
            // dot: true,
            image: `${ossOriginAddSalt}/1.0/public/tab-bar-my.png`,
            selectedImage: `${ossOriginAddSalt}/1.0/public/tab-bar-my-active.png`,
          }
        ]}
        onClick={handleClick}
        current={current}
        middleBarImg={`${ossOriginAddSalt}/1.0/public/tab-bar-add.png?v=5`}
        onClickMiddle={handleClickMiddle}
      />
    </GetUserInfo>
  );
}

export default AppTabBar

