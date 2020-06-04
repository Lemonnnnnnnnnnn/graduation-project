import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton, AtIcon } from 'taro-ui'

// components
import CustomImage from '@/components/custom-image/'
import { PAGE_AUTH, PAGE_USER_INTEGRAL } from '@/constants/page'
import Board from '@/components/board'
import '../../styles/_page.scss'
import '../../styles/_icon.scss'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
  avatarUrl: String,
  nickName: String,
  integral: Number,
  isLogin: boolean
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

  constructor(props: any) {
    super(props)
    this.state = {
      avatarUrl: '',
      nickName: '',
      integral: 0,
      isLogin: false
    }
  }

  componentDidShow() {
    const { OPENID } = Taro.getStorageSync('user_info')

    Taro.cloud.callFunction({
      name: 'getUserDetail',
      data: { id: OPENID }
    }).then((res: any) => {
      if (res) {
        const { avatarUrl, nickName, integral } = res.result.data[0]
        this.setState({ avatarUrl, nickName, integral, isLogin: true })
      }
    }).catch((e) => {
      this.setState({ isLogin: false })
    })
  }

  onLogout() {
    Taro.clearStorageSync()
    this.componentDidShow()
  }


  render() {
    const { avatarUrl, nickName, integral, isLogin } = this.state

    return (
      <View className='p-3 page-user'>
        {isLogin &&
          <View>
            <View className='at-row at-row__justify--center mb-3'>
              <View >
                <CustomImage src={avatarUrl} width='90' height='50' customStyle={{ borderRadius: '50%' }} />
                <View className='text-center text-large text-bold'>{nickName}</View>
                <View className='text-center text-large text-bold'>当前积分：{integral}</View>
              </View>
            </View>

            <View onClick={() => Taro.navigateTo({ url: PAGE_USER_INTEGRAL })}>
              <Board className='py-3 mx-2'  >
                <View className='at-row at-row__justify--around px-2 width-auto'>
                  {/* 左 */}
                  <View className='at-row'>
                    <AtIcon prefixClass='iconfont icon' value='intergral' size='20' color='#333333' className='mr-2 mt-1 ' />
                    <View className='at-row at-row__align--center'>
                      <Text className='mr-2 text-normal'>积分兑换</Text>
                      <Text className='text-small text-muted'>免费商品</Text>
                    </View>
                  </View>
                  {/* 右 */}
                  <AtIcon value='chevron-right' color='#333333' size='16' />
                </View>
              </Board>
            </View>

            <AtButton type='secondary' className='mt-4' circle onClick={() => this.onLogout()}>退出登录</AtButton>
          </View>
        }
        {!isLogin && <AtButton type='primary' onClick={() => Taro.navigateTo({ url: PAGE_AUTH })} circle>登录</AtButton>}

      </View>
    )
  }

}
export default User as ComponentClass<PageOwnProps, PageState>
