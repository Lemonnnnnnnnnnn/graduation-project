import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, OpenData } from '@tarojs/components'

// components
import CustomImage from '@/components/custom-image/'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  name: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface User {
  props: IProps;
  state: PageState
}

class User extends Component {

  config: Config = {
    navigationBarTitleText: '我的'
  }

  constructor(props) {
    super(props)
    this.state = {
      name: '小红'
    }

  }
  componentWillReceiveProps(nextProps) { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    const user_info = Taro.getStorageSync('user_info')

    return (
      <View className='user'>
        <CustomImage src={user_info.avatarUrl} width='50' height='50' />
      </View>
    )
  }

}
export default User as ComponentClass<PageOwnProps, PageState>
