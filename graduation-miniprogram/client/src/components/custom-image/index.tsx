import Taro, { Component } from '@tarojs/taro';
import { Image, View } from '@tarojs/components';

// NPM相关
import classNames from 'classnames'

interface IProps {
  width?: any,
  height?: any,
  mode?: any,
  className?: String,
  customStyle?: any,
  src?: any,
  radius?: String,
  specialValue: String[]
}


export default class CustomImage extends Component<IProps, {}> {
  static defaultProps = {
    mode: 'widthFix',
    width: '100%',
    height: 'auto',
    type: 'png',
    specialValue: ['%', 'vw', 'vh', 'auto']
  }
  render() {
    let { width, height, mode, src, className, radius, specialValue, customStyle } = this.props

    width = String(width)
    height = String(height)

    const widthIsSpecial = specialValue.find(i => width && i === width.replace(/\d+/, ''))
    const heightIsSpecial = specialValue.find(i => height && i === height.replace(/\d+/, ''))

    let imageStyle = {
      width: widthIsSpecial ? width : Taro.pxTransform(width * 2),
      height: heightIsSpecial ? height : Taro.pxTransform(height * 2)
    }

    imageStyle = {
      ...imageStyle,
      ...customStyle
    }

    const rootClassName = [
      `image--radius--${radius}`
    ]

    return (
      <Image
        lazyLoad
        className={classNames(rootClassName, className)}
        src={src ? src : ''}
        style={imageStyle}
        mode={mode}
      />
    );
  }
}
