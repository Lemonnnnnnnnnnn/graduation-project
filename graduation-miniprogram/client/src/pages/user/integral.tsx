import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

// components
import Loading from '@/components/loading'
import IntegralList from '@/components/integral-List'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
    Dishesitems: any,
    loading: boolean,
    integral: number
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Integral {
    props: IProps;
    state: PageState,
}

class Integral extends Component {
    constructor(props: any) {
        super(props)
        this.state = {
            Dishesitems: [],
            loading: false,
            integral: 0
        }
    }

    config: Config = {
        navigationBarTitleText: '兑换中心',
    }

    componentDidShow() {
        const { OPENID } = Taro.getStorageSync('user_info')

        Taro.cloud.callFunction({
            name: 'getUserDetail',
            data: { id: OPENID }
        }).then((res: any) => {
            if (res) {
                const { integral } = res.result.data[0]
                this.setState({ integral })
            }
        }).catch((e) => {
            console.log(e)
        })


        // 通过云函数获取菜品表数据
        Taro.cloud.callFunction({
            name: 'getIntegralList',
            data: {}
        }).then(
            ({ result }) => {
                this.setState({ Dishesitems: result, loading: false })
            }
        )
    }

    render() {
        const { loading, Dishesitems, integral } = this.state
        return (!loading ?
            <View className='p-3 wrap-Style'>
                {/* 列表 */}
                <IntegralList
                    integral={integral}
                    items={Dishesitems.data}
                />
            </View>
            : <Loading show />
        )
    }

}
export default Integral as ComponentClass<PageOwnProps, PageState>