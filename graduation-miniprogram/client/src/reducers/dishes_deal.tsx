import { TYPE_ADD_DISHES, TYPE_CLEAR_CAR, TYPE_SUBTRACT_DISHES } from '@/constants/dishes'

// types
import { dishesPayloadComplete } from '@/types/dishes'

interface action {
  type: String,
  payload: any
}

export default function shoppingCar(state: Array<dishesPayloadComplete> = [], action: action) {
  // 从actions.type判断触发了哪个行为，并对state中的数据进行处理
  switch (action.type) {
    // 如果是添加菜品操作
    case TYPE_ADD_DISHES: {
      const { dishesId } = action.payload
      /**
       * 从payload中获取选中菜品的ID，通过find方法查找state中是否已经存在改菜品
       * 如果存在将数量+1并重新计算总价
       * 如果不存在将数量设置为1，并计算总价
       * 将结果通过ES6 扩展运算符... 重新放入state中
       * 扩展运算符的作用是返回一个新的数组副本。
       * 如果在原来的state上进行数据操作，虽然数组值改变了，但不会触发react的渲染机制，页面数据并没有发生改变
       * 原因是redux监听的是状态的栈内存，而数组的改变是堆内存的改变
       * 也就是说redux将下一个state和前一个state作比较认为他们是同一个数组，至于里面的值有没有发生变化监听不到，
       * 而state 和 [...state] 并不是一个数组  触发渲染
       */
      const item: dishesPayloadComplete | undefined = state.find(i => i.dishesId === dishesId)
      if (item && item.num) {
        item.num++
        item.sum = item.dishprice * item.num
      } else {
        action.payload.num = 1
        action.payload.sum = action.payload.num * action.payload.dishprice
        state.push(action.payload)
      }

      return [...state]
    }
    // 如果是删除菜品操作
    case TYPE_SUBTRACT_DISHES: {
      const choiseID = action.payload

      /**
       * 数据的增减操作和添加菜品类似，不同的是：
       * 这里将state通过深克隆克隆出一个新的数组
       * return 这个新数组，redux监听两次不是同一数组，触发渲染
       * 
       */
      const stateClone = JSON.parse(JSON.stringify(state))

      for (let i = 0; i < stateClone.length; i++) {
        const currentItem = stateClone[i]
        if (currentItem.dishesId === choiseID) {
          if (--currentItem.num) {
            currentItem.sum = currentItem.dishprice * currentItem.num
          } else {
            stateClone.splice(i, 1)
          }
        }
      }
      return stateClone

    }

    case TYPE_CLEAR_CAR: {
      let stateClone = JSON.parse(JSON.stringify(state))
      stateClone = []

      return stateClone
    }
    default: {
      return state
    }
  }
}
