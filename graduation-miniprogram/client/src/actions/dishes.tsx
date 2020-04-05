import createAction from './base'

import { TYPE_ADD_DISHES, TYPE_CLEAR_CAR, TYPE_SUBTRACT_DISHES } from '@/constants/dishes'

// types
import { dishesPayload } from '@/types/dishes'

export const dispatchAddDishes = (payload: dishesPayload) => createAction({
  payload,
  type: TYPE_ADD_DISHES,
})

export const dispatchSubtractDishes = (payload: String) => createAction({
  payload,
  type: TYPE_SUBTRACT_DISHES
})

export const dispatchClearCar = (payload: any) => createAction({
  payload,
  type: TYPE_CLEAR_CAR,
})
