import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import logo from '@/assets/sanji.jpg'
// components
import CustomImage from '@/components/custom-image'

// constants
import { LOCALE_AUTH } from '@/constants/locale'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  code: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface UserAuth {
  props: IProps;
  state: PageState
}


class UserAuth extends Component {

  config: Config = {
    navigationBarTitleText: '授权登录'
  }

  static options = {
    addGlobalClass: true
  }

  state = {
    code: ''
  }

  /**
   * 用户授权登录
   * @param {*} event 默认事件
   */
  onLogin = (event: any) => {
    const { target: { userInfo } } = event

    Taro.cloud.callFunction({
      name: 'login',
      data: userInfo
    })
      .then(res => {
        let result: any = res.result
        const user_info = { ...result, ...userInfo }

        Taro.setStorageSync('user_info', user_info)
        Taro.navigateBack()
      })
  }

  onCancle() {
    Taro.navigateBack()
  }

  render() {
    return (
      <View className='mt-5 mx-3'>
        {/* Logo */}
        <View className='text-center'>
          <CustomImage src={logo} width='100' height='100' />
        </View>

        {/* 授权说明 */}
        <View className='text-center m-3'>
          <Text className='text-muted text-normal'>{LOCALE_AUTH}</Text>
        </View>

        {/* 确认按钮 */}
        <View>
          <AtButton className='btn-green' openType='getUserInfo' onGetUserInfo={this.onLogin} >登录</AtButton>
          <AtButton className='btn-grey mt-3' onClick={this.onCancle}>取消</AtButton>
        </View>
      </View>
    )
  }
}

export default UserAuth as ComponentClass<PageOwnProps, PageState>
