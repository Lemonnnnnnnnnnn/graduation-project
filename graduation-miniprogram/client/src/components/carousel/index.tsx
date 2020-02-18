import Taro, { Component } from '@tarojs/taro';
import { Swiper, SwiperItem, View } from '@tarojs/components';
import { AtButton } from 'taro-ui'

export default class Carousel extends Component {

  config = {
    navigationBarTitleText: ''
  }

  state = {}

  // onAddData() {
  //   console.log('添加数据')
  //   Taro.cloud.callFunction({
  //     name: 'addData',
  //     data: {}
  //   })
  // }

  render() {
    return (
      < Swiper >
        <SwiperItem>
          {/* <AtButton onClick={this.onAddData}>尝试添加数据库数据</AtButton> */}
        </SwiperItem>
      </Swiper >
    );
  }
}
