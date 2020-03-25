import Taro, { Component } from '@tarojs/taro'
import classNames from 'classnames'
import { View } from '@tarojs/components'

/**
 * 遮罩层
 * ----------------------------
 **说明
 * 1.全局有 m-2 的边距
 * ----------------------------
 **参数
 * 1.show 是否显示遮罩层，默认值为 false
 * 2.className 外部样式使用，默认值为负边距
 * 3.onClick 点击后的回调函数，默认为 () => {}
 * ----------------------------
 */

type PageStateProps = {

}

type PageDispatchProps = {}

type PageOwnProps = {
  onClick: any,
  show: boolean,
  className: string,
}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Mask {
  props: IProps;
  state: PageState
}

class Mask extends Component {
  static defaultProps = {
    show: false,
    className: 'minus-ml-2',
  }
  static options = {
    addGlobalClass: true
  }

  onMaskTouchMove(e) {
    return e.stopPropagation()
  }

  render() {
    const { show, className } = this.props

    const rootClassName = ['page-mask']
    const classObject = {}

    return (show && <View
      onClick={this.props.onClick}
      onTouchMove={this.onMaskTouchMove}
      className={classNames(rootClassName, classObject, className)}
    >
    </View>)
  }
}

export default Mask
