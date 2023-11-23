import { UserModel } from '../user.model';
import { User } from './user.interface';

//creating users that will save into database
const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);

  return result;
};
// get the users which is stored in database
const getAllUsersFromDB = async () => {
  const result = await UserModel.find(
    {},
    'username fullName age email address',
  );
  return result;
};
// get only singles users
const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId: userId });
  //aggregation
  // const result = await Student.aggregate([
  //   {
  //     $match: { id: id },
  //   },
  // ]);
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
};
