//import { Schema, model, connect } from 'mongoose';

export type Address = {
  street: string;
  city: string;
  country: string;
};
// export type Order = {
//   productName: string;
//   price: number;
//   quantity: number;
// };

export type User = {
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
  address: Address;
  //orders: Order[];
};

export type UserMethod = {
  isUserExists(id: string): Promise<User>;
};
