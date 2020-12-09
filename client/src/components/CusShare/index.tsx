/**
 * @description 分享拦截
 * @author cq
 * @Date 2020-12-09 14:07:14
 * @LastEditTime 2020-12-09 16:05:38
 * @LastEditors cq
 */
import React, { useEffect } from 'react';
import Taro, { useShareAppMessage, useShareTimeline } from '@tarojs/taro'
import { View } from '@tarojs/components'
import pagePath from '@/config/pagePath';
// import config from '@/config/index';

// const { ossOriginAddSalt, defaultAvatarUrl } = config;


interface IProps {
  children: any
}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const CusShare: React.FC<IProps> = ({ children }) => {

  useShareAppMessage(res => {
    console.log(res, 111);
    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'updateIntegral',
      data: {
        integral: 1,
        type: "add"
      }
    })
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '玉麟宝典，你值得拥有',
      path: pagePath.home,
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607425814349&di=06c53b263717c0104340b76202d0d2e3&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201201%2F21%2F20120121221819_xVua5.jpg',
      // 以下回调被废弃
      success: function () {
        console.log('分享成功');
      },
      cancel: function () {
        console.log('分享取消');
      },
      fail: function () {
        console.log('分享失败');
      }
    }
  })

  useShareTimeline(() => {
    console.log('useShareTimeline');
    return {
      title: '玉麟宝典，你值得拥有',
      path: pagePath.home,
      imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607425814349&di=06c53b263717c0104340b76202d0d2e3&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201201%2F21%2F20120121221819_xVua5.jpg'
    }
  })

  return (
    <View>
      {
        children
      }
    </View>
  );
}


export default CusShare

// class CusShare extends React.Component {

//   // this.props.children 是将要会渲染的页面
//   onShareAppMessage(res) {
//     console.log(1111);
//     if (res.from === 'button') {
//       // 来自页面内转发按钮
//       console.log(res.target)
//     }
//     return {
//       title: '自定义转发标题',
//       path: '/page/user?id=123'
//     }
//   }
//   render() {
//     return (
//       <View>
//         { this.props.children}
//       </View>
//     )
//   }
// }

// export default CusShare
