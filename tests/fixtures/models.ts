export interface IProduct {
  name: string,
  description: string,
  price: number
}
export interface ICartProduct {
  qty: number,
  product: IProduct
}

export interface ILogin {
  username: string,
  password: string
}

export interface IUser {
  firstName: string,
  lastName: string,
  zipCode: string
}
export enum SortOptions {
  AZ = "az",
  ZA = "za",
  LoHi = "lohi",
  HiLo = "hilo"
}