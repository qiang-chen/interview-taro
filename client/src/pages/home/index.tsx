/* eslint-disable import/first */
/**
 * @description 首页
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-19 15:18:56
 * @LastEditors cq
 */


import Taro from '@tarojs/taro'
import IconItem from "./components/iconItem/index"
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

  return <PageBarRoot hasTabBar>
    {/* navBar */}
    <CusNavBar>
      <View onClick={handleClickTitle}>
        首页
        </View>
    </CusNavBar>
    <View className='page-home'>
      <View className='home_content'>
        {homeList.map((item) => {
          return <IconItem {...item} onChangeItem={handChangeItem} key={item.names + 'homeList'}></IconItem>
        })}
      </View>
    </View>
    <AppTabBar current={1} />
  </PageBarRoot>
}

function mapStateToProps(state) {
  return ({

  })
}

export default connect(mapStateToProps)(Home as any) 
