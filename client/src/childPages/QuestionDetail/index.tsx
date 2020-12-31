/**
 * @description 详情页面
 * @author cq
 * @Date 2020-12-21 20:09:50
 * @LastEditTime 2020-12-31 16:41:30
 * @LastEditors cq
 */




import Taro, { useRouter } from '@tarojs/taro'
import { View, Text, Image, Editor, Button, Input } from '@tarojs/components'
import React, { useCallback, useEffect, useState } from 'react';
import { UserInfo } from '@/ts-types/store/AppState';
import PageBarRoot from '@/containers/PageBarRoot';
import CusNavBar from '@/components/CusNavBar';
import pagePath from '@/config/pagePath';
import { connect } from "react-redux";
import deep from "./utils/index"
import classNames from "classnames"
import './index.scss'


type QuestionDetailProps = {
  dispatch?: any
}

type Iprops = QuestionDetailProps & Partial<UserInfo>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------


const QuestionDetail: React.FC<Iprops> = ({
  userInfo
}) => {

  const [comment, setComment] = useState("");
  const [detailObj, setDetailObj] = useState<any>({});
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState("");// 当前的评论IDcommentId
  // let commentId = ""
  const router = useRouter();
  const { id } = router.params;
  let preItem: any = {};


  useEffect(() => {
    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'subjectDetail',
      // 传递给云函数的event参数
      data: {
        id
      }
    }).then(res => {
      const { result } = res;
      const { code, data } = result as any;
      if (!code) {
        console.log("服务器错误");
        return
      }
      console.log(data.comment.reverse(),"初始化评论");
      setCommentList(deep(data.comment.reverse(), "", []))
      setDetailObj(data)
    })
  }, []);

  // 提交评论
  const handComment = async(questionId) => {
    // questionId 当前题目id  和当前评论ID  判断是不是第一层的
   
    if (!comment) {
      Taro.showToast({
        title: '评论内容不能为空',
        icon: 'none'
      })
      return
    }
    
    let saveRes = await Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'saveComment',
      // 传递给云函数的event参数
      data: {
        userInfo,
        questionId: id,
        text: comment,
        commentId,
      }
    })
   
    const { result } = saveRes as any;
    const { code: saveCode } = result as any;
    if (!saveCode) {
      Taro.showToast({
        title: '保存失败',
        icon: 'none'
      })
      return
    }
    
    Taro.showToast({
      title: '保存成功'
    })
    const res = await Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getComment',
      // 传递给云函数的event参数
      data: {
        questionId: detailObj._id
      }
    })
    const { code, data } = res.result as any;
    if (!code) {
      console.log("获取最新评论失败");
      return
    }
    console.log(data,"评论");
    setCommentList(deep(data, "", []))
    setCommentId("")
    setComment("")
  }

  const handCommentChange = (e) => {
    setComment(e.target.value)
  }

  const handleClickBack = () => {
    Taro.redirectTo({
      url: pagePath.questionList
    })
  }

  // 用户回复评论保存ID
  const handCommentUser = (commentId) => {
    setCommentId(commentId)
    // commentId = commentId
  }

  const { title, createTime, content = {} } = detailObj as any;
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
      <View>
        标题： {title}
      </View>
      <View>
        创建时间： {createTime}
      </View>
      {
        content.ops && content.ops.map(item => {
          if (item.attributes) {
            // 图片
            return <Image src={item.insert.image} />
          } else {
            // 文字
            return <View>{item.insert}</View>
          }
        })
      }

      {
        commentList.map((item: any) => {
          if (!item.commentId) {
            preItem=item;
            return <View
              onClick={() => handCommentUser(item._id)}
              className={classNames("one", {
                "color": commentId == item._id
              })}
            >
              {item.userInfo.nickName}评论{detailObj.userInfo && detailObj.userInfo[0].userInfo.nickName}---{item.text}--{item.createTime}
            </View>
          } else {
            return <View
              onClick={() => handCommentUser(item._id)}
              className={classNames("two", {
                "color": commentId == item._id
              })}
            >
              {item.userInfo.nickName}回复：{preItem.userInfo && preItem.userInfo.nickName}---{item.text}--{item.createTime}</View>
          }
        })
      }
      <Input
        value={comment}
        placeholder="请输入评论"
        onInput={handCommentChange}
      />
      <Button onClick={() => handComment(detailObj.questionId)}>提交评论</Button>
    </View>
  </PageBarRoot>
}



function mapStateToProps(state) {
  return ({
    userInfo: state.app.userInfo,
    openid: state.app.openid
  })
}
export default connect(mapStateToProps)(QuestionDetail as any) 