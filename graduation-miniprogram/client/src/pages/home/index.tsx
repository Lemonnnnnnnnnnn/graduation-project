import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button } from '@tarojs/components'

// constants
import { PAGE_AUTH } from '@/constants/page'

// components
import Carousel from '@/components/carousel'
import DishesList from '@/components/dishes-List'
import Board from '@/components/board'

type PageStateProps = {}

type PageDispatchProps = {
  dispatchTest: Function
}

type PageOwnProps = {}

type PageState = {
  Dishesitems: any,
  tableID: String | Number,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Home {
  props: IProps;
  state: PageState
}

// actions
import { connect } from '@tarojs/redux'
import * as dishesActions from '@/actions/dishes'

// connect分为两个部分，前半部分是mapStateToProps,后半部分是mapDispatchToProps
@connect(state => state, {
  dishesActions
})

class Home extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  constructor(props: any) {
    super(props)

    const { tableID = 87 } = this.$router.params
    const user_info = Taro.getStorageSync('user_info')
    Taro.setStorageSync('user_info', { ...user_info, tableID })
    this.state = {
      Dishesitems: {},
      tableID,
    }

  }

  componentWillMount() {
    // 验证用户是否登录，如未登录，跳转登录页面
    !Taro.getStorageSync('user_info') && Taro.navigateTo({ url: PAGE_AUTH })

    // 通过云函数获取菜品表数据
    Taro.cloud.callFunction({
      name: 'getDishesList',
      data: {}
    }).then(
      ({ result }) => {
        this.setState({ Dishesitems: result })
      }
    )
  }

  render() {
    const { Dishesitems } = this.state
    return (
      <View className='p-3 wrap-Style'>
        {/* 列表 */}
        <DishesList
          items={Dishesitems.data}
        />
        {/* 底部tab栏 */}
        <Board fixed='bottom'>
          <View className='at-row at-row__justify--around'>

          </View>
        </Board>

        {/* <Login /> */}
      </View>
    )
  }
}

export default Home as ComponentClass<PageOwnProps, PageState>
