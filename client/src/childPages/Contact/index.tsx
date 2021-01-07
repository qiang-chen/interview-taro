/**
 * @description 个人联系方式页面
 * @author cq
 * @Date 2020-12-09 16:26:44
 * @LastEditTime 2021-01-07 20:28:32
 * @LastEditors cq
 */

import React from 'react';
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PageBarRoot from '@/containers/PageBarRoot';
import CusShare from '@/components/CusShare';
import CusNavBar from '@/components/CusNavBar';


interface IProps {
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Contact: React.FC<IProps> = ({ }) => {

  // 返回上一级
  const handleClickBack = () => {
    Taro.navigateBack();
  }

  return (
    <PageBarRoot hasTabBar>
      <CusShare>
        {/* navBar */}
        <CusNavBar leftIconType='chevron-left' onClickLeftIcon={handleClickBack}>联系方式</CusNavBar>

        <View>
          微信号：1715584439
       </View>
        <View>
          请注明出处       
        </View>
      </CusShare>
      {/* tabBar */}
    </PageBarRoot>
  );
}


export default Contact
