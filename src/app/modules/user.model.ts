import { Schema, model } from 'mongoose';
import {
  OrderMethods,
  TAddress,
  TUser,
  UserMethods,
  UserModel,
} from './user/user.interface';
import bcrypt from 'bcrypt';
import config from '../config';
const addressSchema = new Schema<TAddress>({
  street: { type: String },
  city: { type: String },
  country: { type: String },
});

const userSchema = new Schema<TUser, UserModel, UserMethods, OrderMethods>(
  {
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
    address: { type: addressSchema, required: true, _id: false },

    orders: [
      {
        _id: false,
        productName: { type: String },
        price: { type: Number },
        quantity: { type: Number },
      },
    ],
  },
  { strict: false },
);
//using hashing to store password as hash
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias

  if (this.isModified('password')) {
    const hashedPassword = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds),
    );
    this.password = hashedPassword;
  }
  next(); //passing to next
});

// Password will hide but will save into database
userSchema.methods.toJSON = function () {
  const hidePasswordUseSchema = this.toObject();
  delete hidePasswordUseSchema.password;
  return hidePasswordUseSchema;
};

// instance methods
userSchema.methods.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};
//order exist
userSchema.methods.isOrderExists = async function (orders: string | number) {
  const orderExistUser = await User.find({ orders });
  return orderExistUser;
};
export const projection = {
  password: 0,
};

// creating an user model
export const User = model<TUser, UserModel>('User', userSchema);
