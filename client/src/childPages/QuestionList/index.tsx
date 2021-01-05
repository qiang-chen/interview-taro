/* eslint-disable import/first */
/**
 * @description 首页
 * @author cq
 * @Date 2020-05-09 16:00:34
 * @LastEditTime 2021-01-05 19:11:09
 * @LastEditors cq
 */


import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text, Image, Editor, Button, Input, ScrollView } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar'
// import pagePath from '@config/pagePath'
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import { AtFloatLayout, AtSwipeAction, AtModal, AtToast, AtDivider, AtActivityIndicator, AtAvatar } from 'taro-ui'
import { connect } from "react-redux";
// import isEmpty from '@/utils/isEmpty'
import { HomeState } from "@/ts-types/store/index";
import React, { useEffect, useState } from 'react';
import ShowAnswerView from "./component/showAnswerView/index"
import ShowTitleView from "./component/ShowTitleView"
import { UserInfo } from '@/ts-types/store/AppState';
import pagePath from '@/config/pagePath';
import produce from 'immer';
import "./index.scss"

type HomeProps = {
  dispatch?: any
}

type Iprops = HomeProps & Partial<HomeState> & Partial<UserInfo>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const namespace = 'home';

let flag = false; //防止多次触发的开关
const Home: React.FC<Iprops> = ({ userInfo, openid }) => {
  const [subjectList, setSubjectList] = useState([]) as any; //题目列表
  const [temporaryThumbs, setTemporaryThumbs] = useState([]) as any;//临时点赞列表
  const [pageObj, setPageObj] = useState({
    page: 1,
    pageSize: 10
  }); //分页器的选择
  const [isOpened, setIsOpened] = useState(true); //loading开关
  const [atDividerText, setAtDividerText] = useState(0); //分割线的提示文案 0正在加载 1没有更多了

  const handleClickTitle = () => {
    console.log("点击首页标题")
  }

  useEffect(() => {
 
    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'subject',
      // 传递给云函数的event参数
      data: {
        keyword: "",
        page: 1,
        pageSize: 10
      }
    }).then(res => {
      const { result } = res;
      const { code, data } = result as any;
      if (!code) {
        console.log("服务器错误");
        return
      }
      setSubjectList(data)
      flag = false;
      setIsOpened(false)
    })
  },[])

  // 返回上一级
  const handleClickBack = () => {
    // Taro.navigateBack();
    Taro.reLaunch({
      url: pagePath.home
    })
  }
  // 点赞
  const handFabulous = (questionId) => {
    const itemArr: any = produce(temporaryThumbs, draft => {
      draft.push({
        questionId,
        userInfo
      })
      return draft
    })
    setTemporaryThumbs([...temporaryThumbs, ...itemArr])

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
        Taro.showToast({
          title: '服务器故障，点赞失败',
          icon: 'none'
        })
        return
      }
    })
  }

  const handDetail = (id) => {
    Taro.navigateTo({ url: `${pagePath.questionDetail}?id=${id}` })
  }

  //随机颜色
  const getRandomColor = () => {
    var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
    if (rand.length == 6) {
      return rand;
    } else {
      return getRandomColor();
    }
  }

  //头像去重
  const arrayUnique = (arr = [] as any[], name) => {
    let hash = {};
    return arr.reduce(function (item, next) {
      hash[next[name]] ? '' : hash[next[name]] = true && item.push(next);
      return item;
    }, []);
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
      name: 'subject',
      // 传递给云函数的event参数
      data: {
        keyword: "",
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
      setSubjectList(produce(subjectList, draft => {
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
  const handDelete = async (id) => {
    await Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'deleteSubject',
      // 传递给云函数的event参数
      data: {
        id
      }
    })
    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'subject',
      // 传递给云函数的event参数
      data: {
        keyword: "",
        ...pageObj
      }
    }).then(res => {
      const { result } = res;
      const { code, data } = result as any;
      if (!code) {
        console.log("服务器错误");
        return
      }
      Taro.showToast({
        title: '删除成功',
      })
      setSubjectList(data)
      setIsOpened(false)
    })
  }
  return <PageBarRoot hasTabBar={false}>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View onClick={handleClickTitle}>
        题库
        </View>
    </CusNavBar>
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
      <AtActivityIndicator
        content='加载中...'
        size={74}
        mode="center"
        isOpened={isOpened}
      />
      <View className='page_home'>
        {
          subjectList.map((item, i) => <View className='question_item'>
            <View className='questionlist_title'>
              <Text>第<Text className='questionlist_title_t' style={{ backgroundColor: '#' + getRandomColor(), width: '33px', height: '33px', lineHeight: '33px', textAlign: 'center', borderRadius: '50%', display: 'inline-block', opacity: 0.5 }}>{i + 1}</Text>题 </Text>
              <Text className='questionlist_title_r'>题目分类:<Text className='questionlist_title_r_t'>{item.subject_type} </Text> </Text>
            </View>
            <View className='questionlist_con'>
              <View> 创建时间:<Text className='questionlist_con_t'>{item.createTime}</Text>  </View>
              <View><Text style={{ color: 'white', backgroundColor: 'rgb(20, 147, 220)', borderRadius: '8px 8px 8px 0', width: '100px', display: 'flex', justifyContent: 'center', margin: '10px 0' }}>Question:</Text><ShowTitleView title={item.title} /></View>
              <View><Text style={{ color: 'white', backgroundColor: 'rgb(104, 71, 219)', borderRadius: '8px 8px 8px 0', width: '100px', display: 'flex', justifyContent: 'center', margin: '10px 0' }}>Answer:</Text><ShowAnswerView answer={item} /></View>
              <View>
                <View className='thumbs_color'>点赞的用户头像列表:</View>
                <View className='thumbsRight'>
                  {
                    arrayUnique(item.thumbs, 'openid').map((y) =>
                      <View className='thumbsAvatar'>
                        <AtAvatar
                          image={y.userInfo.avatarUrl}
                          size={'small'}
                          circle={true} />
                      </View>)
                  }
                  {
                    temporaryThumbs.map(el => {
                      if (el.questionId == item._id) {
                        return <View className='thumbsAvatar'>
                          <AtAvatar
                            image={el.userInfo.avatarUrl}
                            size={'small'}
                            circle={true} />
                        </View>
                      }
                    })
                  }
                </View>
              </View>
              {
                item.isDisable || temporaryThumbs.some(el => el.questionId == item._id) ? "" : <View onClick={() => handFabulous(item._id)}>👍</View>
              }
              <Button onClick={() => handDetail(item._id)}>点击进入详情</Button>
              {
                openid == "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4" && <Button onClick={() => handDelete(item._id)}>删除</Button>
              }
            </View>
          </View>)
        }

        {
          isOpened ? null : <AtDivider content={
            atDividerText ? "没有更多了" : "正在加载数据"
          } fontColor='#ed3f14' lineColor='#ed3f14'
          />
        }
      </View>
    </ScrollView>
  </PageBarRoot>
}

function mapStateToProps(state) {
  return ({
    userInfo: state.app.userInfo,
    openid: state.app.openid
  })
}
export default connect(mapStateToProps)(Home as any) 
