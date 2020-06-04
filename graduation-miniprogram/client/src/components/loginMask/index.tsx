import { ComponentClass } from 'react'
import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import Mask from './mask'
import { PAGE_AUTH } from '@/constants/page'

type PageStateProps = {
}

type PageDispatchProps = {}

type PageOwnProps = {
    onSubmitMenu: Function,
    onCloseLoginMask: Function
}

type PageState = {
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface LoginMask {
    props: IProps;
    state: PageState
}

class LoginMask extends Component {
    constructor(props) {
        super(props)
    }

    static options = {
        addGlobalClass: true
    }

    componentWillReceiveProps(nextProps) { }

    componentWillUnmount() { }

    componentDidShow() { }

    componentDidHide() { }

    onSubmitMenu(){
        this.props.onSubmitMenu()
    }

    render() {
        return (<View >
            <View className='vertical-level-center p-3 text-center' style={{
                position: 'fixed',
                borderRadius: Taro.pxTransform(10 * 2),
                background: '#fff',
                minHeight: Taro.pxTransform(120 * 2),
                minWidth: Taro.pxTransform(200 * 2),
                zIndex: 20
            }}>
                <View className='text-large text-secondary'>登录后可积累积分免费换取菜品哦</View>
                <AtButton className='mt-3' size='small' type='primary' circle onClick={() => Taro.navigateTo({ url: PAGE_AUTH })}>登录</AtButton>
                <AtButton className='mt-3' size='small' type='secondary' circle onClick={this.onSubmitMenu.bind(this)}>直接提交</AtButton>
            </View>
            <Mask show onClick={this.props.onCloseLoginMask} />
        </View>
        )
    }

}
export default LoginMask as ComponentClass<PageOwnProps, PageState>