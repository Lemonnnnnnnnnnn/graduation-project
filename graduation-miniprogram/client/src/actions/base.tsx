interface Types {
  payload?: any,
  type: String,
  cb?: any
}

/*
  createAction拥有三个可选参数，其中type参数为必须，因为reducers中需要对唯一的type对应处理操作
  该方法返回一个函数，函数拥有dispatch参数，默认将type和payload执行dispatch操作
  dispatch至reducer中对数据进行处理return至公有状态库

  * dispatch方法来自哪里？
  来自connect，connect的第二个参数mapDispatchToProps,将所有的action creators做了封装，统一传送到组件中

  该函数方法实际上是这样的[mapDispatchToProps(dispatch, [ownProps]): dispatchProps]

  我们在使用中用到了装饰器@connect将这一部分简化了，所以在代码中看不见将dispatch这个方法传入

*/
export default function createAction({ payload, type }: Types) {
  return (dispatch: any) => {
    dispatch({ type, payload })
    return payload
  }
}
