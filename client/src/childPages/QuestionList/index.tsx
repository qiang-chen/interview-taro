/* eslint-disable import/first */
/**
 * @description 首页
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-18 20:00:50
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


console.log(PageBarRoot, 222)
type HomeProps = {
  dispatch?: any
}

type Iprops = HomeProps & Partial<HomeState>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const namespace = 'home';


const homeList = [
  {
    icon: "https://img.sunlands.wang/addSalt/img/1.0/home/inputVoucher.png",
    content: "题库录入",
    names: "bs1"
  }, {
    icon: "https://img.sunlands.wang/addSalt/img/1.0/home/lookVoucher.png",
    content: "题库列表",
    names: "bs2"
  }, {
    icon: "https://img.sunlands.wang/addSalt/img/1.0/home/profitLossRF.png",
    content: "论坛交流",
    names: "bs3"
  }
]




const Home: React.FC<Iprops> = ({ }) => {
  // 点击顶部
  const handGetUserInfo = () => {
    console.log("点击顶部")
  }

  const handleClickTitle = () => {
    console.log("点击首页标题")
  }

  const handChangeItem = () => {
    console.log("点击每一个");
  }

  // 返回上一级
  const handleClickBack = () => {
    Taro.navigateBack();
  }
  return <PageBarRoot hasTabBar>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View onClick={handleClickTitle}>
        题库
        </View>
    </CusNavBar>
    <View className='page-home'>
      QuestionList
    </View>
  </PageBarRoot>
}

function mapStateToProps(state) {
  return ({

  })
}

export default connect(mapStateToProps)(Home as any) 
