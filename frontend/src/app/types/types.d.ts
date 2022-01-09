export type Nullable<T> = T | null;

export interface IProduct {
  _id: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  averageRating: number;
  numReviews: number;
  reviews: IReview[];
}

export interface Token {
  token: string;
  expires: string;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: string;
  isEmailVerified: boolean;
  tokens?: { access: Token; refresh: Token };
}

export interface IReview {
  name: string;
  rating: number;
  comment: string;
}

export interface IAddCartItem {
  quantity: number;
  item: {
    _id: string;
    name: string;
    image: string;
    price: number;
    countInStock: number;
  };
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

export interface CheckoutStep {
  id: string;
  label: string;
  link: string;
  completed: boolean;
  isActive: boolean;
}

export interface CreatedOrder {
  _id: string;
  user: string;
  orderItems: Partial<ICartItem>[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
}

export interface PlaceOrder {
  orderItems: Partial<ICartItem>[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
}

export interface OrderDetails {
  _id: string;
  orderItems: ICartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: Date;
  deliveredAt?: Date;
  user: {
    _id: string;
    name: string;
    email: string;
  };
}
