/**
 * @description 详情页面
 * @author cq
 * @Date 2020-12-21 20:09:50
 * @LastEditTime 2020-12-21 20:29:38
 * @LastEditors cq
 */




import Taro from '@tarojs/taro'
import { View, Text, Image, Editor, Button, Input } from '@tarojs/components'
import React, { useEffect, useState } from 'react';
import { UserInfo } from '@/ts-types/store/AppState';
import PageBarRoot from '@/containers/PageBarRoot';
import CusNavBar from '@/components/CusNavBar';
import pagePath from '@/config/pagePath';
import './index.scss'


type QuestionDetailProps = {
  dispatch?: any
}

type Iprops = QuestionDetailProps & Partial<UserInfo>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------



const QuestionDetail: React.FC<Iprops> = ({ }) => {

  const [comment, setComment] = useState("");


  // 提交评论
  const handComment = (questionId) => {
    console.log(questionId);
  }

  const handCommentChange = (e) => {
    console.log(e.target.value);
    setComment(e.target.value)
  }

  const handleClickBack = () => {
    Taro.redirectTo({
      url: pagePath.questionList
    })
  }

  return <PageBarRoot hasTabBar>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View>
        题库详情
        </View>
    </CusNavBar>
    <View className='page-QuestionDetail'>
      <View className='page-QuestionDetail'>
        详情页面
    </View>

      <Input
        value={comment}
        placeholder="请输入评论"
        onInput={handCommentChange}
      />
      <Button onClick={() => handComment(1)}>提交评论</Button>
    </View>
  </PageBarRoot>
}



export default QuestionDetail