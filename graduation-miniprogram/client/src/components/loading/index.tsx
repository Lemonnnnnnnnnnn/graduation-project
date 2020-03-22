import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './_loading.scss'

type PageStateProps = {
  show: boolean
}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Loading {
  props: IProps;
  state: PageState
}

class Loading extends Component {

  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    className: '',
    show: false,
  }

  render() {
    const { show } = this.props

    return (show &&
      <View className='mt-3'>
        <View className='spinner'>
          <View className='bounce1'></View>
          <View className='bounce2'></View>
          <View className='bounce3'></View>
        </View>
      </View>
    )
  }
}

export default Loading
