import { ComponentClass } from 'react'
// Taro 相关
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {
  height?: string,
  color?: string,
  shadow?: string,
  borderRadius?: string
}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Decorate {
  props: IProps;
  state: PageState
}

class Decorate extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    borderRadius: 'normal',
    height: '100'
  }

  render() {
    const { height, color, shadow, borderRadius } = this.props
    let style = {}

    if (height) {
      style = {
        height: `${Taro.pxTransform(parseInt(height))}`
      }
    }

    const rootClassName = [
      'decorate',
      `decorate--${color}`,
      `decorate--shadow--${shadow}`,
      `decorate--border--radius--${borderRadius}`
    ]

    return (
      <View className={classNames(rootClassName, 'position-relative')} style={style}></View>
    )
  }
}

export default Decorate as ComponentClass<PageOwnProps, PageState>
