/**
 * @description 重新封装 Picker 选择器组件
 * @author ronffy
 * @Date 2019-12-01 15:10:00
 * @LastEditTime 2019-12-03 17:24:53
 * @LastEditors ronffy
 */

import Taro, { ComponentClass } from '@tarojs/taro';
import { Picker } from "@tarojs/components";
import getDisplayName from '@/utils/getDisplayName';
import { PickerSelectorProps } from '@tarojs/components/types/Picker';
import { ReactNode } from 'react';

const createCusPicker = (WarpedComponent) => class extends WarpedComponent {
  static displayName = `HOC${getDisplayName(WarpedComponent)}`
  render() {
    try {
      const props = { ...this.props };
      const { headerClassName, header } = props;
      delete props.headerClassName;
      delete props.header;
      const tree = super.render();

      const head = tree.children[2].children[0];
      if (header) {
        head.children = header;
        head.props.children = header;
      }
      if (headerClassName) {
        head.props.className = head.props.className + ' ' + headerClassName;
      }

      const element = (Taro as any).cloneElement(tree, {
        ...tree.props,
        ...props,
      }, tree.props.children)
      return element
    } catch (e) {
      return <WarpedComponent {...this.props} />
    }
  }
}

export default createCusPicker(Picker) as ComponentClass<PickerSelectorProps & {
  header?: ReactNode
  headerClassName?: string
}>
