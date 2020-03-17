
export interface dishesPayload {
  dishname: String,
  dishesId: String,
  dishphoto: String,
  dishprice: Number,
  Spicy: String,
  format: String,
  remark: String,
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

