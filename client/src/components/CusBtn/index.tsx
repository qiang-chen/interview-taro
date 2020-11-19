/**
 * @description 
 * @author cq
 * @Date 2019-12-12 22:48:40
 * @LastEditTime 2019-12-13 14:58:22
 * @LastEditors ronffy
 * 确定按钮 
 * onClick:点击的回调函数
 * disabled:是否禁用 boolean
 * style:样式修改
 */
import { View } from '@tarojs/components';
import { SFC, ReactNode, CSSProperties } from 'react';
import './index.scss'
import classNames from 'classnames';

type CusBtnProps = Partial<{
  children: ReactNode
  onClick: () => void
  style: CSSProperties
  disabled: boolean
}>

const CusBtn: SFC<CusBtnProps> = ({ disabled, onClick, children, style}: CusBtnProps) => {
  const handleClick = () => {
    if (disabled) {
      return;
    }
    onClick && onClick()
  }
  const classString = classNames('comp_config_btn', {
    disabled
  });
  return (
    <View className={classString}
      onClick={handleClick}
      style={style}
    >
        {children}
    </View>
  )
}



export default CusBtn