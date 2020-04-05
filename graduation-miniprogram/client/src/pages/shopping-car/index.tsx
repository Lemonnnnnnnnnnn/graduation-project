import { ComponentClass } from 'react'
import Taro, { Component, Config, request } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
// npm包
import dayjs from 'dayjs'

// components
import Decorate from '@/components/decorate'
import Board from '@/components/board'
import CustomImage from '@/components/custom-image'
import LoginMask from '@/components/loginMask'

// redux
import { connect } from '@tarojs/redux'
import * as dishesActions from '@/actions/dishes'

// types
import { dishesPayloadComplete } from '@/types/dishes'

type PageStateProps = {}

type PageDispatchProps = {
  shoppingCar: Array<dishesPayloadComplete>,
  dispatchClearCar: Function
}

type PageOwnProps = {}

type PageState = {
  total: number,
  showLoginMask: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ShoppingCar {
  props: IProps;
  state: PageState
}

/**
 * @connect 是一个装饰器，以@connect()(类对象)使用
 * 目的是将redux中的数据和方法添加进class的props对象
 * 同时为redux中的方法传入一个dispatch方法，使其具有发送actions到reducer的功能
 */
@connect(state => state, {
  ...dishesActions
})
class ShoppingCar extends Component {
  config: Config = {
    navigationBarTitleText: '购物车',
    navigationBarBackgroundColor: '#56916D'
  }

  constructor(props: any) {
    super(props)
    this.state = {
      total: 0,
      showLoginMask: false,
    }
  }

  componentDidShow() {
    const { shoppingCar } = this.props
    let total: number = 0
    shoppingCar.forEach(i => total += i.sum)
    this.setState({ total, showLoginMask: false })
  }

  onClickSubmitBtn() {
    const { shoppingCar } = this.props
    const { OPENID } = Taro.getStorageSync('user_info')

    if (!shoppingCar.length) {
      Taro.showToast({ icon: 'none', title: '啥东西都没有你在提交啥呢铁子' })
      return
    }

    if (!OPENID) {
      this.setState({ showLoginMask: true })
      return
    }

    this.onSubmitMenu()
  }

  onCloseLoginMask() {
    this.setState({ showLoginMask: false })
  }

  onSubmitMenu() {
    const { shoppingCar } = this.props
    const { total } = this.state
    const { tableID, OPENID } = Taro.getStorageSync('user_info')

    const dev = 'http://localhost:3000'
    const prod = 'https://www.linyuchen.xyz'

    Taro.cloud.callFunction({
      name: 'submitMenu',
      data: {
        list: shoppingCar,
        total,
        tableID,
        OPENID,
        timePart: dayjs().format('HH:mm'),
        timeComplete: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    }).then(() => {
      Taro.showToast({ icon: 'none', title: '订单已提交，请耐心等待' })
      this.props.dispatchClearCar()
      this.setState({ total: 0, showLoginMask: false })
    }).then(() => {
      Taro.request({
        url: `${prod}/submitMenu`,
        data: {},
        method: 'POST',
        success: (res) => { console.log(res) }
      })
    })
  }


  render() {
    const { shoppingCar } = this.props
    const { total, showLoginMask } = this.state

    return (
      <View >
        {/* 提示登录弹窗 */}
        {showLoginMask && <LoginMask onSubmitMenu={this.onSubmitMenu} onCloseLoginMask={this.onCloseLoginMask.bind(this)} />}
        <Decorate shadow='gray--1' height='150' borderRadius='normal' />

        <View className='m-3'>
          {
            shoppingCar.map(i => <Board key={String(i.dishesId)} className='p-2 my-3' shadow='black' color='grey--1'>
              <View className='at-row at-row__align--center at-row__justify--around text-normal'>
                <CustomImage className='at-col at-col-2' src={i.dishphoto} width='40' height='40' />
                <View className='text-gray overtext at-col at-col-5'>{i.dishname}</View>
                <View className='text-secondary at-col at-col-2' >{i.num}份</View>
                <View className='text-gray at-col at-col-2' >￥{i.sum}</View>
              </View>
            </Board>)
          }
          {!shoppingCar.length && <View className='my-4 text-center text-huge'>赶快去选择菜品吧！</View>}

          <View className='at-row at-row__justify--between my-3'>
            <View className-='text-large'>总价：</View>
            <View className='text-normal'>￥{total}</View>
          </View>

          <AtButton onClick={this.onClickSubmitBtn.bind(this)} type='primary' circle>提交订单</AtButton>

        </View>
      </View>
    )
  }

}
export default ShoppingCar as ComponentClass<PageOwnProps, PageState>
