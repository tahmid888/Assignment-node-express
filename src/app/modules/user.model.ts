import { Schema, model } from 'mongoose';
import { Address, User } from './user/user.interface';

const addressSchema = new Schema<Address>({
  street: {
    type: String,
    required: [true, 'street is required'],
  },
  city: {
    type: String,
    required: [true, 'city is required'],
  },
  country: {
    type: String,
    required: [true, 'country is required'],
  },
});
// const ordersSchema = new Schema<Order>({
//   productName: { type: String, required: true },
//   price: { type: Number, required: true },
//   quantity: { type: Number, required: true },
// });
const userSchema = new Schema<User>({
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
    maxlength: [20, 'User name can not be more than 20 character'],
    validate: {
      validator: function (value: string) {
        const userNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return userNameStr === value;
      },
      message: '{VALUE} is not capitalize format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password can not be more than 20 characters'],
  },
  fullName: {
    firstName: {
      type: String,
      required: [true, 'first name is required'],
    },
    lastName: {
      type: String,
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

// creating an user model
export const UserModel = model<User>('User', userSchema);
