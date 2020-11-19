/* eslint-disable import/first */
/**
 * @description 首页
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-19 20:15:20
 * @LastEditors cq
 */


import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar'
// import pagePath from '@config/pagePath'
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import { AtFloatLayout, AtSwipeAction, AtModal, AtToast } from 'taro-ui'
import { connect } from "react-redux";
// import isEmpty from '@/utils/isEmpty'
import { HomeState } from "@/ts-types/store/index";
import React from 'react';
import './index.scss'


type HomeProps = {
  dispatch?: any
}

type Iprops = HomeProps & Partial<HomeState>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const namespace = 'home';



const Home: React.FC<Iprops> = ({ }) => {

  const handleClickTitle = () => {
    console.log("点击首页标题")
  }

  // 返回上一级
  const handleClickBack = () => {
    Taro.navigateBack();
  }
  return <PageBarRoot hasTabBar>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View onClick={handleClickTitle}>
        论坛
        </View>
    </CusNavBar>
    <View className='page-home'>
      Forum
    </View>
  </PageBarRoot>
}

function mapStateToProps(state) {
  return ({

  })
}

export default connect(mapStateToProps)(Home as any) 
