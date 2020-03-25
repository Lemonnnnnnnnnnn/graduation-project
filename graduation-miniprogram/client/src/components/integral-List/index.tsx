import Taro, { Component } from '@tarojs/taro';
import { ComponentClass } from 'react'
import { View, Text, Button } from '@tarojs/components';

// components
import IntegralItem from '@/components/integral-item'

type PageStateProps = {}

type PageDispatchProps = {
}

type PageOwnProps = {
  items: any[],
  integral: number
}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface IntegralList {
  props: IProps;
  state: PageState
}


class IntegralList extends Component {

  static defaultProps = {
    items: []
  }

  render() {
    const { items ,integral } = this.props
    return (
      <View>
        {
          items.map((i) =>
            <IntegralItem
              dishesId={i._id}
              format={i.format}
              Spicy={i.Spicy}
              dishname={i.dishname}
              dishphoto={i.dishphoto}
              scores={i.scores}
              key={i._id}
              integral={integral}
            />)
        }

      </View>
    );
  }
}

export default IntegralList as ComponentClass<PageOwnProps, PageState>
