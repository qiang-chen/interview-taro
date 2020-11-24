/* eslint-disable import/first */
/**
 * @description 首页
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-11-24 16:44:47
 * @LastEditors cq
 */


import Taro from '@tarojs/taro'
import { View, Text, Image, Editor } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar'
// import pagePath from '@config/pagePath'
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import { AtFloatLayout, AtSwipeAction, AtModal, AtToast } from 'taro-ui'
import { connect } from "react-redux";
// import isEmpty from '@/utils/isEmpty'
import { HomeState } from "@/ts-types/store/index";
import React, { useEffect, useState } from 'react';
import ShowView from "./component/ShowView"
import './index.scss'


type HomeProps = {
  dispatch?: any
}

type Iprops = HomeProps & Partial<HomeState>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const namespace = 'home';


const Home: React.FC<Iprops> = ({ }) => {
  const [subjectList, setSubjectList] = useState([]) as any

  const handleClickTitle = () => {
    console.log("点击首页标题")
  }

  useEffect(() => {
    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'subject',
      // 传递给云函数的event参数
      data: {
        keyword: ""
      }
    }).then(res => {
      const { result } = res;
      const { code, data } = result as any;
      if (!code) {
        console.log("服务器错误");
        return
      }
      console.log(data);
      setSubjectList(data)
    })
  }, [])

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

    {subjectList.length ? <ShowView
      subjectList={subjectList}
    />:"暂无数据"}
    

  </PageBarRoot>
}

function mapStateToProps(state) {
  return ({

  })
}

export default connect(mapStateToProps)(Home as any) 
