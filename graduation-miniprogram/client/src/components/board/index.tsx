// Taro 相关
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'

// NPM 相关
import classNames from 'classnames'

interface IProps {
  fixed?: String,
  color?: String,
  border?: String,
  className?: String,
  customStyle?: any,
  shadow?: String,
}

class Board extends Component<IProps, {}> {

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    border: 'all', // 可选值 all, top, bottom, none
    fixed: false,
    title: false,
    fixedTop: false,
    color: 'white',
    style: {},
  }

  render() {
    const {
      fixed,
      color,
      border,
      className,
      customStyle,
      shadow,
    } = this.props

    const rootClassName = [
      'board',
      `board--${border}`,
      `board--${color}`,
      `board--shadow--${shadow}`
    ]

    const classObject = {
      'board--fixed-bottom': fixed === 'bottom',
      'board--fixed-top': fixed === 'top',
    }


    return (
      <View
        style={customStyle}
        className={classNames(rootClassName, classObject, className)}
      >
        {this.props.children}
      </View>
    )
  }
}

export default Board
