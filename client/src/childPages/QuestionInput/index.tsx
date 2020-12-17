/**
 * @description 题库录入
 * @author cq
 * @Date 2020-11-23 14:00:35
 * @LastEditTime 2020-12-17 15:46:57
 * @LastEditors cq
 */
/* eslint-disable import/first */



import Taro from '@tarojs/taro'
import { View, Text, Image, Editor, Button, RichText, Input, Picker } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar'
// import pagePath from '@config/pagePath'
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import { AtFloatLayout, AtSwipeAction, AtModal, AtToast, AtList, AtListItem } from 'taro-ui'
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

  const [editorCtx, setEditorCtx] = useState(null) as any;
  // const [editorCtx, seteditorCtx]
  const [titleValue, setTitleValue] = useState("");
  const selector = ["vue", "react", "js", "node", "php", "java", "暂无匹配"]
  const [selectorChecked, setSelectorChecked] = useState("暂无匹配"); //上拉菜单的默认选择

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
          editorCtx.insertImage({
            src: data.fileID,
            height: '50px',
            extClass: "img_name"
          })
        })
      }
    })

  }
  // 标题的选择
  const handInput = (e) => {
    setTitleValue(e.detail.value)
  }

  // 提交
  const handSubmit = async () => {
    console.log(await editorCtx.getContents());
    const content = (await editorCtx.getContents()).delta
    console.log(titleValue, content, selectorChecked);
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
      if (!code) {
        console.log("服务器错误");
        return
      }
    })
  }

  const handPickerChange = (e) => {
    setSelectorChecked(selector[e.detail.value])
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
      <Editor
        id='editor'
        className='editor'
        placeholder={'来，输入隔壁的名字试试...'}
        showImgToolbar={true}
        onBlur={handBlur}
        onReady={handReady}
      />

      <Button type='warn' onClick={undo}>回到答案上一步</Button>
      <Button onClick={clear}>清空答案</Button>
      <Button onClick={uploadFile}>云储存图片</Button>

      <Button onClick={handSubmit}>提交</Button>
    </View>
  </PageBarRoot>
}


function mapStateToProps(state) {
  return ({

  })
}

export default connect(mapStateToProps)(QuestionInput as any) 
