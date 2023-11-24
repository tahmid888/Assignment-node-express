import { User } from '../user.model';
import { TUser } from './user.interface';

//creating users that will save into database
const createUserIntoDB = async (userData: TUser) => {
  const user = new User(userData); // create an instance
  if (await user.isUserExists(userData.userId)) {
    throw new Error('User Already Exist');
  }
  const result = await user.save();
  return result;
};
// get all the users which is stored in database
const getAllUsersFromDB = async () => {
  const result = await User.find({}, 'username fullName age email address');
  return result;
};
// get only singles users
const getSingleUserFromDB = async (userId: number) => {
  const userExists2 = await User.find({ userId, isActive: true }).select(
    '-orders',
  );
  return userExists2;
};
// update the user
const updateUserFromDB = async (userId: number | string) => {
  const userUpdate = await User.findOne({ userId }, { password: 0 }).select(
    '-password',
  );
  return userUpdate;
};
// delete user by id
const deleteUserFromDB = async (userId: string) => {
  //const userDelete = await User.findByIdAndUpdate(userId);
  const deletedUser = await User.findByIdAndDelete({ userId });
  return deletedUser;
};
// put a order
const updateOrderFromDB = async (userId: string | number) => {
  const orderUpdate = await User.findOne({ userId });
  return orderUpdate;
};
// get the orders
const getOrderFromDB = async (userId: string | number) => {
  const orderUpdate = await User.findOne({ userId });
  return orderUpdate;
};
// calculate the total prize
const calculateOrderFromDB = async (userId: string | number) => {
  const orderUpdate = await User.findOne({ userId });
  return orderUpdate;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
  updateOrderFromDB,
  getOrderFromDB,
  calculateOrderFromDB,
};
