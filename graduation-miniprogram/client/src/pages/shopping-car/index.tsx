import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
// npm包
import dayjs from 'dayjs'

// components
import Decorate from '@/components/decorate'
import Board from '@/components/board'
import CustomImage from '@/components/custom-image'

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
  total: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ShoppingCar {
  props: IProps;
  state: PageState
}

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
      total: 0
    }
  }

  componentDidShow() {
    const { shoppingCar } = this.props
    let total: number = 0
    shoppingCar.forEach(i => total += i.sum)
    this.setState({ total })
  }

  onSubmit() {
    const { shoppingCar } = this.props
    const { total } = this.state
    const { tableID } = Taro.getStorageSync('user_info')

    if (!shoppingCar.length) {
      Taro.showToast({ icon: 'none', title: '啥东西都没有你在提交啥呢铁子' })
      return
    }

    Taro.cloud.callFunction({
      name: 'submitMenu',
      data: {
        list: shoppingCar,
        total,
        tableID,
        timePart: dayjs().format('HH:mm'),
        timeComplete: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    }).then(() => {
      Taro.showToast({ icon: 'none', title: '订单已提交，请耐心等待' })
      this.props.dispatchClearCar()
      this.setState({ total: 0 })
    })
  }

  render() {
    const { shoppingCar } = this.props
    const { total } = this.state

    return (
      <View >
        <Decorate shadow='gray--1' height='150' borderRadius='normal' />
        <View className='m-3'>
          {
            shoppingCar.map(i => <Board key={String(i.dishesId)} className='p-2 my-3' shadow='black' color='grey--1'>
              <View className='at-row at-row__align--center at-row__justify--around text-normal'>
                <CustomImage src={i.dishphoto} width='40' height='40' />
                <View className='text-gray'>{i.dishname}</View>
                <View className='text-secondary'>{i.num}份</View>
                <View className='text-gray'>￥{i.sum}</View>
              </View>

            </Board>)
          }
          {!shoppingCar.length && <View className='my-4 text-center text-huge'>赶快去选择菜品吧！</View>}

          <View className='at-row at-row__justify--between my-3'>
            <View className-='text-large'>总价：</View>
            <View className='text-normal'>￥{total}</View>
          </View>

          <AtButton onClick={this.onSubmit.bind(this)} type='primary' circle>提交订单</AtButton>

        </View>
      </View>
    )
  }

}
export default ShoppingCar as ComponentClass<PageOwnProps, PageState>
