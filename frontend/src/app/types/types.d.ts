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

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
}

export interface IReview {
  name: string;
  rating: number;
  comment: string;
}