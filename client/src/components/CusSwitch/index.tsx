/**
 * @description
 * @author oyqx
 * @Date 2019-12-05 15:54:00
 * @LastEditTime 2019-12-20 16:37:13
 * @LastEditors cq
 * @params
 * checked:	指定当前是否选中
 * StyleName: Switch 器类style
 * unCheckedChildren: 非选中时的内容
 * checkedChildren: 选中时的内容
 * titleColor： 选中时的内容颜色
 * bgColor： 选中时的背景颜色
 * disabled： 是否禁用
 * onChange：点击时回调函数
 */
import Taro, { Component } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import classNames from 'classnames'
import './index.scss'

type PageState = {
  isChecked: boolean
}
type CusSwitchProps = Partial<{
  checked: boolean
  checkedChildren: string,
  unCheckedChildren: any,
  bgColor: string,
  titleColor: string
  disabled: boolean,
  onChange: (values) => void;
  StyleName: any
}>
class CusSwitch extends Component<CusSwitchProps, PageState>{
  state = {
    isChecked: false
  }
  static getDerivedStateFromProps(nextProps) {
    const { checked } = nextProps;
    if (checked === true || checked === false) {
      return {
        isChecked: checked
      }
    }
   }
  // componentWillReceiveProps(nextProps) {

  // }
  handleToggle = () => {
    const { isChecked } = this.state
    const { disabled, onChange } = this.props
    if (!disabled) {
      this.setState({
        isChecked: !isChecked
      })
    }
    if (onChange) {
      onChange(isChecked)
    }
  }
  render() {
    const { isChecked } = this.state
    const { checkedChildren, bgColor, titleColor, unCheckedChildren, StyleName = {} } = this.props
    const CusConClassNames = classNames('cus-switch',
      {
        'toggle-on': isChecked
      },
      {
        'toggle-off': !isChecked
      })
    return <View
      className={CusConClassNames}
      style={isChecked ? { background: bgColor || '#09bb07', ...StyleName } : { background: '#F24551', ...StyleName }}
      onClick={this.handleToggle}
    >
      <Text className='cus-switchOn-Title' style={{ color: titleColor }}>{checkedChildren}</Text>
      <View className='cus-switchOff-Title' style={{ color: titleColor }}>{unCheckedChildren}</View>
    </View>
  }
}

export default CusSwitch