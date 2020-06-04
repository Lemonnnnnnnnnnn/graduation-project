import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react'
import { View, Text, Button } from '@tarojs/components';
import { AtIcon, AtButton } from 'taro-ui'

import dayjs from 'dayjs'

// components
import Board from '@/components/board'
import CustomImage from '@/components/custom-image'
import DishesConfigMask from '@/components/dishes-config-mask'

// redux
import { connect } from '@tarojs/redux'
import * as dishesActions from '@/actions/dishes'

// types
import { integralPayload } from '@/types/dishes'

type PageStateProps = {
}

type PageDispatchProps = {
}

type PageOwnProps = {
  dishname: String,
  dishphoto: String,
  scores: number,
  key: string,
  dishesId: string,
  Spicy: boolean,
  format: boolean,
  integral: number
}

type PageState = {
  showConfigMask: boolean,
  existConfigMask: boolean,
  payload: integralPayload,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface IntegralItem {
  props: IProps;
  state: PageState
}

@connect(state => state, {
  ...dishesActions
})
class IntegralItem extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props: any) {
    super(props)
    const { dishphoto, dishname, Spicy, format, dishesId, scores } = this.props

    this.state = {
      showConfigMask: false,
      existConfigMask: (Spicy || format) ? true : false,
      payload: {
        dishname,
        dishesId,
        dishphoto,
        scores,
        Spicy: '',
        format: '',
        remarkTem: '',
      },
    }
  }


  ondispatchPayload(data?: any) {
    let params: any
    if (data) {
      params = data.params
    }

    let { payload } = this.state
    const { tableID, OPENID } = Taro.getStorageSync('user_info')
    payload = { ...payload, ...params }
    
    const dev = 'http://localhost:3000'
    const prod = 'https://www.linyuchen.club'

    Taro.cloud.callFunction({
      name: 'submitIntegralOrder',
      data: {
        list: [payload],
        tableID,
        OPENID,
        timePart: dayjs().format('HH:mm'),
        timeComplete: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    }).then(() => {
      Taro.showToast({ icon: 'none', title: '您的订单已提交,请耐心等待' })
      Taro.request({
        url: `${prod}/submitMenu`,
        data: {},
        method: 'POST',
        success: (res) => { console.log(res) },
        fail: () => { console.log('失败') }
      })
    })
  }

  onConfirmBtn(scores: number) {
    const { existConfigMask } = this.state
    const { integral } = this.props

    if (existConfigMask) {
      this.setState({ showConfigMask: true })
    } else {
      Taro.showModal({
        title: `确认以${scores}积分换取吗?`,
        success: ({ confirm }) => {
          if (confirm) {
            if (scores <= integral) {
              this.ondispatchPayload()

            } else {
              Taro.showToast({ icon: 'none', title: '积分不足' })
            }
          }
        }
      })
    }
  }

  onCloseMask() {
    this.setState({ showConfigMask: false })
  }

  render() {
    const { dishphoto, dishname, Spicy, format, scores, integral } = this.props
    const { showConfigMask, existConfigMask } = this.state

    return (
      <Board shadow='gray' className='wrap-Style my-2'>
        {/* 弹窗 */}
        {existConfigMask && <DishesConfigMask
          ondispatchPayload={this.ondispatchPayload.bind(this)}
          Spicy={Spicy}
          format={format}
          show={showConfigMask}
          scores={scores}
          integral={integral}
          special

          onCloseMask={this.onCloseMask.bind(this)}
        />}

        <View className='at-row' >
          {/* 左 菜图片 */}
          <View className='at-col at-col-5' >
            <CustomImage src={dishphoto} />
          </View>
          {/* 右 菜信息 */}
          <View className='p-2 position-relative at-col-6' >
            {/* 第一行名字 */}
            <View className='text-large'>{dishname}</View>

            {/* 第二行消耗积分 */}
            <View className='at-col at-col-5 text-secondary text-small' style={{ marginTop: Taro.pxTransform(2 * 2) }}>消耗积分：{scores}</View>

            {/* 第三行按钮 */}
            <AtButton size='small' className='mt-2' onClick={this.onConfirmBtn.bind(this, scores)} type='primary' circle>兑换</AtButton>

          </View>
        </View>
      </Board >
    );
  }
}

export default IntegralItem as ComponentClass<PageOwnProps, PageState>
