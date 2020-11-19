/**
 * @description 我的 页面
 * @author ronffy
 * @Date 2019-12-09 16:25:35
 * @LastEditTime 2020-11-19 14:55:25
 * @LastEditors cq
 */
import React from 'react';
import Taro, { ComponentClass } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar';
import CusList from '@/components/CusList';
import CusListItem from '@/components/CusList/CusListItem';
import { connect, MapStateToProps } from 'react-redux'
import config from '@/config';
import { RootState } from '@/ts-types/store';
import { UserInfo } from '@/ts-types/store/AppState';
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import pagePath from '@/config/pagePath';
import './index.scss'


const { ossOriginAddSalt, defaultAvatarUrl } = config;

const defaultUserInfo = {
  avatarUrl: defaultAvatarUrl,
  nickName: '未登录'
};

interface MineStateProps {
  userInfo: UserInfo
}

export interface MineProps extends MineStateProps {

}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Mine: React.FC<MineProps> = ({ userInfo }) => {


  return (
    <PageBarRoot hasTabBar>
      {/* navBar */}
      <CusNavBar>我的</CusNavBar>

      <View className='page-mine'>

      wode
      </View>

      {/* tabBar */}
      <AppTabBar current={3} />
    </PageBarRoot>
  );
}




export default Mine
