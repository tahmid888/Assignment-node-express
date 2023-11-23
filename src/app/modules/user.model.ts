import { Schema, model } from 'mongoose';
import { TAddress, TUser, UserMethods, UserModel } from './user/user.interface';
import bcrypt from 'bcrypt';
const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, 'street is required'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'city is required'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'country is required'],
  },
});
// const ordersSchema = new Schema<Order>({
//   productName: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// });
const userSchema = new Schema<TUser, UserModel, UserMethods>({
  userId: {
    type: Number,
    required: [true, 'User Id is required'],
    unique: true,
  },
  username: {
    type: String,
    unique: true,
    required: [true, ' Username is required'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    firstName: {
      type: String,
      trim: true,
      required: [true, 'first name is required'],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, 'last name is required'],
    },
  },
  age: { type: Number, required: [true, 'age is required'] },
  email: { type: String, required: [true, 'email is required'] },
  isActive: { type: Boolean, required: [true, 'active is required'] },
  hobbies: [{ type: String, required: [true, 'Hobbies are required'] }],
  address: { type: addressSchema, required: [true, 'address is required'] },
  //orders: [
  // { type: ordersSchema, required: true },
  // {
  //   productName: { type: String, required: true },
  //   price: { type: Number, required: true },
  //   quantity: { type: Number, required: true },
  // },
  // ],
});
userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};
// creating an user model
export const User = model<TUser, UserModel>('User', userSchema);
