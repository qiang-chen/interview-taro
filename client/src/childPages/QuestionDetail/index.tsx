/**
 * @description 详情页面
 * @author cq
 * @Date 2020-12-21 20:09:50
 * @LastEditTime 2021-01-07 17:14:02
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
import { AtAvatar, AtList, AtListItem, AtButton, AtNoticebar, AtIcon, AtDivider, AtInput, AtFloatLayout, AtActivityIndicator } from 'taro-ui'
import '@tarojs/taro/html.css'
import './index.scss'


type QuestionDetailProps = {
  dispatch?: any
}

type Iprops = QuestionDetailProps & Partial<UserInfo>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const QuestionDetail: React.FC<Iprops> = ({
  userInfo,
  openid
}) => {
  const [comment, setComment] = useState("");
  const [detailObj, setDetailObj] = useState<any>({});
  const [commentList, setCommentList] = useState<any>([]);
  const [commentListAll, setCommentListAll] = useState<any>([]);//所有的评论
  const [commentId, setCommentId] = useState("");// 当前的评论IDcommentId
  const [isOpenInput, setOpenInput] = useState(false);
  const [curItem, setcurItem] = useState<any>({})
  const [comment2, setComment2] = useState("");
  const [imgList, setImgList] = useState([]); //图片列表  用于预览使用
  const [isOpened, setIsOpened] = useState(true); //loading开关



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
      setImgList(data.content.ops.reduce((pre, cur) => {
        if (cur.attributes) {
          pre.push(cur.insert.image)
        }
        return pre
      }, []))
      setDetailObj(data)
      setIsOpened(false)
    })
  }, []);

  // 删除评论 deleteComment
  const handCommentRemove = async (item) => {
    const { _id } = item;
    try {
      await Taro.cloud.callFunction({
        // 要调用的云函数名称
        name: 'deleteComment',
        // 传递给云函数的event参数
        data: {
          id: _id
        }
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
      console.log("没执行吗");
      Taro.showToast({
        title: '删除成功',
      })
    } catch (error) {
      Taro.showToast({
        title: '删除失败',
        icon: "none"
      })
    }
  }

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
    Taro.navigateBack();
    // Taro.redirectTo({
    //   url: pagePath.questionList
    // })
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
  const { title, createTime, content = {}, thumbs = [], isDisable } = detailObj as any;
  const authorInfo = detailObj.userInfo && detailObj.userInfo.length && detailObj.userInfo[0].userInfo ? detailObj.userInfo[0].userInfo : {}
  const { nickName = '', avatarUrl = '' } = authorInfo
  const commentArr = detailObj.comment && detailObj.comment.length ? detailObj.comment : []
  const handleChange = () => {
  }

  const commentListDom = (arr = [] as any, domArr = [] as any[]) => {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (Object.keys(element || {}).length) {
        const item = element.item;
        if (!item.commentId) {
          domArr.push(<View>
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
                <View className='thumb' onClick={() => handCommentUser(item)}>💬</View>
                {
                  openid == "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4" && <View className='thumb' onClick={() => handCommentRemove(item)}>删除</View>
                }
                {/* <AtIcon value='iphone' size='30' color='#C4C4C4'></AtIcon> */}
                {/* <AtButton size='small' circle={true} type='primary'>关注</AtButton> */}
              </View>
            </View>
            <View className='at-article__comment'>{item.text}</View>
          </View>)
        } else {
          const preItem = commentListAll.find(el => el._id == item.commentId);
          if (preItem) {
            domArr.push(<View className="two_thumb">
              <View>
                <View className='at-article__comment commentContent'>
                  <View className='nickNameOnly'>{item.userInfo.nickName}</View>
                  回复
                <View className='nickNameOnly'>{preItem && preItem.userInfo && preItem.userInfo.nickName}&nbsp;</View> :
            </View>
                <View className='at-article__comment'>{item.text}</View>
              </View>
              <View>
                <View className='thumb' onClick={() => handCommentUser(item)}>💬</View>
                {
                  openid == "o2ml-5c_nKI2Tf9pLBJBCdnbu5v4" && <View className='thumb' onClick={() => handCommentRemove(item)}>删除</View>
                }
              </View>

            </View>)
          }
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

  // 预览图片
  const hangImage = (src) => {
    console.log(imgList, "imgList");
    Taro.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList
    })
  }

  return <PageBarRoot hasTabBar={false}>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View>
        题库详情
        </View>
    </CusNavBar>
    <AtActivityIndicator
      content='加载中...'
      size={74}
      mode="center"
      isOpened={isOpened}
    />
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
                  onClick={() => hangImage(item.insert.image)}
                />
              } else {
                // 文字 at-article__p 
                return <View className='at-article__p taro_html' dangerouslySetInnerHTML={{ __html: item.insert && `<h1>${item.insert.replace(/\n/g, "</h1><h1>")}</h1>` }}></View>
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
          {
            curItem.userInfo && <AtInput
              name='value1'
              type='text'
              value={comment}
              placeholder={`回复${curItem.userInfo.nickName}`}
              // '输入你的想法.....'
              onChange={handCommentChange}
            />
          }

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