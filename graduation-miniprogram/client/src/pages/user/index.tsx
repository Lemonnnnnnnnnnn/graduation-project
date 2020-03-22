import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, OpenData } from '@tarojs/components'

// components
import CustomImage from '@/components/custom-image/'
import DishesList from '@/components/dishes-List'

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
    navigationBarTitleText: '用户中心',
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
    const { avatarUrl, nickName, integral } = Taro.getStorageSync('user_info')

    return (
      <View className='user'>
        <View className='at-row at-row__justify--center'>
          <CustomImage src={avatarUrl} width='50' height='50' customStyle={{ borderRadius: '50%' }} />
          <View>{nickName}</View>
          <View>当前积分：{integral}</View>
        </View>
      </View>
    )
  }

}
export default User as ComponentClass<PageOwnProps, PageState>
