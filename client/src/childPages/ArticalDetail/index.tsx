/**
 * @description 详情页面
 * @author cq
 * @Date 2020-12-21 20:09:50
 * @LastEditTime 2020-12-31 18:55:09
 * @LastEditors oyqx
 */




import Taro, { useRouter, setTabBarItem } from '@tarojs/taro'
import { View, Text, Image, Editor, Button, Input } from '@tarojs/components'
import React, { useCallback, useEffect, useState } from 'react';
import { UserInfo } from '@/ts-types/store/AppState';
import PageBarRoot from '@/containers/PageBarRoot';
import CusNavBar from '@/components/CusNavBar';
import pagePath from '@/config/pagePath';
import { connect } from "react-redux";
import deep from "./utils/index"
import classNames from "classnames"
import { AtAvatar, AtList, AtListItem, AtButton, AtNoticebar, AtIcon, AtDivider, AtInput, AtFloatLayout } from 'taro-ui'
import './index.scss'


type QuestionDetailProps = {
  dispatch?: any
}

type Iprops = QuestionDetailProps & Partial<UserInfo>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------


const ArticalDetail: React.FC<Iprops> = ({
  userInfo
}) => {

  const [comment, setComment] = useState("");
  const [detailObj, setDetailObj] = useState<any>({});
  const [commentList, setCommentList] = useState([]);
  const [commentId, setCommentId] = useState("");// 当前的评论IDcommentId



  const [isOpenInput, setOpenInput] = useState(false);
  const [curItem, setcurItem] = useState({})
  const [comment2, setComment2] = useState("");

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
      setCommentList(deep(data.comment.reverse(), "", []))
      setDetailObj(data)
    })
  }, []);

  // 提交回复
  const handComment = async (questionId) => {
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
    setOpenInput(false)

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
    setCommentList(deep(data, "", []))
    setCommentId("")
    setComment("")
  }
  //提交评论
  const handComment2 = async (questionId) => {
    // questionId 当前题目id  和当前评论ID  判断是不是第一层的

    if (!comment2) {
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
        text: comment2,
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
    setOpenInput(false)

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
    setCommentList(deep(data, "", []))
    setCommentId("")
    setComment2("")
  }
  const handCommentChange = (val) => {
    setComment(val)
  }
  const handCommentChange2 = (val) => {
    setComment2(val)
  }

  const handleClickBack = () => {
    Taro.redirectTo({
      url: pagePath.questionList
    })
  }

  // 用户回复评论保存ID
  const handCommentUser = (item) => {
    setOpenInput(true)
    setCommentId(item._id)
    setcurItem(item)
    // commentId = commentId
  }

  const handleCloseInput = () => {
    setOpenInput(false)
  }
  const { title, createTime, content = {}, thumbs = [], } = detailObj as any;
  const authorInfo = detailObj.userInfo && detailObj.userInfo.length && detailObj.userInfo[0].userInfo ? detailObj.userInfo[0].userInfo : {}
  const { nickName = '', avatarUrl = '' } = authorInfo
  const commentArr = detailObj.comment && detailObj.comment.length ? detailObj.comment : []
  const handleChange = () => {
  }
  // console.log(66666777,userInfo)
  return <PageBarRoot hasTabBar>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View>
        题库详情
        </View>
    </CusNavBar>

    <View className='at-article'>
      <View className='at-article__h1'>
        {title}
      </View>

      <View className='head-title'>
        <View className='head-title2'>
          <AtAvatar
            image={avatarUrl}
            size={'small'}
            circle={true}></AtAvatar>
          <View className='nickname'>
            <View className='nickNameOnly'> {nickName}</View>
            <View>{createTime} </View>
          </View>
        </View>
        <View><AtButton size='small' circle={true} className='addBtn'>关注</AtButton></View>
      </View>

      <View className='at-article__content'>
        <View className='at-article__section'>
          {
            content.ops && content.ops.map(item => {
              if (item.attributes) {
                // 图片
                return <Image
                  mode='widthFix'
                  className='at-article__img'
                  src={item.insert.image}
                />
              } else {
                // 文字
                return <View className='at-article__p'>{item.insert}</View>
              }
            })
          }
        </View>
      </View>

      <View className='thumbsList'>
        <View className='thumbsAll'>
          <View className='thumbsLeft'>
            {/* <AtIcon value='heart' size='30' color='orange'></AtIcon> */}
            <View className='thumb'>👍</View>
            <View>{thumbs.length}</View>
          </View>
          <View className='thumbsRight'>
            {
              thumbs.map((item) =>
                <View className='thumbsAvatar'>
                  <AtAvatar
                    image={item.userInfo.avatarUrl}
                    size={'small'}
                    circle={true} /></View>)
            }
          </View>
        </View>
      </View>



      <AtFloatLayout isOpened={isOpenInput} title="" onClose={handleCloseInput}>
        <View>
          <AtInput
            name='value1'
            type='text'
            value={comment}
            placeholder={`回复${curItem && curItem.userInfo && curItem.userInfo.nickName}`}
            // '输入你的想法.....'
            onChange={handCommentChange}
          />
          <AtButton onClick={() => handComment(detailObj.questionId)} className='addBtn'>提交评论</AtButton>
        </View>
      </AtFloatLayout>


      <View className='comment-title'>
        {/* <View> */}
        <AtAvatar
          image={userInfo.avatarUrl}
          size={'small'}
          circle={true}></AtAvatar>
        {/* </View> */}
        {/* <View className='commentInput'> */}
        <AtInput
          name='value2'
          type='text'
          placeholder='说点什么吧....'
          value={comment2}
          onChange={handCommentChange2}
        />
        <AtButton 
        size='small'
        circle={true}
        onClick={() => handComment2(detailObj.questionId)} 
        className='addBtn'>提交评论</AtButton>
        {/* </View> */}
      </View>

      <View className='commentLists'>
        {
          commentList.map((item: any) => {
            if (!item.commentId && !item.isEnd) {
              preItem = item;
              return <View onClick={() => handCommentUser(item)}>
                <View className='head-title'>
                  <View className='head-title2'>
                    <AtAvatar
                      image={item.userInfo.avatarUrl}
                      size={'small'}
                      circle={true}></AtAvatar>
                    <View className='nickname'>
                      <View className='nickNameOnly'> {item.userInfo.nickName}</View>
                      <View>{item.createTime} </View>
                    </View>
                  </View>
                  <View>
                    {/* <AtIcon value='heart' size='30' color='#C4C4C4'></AtIcon> */}
                    {/* <View className='thumb'>👍</View> */}
                    <View className='thumb'>💬</View>
                    {/* <AtIcon value='iphone' size='30' color='#C4C4C4'></AtIcon> */}
                    {/* <AtButton size='small' circle={true} type='primary'>关注</AtButton> */}
                  </View>
                </View>
                <View className='at-article__p'>{item.text}</View>
              </View>

              // <View
              //   onClick={() => handCommentUser(item._id)}
              //   className={classNames("one", {
              //     "color": commentId == item._id
              //   })}
              // >
              //   {item.userInfo.nickName}评论{detailObj.userInfo && detailObj.userInfo[0].userInfo.nickName}---{item.text}--{item.createTime}
              // </View>
            } else if (item.commentId) {
              return <View onClick={() => handCommentUser(item)}>
                <View className='at-article__p commentContent'>
                  <View className='nickNameOnly'>{item.userInfo.nickName}</View>
                  回复
                <View className='nickNameOnly'>{preItem.userInfo && preItem.userInfo.nickName}&nbsp;</View> :
            </View>
                <View className='at-article__p'>{item.text}</View>
              </View>
              // <View
              //   onClick={() => handCommentUser(item._id)}
              //   className={classNames("two", {
              //     "color": commentId == item._id
              //   })}
              // >
              //   {item.userInfo.nickName}回复：{preItem.userInfo && preItem.userInfo.nickName}---{item.text}--{item.createTime}
              //   </View>

            } else if (item.isEnd) {
              return <AtDivider />
            }
          })
        }


        {/* 
        <Input
          value={comment}
          placeholder="请输入评论"
          onInput={handCommentChange}
        />
        <Button onClick={() => handComment(detailObj.questionId)}>提交评论</Button> */}

        {/* 
        {
          commentArr.map((item) =>
            <View className='commentItem'>



       
            </View>
          )
        } */}
      </View>






    </View>

    {/* <View></View> */}
    {/* <View className='page-QuestionDetail'>
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
  */}
  </PageBarRoot>
}



function mapStateToProps(state) {
  return ({
    userInfo: state.app.userInfo,
    openid: state.app.openid
  })
}
export default connect(mapStateToProps)(ArticalDetail as any) 