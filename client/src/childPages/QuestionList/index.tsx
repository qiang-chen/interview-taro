/* eslint-disable import/first */
/**
 * @description 首页
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2020-12-21 19:50:21
 * @LastEditors cq
 */


import Taro from '@tarojs/taro'
import { View, Text, Image, Editor, Button } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar'
// import pagePath from '@config/pagePath'
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import { AtFloatLayout, AtSwipeAction, AtModal, AtToast } from 'taro-ui'
import { connect } from "react-redux";
// import isEmpty from '@/utils/isEmpty'
import { HomeState } from "@/ts-types/store/index";
import React, { useEffect, useState } from 'react';
import ShowAnswerView from "./component/showAnswerView/index"
import ShowTitleView from "./component/ShowTitleView"
import { UserInfo } from '@/ts-types/store/AppState';
import './index.scss'


type HomeProps = {
  dispatch?: any
}

type Iprops = HomeProps & Partial<HomeState> & Partial<UserInfo>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const namespace = 'home';


const Home: React.FC<Iprops> = ({ userInfo, openid }) => {
  const [subjectList, setSubjectList] = useState([]) as any;

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
      setSubjectList(data)
    })
  }, [])

  // 返回上一级
  const handleClickBack = () => {
    Taro.navigateBack();
  }

  // 点赞
  const handFabulous = (questionId) => {
    // 
    console.log(11);
    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'thumbs',
      // 传递给云函数的event参数
      data: {
        userInfo,
        questionId,
      }
    }).then(res => {
      const { result } = res;
      const { code } = result as any;
      if (!code) {
        console.log("服务器错误");
        return
      }
    })
  }

  return <PageBarRoot hasTabBar>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View onClick={handleClickTitle}>
        题库
        </View>
    </CusNavBar>
    <View className='page-home'>
      {subjectList.map((item, index) => {
        if (item.content) {
          return <>
            第{index}题、  题目分类 {item.subject_type}  创建时间 {item.createTime}
            <ShowTitleView
              title={item.title}
            />
            <ShowAnswerView
              answer={item}
            />
            <View>
              点赞的用户头像列表
            {
                item.thumbs.map(el => <Image
                  src={el.userInfo.avatarUrl}
                  style='width: 50px;height: 50px;'
                />)
              }
            </View>

            <Button disabled={item.isDisable} onClick={() => handFabulous(item._id)}>点赞</Button>
          </>
        } else {
          return "暂无数据"
        }
      })}
    </View>
  </PageBarRoot>
}

function mapStateToProps(state) {
  return ({
    userInfo: state.app.userInfo,
    openid: state.app.openid
  })
}

export default connect(mapStateToProps)(Home as any) 
