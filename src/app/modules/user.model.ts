import { Schema, model } from 'mongoose';
import { Address, User } from './user/user.interface';

const addressSchema = new Schema<Address>({
  street: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
});
// const ordersSchema = new Schema<Order>({
//   productName: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// });
const userSchema = new Schema<User>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  hobbies: [{ type: String, required: true }],
  address: { type: addressSchema, required: true },
  //orders: [
  // { type: ordersSchema, required: true },
  // {
  //   productName: { type: String, required: true },
  //   price: { type: Number, required: true },
  //   quantity: { type: Number, required: true },
  // },
  // ],
});
export const UserModel = model<User>('User', userSchema);
