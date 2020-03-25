
export interface dishesPayload {
  dishname: String,
  dishesId: String,
  dishphoto: String,
  dishprice: Number,
  Spicy: String,
  format: String,
  remarkTem: String,
  scores: number,
  // num?: Number,
}

export interface integralPayload {
  dishname: String,
  dishesId: String,
  dishphoto: String,
  Spicy: String,
  format: String,
  remarkTem: String,
  scores: number,
  // num?: Number,
}


export interface dishesPayloadComplete {
  dishname: String,
  dishesId: String,
  dishphoto: String,
  dishprice: number,
  Spicy: boolean,
  format: boolean,
  remark: String,
  num: number,
  sum: number
}

export interface dishesRate {
  average: number,
  content: string,
  dishname: string,
  dishphoto: string
}