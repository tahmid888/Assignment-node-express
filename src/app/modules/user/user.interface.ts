//import { Schema, model, connect } from 'mongoose';

import { Model } from 'mongoose';

export type TAddress = {
  street: string;
  city: string;
  country: string;
};
// export type Order = {
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
  //orders: Order[];
};
// for  customs instance
export type UserMethods = {
  isUserExists(userId: number): Promise<TUser | null>;
};
export type UserModel = Model<TUser, Record<string, never>, UserMethods>;
