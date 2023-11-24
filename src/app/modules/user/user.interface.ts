//import { Schema, model, connect } from 'mongoose';

import { Model } from 'mongoose';

export type TAddress = {
  street: string;
  city: string;
  country: string;
};
// export type TOrder = {
//   productName: string;
//   price: number;
//   quantity: number;
// };
export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  //orders?: TOrder[];
  orders?:
    | {
        productName: string;
        price: number;
        quantity: number;
      }[]
    | undefined;
};
// for  customs instance
export type UserMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(userId: number): Promise<TUser | null>;
};
//order exist
export type OrderMethods = {
  // eslint-disable-next-line no-unused-vars
  isOrderExists(orders: number | string): Promise<TUser | null>;
};
export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
