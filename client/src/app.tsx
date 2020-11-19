/* eslint-disable import/first */
/**
 * @description 
 * @author cq
 * @Date 2020-11-17 20:02:40
 * @LastEditTime 2020-11-19 20:10:34
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

  componentDidShow() { }

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
