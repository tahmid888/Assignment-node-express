import { User } from '../user.model';
import { TUser } from './user.interface';

//creating users that will save into database
const createUserIntoDB = async (userData: TUser) => {
  //const result = await UserModel.create(user);
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
const getSingleUserFromDB = async (userId: string) => {
  const userExists2 = await User.find({ userId, isActive: true }).select(
    '-orders',
  );
  return userExists2;
};
// update the user
const updateUserFromDB = async (userId: string) => {
  const userUpdate = await User.findOne({ userId });

  return userUpdate;
};

// put a order

const updateOrderFromDB = async (userId: string) => {
  const userUpdate = await User.findOne({ userId });

  return userUpdate;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  updateOrderFromDB,
};
