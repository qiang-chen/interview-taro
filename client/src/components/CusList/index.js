/**
 * @description List 组件，从 Taro-ui 组件摘过来的
 * @author ronffy
 * @Date 2019-12-09 16:55:09
 * @LastEditTime 2019-12-09 17:45:29
 * @LastEditors ronffy
 */
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import AtComponent from '../common/component'
import './index.scss'

export default class CusList extends AtComponent {
  render() {
    const rootClass = classNames(
      'at-cuslist',
      {
        'at-cuslist--no-border': !this.props.hasBorder
      },
      this.props.className
    )

    return <View className={rootClass}>{this.props.children}</View>
  }
}

CusList.defaultProps = {
  hasBorder: false
}

CusList.propTypes = {
  hasBorder: PropTypes.bool
}
