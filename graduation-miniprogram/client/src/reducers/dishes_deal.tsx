import { TYPE_ADD_DISHES, TYPE_CLEAR_CAR } from '@/constants/dishes'

// types
import { dishesPayloadComplete } from '@/types/dishes'

interface action {
  type: String,
  payload: dishesPayloadComplete
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
    case TYPE_CLEAR_CAR: {
      state = []
      return state
    }
    default: {
      return [...state]
    }
  }
}
