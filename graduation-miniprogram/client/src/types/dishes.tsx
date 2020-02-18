import { baseObj } from '@/types/obj'

export interface dishesPayload {
  dishname: String,
  dishesId: String,
  dishphoto: String,
  dishprice: Number,
  Spicy: baseObj,
  format: baseObj,
  remark: String,
  // num?: Number,
}


export interface dishesPayloadComplete {
  dishname: String,
  dishesId: String,
  dishphoto: String,
  dishprice: number,
  Spicy: baseObj,
  format: baseObj,
  remark: String,
  num: number,
  sum: number
}

