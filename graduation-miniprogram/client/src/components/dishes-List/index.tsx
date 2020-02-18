import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react'
import { View, Text, Button } from '@tarojs/components';

// components
import DishesItem from '@/components/dishes-item'

type PageStateProps = {}

type PageDispatchProps = {
}

type PageOwnProps = {
  items: any[],
}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface DishesList {
  props: IProps;
  state: PageState
}


class DishesList extends Component {

  static defaultProps = {
    items: []
  }

  render() {
    const { items } = this.props
    return (
      <View>
        {
          items.map((i) =>
            <DishesItem
              dishesId={i._id}
              format={i.format}
              Spicy={i.Spicy}
              average={i.average}
              dishname={i.dishname}
              dishphoto={i.dishphoto}
              dishprice={i.dishprice}
              freq={i.freq}
              key={i._id}
            />)
        }

      </View>
    );
  }
}

export default DishesList as ComponentClass<PageOwnProps, PageState>
