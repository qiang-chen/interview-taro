/**
 * @description 容器组件  展示每个题的答案
 * @author cq
 * @Date 2020-11-24 16:40:33
 * @LastEditTime 2020-11-24 16:51:03
 * @LastEditors cq
 */


import Taro from '@tarojs/taro'
import { View, Text, Image, Editor } from '@tarojs/components'
import React, { useEffect, useState } from 'react';


type ShowViewProps = {
  subjectList: any[]
}

type Iprops = ShowViewProps

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------



const ShowView: React.FC<Iprops> = ({ 
  subjectList
}) => {
  const [editorCtx, setEditorCtx] = useState(null) as any;


  // 富文本初始化完成触发
  const handReady = () => {
    const that = this
    Taro.createSelectorQuery().select('#edit').context(function (res) {
      console.log(res, "res", subjectList[0], editorCtx);
      setEditorCtx(res.context)
      res.context.setContents({
        delta: subjectList[0].content.ops,
        success: () => {
          console.log("成功");
        },
        fail: () => {
          console.log("error");
        }
      })
    }).exec()
  }

  return <>
    <Editor
      id='edit'
      className='edit'
      placeholder={'来，输入隔壁的名字试试...'}
      // showImgToolbar={true}
      // onBlur={handBlur}
      onReady={handReady}
      readOnly={true}
      value={subjectList[0]}
    />
  </>
}

export default ShowView
