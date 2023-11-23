import { UserModel } from '../user.model';
import { User } from './user.interface';

const createUserIntoDB = async (user: User) => {
  const result = await UserModel.create(user);
  // `${user.userId} ${user.username} ${user.fullName} ${user.age} ${user.email} ${user.isActive} ${user.hobbies} ${user.address}`,
  return result;
};

const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};
export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
};
