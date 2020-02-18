import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react'
import { View, Text, Button } from '@tarojs/components';
import { AtIcon } from 'taro-ui'

// types
import { baseObj } from '@/types/obj'

// components
import Board from '@/components/board'
import CustomImage from '@/components/custom-image'
import DishesConfigMask from '@/components/dishes-config-mask'


type PageStateProps = {}

type PageDispatchProps = {
}

type PageOwnProps = {
  average: String,
  dishname: String,
  dishphoto: String,
  dishprice: Number,
  freq: Number,
  scores?: Number,
  key: string,
  dishesId: string,
  Spicy?: Array<baseObj>,
  format?: Array<baseObj>,
}

type PageState = {
  showConfigMask: boolean,
  existConfigMask: boolean
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface DishesItem {
  props: IProps;
  state: PageState
}


class DishesItem extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props: any) {
    super(props)
    const { Spicy, format } = this.props

    this.state = {
      showConfigMask: false,
      existConfigMask: (Spicy || format) ? true : false,
    }
  }

  onChoiseItem() {
    this.setState({ showConfigMask: true })
  }

  onCloseMask() {
    this.setState({ showConfigMask: false })
  }

  render() {
    const { average, dishphoto, dishname, dishprice, freq, Spicy, format, dishesId } = this.props
    const { showConfigMask, existConfigMask } = this.state

    return (
      <Board shadow='gray' className='wrap-Style my-2'>
        {/* 弹窗 */}
        {existConfigMask && <DishesConfigMask
          dishname={dishname}
          dishesId={dishesId}
          dishprice={dishprice}
          dishphoto={dishphoto}

          Spicy={Spicy}
          format={format}
          show={showConfigMask}

          onCloseMask={this.onCloseMask.bind(this)}
        />}

        <View className='at-row'>
          {/* 左 菜图片 */}
          <View className='at-col at-col-5'>
            <CustomImage src={dishphoto} />
          </View>
          {/* 右 菜信息 */}
          <View className='p-2'>
            <View className='text-large'>{dishname}</View>

            <View className='text-secondary text-small'>月销售数：{freq}</View>

            <View className='at-row at-row__align--end text-yellow'>
              <Text className='text-normal'>￥</Text>
              <Text className='text-huge'>{dishprice}</Text>
            </View>

            <View><AtIcon value='star-2' color='#FFC919' size='15' />{average}</View>

            {/* 按钮 */}
            <View onClick={this.onChoiseItem.bind(this)}>
              <AtIcon value='add-circle' size='20' />
            </View>

          </View>
        </View>
      </Board>
    );
  }
}

export default DishesItem as ComponentClass<PageOwnProps, PageState>
