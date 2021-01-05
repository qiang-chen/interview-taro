/**
 * @description 全局的 tabBar
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2021-01-05 14:35:18
 * @LastEditors cq
 */

import Taro, { ComponentClass } from '@tarojs/taro';
import CusTabBar from '@/components/CusTabBar';
import config from '@/config/index';
import pagePath from '@/config/pagePath';
import { connect, MapStateToProps } from 'react-redux';
import GetUserInfo from '@/containers/GetUserInfo';
import ListenUserInfo from '@/containers/GetUserInfo/ListenUserInfo';
import React from 'react';
import { UserInfo } from '@/ts-types/store/AppState';
import { RootState } from '@/ts-types/store';


const { ossOriginAddSalt } = config;
const listenUserInfo = new ListenUserInfo();

interface AppTabBarStateProps {
  userInfo: UserInfo
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

const AppTabBar: React.FC<AppTabBarProps> = ({
  current,
  onClick,
  onClickMiddle,
  userInfo
}) => {


  const handleGetUserInfo = (info?) => {
    // 授权失败
    if (typeof info === 'undefined') {
      listenUserInfo.fail();
      return;
    }
    listenUserInfo.done();
  }

  const handleClick = listenUserInfo.createListener((e) => {
    switch (e) {
      case 0:
        Taro.reLaunch({ url: pagePath.home })
        break;
      case 2:
        Taro.reLaunch({ url: pagePath.mine })
        break;
      default:
        break;
    }
  }, userInfo)

  const handleClickMiddle = listenUserInfo.createListener(() => {
    Taro.navigateTo({ url: pagePath.questionInput })
  }, userInfo)

  return (
    <GetUserInfo userInfo={userInfo} onGetUserInfo={handleGetUserInfo}>
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


const mapStateToProps: MapStateToProps<AppTabBarStateProps, {}, {}> = ({ app }: RootState) => ({
  userInfo: app.userInfo,
});

export default connect(mapStateToProps)(AppTabBar as any) as ComponentClass<AppTabBarOwnProps, any>
