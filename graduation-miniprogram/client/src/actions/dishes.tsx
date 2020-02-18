import createAction from './base'

import { TYPE_ADD_DISHES, TYPE_CLEAR_CAR } from '@/constants/dishes'

// types
import { dishesPayload } from '@/types/dishes'

// 导出一个方法dispatchAddDishes,其返回值为基础方法createAction的return值
export const dispatchAddDishes = (payload: dishesPayload) => createAction({
  payload,
  type: TYPE_ADD_DISHES,
})

export const dispatchClearCar = (payload: any) => createAction({
  payload,
  type: TYPE_CLEAR_CAR,
})
