import { TYPE_ADD_DISHES, TYPE_CLEAR_CAR, TYPE_SUBTRACT_DISHES } from '@/constants/dishes'

// types
import { dishesPayloadComplete } from '@/types/dishes'

interface action {
  type: String,
  payload: any
}

export default function shoppingCar(state: Array<dishesPayloadComplete> = [], action: action) {
  switch (action.type) {
    case TYPE_ADD_DISHES: {
      const { dishesId } = action.payload
      const item: dishesPayloadComplete | undefined = state.find(i => i.dishesId === dishesId)
      if (item && item.num) {
        item.num++
        item.sum = item.dishprice * item.num
      } else {
        action.payload.num = 1
        state.push(action.payload)
      }

      action.payload.sum = action.payload.num * action.payload.dishprice

      return [...state]
    }
    case TYPE_SUBTRACT_DISHES: {
      const choiseID = action.payload
      // 引用的改变不算改变，监听不到redux中状态的变化，需要用深克隆
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
