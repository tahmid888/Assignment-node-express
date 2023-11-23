import { Request, Response } from 'express';
import { userServices } from './user.service';
import userValidationSchema from './user.validation';
//create users and show
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    // data validation by zod
    const zodValidationData = userValidationSchema.parse(userData);

    const result = await userServices.createUserIntoDB(zodValidationData);

    res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      //   success: false,
      //   message: err.details || 'Something went wrong, checked carefully',
      //   error: err,
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        code: 500,
        description: 'Check as it occurs error',
      },
    });
  }
};
//get all the users from database and field filtering to access the specific data
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    const includeUsers = result.map((user) => ({
      username: user.username,
      fullName: user.fullName,
      age: user.age,
      email: user.email,
      address: user.address,
    }));
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: includeUsers,
    });
  } catch (err) {
    console.log(err);
  }
};
// get only a single users
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await userServices.getSingleUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const userControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
};
