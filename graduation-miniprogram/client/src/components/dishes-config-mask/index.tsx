import { ComponentClass } from 'react'
import Taro, { Component, checkIsSupportSoterAuthentication } from '@tarojs/taro'
import { AtFloatLayout, AtTag, AtButton, AtInput } from "taro-ui"
import { View, Text } from '@tarojs/components'

// types
import { baseObj } from '@/types/obj'

type PageStateProps = {}

type PageDispatchProps = {
}

type PageOwnProps = {
  show: boolean,
  Spicy: boolean,
  format: boolean,
  onCloseMask: Function,
  ondispatchPayload: Function,
  special: boolean,
  scores?: number,
  integral?: number
}

type PageState = {
  SpicyS?: Array<baseObj>,
  formatS?: Array<baseObj>,
  Spicy: String,
  format: String,
  remarkTem: string
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface DishesConfigMask {
  props: IProps;
  state: PageState
}

class DishesConfigMask extends Component {
  static options = {
    addGlobalClass: true
  }

  constructor(props: any) {
    super(props)

    const { Spicy, format } = this.props
    const SpicyS = Spicy ? [
      { id: 1, title: '原味', active: true },
      { id: 2, title: '微辣', active: false },
      { id: 3, title: '中辣', active: false },
      { id: 4, title: '麻辣', active: false },
    ] : []

    const formatS = format ? [
      { id: 1, title: '小份', active: true },
      { id: 2, title: '中份', active: false },
      { id: 3, title: '大份', active: false },
    ] : []

    this.state = {
      SpicyS,
      formatS,
      remarkTem: '',
      Spicy: Spicy ? SpicyS[0].title : '',
      format: format ? formatS[0].title : '',
    }
  }

  onChoiseFormat(id: number) {
    let { formatS, format } = this.state
    formatS && formatS.forEach(i => {
      if (i.id === id) {
        i.active = true
        format = i.title
      } else i.active = false
    })
    this.setState({ formatS, format })
  }

  onChoiseSpicy(id: number) {
    let { SpicyS, Spicy } = this.state
    SpicyS && SpicyS.forEach(i => {
      if (i.id === id) {
        i.active = true
        Spicy = i.title
      } else i.active = false
    })
    this.setState({ SpicyS, Spicy })
  }

  onInputRemark(value: String) {
    this.setState({ remarkTem: value })
  }

  // 确定按钮调用action放到全局状态库中去
  onConfirm() {
    const { special, scores, integral } = this.props
    let { Spicy, remarkTem, format } = this.state
    if (special) {
      Taro.showModal({
        title: `确认以${scores}积分换取吗?`,
        success: ({ confirm }) => {
          this.props.onCloseMask()
          if (confirm && scores && integral) {
            if (scores <= integral) {
              this.props.ondispatchPayload({ params: { Spicy, remarkTem, format } })
            } else {
              Taro.showToast({ icon: 'none', title: '积分不足' })
            }
          }
        }
      })
    } else {
      this.props.onCloseMask()
      this.props.ondispatchPayload({ params: { Spicy, remarkTem, format } })
    }
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
                    {i.title}
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
                    {i.title}
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
