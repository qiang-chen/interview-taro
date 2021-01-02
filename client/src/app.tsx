/* eslint-disable import/first */
/**
 * @description 
 * @author cq
 * @Date 2020-11-17 20:02:40
 * @LastEditTime 2021-01-02 23:00:27
 * @LastEditors cq
 */
import React from 'react'
// import { Provider } from 'react-redux'
import { Provider } from 'react-redux'
import createStore from './store'
import Taro from '@tarojs/taro'
import './app.scss';

const store = createStore()
class App extends React.Component {

  async componentDidMount() {
    Taro.cloud.init({
      env: 'yulin-9g6l3xz5b5e76bdd',
      traceUser: true,
    })
  }

  async componentDidShow() {
    //请求个人openid  用于后续各种业务处理
    const openid = await Taro.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getOpenid',
    })
    console.log(openid.result, 123);
    const { data } = openid.result as any;
    store.dispatch({
      type: 'app/updateState',
      payload: {
        openid:data
      }
    })
    
    // 查看是否授权  不能让用户默认授权了 好气呀～
    const res = await Taro.getSetting();
    if (res.authSetting['scope.userInfo']) {
      // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      const { userInfo } = await Taro.getUserInfo();
      store.dispatch({
        type: 'app/updateUserInfo',
        payload: userInfo
      })
      return userInfo;
    }
  }

  componentDidHide() { }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
