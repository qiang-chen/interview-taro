/**
 * @description 所有浏览者的信息
 * @author cq
 * @Date 2021-01-05 14:41:03
 * @LastEditTime 2021-01-05 15:24:32
 * @LastEditors cq
 */
/* eslint-disable import/first */
/**
 * @description 首页
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2021-01-02 23:01:22
 * @LastEditors cq
 */


import Taro from '@tarojs/taro'
import { View, Text, Image, ScrollView } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar'
// import pagePath from '@config/pagePath'
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import { AtFloatLayout, AtSwipeAction, AtModal, AtToast, AtList, AtListItem, AtDivider } from 'taro-ui'
import { connect } from "react-redux";
// import isEmpty from '@/utils/isEmpty'
// import { VisitorsState } from "@/ts-types/store/index";
import React, { useEffect, useState } from 'react';
import produce from 'immer';
import './index.scss'


type VisitorsProps = {
  dispatch?: any
}

type Iprops = VisitorsProps

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const namespace = 'Visitors';


let flag = false; //防止多次触发的开关

const Visitors: React.FC<Iprops> = ({ }) => {

  const [visitorsList, setVisitorsList] = useState<any>([]);
  const [pageObj, setPageObj] = useState({
    page: 1,
    pageSize: 10
  }); //分页器的选择
  const [atDividerText, setAtDividerText] = useState(0); //分割线的提示文案 0正在加载 1没有更多了

  useEffect(() => {

    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getUser',
      data: {
        page: pageObj.page,
        pageSize: pageObj.pageSize
      }
    }).then(res => {
      const { result } = res;
      const { code, data } = result as any;
      if (!code) {
        console.log("服务器错误");
        return
      }
      setVisitorsList(data)
      flag = false
    })
  }, [])

  const handleClickTitle = () => {
    console.log("点击首页标题")
  }

  // 返回上一级
  const handleClickBack = () => {
    Taro.navigateBack();
  }


  const onScrollToLower = (e) => {
    console.log(flag, "onScrollToLower");
    if (atDividerText) {
      // 没数据了
      return
    }
    if (flag) {
      return
    }
    flag = true;
    setPageObj({
      page: pageObj.page + 1,
      pageSize: pageObj.pageSize
    })

    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getUser',
      // 传递给云函数的event参数
      data: {
        page: pageObj.page + 1,
        pageSize: pageObj.pageSize
      }
    }).then(res => {
      const { result } = res;
      const { code, data } = result as any;
      if (!code) {
        console.log("服务器错误");
        return
      }
      if (!data.length) {
        // 没数据了
        setAtDividerText(1)
        return
      }
      setVisitorsList(produce(visitorsList, draft => {
        draft.push(...data)
      }))
      flag = false;
    }).catch(err => {
      flag = false
    })
  }

  const onScroll = (e) => {
    // console.log(e.detail,"onScroll")
  }

  const getSex = (sex) => {
    switch (sex) {
      case 1:
        return "男"
      case 2:
        return "女"
      default:
        return "未知"
    }
  }

  return <PageBarRoot hasTabBar={false}>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View onClick={handleClickTitle}>
        寻好友
        </View>
    </CusNavBar>
    <View className='page-Visitors'>
      <ScrollView
        className='scrollview'
        scrollY={true}
        scrollWithAnimation
        scrollTop={0}
        style={{
          height: Taro.getSystemInfoSync().windowHeight + "px"
        }}
        lowerThreshold={50}  //距底部/右边多远时，触发 scrolltolower 事件
        // upperThreshold={50}  //距顶部/左边多远时，触发 scrolltoupper 事件
        onScrollToLower={onScrollToLower} // 使用箭头函数的时候 可以这样写 `onScrollToUpper={this.onScrollToUpper}`
        onScroll={onScroll}
      >
        <AtList>
          {
            visitorsList.map(item => {
              const { userInfo = {} } = item;
              return <AtListItem
                title={userInfo.nickName}
                arrow='right'
                note={getSex(userInfo.gender)}
                thumb={userInfo.avatarUrl}
                extraText={`积分:${item.integral}`}
              />
            })
          }

        </AtList>
        <AtDivider content={
          atDividerText ? "没有更多了" : "正在加载数据"
        } fontColor='#ed3f14' lineColor='#ed3f14'
        />
      </ScrollView>
    </View>
  </PageBarRoot>
}

function mapStateToProps(state) {
  return ({

  })
}

export default connect(mapStateToProps)(Visitors as any) 
