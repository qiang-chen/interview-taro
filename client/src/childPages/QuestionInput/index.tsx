/**
 * @description 题库录入
 * @author cq
 * @Date 2020-11-23 14:00:35
 * @LastEditTime 2020-11-23 20:36:19
 * @LastEditors cq
 */
/* eslint-disable import/first */



import Taro from '@tarojs/taro'
import { View, Text, Image, Editor, Button, RichText } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar'
// import pagePath from '@config/pagePath'
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import { AtFloatLayout, AtSwipeAction, AtModal, AtToast } from 'taro-ui'
import { connect } from "react-redux";
// import isEmpty from '@/utils/isEmpty'
import { HomeState } from "@/ts-types/store";
import React, { useEffect, useState } from 'react';
import './index.scss'


type HomeProps = {
  dispatch?: any
}

type Iprops = HomeProps & Partial<HomeState>

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const namespace = 'questionInput';



const QuestionInput: React.FC<Iprops> = ({ }) => {

  const [editorCtx, setEditorCtx] = useState(null);
  // const [editorCtx, seteditorCtx]

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
    console.log(editorCtx, 111);
    editorCtx.clear()
  }

  // 插入图片
  const insertImage = () => {
    editorCtx.insertImage({
      // 妈卖批 https协议的还不能上传
      src: "http://img.sunlands.wang/addSalt/img/1.0/home/inputVoucher.png",
      // src: 'http://www.baidu.com/s?wd=%E7%BE%8E%E5%A5%B3%E5%9B%BE%E7%89%87%E5%BA%93&usm=2&ie=utf-8&rsv_cq=%E5%9B%BE%E7%89%87&rsv_dl=0_right_recommends_merge_20826&euri=2853269',
      width: '100px',
      height: '50px',
      extClass: "img_name"
    })
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
          editorCtx.insertImage({
            src: data.fileID,
            height: '50px',
            extClass: "img_name"
          })
        })
      }
    })

  }

  return <PageBarRoot hasTabBar>
    {/* navBar */}
    <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>
      <View onClick={handleClickTitle}>
        题库录入
        </View>
    </CusNavBar>
    <View className='page-home'>
      QuestionInput
      <Editor
        id='editor'
        className='editor'
        placeholder={'来，输入隔壁的名字试试...'}
        showImgToolbar={true}
        onBlur={handBlur}
        onReady={handReady}
      />
      <Button type='warn' onClick={undo}>撤销</Button>
      <Button onClick={clear}>清空</Button>
      <Button onClick={insertImage}>点击插入图片</Button>
      <Button onClick={uploadFile}>云储存图片</Button>
    </View>
  </PageBarRoot>
}


function mapStateToProps(state) {
  return ({

  })
}

export default connect(mapStateToProps)(QuestionInput as any) 
