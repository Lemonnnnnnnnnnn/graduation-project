import { ComponentClass } from 'react'
import Taro, { Component, checkIsSupportSoterAuthentication } from '@tarojs/taro'
import { AtFloatLayout, AtTag, AtButton, AtInput } from "taro-ui"
import { View, Text } from '@tarojs/components'

// types
import { baseObj } from '@/types/obj'
import { dishesPayload } from '@/types/dishes'

// redux
import { connect } from '@tarojs/redux'
import * as dishesActions from '@/actions/dishes'

type PageStateProps = {}

type PageDispatchProps = {
  dispatchAddDishes: Function
}

type PageOwnProps = {
  show: boolean,
  Spicy?: Array<baseObj>,
  format?: Array<baseObj>,
  dishname: String,
  dishesId: String,
  dishphoto: String,
  dishprice: Number,
  onCloseMask: Function
}

type PageState = {
  SpicyS: Array<baseObj>,
  formatS: Array<baseObj>,
  payload: dishesPayload,
  remarkTem: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface DishesConfigMask {
  props: IProps;
  state: PageState
}

@connect(state => state, {
  ...dishesActions
})
class DishesConfigMask extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props: any) {
    super(props)

    const { Spicy, format, dishname, dishesId, dishphoto, dishprice } = this.props
    let Spicys = Spicy ? Spicy.map((i, key) => ({ ...i, active: key === 0 ? true : false })) : []
    let formatS = format ? format.map((i, key) => ({ ...i, active: key === 0 ? true : false })) : []
    let SpicyChoise: baseObj = { id: 0, name: '' }
    let formatChoise: baseObj = { id: 0, name: '' }

    if (Spicys.length) {
      SpicyChoise = { id: Spicys[0].id, name: Spicys[0].name }
    }
    if (formatS.length) {
      formatChoise = { id: formatS[0].id, name: formatS[0].name }
    }

    this.state = {
      SpicyS: Spicys,
      formatS: formatS,
      remarkTem: '',
      payload: {
        dishname,
        dishesId,
        dishphoto,
        dishprice,
        Spicy: SpicyChoise,
        format: formatChoise,
        remark: '',
      },
    }
  }

  onChoiseFormat(id: number) {
    let { formatS, payload } = this.state
    formatS && formatS.forEach(i => {
      if (i.id === id) {
        i.active = true
        payload = { ...payload, format: { id: i.id, name: i.name } }
      } else i.active = false
    })
    this.setState({ formatS, payload })
  }

  onChoiseSpicy(id: number) {
    let { SpicyS, payload } = this.state
    SpicyS && SpicyS.forEach(i => {
      if (i.id === id) {
        i.active = true
        payload = { ...payload, Spicy: { id: i.id, name: i.name } }
      } else i.active = false
    })
    this.setState({ SpicyS, payload })
  }

  onInputRemark(value: String) {
    this.setState({ remarkTem: value })
  }

  // 确定按钮调用action放到全局状态库中去
  onConfirm() {
    let { payload, remarkTem } = this.state
    payload = { ...payload, remark: remarkTem }

    this.setState({ payload })
    this.props.dispatchAddDishes(payload)
    this.props.onCloseMask()
  }

  render() {
    const { show } = this.props
    const { SpicyS, formatS, remarkTem } = this.state
    return (
      <AtFloatLayout isOpened={show}>
        <View className='p-3'>
          {
            formatS && formatS.length && <View className='my-3'>
              <View className='text-huge'>尺寸</View>
              <View className='my-2'>
                {
                  formatS.map(i => <AtTag
                    key={i.id}
                    name='tag-1'
                    className='mr-2-full my-2'
                    type='primary'
                    circle
                    active={i.active}
                    onClick={this.onChoiseFormat.bind(this, i.id)}
                  >
                    {i.name}
                  </AtTag>)
                }
              </View>
            </View>
          }
          {
            SpicyS && SpicyS.length && <View className='my-3'>
              <View className='text-huge'>辣度</View>
              <View className='my-2'>
                {
                  SpicyS.map(i => <AtTag
                    key={i.id}
                    className='mr-2-full my-2'
                    name='tag-1'
                    type='primary'
                    circle
                    active={i.active}
                    onClick={this.onChoiseSpicy.bind(this, i.id)}
                  >
                    {i.name}
                  </AtTag>)
                }
              </View>
            </View>
          }
        </View>

        {/* 备注 */}
        <View className='my-2'>
          <AtInput name='remark' title='备注' value={remarkTem} placeholder='可选' onChange={this.onInputRemark.bind(this)} />
        </View>

        {/* 按钮 */}
        <AtButton
          circle
          onClick={this.onConfirm.bind(this)}
          className='m-2'
          type='primary'
        > 确定</AtButton>

      </AtFloatLayout>
    )
  }

}
export default DishesConfigMask as ComponentClass<PageOwnProps, PageState>
