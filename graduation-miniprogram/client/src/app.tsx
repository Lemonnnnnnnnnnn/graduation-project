import Taro, { Component, Config } from '@tarojs/taro'
import Index from './pages/home/index'
// redux
import { Provider } from '@tarojs/redux'
import configStore from './store/index'

import './styles/app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/home/index',
      "pages/shopping-car/index",
      "pages/user/index",
      "pages/user/auth"
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: "#4A4A4A",
      backgroundColor: "#fff",
      borderStyle: "black",
      list: [
        {
          pagePath: "pages/home/index",
          text: "首页",
          iconPath: "assets/home.png",
          selectedIconPath: "assets/home-active.png"
        },
        {
          pagePath: "pages/shopping-car/index",
          text: "购物车",
          iconPath: "assets/shopping-card.png",
          selectedIconPath: "assets/shopping-card-active.png"
        },
        {
          pagePath: "pages/user/index",
          text: "我的",
          iconPath: "assets/user.png",
          selectedIconPath: "assets/user-active.png"
        }
      ],
    },
    cloud: true
  }

  componentDidMount() {
    if (process.env.TARO_ENV === 'weapp') {
      Taro.cloud.init()
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentDidCatchError() { }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
