/**
 * @description 我的 页面
 * @author ronffy
 * @Date 2019-12-09 16:25:35
 * @LastEditTime 2021-01-04 16:10:16
 * @LastEditors cq
 */
import React, { useEffect, useState } from 'react';
import Taro, { ComponentClass, useShareAppMessage } from '@tarojs/taro'
import { View, Text, Image, Button } from '@tarojs/components'
import AppTabBar from '@/containers/AppTabBar';
import CusList from '@/components/CusList';
import CusListItem from '@/components/CusList/CusListItem';
import { connect, MapStateToProps } from 'react-redux'
import config from '@/config/index';
import { RootState } from '@/ts-types/store';
import { UserInfo } from '@/ts-types/store/AppState';
import CusNavBar from '@/components/CusNavBar';
import PageBarRoot from '@/containers/PageBarRoot';
import pagePath from '@/config/pagePath';
import CusShare from "@/components/CusShare"
import './index.scss'
import { AtAvatar } from 'taro-ui';


const { ossOriginAddSalt, defaultAvatarUrl } = config;

const defaultUserInfo = {
  avatarUrl: defaultAvatarUrl,
  nickName: '未登录'
};

interface MineStateProps {
  userInfo: UserInfo
  openid:string
}

export interface MineProps extends MineStateProps {

}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const Mine: React.FC<MineProps> = ({ userInfo, openid }) => {

  const [integral, setIntegral] = useState(null);  //个人积分

  useEffect(() => {
    Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getIntegral',
      data: {
        openid
      }
    }).then((res:any)=>{
      const result:any = res.result;
      if (!result.code){
        Taro.showToast({
          title: '积分查询失败',
          icon: 'none'
        })
        return
      }
      setIntegral(result.data[0].integral)
    })
  }, [])

  const handContact=async ()=>{
    const result=await Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'updateIntegral',
      data: {
        integral: 3,
        type: "reduce"
      }
    })
    const { code, data } = result.result as any;
    if (!code){
      Taro.showToast({
        title: data,
        icon: 'none'
      })
      return
    }
    Taro.navigateTo({ url: pagePath.contact })
  }
  const handSuccess=()=>{
    console.log("执行了吗");
    if (typeof integral=='number'){
      setIntegral(integral + 1)
    }
  }

  return (
    <PageBarRoot hasTabBar>
      <CusShare onSuccess={handSuccess}>
        {/* navBar */}
        <CusNavBar>我的</CusNavBar>

        <View className='page-mine'>
          <AtAvatar
            image={userInfo.avatarUrl}
            size={'small'}
            circle={true}></AtAvatar>
          <View className='nickname'>
            <View className='nickNameOnly'> {userInfo.nickName}</View>
          </View>
          <View>
            个人积分： {integral}
          </View>
          <Button
            openType="share"
            title="分享标题"
            imgUrl="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607425814349&di=06c53b263717c0104340b76202d0d2e3&imgtype=0&src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201201%2F21%2F20120121221819_xVua5.jpg"
          >分享好友 加1个积分</Button>

          <Button onClick={handContact}>
            查看个人联系方式 消耗3个积分
          </Button>
      </View>
      </CusShare>
      {/* tabBar */}
      <AppTabBar current={3} />
    </PageBarRoot>
  );
}

function mapStateToProps(state) {
  return ({
    userInfo: state.app.userInfo,
    openid: state.app.openid
  })
}

export default connect(mapStateToProps)(Mine as any) 
