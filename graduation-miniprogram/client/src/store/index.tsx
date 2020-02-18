import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '@/reducers/index'

// 使用redux-logger中的createLogger方法生成状态日记
// 通过redux中的添加中间件方法：applyMiddleware将所有的中间方法middlewares填充进store中去
const middlewares = [
  thunkMiddleware,
  createLogger()
]

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  return store
}
