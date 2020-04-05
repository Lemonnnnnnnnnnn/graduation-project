import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { AtRate, AtButton, AtBadge, AtTextarea, AtCard, AtDivider } from 'taro-ui'
import { View, Text } from '@tarojs/components'

// npm
import dayjs from 'dayjs'

// constants
import { PAGE_AUTH, PAGE_USER } from '@/constants/page'

// components
import CustomImage from '@/components/custom-image'
import Loading from '@/components/loading'

// types
import { dishesRate } from '@/types/dishes'

type PageStateProps = {}

type PageDispatchProps = {}

type PageOwnProps = {}

type PageState = {
    // 菜单详情
    id: string,
    average: number,
    dishname: String,
    dishphoto: String,
    rate: Array<dishesRate>

    // 用户详情
    avatarUrl: string,
    nickName: string,
    integral: number,
    isLogin: boolean,

    // 评价内容
    rateValue: string,
    rateBadge: number,


    // lodaing展示
    loading: boolean,
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface Index {
    props: IProps;
    state: PageState
}

class Index extends Component {
    constructor(props: any) {
        super(props)
        this.state = {
            id: '',
            average: 0,
            dishname: '',
            dishphoto: '',
            rate: [],

            avatarUrl: '',
            nickName: '',
            integral: 0,
            isLogin: false,

            rateValue: '',
            rateBadge: 0,

            loading: true
        }
    }
    config: Config = {
        navigationBarTitleText: '商品详情页'
    }

    componentWillMount() {
        this.onGetDishDetail()
    }

    componentDidShow() {
        this.onGetUserDetail()
    }

    onGetUserDetail() {
        const { OPENID } = Taro.getStorageSync('user_info')

        Taro.cloud.callFunction({
            name: 'getUserDetail',
            data: { id: OPENID }
        }).then((res: any) => {
            if (res) {
                const { avatarUrl, nickName, integral } = res.result.data[0]
                this.setState({ avatarUrl, nickName, integral, isLogin: true })
            }
        }).catch((e) => {
            this.setState({ isLogin: false })
        })
    }

    onGetDishDetail() {
        const { id } = this.$router.params

        Taro.cloud.callFunction({
            name: 'getDishDetail',
            data: { id }
        }).then((res: any) => {
            if (res) {
                const { average, dishname, dishphoto, rate } = res.result.data
                this.setState({ id, average, dishname, dishphoto, rate, loading: false })
            }
        })
    }

    onChangerateValue({ target: { value } }) {
        this.setState({ rateValue: value })
    }

    onChangerateBadge(rateBadge: number) {
        this.setState({ rateBadge })
    }

    onPayloadRate() {
        const { nickName, avatarUrl, rateBadge, rateValue, id } = this.state

        Taro.cloud.callFunction({
            name: 'submitRate',
            data: {
                id,
                nickName,
                avatarUrl,
                rateBadge,
                rateValue,
                date: dayjs().format('YYYY-MM-DD ')
            }
        }).then((res) => {
            console.log(res)
            this.onGetDishDetail()
        }).catch(e => console.log(e))
    }

    render() {
        let {
            average, dishname, dishphoto, rate,
            loading, isLogin,
            avatarUrl, nickName, integral,
            rateValue, rateBadge } = this.state

        return (!loading ?
            <View className='mb-4'>
                {/* header */}
                <View className='at-row at-row__justify--center'>
                    <View>
                        <CustomImage src={dishphoto} width='150' customStyle={{ borderRadius: '50%' }} />
                        <View className='text-large'>{dishname}</View>
                        <View className='at-row at-row__align--center'>
                            <AtRate value={Math.round(average)} />
                            <View className='text-normal text-secondary ml-2'>{average + '分'}</View>
                        </View>
                    </View>
                </View>

                <AtDivider className='mx-4 width-auto' content='评价中心' fontColor='#ed3f14' lineColor='#ed3f14' />

                {/* 用户栏  */}
                {isLogin ? <View className='at-row mt-4'>

                    <View className='at-col at-col-8 px-3'>
                        <View className='text-normal text-bold mb-3'>用户评价：</View>
                        {
                            rate.length ?
                                rate.map(i => <View key={i.dishname}>
                                    <AtCard
                                        note={'该用户评价为' + i.rateBadge + '分'}
                                        extra={i.date}
                                        title={i.nickName}
                                        thumb={i.avatarUrl}
                                        className='mt-2'>
                                        {i.rateValue}
                                    </AtCard >
                                </View>)
                                : <View className='text-center text-normal text-secondary'>暂无评价</View>
                        }
                        <View className='mt-3'>
                            <View className='text-normal text-bold'>你的评价：</View>
                            <AtRate
                                className='mt-2'
                                value={rateBadge}
                                onChange={this.onChangerateBadge.bind(this)}
                            />
                            <AtTextarea
                                className='mt-2'
                                value={rateValue}
                                onChange={this.onChangerateValue.bind(this)}
                                placeholder='您喜欢这个菜品吗？'
                            />
                            <AtButton onClick={this.onPayloadRate.bind(this)} className='mt-2' size='small' type='primary'>确定</AtButton>
                        </View>

                    </View>

                    <View className='at-col at-col-4 px-2' style={{ borderLeft: '1px solid #999', minHeight: Taro.pxTransform(300 * 2) }}>
                        <View className='text-center'>
                            <CustomImage src={avatarUrl} width='50' height='50' customStyle={{ borderRadius: '50%' }} />
                            <View className='mt-2 text-large text-bold'>{nickName}</View>
                            <View className='mt-2 text-normal'>积分：{integral}</View>
                            <AtBadge className='mt-3' dot> <View onClick={() => Taro.switchTab({ url: PAGE_USER })} className='text-small text-secondary'>积分有什么用？</View></AtBadge>
                        </View>
                    </View>
                </View>
                    : <View className='at-row at-row__align--center at-row__justify--center' style={{ height: Taro.pxTransform(100 * 2) }}>
                        <AtButton type='primary' onClick={() => Taro.navigateTo({ url: PAGE_AUTH })}>请登录后查看~</AtButton>
                    </View>
                }

            </View>
            : <Loading show />
        )
    }

}
export default Index as ComponentClass<PageOwnProps, PageState>