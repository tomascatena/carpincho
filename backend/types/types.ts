import { Request } from 'express';
import { IUser } from '../models/user.model';

type GenericObject = { [key: string]: string | undefined };
export interface RequestWithBody extends Request {
  body: {
    payer?: GenericObject;
    name?: string;
    email?: string;
    password?: string;
    id?: string;
    status?: string;
    update_time?: string;
    orderItems?: Partial<ICartItem>[];
    shippingAddress?: ShippingAddress;
    paymentMethod?: string;
    itemsPrice?: number;
    taxPrice?: number;
    shippingPrice?: number;
    totalPrice?: number;
  };
  user?: Partial<IUser> | null;
}

export interface ICartItem {
  product: string;
  quantity: number;
  image: string;
  price: number;
  name: string;
  countInStock: number;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
