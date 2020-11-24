/**
 * @description 容器组件  展示每个题的答案
 * @author cq
 * @Date 2020-11-24 16:40:33
 * @LastEditTime 2020-11-24 21:08:13
 * @LastEditors cq
 */


import Taro from '@tarojs/taro'
import { Editor } from '@tarojs/components'
import React, { useState } from 'react';


type ShowViewProps = {
  answer: any
}

type Iprops = ShowViewProps

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------



const ShowView: React.FC<Iprops> = ({ 
  answer
}) => {

  // 富文本初始化完成触发
  const handReady = () => {
    Taro.createSelectorQuery().select(`#edit${answer._id}`).context(function (res) {
      res.context.setContents({
        delta: answer.content.ops,
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
      id={`edit${answer._id}`}
      className='edit'
      onReady={handReady}
      readOnly={true}
      placeholder="暂无数据"
    />
  </>
}

export default ShowView
