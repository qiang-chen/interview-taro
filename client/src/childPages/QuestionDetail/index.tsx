/**
 * @description 详情页面
 * @author cq
 * @Date 2020-12-21 20:09:50
 * @LastEditTime 2021-01-04 15:26:43
 * @LastEditors cq
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
import produce from 'immer';
import { AtAvatar, AtList, AtListItem, AtButton, AtNoticebar, AtIcon, AtDivider, AtInput, AtFloatLayout } from 'taro-ui'
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
  const [commentList, setCommentList] = useState<any>([]);
  const [commentListAll, setCommentListAll] = useState<any>([]);//所有的评论
  const [commentId, setCommentId] = useState("");// 当前的评论IDcommentId
  const [isOpenInput, setOpenInput] = useState(false);
  const [curItem, setcurItem] = useState({})
  const [comment2, setComment2] = useState("");


  // let commentId = ""
  const router = useRouter();
  const { id } = router.params;
  // let preItem: any = {};


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
      // setCommentList(deep(data.comment.reverse(), "", []));

      const array = deep(data.comment.reverse(), "", []);
      setCommentListAll(data.comment.reverse());
      let arr: any[] = [];
      for (let index = 0; index < array.length; index++) {
        arr.push(array[index]);
        arr.push({})
      }

      arr.splice(arr.length - 1, 1)
      setCommentList(arr)
      setDetailObj(data)
    })
  }, []);

  // 提交回复
  const handComment = async (type) => {
    const com = type ? comment2 : comment;
    if (!com) {
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
        text: com,
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
    const array = deep(data.reverse(), "", []);
    setCommentListAll(data.reverse());
    let arr: any[] = [];
    for (let index = 0; index < array.length; index++) {
      arr.push(array[index]);
      arr.push({})
    }

    arr.splice(arr.length - 1, 1)
    setCommentList(arr)
    setCommentId("")
    if (type) {
      setComment2("")
    } else {
      setComment("")
    }
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
    console.log(item, "item");
    setcurItem(item)
    // commentId = commentId
  }

  const handleCloseInput = () => {
    setOpenInput(false)
  }
  const { title, createTime, content = {}, thumbs = [], isDisable } = detailObj as any;
  const authorInfo = detailObj.userInfo && detailObj.userInfo.length && detailObj.userInfo[0].userInfo ? detailObj.userInfo[0].userInfo : {}
  const { nickName = '', avatarUrl = '' } = authorInfo
  const commentArr = detailObj.comment && detailObj.comment.length ? detailObj.comment : []
  const handleChange = () => {
  }

  const commentListDom = (arr = [] as any, domArr = [] as any[]) => {
    console.log("报错了吗", arr);
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (Object.keys(element || {}).length) {
        const item = element.item;
        if (!item.commentId) {
          domArr.push(<View onClick={() => handCommentUser(item)}>
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
          </View>)
        } else {
          const preItem = commentListAll.find(el => el._id == item.commentId)
          console.log(preItem, "有的是空？");
          domArr.push(<View className="two_thumb" onClick={() => handCommentUser(item)}>
            <View>
              <View className='at-article__p commentContent'>
                <View className='nickNameOnly'>{item.userInfo.nickName}</View>
                  回复
                <View className='nickNameOnly'>{preItem && preItem.userInfo && preItem.userInfo.nickName}&nbsp;</View> :
            </View>
              <View className='at-article__p'>{item.text}</View>
            </View>
            <View className='thumb'>💬</View>
          </View>)
        }
        if (element.children && element.children.length) {
          // domArr.push(<AtDivider />)
          commentListDom(element.children, domArr)
        } else {
          continue
        }
      } else {
        domArr.push(<AtDivider />)
      }
    }
    return domArr;
  }

  // 点赞
  const handThumb = async () => {
    await Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'thumbs',
      // 传递给云函数的event参数
      data: {
        userInfo,
        questionId: detailObj._id
      }
    })

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
      setDetailObj(data)
    })
    console.log(detailObj);
  }

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
            {
              !isDisable && <View className='thumb' onClick={handThumb}>👍</View>
            }
            <View className='thumbsLength'>{thumbs.length}</View>
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
          <AtButton onClick={() => handComment(0)} className='addBtn'>提交回复</AtButton>
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
          onClick={() => handComment(1)}
          className='addBtn'>提交评论</AtButton>
        {/* </View> */}
      </View>

      <View className='commentLists'>
        {commentListDom(commentList, [])}
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
  </PageBarRoot>
}



function mapStateToProps(state) {
  return ({
    userInfo: state.app.userInfo,
    openid: state.app.openid
  })
}
export default connect(mapStateToProps)(QuestionDetail as any) 