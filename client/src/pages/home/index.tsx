/* eslint-disable import/first */
/**
 * @description 首页
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2021-01-07 20:24:00
 * @LastEditors cq
 */


import Taro, { useDidShow } from '@tarojs/taro'
import IconItem from "./components/iconItem/index"
import { View, Text, Image } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar'
// import pagePath from '@config/pagePath'
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import { AtFloatLayout, AtSwipeAction, AtModal, AtToast, AtNoticebar } from 'taro-ui'
import { connect } from "react-redux";
// import isEmpty from '@/utils/isEmpty'
import { HomeState } from "@/ts-types/store/index";
import React, { useState } from 'react';
import { UserInfo } from '@/ts-types/store/AppState';
import './index.scss'
import CusShare from '@/components/CusShare';


type HomeProps = {
  dispatch?: any
}

type Iprops = HomeProps & Partial<HomeState> & UserInfo

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const namespace = 'home';


const homeList = [
  {
    icon: "https://img.sunlands.wang/addSalt/img/1.0/home/lookVoucher.png",
    content: "题库列表",
    names: "bs2"
  },
  {
    icon: "https://img.sunlands.wang/addSalt/img/1.0/home/inputVoucher.png",
    content: "题库录入",
    names: "bs1"
  },
  // {
  //   icon: "https://img.sunlands.wang/addSalt/img/1.0/home/profitLossRF.png",
  //   content: "论坛交流",
  //   names: "bs3"
  // }
]




const Home: React.FC<Iprops> = ({ userInfo }) => {

  const [noticeText, setNoticeText] = useState([])

  useDidShow(() => {
    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'notice',
    }).then((res: any) => {
      const result: any = res.result;
      if (!result.code) {
        Taro.showToast({
          title: '积分查询失败',
          icon: 'none'
        })
        return
      }
      setNoticeText(result.data)
    })
  })
  
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
    <CusShare>
      <CusNavBar>
        <View onClick={handleClickTitle}>
          首页
        </View>
      </CusNavBar>
      <View className='page-home'>
        {
          noticeText.map((item:any) => <AtNoticebar marquee speed={60}>
            {
              item.notice
            }
        </AtNoticebar>)
        }
        
        <View className='home_content'>
          {homeList.map((item) => {
            return <IconItem
              {...item}
              onChangeItem={handChangeItem}
              key={item.names + 'homeList'}
              userInfo={userInfo}
            />
          })}
        </View>
      </View>
    </CusShare>
    <AppTabBar current={1} />
  </PageBarRoot>
}

function mapStateToProps(state) {
  return ({
    userInfo: state.app.userInfo,
  })
}

export default connect(mapStateToProps)(Home as any) 
