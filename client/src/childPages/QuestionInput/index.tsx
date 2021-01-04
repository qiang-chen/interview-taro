/**
 * @description 题库录入
 * @author cq
 * @Date 2020-11-23 14:00:35
 * @LastEditTime 2021-01-04 15:51:51
 * @LastEditors cq
 */
/* eslint-disable import/first */



import Taro from '@tarojs/taro'
import { View, Text, Image, Editor, Button, RichText, Input, Picker } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar'
// import pagePath from '@config/pagePath'
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import { AtFloatLayout, AtSwipeAction, AtModal, AtToast, AtList, AtListItem, AtInput, AtButton, AtDivider } from 'taro-ui'
import { connect } from "react-redux";
// import isEmpty from '@/utils/isEmpty'
import { UserInfo } from "@/ts-types/store";
import React, { useEffect, useState } from 'react';
import './index.scss'
import pagePath from '@/config/pagePath';


type HomeProps = {
  dispatch?: any
}

type Iprops = HomeProps & Partial<UserInfo>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const namespace = 'questionInput';



const QuestionInput: React.FC<Iprops> = ({
  userInfo,
  openid
}) => {

  const [editorCtx, setEditorCtx] = useState(null) as any;
  // const [editorCtx, seteditorCtx]
  const [titleValue, setTitleValue] = useState("");
  const selector = ["vue", "react", "js", "node", "php", "java", "暂无匹配"]
  const [selectorChecked, setSelectorChecked] = useState("暂无匹配"); //上拉菜单的默认选择
  const [phoneValue, setPhoneValue] = useState("");  //输入自己的手机号
  const [tipModal, setTipModal] = useState(false); // 输入手机号提示框
  const [submitFlag, setSubmitFlag] = useState(false)

  const handleClickTitle = () => {
    console.log("点击首页标题")
  }

  // 返回上一级
  const handleClickBack = () => {
    Taro.navigateBack();
  }

  useEffect(() => {
    const query = Taro.createSelectorQuery()
    query.select('#editor').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      console.log(res, 123);
      // res[0].top       // #the-id节点的上边界坐标
      // res[1].scrollTop // 显示区域的竖直滚动位置
    })
  }, []);

  // 回退到上一步
  const undo = () => {
    editorCtx.undo()
  }

  // 富文本失去焦点的时候触发
  const handBlur = (html, text, delta) => {
    console.log(html)
  }

  // 富文本初始化完成触发
  const handReady = () => {
    const that = this
    Taro.createSelectorQuery().select('#editor').context(function (res) {
      console.log(res, "res");
      setEditorCtx(res.context)
    }).exec()
  }
  // 清空
  const clear = () => {
    editorCtx.clear()
  }

  // 向云服务器上传图片
  const uploadFile = () => {
    Taro.chooseImage({
      count: 1,
      success: (res) => {
        console.log(res.tempFilePaths[0], "sucess");
        const path = res.tempFilePaths[0];
        // 把图片转码为base64
        const fileContent = Taro.getFileSystemManager().readFileSync(path, 'base64');
        Taro.cloud.callFunction({
          name: 'uploadFile',
          data: {
            fileContent
          }
        }).then(res => {
          const { data } = res.result as any;
          Taro.showToast({
            title: '图片上传成功',
          })
          editorCtx.insertImage({
            src: data.fileID,
            height: '50px',
            extClass: "img_name"
          })
        }).catch(err => {
          Taro.showToast({
            title: '图片上传失败',
            icon: 'none'
          })
        })
      }
    })

  }
  // 标题的选择
  const handInput = (e) => {
    setTitleValue(e.detail.value)
  }

  // 保存函数
  const saveQuestionFn = (content) => {
    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'saveQuestion',
      // 传递给云函数的event参数
      data: {
        title: titleValue,
        content,
        subject_type: selectorChecked
      }
    }).then(res => {
      const { result } = res;
      const { code } = result as any;
      setSubmitFlag(false);
      if (!code) {
        Taro.showToast({
          title: '保存失败',
          icon: 'none'
        })
        return
      }
      Taro.showToast({
        title: '保存成功'
      })
      Taro.navigateTo({ url: pagePath.questionList })
    }).catch(err => {
      Taro.showToast({
        title: '保存失败',
        icon: 'none'
      })
      setSubmitFlag(false);
    })
  }

  // 提交
  const handSubmit = async () => {
    const content = (await editorCtx.getContents()).delta;
    if (!titleValue) {
      Taro.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return
    }
    if (content.ops.length == 1 && content.ops[0].insert.length == 1) {
      Taro.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return
    }
    if (submitFlag) {
      return
    }
    // 查看此用户是否保存过手机号
    const data: any = await Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getContactInfo',
      // 传递给云函数的event参数
      data: {
        userId: openid,
      }
    })
    console.log(data.result.data,123);
    if (!data.result.data.isReal) {
      setTipModal(true)
      return
    }
    setSubmitFlag(true);
    saveQuestionFn(content)
  }

  const handPickerChange = (e) => {
    setSelectorChecked(selector[e.detail.value])
  }

  const handleClose = () => {
    // 关闭
  }

  // 手机号同步修改
  const handPhoneValueChange = (value) => {
    setPhoneValue(value)
  }

  // 输入手机号后的提交
  const handBtnSubmit = async () => {
    const content = (await editorCtx.getContents()).delta;
    if (!phoneValue) {
      Taro.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
      return
    }
    const reg = /^1[3|4|5|7|8][0-9]{9}$/
    if (!reg.test(phoneValue)) {
      Taro.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    if (submitFlag) {
      return
    }
    setSubmitFlag(true);
    try {
      await Taro.cloud.callFunction({
        // 要调用的云函数名称
        name: 'saveContactInfo',
        // 传递给云函数的event参数
        data: {
          phone: phoneValue,
          userInfo
        }
      })
      saveQuestionFn(content)
    } catch (error) {
      Taro.showToast({
        title: '保存失败',
        icon: 'none'
      })
      setSubmitFlag(false)
    }


  }

  return <PageBarRoot hasTabBar>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View onClick={handleClickTitle}>
        题库录入
        </View>
    </CusNavBar>
    <View className='page-section'>
      <View>
        <Picker
          mode='selector'
          range={selector}
          onChange={handPickerChange}
        >
          <AtList>
            <AtListItem
              title='题目分类'
              extraText={selectorChecked}
            />
          </AtList>
        </Picker>
      </View>
    </View>
    <View className='page-home'>
      {/* QuestionInput */}
      <Input
        type='text'
        placeholder='请输入题目'
        value={titleValue}
        onInput={handInput}
      />
      <AtDivider content='分割线' />
      <Editor
        id='editor'
        className='editor'
        placeholder={'请输入答案'}
        showImgToolbar={true}
        onBlur={handBlur}
        onReady={handReady}
      />
      <View className='btn'>
        <AtButton circle={true} size='small' type='primary' onClick={undo}>回到答案上一步</AtButton>

      </View>
      <View className='btn'>
        <AtButton circle={true} size='small' type='primary' onClick={clear}>清空答案</AtButton>
      </View>
      <View className='btn'>
        <AtButton circle={true} size='small' type='primary' onClick={uploadFile}>上传图片</AtButton>
      </View>
      <View className='btn'>
        <AtButton circle={true} size='small' type='primary' onClick={handSubmit}>提交</AtButton>
      </View>

      <AtFloatLayout isOpened={tipModal} title="温馨提示" onClose={handleClose}>
        <View className='tip'>
          本项目是一个长期维护的知识分享宝典，欢迎各位读者在这里分享自己的知识；由于我们有各类奖励，
          所以您在上传分享的时候请输入自己的手机号，本小程序在这里郑重承诺不会将您的信息泄漏出去
        </View>

        <View className='tip'>
          <AtInput
            name='value'
            type='phone'
            placeholder='请输入手机号'
            title='手机号码'
            value={phoneValue}
            onChange={handPhoneValueChange}
          />
          <AtButton loading={submitFlag} type='primary' onClick={handBtnSubmit}>提交</AtButton>
        </View>
      </AtFloatLayout>
    </View>
  </PageBarRoot>
}


function mapStateToProps(state) {
  return ({
    userInfo: state.app.userInfo,
    openid: state.app.openid
  })
}

export default connect(mapStateToProps)(QuestionInput as any) 
