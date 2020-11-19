/**
 * @description render 函数 获取用户信息
 * @author ronffy
 * @Date 2019-12-03 17:50:57
 * @LastEditTime 2020-11-19 14:56:56
 * @LastEditors cq
 */
import Taro, { ComponentClass } from '@tarojs/taro';
import { Button } from '@tarojs/components';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import { RootState } from '@/ts-types/store';
import { UserInfo } from '@/ts-types/store/AppState';
import { ReactNode } from 'react';
import { PromiseDispatch } from '@/ts-types/dva';
import isEmpty from '@/utils/isEmpty';
import './index.scss';
import React from 'react';

interface GetUserInfoStateProps {
  userInfo: UserInfo
}

interface GetUserInfoDispatchProps {
  updateUserInfo(userInfo: UserInfo): Promise<any>
}

interface GetUserInfoOwnProps {
  children?: ReactNode
  onGetUserInfo?(userInfo?: UserInfo): void // 授权成功或失败的回调（成功则返回 userInfo ，失败返回空）
}

export interface GetUserInfoProps extends GetUserInfoStateProps, GetUserInfoDispatchProps, GetUserInfoOwnProps {

}

// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

const GetUserInfo: React.FC<GetUserInfoProps> = ({ userInfo, updateUserInfo, onGetUserInfo, children }) => {
  const handleGetUserInfo = (e) => {
  
  }

  return (
    <Button openType='getUserInfo' onGetUserInfo={handleGetUserInfo} className='ctn-btn-none clearfix' >
      {children}
    </Button>
  );
}

const mapStateToProps: MapStateToProps<GetUserInfoStateProps, GetUserInfoOwnProps, {}> = ({ app }: RootState) => ({
  // userInfo: app.userInfo
});

const mapDispatchToProps: MapDispatchToProps<GetUserInfoDispatchProps, GetUserInfoOwnProps> = (dispatch) => {
  return {
    // updateUserInfo(userInfo): Promise<any> {
    //   return (dispatch as PromiseDispatch)({
    //     type: `app/updateUserInfo`,
    //     payload: userInfo
    //   })
    // },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetUserInfo as any) as ComponentClass<GetUserInfoOwnProps, any>
