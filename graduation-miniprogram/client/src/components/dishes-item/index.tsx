import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react'
import { View, Text, Button } from '@tarojs/components';
import { AtIcon } from 'taro-ui'

// constants
import { PAGE_DETAIL } from '@/constants/page'

// components
import Board from '@/components/board'
import CustomImage from '@/components/custom-image'
import DishesConfigMask from '@/components/dishes-config-mask'

// redux
import { connect } from '@tarojs/redux'
import * as dishesActions from '@/actions/dishes'

// types
import { dishesPayloadComplete, dishesPayload } from '@/types/dishes'

type PageStateProps = {
  shoppingCar: Array<dishesPayloadComplete>
}

type PageDispatchProps = {
  dispatchAddDishes: Function,
  dispatchSubtractDishes: Function
}

type PageOwnProps = {
  average: String,
  dishname: String,
  dishphoto: String,
  dishprice: Number,
  freq: Number,
  scores: number,
  key: string,
  dishesId: string,
  Spicy: boolean,
  format: boolean,
}

type PageState = {
  showConfigMask: boolean,
  existConfigMask: boolean,
  payload: dishesPayload,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface DishesItem {
  props: IProps;
  state: PageState
}

@connect(state => state, {
  ...dishesActions
})
class DishesItem extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props: any) {
    super(props)
    const { dishphoto, dishname, dishprice, Spicy, format, dishesId, scores } = this.props

    this.state = {
      showConfigMask: false,
      existConfigMask: (Spicy || format) ? true : false,
      payload: {
        dishname,
        dishesId,
        dishphoto,
        dishprice,
        scores,
        Spicy: '',
        format: '',
        remarkTem: '',
      },
    }
  }

  onAddItem() {
    const { existConfigMask, payload } = this.state
    if (existConfigMask) {
      this.setState({ showConfigMask: true })
    } else {
      this.props.dispatchAddDishes(payload)
    }
  }

  onSubtractItem(dishesId: String) {
    this.props.dispatchSubtractDishes(dishesId)
  }

  ondispatchPayload({ params }) {
    let { payload } = this.state
    payload = { ...payload, ...params }
    this.props.dispatchAddDishes(payload)
  }

  onCloseMask() {
    this.setState({ showConfigMask: false })
  }

  render() {
    const { average, dishphoto, dishname, dishprice, freq, Spicy, format, dishesId, shoppingCar, scores } = this.props
    const { showConfigMask, existConfigMask } = this.state
    let num = 0

    for (let i = 0; i < shoppingCar.length; i++) {
      if (shoppingCar[i].dishname === dishname) {
        num = shoppingCar[i].num
        break
      }
    }

    /**
     *  find() 对于空数组，函数是不会执行的。
     *  所以当shoppingCar从[1]=>[]时，currentItem = 空执行
     *  在下一行打印其为undefined
     *  但在三目运算符中 用 currentItem && View 成功执行了方法，并且读的是上一个currentItem值
     *  故而猜测因为我引用了currentItem.num，故而生成了闭包，导致currentItem的值没有被销毁，我读取到了缓存中的值
     */
    // const currentItem = shoppingCar.find(i => i.dishname === dishname)
    // console.log(currentItem)

    return (
      <Board shadow='gray' className='wrap-Style my-2'>
        {/* 弹窗 */}
        {existConfigMask && <DishesConfigMask
          ondispatchPayload={this.ondispatchPayload.bind(this)}
          Spicy={Spicy}
          format={format}
          show={showConfigMask}

          onCloseMask={this.onCloseMask.bind(this)}
        />}

        <View className='at-row' style={{ minHeight: Taro.pxTransform(140 * 2) }}>
          {/* 左 菜图片 */}
          <View className='at-col at-col-5' onClick={() => Taro.navigateTo({ url: PAGE_DETAIL + '?id=' + dishesId })}>
            <CustomImage src={dishphoto} />
          </View>
          {/* 右 菜信息 */}
          <View className='p-2 position-relative at-col-6' >
            {/* 第一行名字 */}
            <View className='text-large'>{dishname}</View>

            {/* 第二行销售 */}
            <View className='text-secondary text-small mt-2'>总销售数：{freq}</View>

            {/* 第三行平均分积分 */}
            <View className='at-row at-row__justify--between at-row__align--center mt-2'>

              <View className='at-col at-col-7'>
                <View className='at-row at-row__align--center '>
                  <AtIcon value='star-2' color='#FFC919' size='15' />
                  <View className='ml-2 text-yellow text-large' style={{ marginTop: Taro.pxTransform(2 * 2) }}>{average}</View>
                </View>
              </View>

              <View className='at-col at-col-5 text-secondary text-small' style={{ marginTop: Taro.pxTransform(2 * 2) }}>积分：{scores}</View>
            </View>

            <View className='at-row at-row__justify--between at-row__align--center position-absolute' style={{ bottom: Taro.pxTransform(5 * 2) }} >
              <View className='at-row at-row__align--center text-green '>
                <Text className='text-large'>￥</Text>
                <Text className='text-huge' style={{ marginBottom: Taro.pxTransform(2 * 2) }}>{dishprice}</Text>
              </View>

              {/* 按钮 */}
              <View >
                <View className='at-row at-row__align--center'>
                  {num && <AtIcon onClick={this.onSubtractItem.bind(this, dishesId)} className='mr-3' value='subtract-circle' color='#56916D' size='28' />}
                  {num && <View className='mr-3 text-green'>{num}</View>}
                  <AtIcon onClick={this.onAddItem.bind(this)} value='add-circle' color='#56916D' size='28' />
                </View>
              </View>

            </View>

          </View>
        </View>
      </Board>
    );
  }
}

export default DishesItem as ComponentClass<PageOwnProps, PageState>
